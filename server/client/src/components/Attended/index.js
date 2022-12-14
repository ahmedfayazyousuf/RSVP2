import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios';

const Attended = () => {
    const [user, setUser] = useState([])

    const getData = async () =>{
        const res = await fetch(`http://localhost:4000/user_attended`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    setUser(data)
    }
    useEffect(()=>{
        getData();
    },[])

    function sendAll(){

        

        user.map((user) => {
            try {
                var to = user.Email;
                var message = "reminder";
                var id = user._id;
                var name = user.Name

                axios.post("https://rsvpadmin.onrender.com/send_thankyou", {
                   to,
                   id,
                   name
               })
               console.log("sent")
               return 
           } catch (error) {
               console.log(error);
               return
           }
        })
        
    }
    
    return(
        <>
            {/* <div className="invitebutton">
                <div style={{width: '100%'}}>
                    <h1 className="header">Attended</h1>
                </div>
            </div> */}

            <div style={{display: 'flex', width:'100%'}}>
                <div style={{display: 'flex', width:'70%'}}>
                    <h1 style ={{marginTop: '10px'}} className="header">Attended</h1>
                </div>

                <div style={{display: 'flex', width:'30%', justifyContent: 'flex-end'}}>
                    <VolunteerActivismOutlinedIcon className="bell" onClick={sendAll}></VolunteerActivismOutlinedIcon>
                </div>  
            </div>

            <div className="mainn">
                <div className="white" style={{width: '100%'}}>
                    <div style={{width: '100%', height: '75vh', overflowY: 'scroll'}}>
                        <table className="table table-hover"  
                        style={{
                            color: '#1D063C',
                            backgroundColor:'white',
                            opacity: '0.5',
                        }}>
                            <thead
                            style={{
                                color: '#1D063C',
                            }}>
                                <tr>
                                    <th>Email</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((user) => {
                                    return <tr key={user._id}>
                                    <td style={{paddingRight: '100px'}}>{user.Email}</td>
                                    <td>{user.Status}</td>
                                    </tr> 
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Attended