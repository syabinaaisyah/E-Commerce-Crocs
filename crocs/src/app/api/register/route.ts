import errorHandler from "@/db/helpers/errorHandler";
import UserModel from "@/db/models/UserModel";
import { AppError } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body,"body")
    await UserModel.create(body);

    return Response.json({
      message: "success create New User",
      status: 201,
    });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}
