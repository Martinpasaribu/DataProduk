import  express  from "express";
import { Cari, createdata, deleteProduct, getdata, getProductById, updateProduct } from "../controllers/User.js";


// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.post('/product', createdata);

router.get('/product', getdata);

router.delete('/product/:id', deleteProduct);

router.patch('/product/:id', updateProduct);

router.get('/product/:id', getProductById);

router.get('/cari', Cari)

export default router; 