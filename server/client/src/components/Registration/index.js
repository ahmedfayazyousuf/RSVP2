import './reg.css'
import { useEffect } from "react";
import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'
import nislap from "./nislap.png";
import nismob from "./nismob.png"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Registration = () => {
    // const {state} = useLocation();
    // const {id,name} = state;
    const { user_id } = useParams();

    const [name,setName] = useState("");


    const history = useNavigate();
    const [user,setUser] = useState({
        firstname:"", surname:"", city:"", opdiv:"", jobtitle:"", email:"", mob:"", gender:"", smoking:"", preferences:"", dietreq:"", physcon:""
    });

    let firstname, value;

    const handleInputs = (e) => {
        console.log(e);
        firstname = e.target.name;
        value = e.target.value;

        setUser({...user, [firstname]:value})
    }

    function onSubmit(){
        history("/Registration2",{state:{user:user,id:user_id}})
    }

    async function getData(){

        try {
            var status = "Accepted"
            axios.put("http://localhost:4000/user_update", {
               user_id,
               status
           })
       } catch (error) {
           console.log(error);
       }


        try {
            const res = await fetch(`http://localhost:4000/user_one/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        const data = await res.json();
    
        console.log(data[0].Name)
        setName(data[0].Name);
    
       } catch (error) {       
           console.log(error);
       }
    }

    useEffect(() =>{
        document.getElementById('navigator').style.opacity = 0;
        document.getElementById('navigator').style.display = 'none';

        
        getData();

        if(window.innerWidth <= 600){
            document.getElementById('head').setAttribute("src",nismob)
        }
    },[])

    function onlyOne(checkbox) {
        var checkm = document.getElementById('checkm');
        var checkf = document.getElementById('checkf');
        var checky = document.getElementById('checky');
        var checkn = document.getElementById('checkn');
        // checkm.checked = !checkm.checked 
        // checkf.checked = !checkf.checked 
        console.log(checkbox)

        if(checkbox === 'm'){
            checkf.checked = false
        }

        if(checkbox === 'f'){
            checkm.checked = false
        }

        if(checkbox === 'y'){
            checkn.checked = false
        }

        if(checkbox === 'n'){
            checky.checked = false
        }


    }

    return (
        <div style={{justifyContent:"center", alignItems:"center", width:"100%", height:"100%"}}>
        <div style={{display: 'flex', width: '100%'}}>
            <img id='head' style={{height:'100%', marginBottom:"20px"}} src={nislap} alt="Nissan Laptop Cover"/>
        </div>


        <div style={{textAlign: 'center'}}>
            <h3 style={{padding: '0', margin: '0'}}>TODAY.</h3>
            <h3 style={{padding: '0', margin: '0'}}>TOGETHER.</h3>
            <h3 style={{padding: '0', margin: '0'}}>TO THE FUTURE.</h3>
            <h5 style={{padding: '0', margin: '0', fontSize: '10px', marginBottom: '10px'}}>NISSAN AFTERSALES CONFERENCE</h5>
        </div>
        <div style={{textAlign: 'center', paddingTop: '15px', width:"100%", alignItems:"center", justifyContent:"center"}}>
            <p style={{padding: '0', margin: '0'}}>Hello {name},</p>
            <p style={{paddingRight:"10%", paddingLeft:"10%", marginBottom: '35px'}}>Glad to see you again! Please key in some information to confirm your attendance</p>
        </div>

        <div className="flex-container" style={{display:'flex', padding:'0', margin: '0', justifyContent: 'center', width: '100%'}}>
            <div className="flex-container2" style={{display:'flex', padding:'0', margin: '0', justifyContent: 'center', width: '100%'}}>
                <div className="flex-child" style={{width:'50%', justifyContent: 'center'}}>
                    <div className="block">
                        <label>First Name</label>
                        <input type="text" name="firstname" id="firstname" value={user.firstname} onChange={handleInputs}/>
                    </div>

                    <div className="block">
                        <label>Surname</label>
                        <input type="text" name="surname" id="surname" value={user.surname} onChange={handleInputs}/>
                    </div>

                    <div className="block">
                        <label>City</label>
                        <input type="text" name="city" id="city" value={user.city} onChange={handleInputs}/>
                    </div>

                    <div className="block">
                        <label>NSC</label>
                        <input type="text" name="opdiv" id="opdiv" value={user.opdiv} onChange={handleInputs}/>
                    </div>
                </div>

                <div className="flex-child" style={{width:'50%'}}>
                    <div className="block">
                        <label>Job Title</label>
                        <input type="text" name="jobtitle" id="jobtitle" value={user.jobtitle} onChange={handleInputs}/>
                    </div>

                    <div className="block">
                        <label>Email address</label>
                        <input type="email" name="email" id="email" value={user.email} onChange={handleInputs}/>
                    </div>

                    <div className="block">
                        <label>Mobile number</label>
                        <input type="number" name="mob" id="mob" value={user.mob} onChange={handleInputs}/>
                    </div>

                    <div className="flex-container2"  style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10px', display:"flex"}}>
                        <div  style={{display:"flex",flexDirection:"row"}}>
                            <label className="labelx">Gender</label>  
                            <label className="labelx"><input id='checkm' style={{marginRight: '10px'}} value="m" onClick={(e)=>{onlyOne(e.target.value)}} type="checkbox"/>Male</label>
                            <label className="labelx"><input id='checkf' style={{marginRight: '10px'}} value="f" onClick={(e)=>{onlyOne(e.target.value)}} type="checkbox"/>Female</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style ={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px'}}>
            <button className="confirmer" onClick = {onSubmit}>
                Confirm
            </button>
        </div>
        </div>
    )
}

export default Registration