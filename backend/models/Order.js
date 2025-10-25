import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Delivered", "Cancelled"], default: "Pending" },
  user: { type: String }, // optional
  address: { type: String },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
