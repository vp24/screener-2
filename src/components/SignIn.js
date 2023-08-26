import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onSignIn, isAuthenticated }) {
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');  // Use navigate instead of history.push
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://screener-2.onrender.com/signin', {
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
      <form className="signin-form" onSubmit={handleSubmit}> {/* Added onSubmit event here */}
        <input className="signin-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className="signin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
