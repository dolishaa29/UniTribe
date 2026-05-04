import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider, githubProvider, facebookProvider, linkedInProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
      console.error('Error logging in:', error);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
      console.error('Social login error:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Link to="/register" className="w-full mt-2 text-blue-500 block text-center">
        Need to register?
      </Link>
      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() => handleSocialLogin(googleProvider)}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Login with Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin(githubProvider)}
          className="w-full bg-gray-800 text-white p-2 rounded"
        >
          Login with GitHub
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin(facebookProvider)}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login with Facebook
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin(linkedInProvider)}
          className="w-full bg-sky-600 text-white p-2 rounded"
        >
          Login with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default Login;