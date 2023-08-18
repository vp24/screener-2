import axios from 'axios';
import { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://screener-2.onrender.com/signup', {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error signing up", error.response.data);
    }
  };

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
