from sqlalchemy import BigInteger
from sqlalchemy.orm import Mapped, mapped_column

from backend.db.base_class import Base


class Badge(Base):
    __tablename__ = "badges"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    cost: Mapped[int] = mapped_column()
    colour: Mapped[str] = mapped_column(server_default="#000000")
