import { WishlistType } from "@/types";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export default class WishlistModel {
  static collection() {
    const db = database()
    const collection = db.collection<WishlistType>("whislists");
    return collection
  }
  static async create({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const newWishlist = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //buatkan validasi untuk tidak menambahkan item yang sama secara 2 kali, menggunakan existingProduct
    const existingProduct = await this.collection().findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (existingProduct) {
      throw new Error("This product is already in the wishlist.");
    }

    return await this.collection().insertOne(newWishlist);
  }
  static async getAll(userId: string) {
    const wishlists = this.collection()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetail",
          },
        },
        {
          $unwind: {
            path: "$productDetail",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    return wishlists;
  }
  static async remove({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const result = await this.collection().deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (result.deletedCount === 0) {
      throw new Error("Item not found in the wishlist.");
    }

    return { message: "Item removed from wishlist successfully." };
  }
}

