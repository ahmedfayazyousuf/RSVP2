import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Nissan.css';

const Invited = () => {
    const [user, setUser] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = async () =>{
        const res = await fetch(`http://localhost:4000/user_all`, {
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

    function sendMail() {
        var to = document.getElementById("email").value
        var name = document.getElementById("text").value
        try {
                
            axios.post("http://localhost:4000/send_mail", {
               to,
               name
           })
       } catch (error) {
           console.log(error);
       }
       setShow(false);
    }
    return(
        <>
            <div className="invitebutton">
                <div style={{width: '100%'}}>
                    <h1 className="header">Invitations</h1>
                </div>
            </div>


            <div className="mainn">
                <div className="white" style={{width: '100%'}}>
                    <div style={{width: '100%', height: '60vh', overflowY: 'scroll'}}>
                        <table className="table table-hover" style={{color: '#1D063C', backgroundColor:'white', opacity: '0.5'}}>
                            <thead style={{color: '#1D063C'}}>
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


                <div style={{width: '100%', height: '40vh', display: 'flex', backGroundColor: 'yellow', flexDirection: 'row', justifyContent: 'right', alignItems: 'right', textAlign: 'right'}}>
                    <div style={{paddingRight: '20px', paddingTop:'10px', marginRight:'30px', marginBottom:'10px', width: '100%', display: 'flex', backGroundColor: 'yellow', flexDirection: 'row', justifyContent: 'right', alignItems: 'right', textAlign: 'right'}}>
                        <AddCircleIcon className="plussy" onClick={handleShow} style={{fontSize:"50px", backgroundColor: 'transparent', alignSelf:'right', transform: 'scale(1.7)' }}></AddCircleIcon>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{color:'#190039', fontWeight:'700'}}>Create Invite</Modal.Title>
                        </Modal.Header>

                        <Modal.Body style={{display: 'flex', flexDirection:'column', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            <input className="c_title" id="email" type="email" placeholder="Enter User's Email"></input>
                            <input className="m_title" id="text" type="text" placeholder="Enter User's Name"></input>
                        </Modal.Body>

                        <Modal.Footer style={{justifyContent:'right', alignItems: 'right'}}>
                            {/* <Button onClick={handleClose} style={{backgroundColor: 'white', paddingLeft:'50px', paddingRight:'50px', border: '2px solid black', color: '#190039', fontWeight: '500'}}>
                                Close
                            </Button> */}
                            <Button onClick={sendMail} style={{backgroundColor:'black', paddingLeft:'90px', paddingRight:'90px' ,border: '2px solid black', fontWeight: '500'}}>
                                Send
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <canvas style={{display:"none"}} id='canvas' ></canvas>
                </div>
        </>
    )
}

export default Invited