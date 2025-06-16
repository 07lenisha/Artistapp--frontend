import { useState } from "react"; 
import { isEmail } from 'validator';
import { useNavigate} from 'react-router-dom'; 
import { login } from "../slices/ArtistSlice"
import { useDispatch } from "react-redux";
import Profile from "./Profile";
import axios from "../Config/axios"
export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
   
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState([]); 
    const navigate = useNavigate(); 
    const dispatch=useDispatch()
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {}; 

        if(email.trim().length === 0) {
            errors.email = 'email is required'; 
        } else if(!isEmail(email)) { // check email format
            errors.email = 'email is invalid'; 
        }

        if(password.trim().length === 0) {
            errors.password = 'password is required'; 
        } else if(password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password should be between 8 to 128 characters'; 
        }
        
        if(Object.keys(errors).length > 0) {
            setClientErrors(errors); 
        } else {
            const formData = {
                email: email,
                password: password,
               
            }
            try {
                const response = await axios.post('/login', formData)
                console.log(response)
                localStorage.setItem("token",response.data.token); 
                const userResponse=await axios.get("/profile",{headers:{
                    Authorization:localStorage.getItem("token")
                }})
                dispatch(login(userResponse.data));
                console.log(response.data)
                navigate('/Profile'); 
            } catch(err) {
                  setServerErrors(err.response.data.errors); 
                setClientErrors({}); 
            }
        }
    }

return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login Here</h2>

      {serverErrors .length >0 && (
        <div className="server-errors">
          <h3>These error/s prohibited the form from being saved:</h3>
          <ul>
            {serverErrors.map((err, i) => (
              <li key={i}>{err.msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
          />
          {clientErrors.email && <p className="error-message">{clientErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
          />
          {clientErrors.password && <p className="error-message">{clientErrors.password}</p>}
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
);
}