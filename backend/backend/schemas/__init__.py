import datetime
from typing import Optional


def date_iso_format(date: Optional[datetime.datetime]) -> Optional[datetime.datetime]:
    if date is None:
        return None
    print(date)
    if not isinstance(date, datetime.datetime):
        raise TypeError("Expected datetime.datetime, got " + str(type(date)))

    if date.tzinfo is None:
        return date.replace(tzinfo=datetime.timezone.utc)

    return date.replace(tzinfo=datetime.timezone.utc)
