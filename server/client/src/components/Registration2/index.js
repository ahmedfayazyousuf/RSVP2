import nislap from "./nislap.png";
import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'

import { useNavigate } from "react-router-dom";

const Registration2 = () => {
    const {state} = useLocation();
    const {user,id} = state;
    const history = useNavigate();
    const [user2,setUser] = useState(user);

    let firstname, value;

    console.log(user2)

    const handleInputs = (e) => {
        console.log(e);
        firstname = e.target.name;
        value = e.target.value;

        setUser({...user2, [firstname]:value})
        console.log(user2);
    }

//fetch api to transfer data
    const PostData = async (e) => {
        e.preventDefault();
        //object destruction so dont need to write user.name etc again and again
        const { firstname, surname, city, opdiv, jobtitle, email, mob, gender, smoking, preferences, dietreq, physcon } = user2;
        
        const res = await fetch("http://localhost:4000/register_update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({ 
                // name: name doesnt need to be written because its the same name
                id, firstname, surname, city, opdiv, jobtitle, email, mob, gender, smoking, preferences, dietreq, physcon
            })
        });

        const data = await res.json();

        if(data.status === 422 || !data) {
            window.alert("Invalid Credentials - If error persists, contact admin");
            console.log("Invalid Credentials - If error persists, contact admin");
        } else {

            console.log("Registration Successful! Welcome Aboard!");

            
        }
        history("/success");

    }

    return (
        <>
            <div style={{display: 'flex', width: '100%', backgroundColor: 'red'}}>
                <img style={{height:'100%'}} src={nislap} alt="Nissan Laptop Cover"/>
            </div>

            <div style={{textAlign: 'center'}}>
                <h3 style={{padding: '0', margin: '0', fontWeight: '500'}}>TODAY.</h3>
                <h3 style={{padding: '0', margin: '0'}}>TOGETHER.</h3>
                <h3 style={{padding: '0', margin: '0'}}>TO THE FUTURE.</h3>
            </div>

            <div style={{textAlign: 'center', paddingTop: '15px'}}>
                <p>Great! Please let us know if you have food allergies or any special preferences for your meals.</p>
            </div>

            <div className="flex-container">
                <div className="flex-child">
                    <div style={{borderStyle: 'none solid none none', padding: '20px',display:"flex",flexDirection:"column"}}>
                        <label className="labelx">Dietery Requirements</label>  
                        <div>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Vegan</label>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Vegetarian</label>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Halaal</label>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Kosher</label>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Other</label>
                        </div>
                    </div>
                </div>

                <div className="flex-child">
                    <div  style={{display:"flex", borderStyle: 'none solid none none', padding: '20px',flexDirection:"column"}}>

                        <label className="labelx">Please advise us if you have any special physical constraints</label>
                        <div>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Wheelchair</label>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Crutches</label>
                            <label className="labelx"><input style={{marginRight: '10px'}} type="checkbox"/>Other</label>
                        </div>  
                    </div>
                </div>
            </div>

            <div style ={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <button style={{borderRadius: '0', color: 'white', backgroundColor: 'black', width: '20%'}} onClick = {PostData}>
                Confirm
            </button>
        </div>
        </>
    )
}

export default Registration2
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            {/* <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <p>Glad to see you again! Please key in some information to confirm your attendance</p>
                                <form id="register-form" className="requires-validation" novalidate>

                                    <div className="col-md-12">
                                        <textarea className="form-control" type="textarea" name="preferences" id="preferences" rows='3' value={user.preferences} onChange={handleInputs} placeholder="Great! Please let us know if you have food allergies or any special preference for your meals" 
                                        style={{  
                                            height: '115px',
                                            marginBottom: '0px',
                                        }}/>
                                    </div>


                                    <div className="col-md-12">
                                        <select className="form-select mt-3" name="dietreq" id="dietreq" type="text" value={user.dietreq} onChange={handleInputs} >
                                            <option selected disabled value="">Dietery Requirements</option>
                                            <option value="Smoker">Vegan</option>
                                            <option value="Non Smoker">Vegetarian</option>
                                            <option value="Smoker">Halaal</option>
                                            <option value="Non Smoker">Strictly Halaal</option>
                                            <option value="Smoker">Kosher</option>
                                            <option value="Non Smoker">Other</option>
                                        </select>
                                    </div>


                                    <div className="col-md-12">
                                        <select className="form-select mt-3" name="physcon" id="physcon" type="text" value={user.physcon} onChange={handleInputs} >
                                            <option selected disabled value="">Please advise us if you have any special physical constraints</option>
                                            <option value="Smoker">Wheelchair</option>
                                            <option value="Non Smoker">Crutches</option>
                                            <option value="Smoker">Blind</option>
                                            <option value="Non Smoker">Other</option>
                                        </select>
                                    </div>


                                    {/* <NavLink to="/login" >I am already registered</NavLink> */}

            //                         <div className="form-button mt-3">
            //                             <button id="signup" name="signup" type="submit" className="btn btn-primary" onClick={PostData}>Confirm</button>
            //                         </div>
            //                     </form>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div> */}
