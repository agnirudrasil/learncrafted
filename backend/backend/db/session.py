from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.core.settings import settings

engine = create_engine(str(settings.SQL_ALCHEMY_DATABASE_URI), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
