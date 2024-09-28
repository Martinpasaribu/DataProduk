import mongoose, { Schema, mongo } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const data = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    name:  { type: String, default: null },
    price: { type: String, default: null },
    stock: { type: Number, default: null },
    waktu: { type: Date, default: Date.now },

});
export const DataModel = mongoose.model('Product', data, 'Product');





