from sqlalchemy import update, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session, load_only

from backend.db.session import engine

from celery import Celery

from backend.models.progress import UserProgress, Progress
from backend.models.user import User, achievements_association_table
from backend.models.achievement import Achievement
from backend.models.badge import Badge
from backend.tasks import Events

app = Celery('tasks', broker='pyamqp://guest@localhost//')


@app.task
def update_progress(user_id: int, event: Events):
    with Session(engine) as session:
        user = session.scalars(select(User).where(User.id == user_id)).first()
        stmt = insert(UserProgress).from_select(
            ["progress_id", "progress", "user_id"],
            select(Progress.id, 1, user_id).where(Progress.event == event)
        )
        stmt = stmt.on_conflict_do_update(
            index_elements=[UserProgress.user_id, UserProgress.progress_id],
            set_=dict(progress=UserProgress.progress + 1),
            where=(UserProgress.completed == False)
        )
        session.execute(stmt)
        session.commit()

        completed = session.scalars(
            select(UserProgress)
            .where(UserProgress.user_id == user_id)
            .where(UserProgress.progress == Progress.threshold)
        ).all()

        for completed_progress in completed:
            stmt = insert(achievements_association_table).from_select(
                ["user_id", "achievements_id"],
                select(user.id, Achievement.id).where(Achievement.progress_id == completed_progress.progress_id)
            )

            stmt = stmt.on_conflict_do_nothing(
                index_elements=["user_id", "achievements_id"]
            )

            session.execute(
                update(UserProgress)
                .where(UserProgress.user_id == user_id)
                .where(UserProgress.progress_id == completed_progress.progress_id)
                .values(completed=True)
            )

            session.execute(stmt)

        session.commit()
