import { UserModel } from "../models/User.js";

export function createUserLoader() {
  return async (ids) => {
    const users = UserModel.findByIds(ids);
    const map = new Map(users.map((user) => [String(user.id), user]));
    return ids.map((id) => map.get(String(id)) || null);
  };
}
