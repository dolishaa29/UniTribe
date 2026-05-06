import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('http://universities.hipolabs.com/search?country=India');
        if (!response.ok) {
          throw new Error('Failed to fetch colleges');
        }
        const data = await response.json();
        setColleges(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {auth.currentUser?.email}</p>
      <p>{auth.currentUser?.displayName}</p>
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
        Sign Out
      </button>

      <h3 className="text-xl mb-2">Colleges in India</h3>
      {loading && <p>Loading colleges...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <ul className="list-disc pl-5">

          {colleges.map((college, index) => (
            <li key={index} className="mb-2">
              <strong>{college.name}</strong>
              {college.web_pages && college.web_pages.length > 0 && (
                <a href={college.web_pages[0]} target="_blank" rel="noopener noreferrer" className="text-pink-400 ml-2">
                  Visit Website
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;