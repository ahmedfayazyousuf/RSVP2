import { useEffect } from "react"
import { useState } from "react"
const Rejected = () => {
    const [user, setUser] = useState([])

    const getData = async () =>{
        const res = await fetch(`http://localhost:4000/user_rejected`, {
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
    
    return(
        <>
            <div className="invitebutton">
                <div style={{width: '100%'}}>
                    <h1 className="header">Rejected</h1>
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

export default Rejected