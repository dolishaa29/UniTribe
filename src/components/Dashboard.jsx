import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL =
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=world-universities";

  const fetchColleges = async (selectedCountry) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}&rows=50&refine.country=${encodeURIComponent(
        selectedCountry
      )}`;

      const res = await fetch(url);
      const data = await res.json();

      setColleges(data.records || []);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load India by default
  useEffect(() => {
    fetchColleges(country);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl mb-2">Dashboard</h2>
      <p className="mb-4">{auth.currentUser?.email}</p>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
      >
        Sign Out
      </button>

      {/* ✅ SEARCH */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country (e.g. India)"
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={() => fetchColleges(country)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <h3 className="text-xl mb-3">Universities in {country}</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc pl-5">
          {colleges.map((c, index) => (
            <li key={index} className="mb-3">
              <strong>{c.fields.name}</strong>
              <span className="ml-2 text-gray-600">
                ({c.fields.country})
              </span>

              {c.fields.website && (
                <a
                  href={
                    Array.isArray(c.fields.website)
                      ? c.fields.website[0]
                      : c.fields.website
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