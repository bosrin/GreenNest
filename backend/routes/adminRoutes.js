import express from "express";
import Plant from "../models/Plant.js";
import Order from "../models/Order.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// ------------------- IMAGE UPLOAD -------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// ------------------- ADD PLANT -------------------
router.post("/add-plant", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : null;
    const newPlant = new Plant({ name, price, category, stock, image });
    await newPlant.save();
    res.status(201).json({ message: "Plant added successfully", plant: newPlant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- GET PLANTS -------------------
router.get("/plants", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- UPDATE PLANT -------------------
router.put("/update-plant/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const updateData = { name, price, category, stock };
    if (req.file) updateData.image = req.file.filename;

    const plant = await Plant.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json({ message: "Plant updated successfully", plant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- DELETE PLANT -------------------
router.delete("/delete-plant/:id", async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json({ message: "Plant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- GET ORDERS -------------------
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.plant");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
