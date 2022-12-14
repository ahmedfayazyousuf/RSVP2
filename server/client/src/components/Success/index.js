import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import nislogo from './nislogo.png'
import { useParams } from "react-router-dom";

const Success = () => { 
    const { user_id } = useParams();
    useEffect(()=>{
        
        try {
            var status = "Rejected"
            axios.put("http://localhost:4000/user_update", {
               user_id,
               status
           })
       } catch (error) {
           console.log(error);
       }
       
    },[])

    useEffect(() =>{
        document.getElementById('navigator').style.opacity = 0;
        document.getElementById('navigator').style.display = 'none';
    },[])
    return (
        <>
            <div className="main">
                <div className="form-items">
                    <div style={{justifyContent: 'center', alignItems: 'center'}}>
                        <img id='head' style={{width: '10%'}} src={nislogo} alt="Nissan Laptop Cover"/>
                    </div>
                    <h1 style={{fontWeight:'1000', fontSize: '60px', marginTop: '15px'}}>THANK YOU!</h1>
                    <h4 style={{fontSize:'16px'}}>Your response has been recorded.</h4>
                    <h4 style={{fontSize:'16px'}}>You will receive a confirmation email shortly.</h4>
                </div>
            </div>
        </>
    )
}

export default Success