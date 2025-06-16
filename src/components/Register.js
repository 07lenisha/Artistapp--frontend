import { useState } from "react"; 
import { isEmail } from 'validator';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import axios from "../Config/axios";

export default function Register() {
   const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [bio, setbio] = useState(''); 
    const [clientErrors, setClientErrors] = useState({}); 
    const [serverErrors, setServerErrors] = useState([]); 
    // const { serverErrors } = useSelector((state) => state.artists);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = {}; 
if(name.trim().length==0){
  errors.email="name is required"
} else if (name.trim().length < 3){
  errors.name="name cannot be less than cahracter"
}
        // Client-side validation
        if (email.trim().length === 0) {
            errors.email = 'Email is required'; 
        } else if (!isEmail(email)) { // Check email format
            errors.email = 'Email is invalid'; 
        }

        if (password.trim().length === 0) {
            errors.password = 'Password is required'; 
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8 to 128 characters'; 
        }
        if(bio.trim().length==0){
  errors.bio="bio is required"
} else if (name.trim().length > 9){
  errors.bio="bio cannot be less than character"
}

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors); 
        } else {
            const formData = {
              name:name,
                email: email,
                password: password,
                bio:bio
            };

            try {
                const response = await axios.post('/register', formData);
                console.log("Response:", response.data); 
                navigate('/login'); 
            } catch (err) {
                  setServerErrors(err.response.data.errors); 
                setClientErrors({}); 
            }
        }
    };

return (
  <div className="register-container">
    <div className="register-box">
      <h2>Register with us</h2>

      {serverErrors.length>0 && (
        <div className="server-errors">
          <h3>These error/s prohibited the form from being saved:</h3>
          <ul>
            {serverErrors.map((err, i) => (
              <li key={i}>{err.msg || err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Enter name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            id="name"
          />
          {clientErrors.name && <p className="error-message">{clientErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Enter email</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
          />
          {clientErrors.email && <p className="error-message">{clientErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
          />
          {clientErrors.password && <p className="error-message">{clientErrors.password}</p>}
        </div>
 <div>
  <label>enter bio</label>
      <textarea   value={bio}
      onChange={e=>setbio(e.target.value)}
      id="bio"
      />
       {clientErrors.bio && <p className="error-message">{clientErrors.bio}</p>}
      
</div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  </div>
)
}