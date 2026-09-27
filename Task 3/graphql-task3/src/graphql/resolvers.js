import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

function createToken(user) {
  return jwt.sign(
    { id: String(user.id), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: String(user.id),
    name: user.name,
    email: user.email,
    role: user.role.toUpperCase(),
    createdAt: user.createdAt
  };
}

function requireAuth(context) {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return context.user;
}

function requireAdmin(context) {
  const user = requireAuth(context);
  if (user.role !== "admin") {
    throw new Error("Access denied. Admin role required");
  }
  return user;
}

export const resolvers = {
  Role: {
    USER: "user",
    ADMIN: "admin"
  },

  Query: {
    health: () => "GraphQL API is healthy",

    me: (_, __, context) => {
      if (!context.user) return null;
      return publicUser(UserModel.findById(context.user.id));
    },

    user: (_, { id }, context) => {
      requireAuth(context);
      return publicUser(UserModel.findById(id));
    },

    users: (_, __, context) => {
      requireAdmin(context);
      return UserModel.findAll().map(publicUser);
    }
  },

  Mutation: {
    register: async (_, { input }) => {
      const name = input.name.trim();
      const email = input.email.toLowerCase().trim();

      if (name.length < 2 || name.length > 60) {
        throw new Error("Name must be between 2 and 60 characters");
      }
      if (input.password.length < 6) {
        throw new Error("Password must contain at least 6 characters");
      }
      if (UserModel.findByEmail(email)) {
        throw new Error("Email is already registered");
      }

      const hashedPassword = await bcrypt.hash(input.password, 12);
      const user = UserModel.create({ name, email, password: hashedPassword });

      return {
        message: "Registration successful",
        token: createToken(user),
        user: publicUser(user)
      };
    },

    login: async (_, { input }) => {
      const email = input.email.toLowerCase().trim();
      const user = UserModel.findByEmail(email);

      if (!user || !(await bcrypt.compare(input.password, user.password))) {
        throw new Error("Invalid email or password");
      }

      return {
        message: "Login successful",
        token: createToken(user),
        user: publicUser(user)
      };
    },

    updateRole: (_, { id, role }, context) => {
      const currentUser = requireAdmin(context);
      const newRole = role.toLowerCase();

      if (String(id) === String(currentUser.id)) {
        throw new Error("You cannot change your own role");
      }

      const user = UserModel.updateRole(id, newRole);
      if (!user) throw new Error("User not found");

      return publicUser(user);
    }
  },

  User: {
    // DataLoader batches repeated user lookups into one SQL query.
    id: (user) => String(user.id),
    role: (user) => user.role.toUpperCase(),
    createdAt: (user) => user.createdAt
  }
};
