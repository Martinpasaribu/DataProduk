import  {  DataModel  }  from "../models/FormsModel.js";
import moment from 'moment'; // Import moment.js jika belum diimpor


export const createdata = async(req, res) =>{
    const {name, price, stock} = req.body;
  
    try {
        await DataModel.create({
            name: name,
            price : price,
            stock : stock
          
        });
        res.status(201).json({msg: "add Berhasil"});
    } catch (error) {
        res.status(400).json({msg: "add Error"});
    }
}


// =========================  GET =============================

export const getdata = async(req, res) =>
    {
        try {
            const users = await DataModel.find({}); // Mengambil hanya UUID pengguna
            res.status(200).json(users); // Mengembalikan array UUID pengguna
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    
    
    export const deleteProduct = async (req, res) =>
        {
            const userId = req.params.id
            
            const user = await DataModel.findOne( {       
                    uuid: userId       
            });
            if(!user) return res.status(404).json({msg: " User Tidak ditemukan"})
        
            try {
                await DataModel.deleteOne(
                {           
                        uuid:userId          
                });
                res.status(200).json({msg: "User Dihapus"});
            } catch (error) {
                res.status(400).json({msg: "Error kabeh"});
            }
        
        }

        export const updateProduct = async (req, res) =>
            {
                const userId = req.params.id
                const user = await DataModel.findOne( {uuid: userId});
                
            
                if(!user) return res.status(404).json({msg: " User Tidak ditemukan"})
                const {name, price, stock } = req.body;

                try {
                    const result = await DataModel.updateOne(
                        { uuid:userId},
                        { $set:
                            {
                                name:name,
                                price:price,
                                stock:stock
                            }                       
                       }
                    );
                    res.status(200).json({msg: "Update Berhasil"});
                } catch (error) {
                    res.status(400).json({msg: "Error kabeh"});
                }
            }
            

            export const getProductById = async (req, res) =>
                {
                    const userId = req.params.id
                    try {
                        const response = await DataModel.findOne( 
                            {uuid:userId},
                                { 
                                _id: true,
                                uuid:true,
                                name: true, 
                                price: true, 
                                stock: true
                        }  // Memilih kolom yang ingin dikembalikan          
                        );
                
                        res.status(201).json(response); 
                    } catch (error) {
                        res.status(500).json({msg: error.message});
                    }
                }

                export  const Cari = async (req, res) =>{
                    try {
                        
                        const {name} = req.query;
                
                        const results = await DataModel.find({
                           $or : [
                            { name : { $regex: new RegExp(name, 'i')}}
                           ] 
                        });
                
                        res.status(200).json(results);
                    } catch (error) {
                        console.error('Error searching products:', error);
                        res.status(500).json({ msg: 'Kesalahan data' });
                    }
                }