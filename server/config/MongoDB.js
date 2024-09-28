import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MongoDB,{
    user:'martin12082000',
    pass:'Martin1208__+',
})

  export const Koneksi = mongoose.connection;

    Koneksi.on('error',(err)=>{
        console.log('MongoDB Terputus', err)
    })

    Koneksi.once('open',()=>{
        console.log(" MongoDB Terhubung")
    })

    
// import mongoose from "mongoose";

// // Menentukan nama database di URL koneksi
// mongoose.connect('mongodb://localhost:27017/TestManage');

// export const Koneksi = mongoose.connection;

// Koneksi.on('error', (err) => {
//     console.log('MongoDB Terputus', err);
// });

// Koneksi.once('open', () => {
//     console.log("MongoDB Terhubung ke database 'TestManage'");
// });
