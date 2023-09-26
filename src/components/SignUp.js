import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './SignUp.css'; 

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to store the error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tiny-jade-ostrich-tux.cyclic.cloud/signup', {
        username,
        password,
      });
      
      if (response.data && response.data.message) {
        console.log(`User ${username} signed up with message: ${response.data.message}`);
        alert('Successfully signed up! Redirecting to Sign In page...');
        setError('');  // Clear the error state on successful sign up
        navigate('/signin');  // Redirect to Sign In page
      }
    } catch (error) {
      console.log(error); // Add this for debugging.
      const errorMessage = error.response?.data?.error || 'Sign up failed. Please try again.';
      setError(errorMessage);  // Set the error state with the specific error message
    }
  };

  return (
    <div className="signup-container container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input className="signup-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {error && <div className="error-message">{error}</div>} {/* Display error messages */}
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
