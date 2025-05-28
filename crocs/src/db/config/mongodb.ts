import { Db, MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string;
let db: Db
let client: MongoClient

export function connect() {
  client = new MongoClient(uri)

  console.log('Connected successfully to server');
  db = client.db("gc02");
}

export function database() {
  if (!db) {
    connect()
  }

  return db
}
