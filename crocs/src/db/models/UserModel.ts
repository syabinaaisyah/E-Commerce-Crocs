import { UserType } from "@/types";
import { database } from "../config/mongodb";
import { z } from "zod";
import { hashPassword } from "../helpers/bcrypt";

export type User = {
  email: string,
  username: string,
  password: string,
}

const UserSchema = z.object({
  email: z.string().email({ message: "Should be Email format" }),
  username: z
    .string()
    .min(5, { message: "UserName must be minimal 5 character" }),
  password: z
    .string()
    .min(5, { message: "Password must be minimal 5 character" }),
});

export default class UserModel {
  static collection() {
    const db = database()
    const collection = db.collection<User>("users")
    return collection
  }

  static async create(newUser: UserType) {
    //! Validasi
    UserSchema.parse(newUser);

    const existingUser = await this.collection().findOne({
      $or: [
        {
          username: newUser.username,
        },
        {
          email: newUser.email,
        },
      ],
    });

    if (existingUser)
      throw {
        message: "Email or Username already exist",
        status: 400,
      };

    newUser.password = hashPassword(newUser.password);

    return await this.collection().insertOne(newUser);
  }

  static async findByEmail(email: string) {
    return await this.collection().findOne({ email });
  }
}

