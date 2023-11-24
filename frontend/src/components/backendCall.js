import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const BackendCall=()=>{
    const navigate=useNavigate();
    const fragment=window.location.hash
    // const url=window.location; 
    // alert(url);
    // alert(fragment)
    console.log(fragment)
    axios.get(`http://localhost:8080/api/sessions/oauth/googleTest?${fragment.substring(1,)}`).then((res)=>{
        console.log(res)
        navigate('/gallery')
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default BackendCall