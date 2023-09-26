import axios from 'axios';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

function SignIn({ onSignIn, isAuthenticated }) {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // State for error message

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tiny-jade-ostrich-tux.cyclic.cloud/signin', {
        username,
        password,
      });
      if (response.data && response.data.token) {
        onSignIn(username);
        navigate('/');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.errorMessage || "Error signing in. Please try again."); // Set the error message based on server response or a general message
      console.error("Error signing in", error.response?.data || error.message);
    }
  };

  return (
    <div className="signin-container container">
      <h2>Sign In</h2>
      {errorMsg && <p className="error-message">{errorMsg}</p>} {/* Display error message */}
      <form className="signin-form" onSubmit={handleSubmit}>
        <input className="signin-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className="signin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
