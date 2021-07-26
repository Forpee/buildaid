import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const materials = await db.collection("Orders").insertOne(req.body);
 
  } 
};
