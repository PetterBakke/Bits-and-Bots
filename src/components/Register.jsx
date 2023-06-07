import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateUserProfile(user, { displayName });

      // Navigate to success page or any other desired route
      navigate('/products');
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const updateUserProfile = async (user, profile) => {
    try {
      await user.updateProfile(profile);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='form-container'>
      <div className='formWrapper'>
        <span className='logo'>Bits and Bots</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
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
            Sign up
          </button>
          {loading && <span>Creating your account, please wait...</span>}
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
}

export default Register;