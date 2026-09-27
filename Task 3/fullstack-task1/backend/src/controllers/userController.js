import User from "../models/User.js";

export async function profile(req, res) {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
}

export async function listUsers(req, res, next) {
  try {
    const users = User.findAll();

    res.json({
      users
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    if (req.params.id.toString() === req.user.id.toString()) {
      return res.status(400).json({
        message: "You cannot change your own role"
      });
    }

    const user = User.updateRole(req.params.id, role);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Role updated",
      user
    });
  } catch (error) {
    next(error);
  }
}