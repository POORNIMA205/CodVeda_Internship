from fastapi import FastAPI
from .routes import router

app = FastAPI(
    title="SecureAuth",
    description="Secure JWT Authentication and Role-Based Authorization System",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "project": "SecureAuth",
        "message": "JWT Authentication API is running",
        "features": [
            "Signup",
            "Login",
            "bcrypt password hashing",
            "JWT authentication",
            "HTTP-only cookies",
            "Role-based authorization",
            "Protected routes"
        ]
    }