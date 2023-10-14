from sqlalchemy import BigInteger
from sqlalchemy.orm import Mapped, mapped_column

from backend.db.base_class import Base


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()
    user_type: Mapped[int] = mapped_column()
    bio: Mapped[str] = mapped_column(nullable=True)
    level: Mapped[int] = mapped_column(default=1)
    coins: Mapped[int] = mapped_column(default=0)
    xp: Mapped[int] = mapped_column(default=0)
    avatar: Mapped[str] = mapped_column(nullable=True)
