import errorHandler from "@/db/helpers/errorHandler";
import WishlistModel from "@/db/models/WhishlistModel";
import { AppError } from "@/types";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  const wishlists = await WishlistModel.getAll(userId);

  return Response.json(wishlists);
}

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const userId = request.headers.get("x-user-id") as string;

    await WishlistModel.create({ userId, productId });

    return Response.json({
      message: "success to add new wishlist",
    });
  } catch (error) {
    return errorHandler(error as AppError);
  }
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();
    const userId = request.headers.get("x-user-id") as string;

    const result = await WishlistModel.remove({ userId, productId });

    return Response.json(result);
  } catch (error) {
    return errorHandler(error as AppError);
  }
}
