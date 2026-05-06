import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const countryCodes = {
  India: "IN",
  "United States": "US",
  Canada: "CA",
  Australia: "AU",
  "United Kingdom": "GB",
};

const Dashboard = () => {
  const [colleges, setColleges] = useState([]);
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  // ✅ SIMPLE API CALL
  const fetchColleges = async () => {
    setLoading(true);

    const code = countryCodes[country];
    const res = await fetch(
      `https://api.openalex.org/institutions?filter=country_code:${code}&per-page=20`
    );

    const data = await res.json();
    setColleges(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const getLogo = (url) => {
    try {
      return `https://logo.clearbit.com/${new URL(url).hostname}`;
    } catch {
      return null;
    }
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Colleges & Universities</h2>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Sign Out
      </button>

      {/* ✅ Country filter */}
      <div className="flex gap-2 mb-5">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option>India</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>United Kingdom</option>
        </select>

        <button
          onClick={fetchColleges}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* ✅ College List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colleges.map((c, i) => (
          <div
            key={i}
            className="flex gap-4 items-center p-3 border rounded"
          >
            {/* LOGO */}
            {c.homepage_url ? (
              <img
                src={getLogo(c.homepage_url)}
                alt={c.display_name}
                className="w-12 h-12 object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded" />
            )}

            {/* INFO */}
            <div>
              <h4 className="font-semibold">{c.display_name}</h4>

              <p className="text-sm text-gray-600">
                Country: {c.country_code}
              </p>

              {c.homepage_url && (
                <a
                  href={c.homepage_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;