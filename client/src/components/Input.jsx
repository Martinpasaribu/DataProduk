import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import { LogOut, reset} from "../features/authSlice";
import Layout from '../app/Layout/Layout';
const Input = () => {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
    }, [dispatch]);
    
    const Pulang = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    useEffect(()=>{
        if(isError){
            navigate("/");
        }
    }, [isError, navigate]);


  return (

    <Layout>
        <div>
            <h1>Masukan Data</h1>
        
        
        </div>
    </Layout>

  )
}

export default Input