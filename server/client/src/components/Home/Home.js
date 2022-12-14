import React from 'react';
import nislogo from './nislogo.png'
const Home = () => { 

    return (
        <>
            <div className="main">
                <div className="form-items">
                    <div style={{justifyContent: 'center', alignItems: 'center'}}>
                        <img id='head' style={{width: '10%'}} src={nislogo} alt="Nissan Laptop Cover"/>
                    </div>
                    
                    <h1 style={{fontWeight:'1000', fontSize: '60px', marginTop: '15px'}}>WELCOME</h1>
                    <h4> To The Nissan RSVP Application </h4>
                </div>
            </div>
        </>
    )
}

export default Home