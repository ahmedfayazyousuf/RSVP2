import { useEffect } from "react"
import { useState } from "react"
import axios from "axios";
import '../Nissan.css';
const Accepted = () => {
    const [user, setUser] = useState([])

    const getData = async () =>{
        const res = await fetch(`http://localhost:4000/user_accepted`, {
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

    function Confirm(id,user_id){
        console.log(user_id)
        try {
            var status = "Attended"
            axios.put("http://localhost:4000/user_update", {
               user_id,
               status
           })
       } catch (error) {
        console.log(error);
    }
        document.getElementById(`${id}`).remove();
    }
    
    return(
        <>
            <div className="invitebutton">
                <div style={{width: '100%'}}>
                    <h1 className="header">Accepted</h1>
                </div>
            </div>

            <div className="mainn" style={{color: 'black'}}>
                <div className="white" style={{width: '100%'}}>
                    <div style={{width: '100%', height: '80vh', overflowY: 'scroll'}}>
                        <table className="table table-hover"  
                        style={{
                            color: 'black',
                            backgroundColor:'white',
                            opacity: '0.5',
                        }}>
                            <thead
                            style={{
                                color: '#1D063C',
                            }}>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Attended</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((user,index) => {
                                    return <tr id={`${index}`} key={user._id}>
                                    <td style={{}}>{user.Name}</td>
                                    <td style={{}}>{user.Email}</td>
                                    <td>{user.Status}</td>
                                    <td><button className="confirmi" onClick={() => {Confirm(index,user._id)}}>Confirm</button></td>
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

export default Accepted