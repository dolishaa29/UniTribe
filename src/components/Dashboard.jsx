import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const [universities, setUniversities] = useState([]);
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL =
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/world-universities/records";

  const fetchUniversities = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}?where=country="${encodeURIComponent(
        country
      )}"&limit=50`;

      const response = await fetch(url);
      const data = await response.json();

      setUniversities(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load default country on page load
  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>

      <p className="mb-4 text-gray-700">
        Logged in as: {auth.currentUser?.email}
      </p>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
      >
        Sign Out
      </button>

      {/* 🔍 Search Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country (e.g. India, Canada)"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={fetchUniversities}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">
        Universities in {country}
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && universities.length === 0 && (
        <p>No universities found.</p>
      )}

      {!loading && !error && universities.length > 0 && (
        <ul className="list-disc pl-5">
          {universities.map((uni, index) => (
            <li key={index} className="mb-3">
              <strong>{uni.name}</strong>
              <span className="ml-2 text-gray-600">
                ({uni.country})
              </span>

              {uni.website && (
                <a
                  href={
                    Array.isArray(uni.website)
                      ? uni.website[0]
                      : uni.website
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2 underline"
                >
                  Visit
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