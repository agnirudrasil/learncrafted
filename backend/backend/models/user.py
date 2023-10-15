from typing import List

from sqlalchemy import BigInteger, Table, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.db.base_class import Base

association_table = Table(
    "user_badges",
    Base.metadata,
    Column("user_id", BigInteger, ForeignKey("users.id")),
    Column("badge_id", BigInteger, ForeignKey("badges.id")),
)

achievements_association_table = Table(
    "user_achievements",
    Base.metadata,
    Column("user_id", BigInteger, ForeignKey("users.id"), primary_key=True),
    Column("achievements_id", BigInteger, ForeignKey("achievements.id"), primary_key=True),
)


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

    events: Mapped[List["Event"]] = relationship(back_populates="user")
    badges: Mapped[List["Badge"]] = relationship(secondary=association_table)
    achievements: Mapped[List["Achievement"]] = relationship(
        secondary=achievements_association_table
    )
