import bcrypt
import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "secure-auth-task-secret-key"
ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")

    hashed = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    return hashed.decode("utf-8")


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        password.encode("utf-8"),
        hashed_password.encode("utf-8")
    )


def create_token(email: str, role: str) -> str:
    payload = {
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


def decode_token(token: str):
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

    except jwt.ExpiredSignatureError:
        return None

    except jwt.InvalidTokenError:
        return None