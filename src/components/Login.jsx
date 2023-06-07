import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Navigate to products page or any other desired route
      navigate('/products');
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className='form-container'>
      <div className='formWrapper'>
        <span className='logo'>Bits and Bots</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' disabled={loading}>
            Sign in
          </button>
          {loading && <span>Logging in, please wait...</span>}
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
}

export default Login;