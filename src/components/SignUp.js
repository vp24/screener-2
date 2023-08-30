import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Added for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('https://screener-api.onrender.com/signup', {
        const response = await axios.post('https://tiny-jade-ostrich-tux.cyclic.cloud/signup', {

        username,
        password,
      });
      if (response.data && response.data.message) {
        console.log(`User ${username} signed up with message: ${response.data.message}`);
        alert('Successfully signed up! Redirecting to Sign In page...');  // Feedback for user
        navigate('/signin');  // Redirect to Sign In page
      }
    } catch (error) {
        console.error("Error signing up", error);
        alert('Sign up failed. Please try again.');  // Feedback for user
    }
  };

  return (
    <div className="signup-container container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}> {/* Added onSubmit event here */}
        <input className="signup-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
