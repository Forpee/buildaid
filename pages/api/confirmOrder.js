import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { db } = await connectToDatabase();

    const mat = await db
      .collection("Orders")
      .find({ refNum: parseFloat(req.body.num) })
      .count();
    if (mat > 0) {
      await db
        .collection("Orders")
        .findOneAndUpdate(
          { refNum: parseFloat(req.body.num) },
          { $set: { confirmation: true } }
        );
      res.json(true);
    }
  }
};
