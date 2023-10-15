from sqlalchemy import BigInteger, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from backend.db.base_class import Base


class Achievement(Base):
    __tablename__ = "achievements"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    colour: Mapped[str] = mapped_column()
    progress_id: Mapped[int] = mapped_column(ForeignKey("progress.id"))
