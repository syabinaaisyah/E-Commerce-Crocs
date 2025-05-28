import ProductModel from "@/db/models/ProductModel";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : 10;
  const q = searchParams.get("q") || "";

  const products = await ProductModel.getAll(page, limit, q);
  return Response.json(products);
}
