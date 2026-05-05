import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth , googleProvider} from '../firebase';
import { createUserWithEmailAndPassword , signInWithPopup} from 'firebase/auth';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Register error:', error);
    }
  };
  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Social login error:', error);
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleRegister}>
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
          Register
        </button>
        <button
                  type="button"
                  onClick={() => handleSocialLogin(googleProvider)}
                  className="w-full bg-red-500 text-white p-2 rounded"
                >
                  Login with Google
                </button>
      </form>
      <Link to="/login" className="w-full mt-2 text-blue-500 block text-center">
        Already have an account?
      </Link>
    </div>
  );
};

export default Register;