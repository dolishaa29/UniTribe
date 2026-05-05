import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User registered:', formData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
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
            alt="register visual"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-pink-500/70" />

          <div className="absolute bottom-10 left-10 text-white">
         <h2 className="text-4xl font-bold">Explore Colleges</h2>
<p className="text-sm mt-2 opacity-80">
  Join to find your perfect match.
</p>
          </div>
        </div>

        <div className="w-full md:w-2/5 bg-gray-100 flex items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Sign Up
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="yourmail@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full text-white font-semibold
                bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <button
              onClick={() => handleSocialLogin(googleProvider)}
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
              Already have an account?
              <Link to="/login" className="text-purple-600 hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;