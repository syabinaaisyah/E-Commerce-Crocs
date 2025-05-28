import { comparePassword } from "@/db/helpers/bcrypt";
import errorHandler from "@/db/helpers/errorHandler";
import { signToken } from "@/db/helpers/jwt";
import UserModel from "@/db/models/UserModel";
import { AppError } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: { email: string; password: string } = await request.json();

    const user = await UserModel.findByEmail(body.email);
    if (!user) throw { message: "Invalid Email or Password", status: 401 };

    const validPass = comparePassword(body.password, user.password);
    if (!validPass) throw { message: "Invalid Email or Password", status: 401 };

    const accessToken = signToken({
      _id: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json({ message: "ok", accessToken });
    response.cookies.set("authorization", `Bearer ${accessToken}`, {
      httpOnly: true, 
      path: '/', 
      maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (error) {
    return errorHandler(error as AppError);
  }
}