import mongoose from 'mongoose';

const productosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
});

export default mongoose.model('productos', productosSchema);
