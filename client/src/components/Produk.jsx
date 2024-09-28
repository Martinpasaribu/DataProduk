import React, { useEffect, useState } from 'react'
import Layout from '../app/Layout/Layout';
import { BASE_URL } from '../Url';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProductFetch } from '../features/productSlice';
import { MdOutlineContentPasteSearch } from "react-icons/md";


const Produk = () => {


    const [popAdd, setPopAdd] = useState(false)
    const [popUpdate, setPopUpdate] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [id, setId] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {product} = useSelector((state => state.product));
    const [showTombolCari, setShowTombolCari] = useState(false)
    const [showCari, setShowCari] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [sortedData, setSortedData] = useState(product);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    useEffect(()=>{
        dispatch(ProductFetch());
    }, [dispatch]);

    useEffect(() => {
        setSortedData(product);
    }, [product]);


    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/product/${id}`)
                setName(response.data.name)
                setPrice(response.data.price)
                setStock(response.data.stock)


            } catch (error) {
                if(error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    },[id]);



    const addProduct = () => {
        setPopAdd(!popAdd);
    }

    const updateProductId = async (id) => {
        setId(id)
        setPopUpdate(!popUpdate);
        
    }

    const ToggleTombolCari = () => {
        setShowTombolCari(!showTombolCari)
  }

    const toggleCari = () => {
        setShowCari(!showCari);
    };

    const handleSearch = async () => {
        try {
          if (searchQuery !== null && searchQuery !== undefined && searchQuery !== ''){
          const response = await axios.get(`${BASE_URL}/cari`, {
            params: {
              name: searchQuery,
              
            }
          });
          setSearchResults(response.data);
          // Update sortedData setelah hasil pencarian diubah
        }
        } catch (error) {
          console.error('Error searching products:', error);
        }
      };


    const refresh = () => {
        setPopAdd(false);
        setPopUpdate(false)
        setShowCari(false)
    }
    
    const saveProduct = async (e) => {
        // e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/product`, 
            {
                name:name,
                price:price,
                stock:stock,
            });
    
        } catch (error) {
            if(error.response) {
                console.log(error.response.data.msg);
            }
        }
    }

    const updateProduct = async (e) => {
        // e.preventDefault();
        try {
            await axios.patch(`${BASE_URL}/product/${id}`,  
            {
                name:name,
                price:price,
                stock:stock,

            });
  

        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const deleteUser = async (userid) => {
        await axios.delete( `${BASE_URL}/product/${userid}`);
        getUsers();
    };


    const sortByPrice = () => {
        const sorted = [...sortedData].sort((a, b) => {
            if (sortConfig.direction === 'desc') {
                return b.price - a.price;
            } else {
                return a.price - b.price;
            }
        });
        setSortedData(sorted);
        setSortConfig({
            key: 'price',
            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    const sortByStock = () => {
        const sorted = [...sortedData].sort((a, b) => {
            if (sortConfig.direction === 'desc') {
                return b.stock - a.stock;
            } else {
                return a.stock - b.stock;
            }
        });
        setSortedData(sorted);
        setSortConfig({
            key: 'stock',
            direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };


  return (
    <Layout>
        <div>Produk</div>
        <div className='flex flex-col gap-10'>
            <div className='flex'>
                <figure className='flex justify-between items-center w-full h-[4rem] bg-gray-200 p-2'>
                    <div className=' h-full flex justify-center items-center'>
                        <h1>Selamat datang, Dihalaman produk</h1>
                    </div>
                    <div className=' h-full flex justify-center items-center'>
                        <button onClick={addProduct} className='bg-green-500 text-white p-2 rounded-md'>Tambah Barang</button>
                    </div>
                </figure>
            </div>
            <div className='w-full'>
        
                {/* Cari produk */}
                <button onClick={ToggleTombolCari} className='fixed flex  bg-blue w-[5.2rem] h-[2rem] bottom-[2rem] right-[2rem] rounded-lg text-white border-2 border-black'>
                    <div  className='mx-2 my-1 flex space-x-1'> <p>Cari </p> <i className='w-[2.5rem] h-[1.6rem]'><MdOutlineContentPasteSearch className='w-[2rem] h-[1.6rem]'/></i></div>
                </button>

                <div class="relative overflow-x-auto  shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nama Produk
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer select-none" onClick={sortByPrice}>
                            Harga 🔼
                            {sortConfig.key === 'price' && (
                                <span>
                                    {sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}
                                </span>
                            )}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer select-none" onClick={sortByStock}>
                            Stok 🔼
                            {sortConfig.key === 'stock' && (
                                <span>
                                    {sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}
                                </span>
                            )}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.map((item) => (
                        <tr className="odd:bg-white even:bg-gray-50" key={item.uuid}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">{item.price}</td>
                            <td className="px-6 py-4">{item.stock}</td>
                            <td className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => updateProductId(item.uuid)}
                                    className="button is-small is-danger text-white bg-blue px-2 py-1 rounded-md"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteUser(item.uuid)}
                                    className="button is-small is-danger text-white bg-red px-2 py-1 rounded-md"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


                </div>

            </div>

            {showCari && 
                (
                  
                  <>
                  <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full"></div>    
                  <div className=""> 
                    <div className=' text-white font-bold text-center fixed top-10 md:right-20 m-4 mr-10'> <button onClick={refresh}  className='bg-red w-[2rem]'>X</button></div>        
                      <div className="overflow-auto relative w-[50rem]  h-[25rem] flex justify-center items-center" >
                      {searchResults.slice().reverse().map((Produk) => (
                        <div className='flex  bg-gray-200 w-[22rem] h-[4rem] mx-auto my-1'>
                          <div className='w-[5rem] h-[3.5rem] bg-red m-1'> 
                            <img src={Produk.foto} alt=""  className='h-[3.3rem] w-[4rem]' />
                          </div>
                          <div className='flex w-full h-[3.5rem] m-1 '>
                              <div className='w-full h-[3.5rem]  first-line: '>
                                <div className='h-[1.7rem]'><h1 className='text-[1rem]'>{Produk.name}</h1></div>
                                <div className='flex h-[2rem] space-x-2'><h1 className='text-[0.9rem] my-auto'>Rp {Produk.price}</h1> <p className='my-auto  text-[.9rem] text-gray-400'>Stok : {Produk.stock}</p></div>
                              </div>

                          </div>
                        </div>
                      ))}
    
                      </div>
                    </div>
                    
                  </>
                )
              }
                        
            {showTombolCari && ( 
                <> 
                <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full"></div> 
                <div className='overflow-auto relative w-[50rem]  h-[35rem] flex justify-center items-center' >
                    <button onClick={() => { ToggleTombolCari()  }} className='fixed bg-red w-[2rem] h-[2rem] top-[17rem] left-[20rem] rounded-lg'><h1 className='text-white mx-2 my-1 font-bold'>X</h1></button>
                    <div className="flex flex-col gap-y-10 mx-4 bg-white text-xl  text-white font-bold absolute  w-[20rem]  h-[10rem] p-4 ">


                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tulis nama barang"
                            className="p-2 rounded-lg text-biru border border-gray-500 w-[15rem]"
                        />  
                        <button className="mx-auto bg-blue p-1.5 px-5 w-[7rem] rounded-lg" onClick={() => { ToggleTombolCari(); toggleCari(); handleSearch();  }}>Cari</button>
                    </div>
                </div> 
                </>
            )}

            { popUpdate && (
                <>
                <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full"></div>    
                    <div className='overflow-auto relative w-[50rem]  h-[35rem] flex justify-center items-center' >
                    <div className=' text-white font-bold text-center fixed top-10 md:right-20 m-4 mr-10'> <button onClick={refresh}  className='bg-red w-[2rem]'>X</button></div>
                    <form onSubmit={updateProduct} className='flex flex-col gap-y-10 mx-4 bg-white text-xl  text-ijoku font-bold absolute  w-[30rem]  h-[32rem] p-4 '>
                        <p className="has-text-centered"></p>
                        <div className="flex flex-col gap-y-5">
                            <label  className="label has-text-danger"> Nama  Barang</label>
                            <div className=" h-10">
                                <input 
                                placeholder=' ' 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                                className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <label  className="label has-text-danger"> Harga </label>
                            <div className=" h-10">
                                <input 
                                placeholder=' ' 
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}  
                                className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <label  className="label has-text-danger"> Stok </label>
                            <div className=" h-10">
                                <input 
                                placeholder='*******' 
                                type="Number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}  
                                className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                                />
                            </div>
                        </div>

                        
                        <div className=" flex mb-5 w-full justify-center items-center h-10 text-white my-4">
                            <div className=" w-[7rem] bg-ijo2 rounded">
                                <button  type='submit' className="mx-5 my-2 "> Update</button>
                            </div>
                        </div>
                            
                    </form>
                    </div>

                </>

            )}


            {popAdd && (
                <>
                <div className="bg-black opacity-50 fixed top-0 left-0 w-full h-full"></div>    
                    <div className='overflow-auto relative w-[50rem]  h-[35rem] flex justify-center items-center' >
                    <div className=' text-white font-bold text-center fixed top-10 md:right-20 m-4 mr-10'> <button onClick={refresh}  className='bg-red w-[2rem]'>X</button></div>
                    <form onSubmit={saveProduct} className='flex flex-col gap-y-10 mx-4 bg-white text-xl  text-ijoku font-bold absolute  w-[30rem]  h-[32rem] p-4 '>
                        <p className="has-text-centered"></p>
                        <div className="flex flex-col gap-y-5">
                            <label  className="label has-text-danger"> Nama  Barang</label>
                            <div className=" h-10">
                                <input 
                                placeholder=' ' 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                                className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <label  className="label has-text-danger"> Harga </label>
                            <div className=" h-10">
                                <input 
                                placeholder=' ' 
                                type="Number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}  
                                className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-5">
                            <label  className="label has-text-danger"> Stok </label>
                            <div className=" h-10">
                                <input 
                                placeholder='*******' 
                                type="Number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}  
                                className='w-full h-10 rounded-md border-solid border-2 border-ijo3 pl-2   ' 
                                />
                            </div>
                        </div>

                        
                        <div className=" flex mb-5 w-full justify-center items-center h-10 text-white my-4">
                            <div className=" w-[7rem] bg-ijo2 rounded">
                                <button  type='submit' className="mx-5 my-2 "> Simpan</button>
                            </div>
                        </div>
                            
                    </form>
                    </div>

                </>

            )}
        </div>
    </Layout>

  )
}

export default Produk