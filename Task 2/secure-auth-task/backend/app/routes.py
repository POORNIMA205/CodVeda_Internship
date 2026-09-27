from fastapi import APIRouter, HTTPException, Request, Response

from .database import users
from .models import SignupRequest, LoginRequest
from .auth import (
    hash_password,
    verify_password,
    create_token,
    decode_token
)

router = APIRouter()


# ---------------- SIGNUP ----------------

@router.post("/signup")
def signup(user: SignupRequest):

    if user.email in users:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    if user.role not in ["user", "admin"]:
        raise HTTPException(
            status_code=400,
            detail="Role must be user or admin"
        )

    hashed_password = hash_password(user.password)

    users[user.email] = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }

    return {
        "message": "Account created successfully",
        "username": user.username,
        "email": user.email,
        "role": user.role
    }


# ---------------- LOGIN ----------------

@router.post("/login")
def login(user: LoginRequest, response: Response):

    existing_user = users.get(user.email)

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_token(
        existing_user["email"],
        existing_user["role"]
    )

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=3600
    )

    return {
        "message": "Login successful",
        "username": existing_user["username"],
        "role": existing_user["role"]
    }


# ---------------- AUTHENTICATION ----------------

def get_current_user(request: Request):

    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )

    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return payload


# ---------------- PROTECTED PROFILE ----------------

@router.get("/profile")
def profile(request: Request):

    user = get_current_user(request)

    return {
        "message": "Protected profile accessed",
        "email": user["email"],
        "role": user["role"]
    }


# ---------------- USER DASHBOARD ----------------

@router.get("/user/dashboard")
def user_dashboard(request: Request):

    user = get_current_user(request)

    if user["role"] != "user":
        raise HTTPException(
            status_code=403,
            detail="User role required"
        )

    return {
        "message": "Welcome to User Dashboard",
        "email": user["email"],
        "role": user["role"],
        "access": [
            "View profile",
            "Create notes",
            "View personal data"
        ]
    }


# ---------------- ADMIN DASHBOARD ----------------

@router.get("/admin/dashboard")
def admin_dashboard(request: Request):

    user = get_current_user(request)

    if user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin role required"
        )

    return {
        "message": "Welcome to Admin Dashboard",
        "email": user["email"],
        "role": user["role"],
        "total_users": len(users),
        "access": [
            "View users",
            "Manage users",
            "View security information"
        ]
    }


# ---------------- ADMIN USERS ----------------

@router.get("/admin/users")
def view_users(request: Request):

    admin = get_current_user(request)

    if admin["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    user_list = []

    for user in users.values():
        user_list.append({
            "username": user["username"],
            "email": user["email"],
            "role": user["role"]
        })

    return {
        "total_users": len(user_list),
        "users": user_list
    }


# ---------------- LOGOUT ----------------

@router.post("/logout")
def logout(response: Response):

    response.delete_cookie("access_token")

    return {
        "message": "Logout successful",
        "detail": "Authentication cookie removed"
    }