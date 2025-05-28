import { ProductType } from "@/types";
import { database } from "../config/mongodb";

export default class ProductModel {
  static collection() {
    const db = database()
    const collection = db.collection<ProductType>("products")
    return collection
  }

  static async getAll(page: string, limit: number, q: string) {
    const skip = (+page - 1) * limit;
    const queries = q.split(" ").map((el) => {
      return {
        name: { $regex: el, $options: "i" },
      };
    });
    return this.collection()
      .find({ $and: queries })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  static async getBySlug(slug: string) {
    const product = await this.collection().findOne({
      slug: slug,
    });
    return product;
  }
}