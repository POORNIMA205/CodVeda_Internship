from pydantic import BaseModel
from typing import Optional


class SignupRequest(BaseModel):
    username: str
    email: str
    password: str
    role: Optional[str] = "user"


class LoginRequest(BaseModel):
    email: str
    password: str