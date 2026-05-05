import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        <div className="hidden md:flex w-3/5 relative">
          <img
            src="/uni.bin"  
            alt="login visual"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-pink-500/70" />

          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold">Welcome Back</h2>
            <p className="text-sm mt-2 opacity-80">
              Sign in to continue your journey
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/5 bg-gray-100 flex items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Sign In
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-white font-semibold 
                bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
            >
              <img
                src="/Logo-google-icon-PNG.avif"
                alt="Google icon"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Don’t have an account?
              <Link to="/register" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;