import errorHandler from "@/db/helpers/errorHandler";
import ProductModel from "@/db/models/ProductModel";
import { AppError } from "@/types";

export async function GET(
  req: Request,
  { params }: { params : Promise<{ slug: string }>}
) {
  try {
    const { slug } = await params;
    const product = await ProductModel.getBySlug(slug);

    if (!product) throw { message: "product not found", status: 404 };

    return Response.json(product);
  } catch (error) {
    return errorHandler(error as AppError);
  }
}
