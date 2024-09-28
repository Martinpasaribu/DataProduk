import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Url";
import { POKE } from "../Url";
import Layout from '../app/Layout/Layout';

const Fetch = () => {
    const [abilities, setAbilities] = useState([]);
  
    useEffect(() => {
      getAbilities();
    }, []);
  
    const getAbilities = async () => {
      try {
        const response = await axios.get(`${POKE}`);
        setAbilities(response.data.abilities); // Mengakses data abilities
      } catch (error) {
        console.error('Error fetching abilities:', error);
      }
    };
  
    return (
        <Layout>

            <div>
                <div className='mt-5'>
                <div className='flex flex-col gap-5'>
                    <div className='text-center'> 
                    <h2 className="text-2xl text-bold text-ijo4 mt-10 "> Daftar Abilities </h2>
                    </div>
                </div>
        
                <div className='md:w-[68rem] h-screen mx-auto'>
                    <table id='dataku' className="md:w-full mx-auto md:text-lg text-[0.82rem]">
                    <thead className='bg-ijo2'>
                        <tr className='text-white'>
                        <th>No</th>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Is Hidden</th>
                        <th>Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abilities.map((abilityObj, index) => (
                        <tr key={index} className='text-center'>
                            <td>{index + 1}</td>
                            <td>{abilityObj.ability.name}</td>
                            <td>
                            <a href={abilityObj.ability.url} target="_blank" rel="noopener noreferrer">
                                {abilityObj.ability.url}
                            </a>
                            </td>
                            <td>{abilityObj.is_hidden ? 'Yes' : 'No'}</td>
                            <td>{abilityObj.slot}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </Layout>
    );
  };
  
  export default Fetch;
  