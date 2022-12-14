import { useEffect } from "react";
import React from 'react';
// import { NavLink } from 'react-router-dom';
import nislogo from './nislogo.png';

const Error = () => { 
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
                    
                    <h1 style={{fontWeight:'1000', fontSize: '60px'}}>404 Not Found</h1>
                    {/* <NavLink to="/">
                        <button>
                            Home
                        </button>
                    </NavLink> */}
                </div>
            </div>
        </>
    )
}

export default Error