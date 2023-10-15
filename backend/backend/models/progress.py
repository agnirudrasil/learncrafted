from sqlalchemy import BigInteger, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.db.base_class import Base


class UserProgress(Base):
    __tablename__ = "user_progress"
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    progress_id: Mapped[int] = mapped_column(ForeignKey("progress.id"), primary_key=True)
    progress: Mapped[int] = mapped_column()
    completed: Mapped[bool] = mapped_column(server_default='false')


class Progress(Base):
    __tablename__ = "progress"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    event: Mapped[int] = mapped_column()
    threshold: Mapped[int] = mapped_column()
    name: Mapped[str] = mapped_column()
