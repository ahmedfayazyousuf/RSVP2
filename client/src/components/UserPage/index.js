import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserPage = () =>{
    const { user_id } = useParams();
    const navigate = useNavigate();

    async function Accept(){
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

    navigate("/Registration",{state:{id:user_id,name:data[0].Name}});

   } catch (error) {       
       console.log(error);
   }




       
    }

    function Reject(){
        try {
            var status = "Rejected"
            axios.put("http://localhost:4000/user_update", {
               user_id,
               status
           })
       } catch (error) {
           console.log(error);
       }
       navigate("/Success");
    }

    useEffect(() =>{
        document.getElementById('navigator').style.opacity = 0;
        document.getElementById('navigator').style.display = 'none';
    },[])

    return(
        <div className="main">
            <div className="form-items">
                <h1>Hello!</h1>
                <h4>Accept or Reject the invitation</h4>
                <button onClick={Accept}>Accept</button>
                <button onClick={Reject}>Reject</button>
            </div>
        </div>
    )
}

export default UserPage 