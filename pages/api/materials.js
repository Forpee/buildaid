import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const materials = await db
    .collection("Builders")
    .find({})
    .filter({})
    .toArray();
  res.json(materials);
};
