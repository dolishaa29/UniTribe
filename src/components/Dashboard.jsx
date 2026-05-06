import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ HTTPS-safe proxy for Hipolabs (works in production)
  const API_URL =
    "https://cors.isomorphic-git.org/http://universities.hipolabs.com/search?country=India";

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }

        const data = await response.json();
        setColleges(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load colleges");
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
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-2">Dashboard</h2>

      <p className="mb-1">
        <strong>Email:</strong> {auth.currentUser?.email}
      </p>
      <p className="mb-4">
        <strong>Name:</strong> {auth.currentUser?.displayName || "N/A"}
      </p>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
      >
        Sign Out
      </button>

      <h3 className="text-xl mb-3">Colleges in India</h3>

      {loading && <p>Loading colleges…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc pl-5">
          {colleges.map((college, index) => (
            <li key={index} className="mb-3">
              <strong>{college.name}</strong>

              {college["state-province"] && (
                <span className="text-gray-500 ml-2">
                  ({college["state-province"]})
                </span>
              )}

              {college.web_pages?.length > 0 && (
                <a
                  href={college.web_pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 ml-2 underline"
                >
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