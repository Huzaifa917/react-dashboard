const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./ascend-a7f20-firebase-adminsdk-ssu0t-38d4b9f671.json");
const app = express();
const router = express.Router();
router.use(express.json());
const port = process.env.PORT || 5000;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

app.use(cors());
app.use(express.json())
const db = admin.firestore();
const firstCollection = db.collection("firstCollection");

app.get("/get-data", async (req, res) => {
  try {
    const snapshot = await firstCollection.get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ message: "fetched!", data: data });
  } catch (error) {
    res.json({ message: "Internal Server Error", success: true });
  }
});

app.post("/post-data", async (req, res) => {
  try {
    const body = req.body
    // const { OwnerName } = req.body;
    await firstCollection.add(body);
    console.log("body: ", body);
    res.status(200).json({ message: "Posted!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
