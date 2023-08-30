import axios from 'axios';
import { useState, useEffect } from 'react'; // Add useEffect import
import { useNavigate } from 'react-router-dom';

function SignIn({ onSignIn, isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');  // Use navigate instead of history.push
    }
  }, [isAuthenticated, navigate]);  // Dependency array to re-run the effect if isAuthenticated or navigate changes

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('https://screener-api.onrender.com/signin', {
        const response = await axios.post('https://tiny-jade-ostrich-tux.cyclic.cloud/signin', {

        username,
        password,
      });
      if (response.data && response.data.token) {
        onSignIn(username);
        navigate('/');  // Redirect to the main page using navigate
      }
    } catch (error) {
      console.error("Error signing in", error.response?.data || error.message);
    }
  };

  return (
    <div className="signin-container container">
      <h2>Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input className="signin-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className="signin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
