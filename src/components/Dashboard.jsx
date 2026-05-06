import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const countryMap = {
  India: "IN",
  "United States": "US",
  Canada: "CA",
  Australia: "AU",
  "United Kingdom": "GB",
};

const Dashboard = () => {
  const [institutions, setInstitutions] = useState([]);
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  const fetchInstitutions = async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.openalex.org/institutions?filter=country_code:${countryMap[country]}&per-page=25`
    );
    const data = await res.json();
    setInstitutions(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  // ✅ website se domain nikaalne ka helper
  const getLogoUrl = (homepage) => {
    try {
      const domain = new URL(homepage).hostname;
      return `https://logo.clearbit.com/${domain}`;
    } catch {
      return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Colleges & Universities</h2>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
      >
        Sign Out
      </button>

      {/* Country select */}
      <div className="flex gap-3 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>India</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>United Kingdom</option>
        </select>

        <button
          onClick={fetchInstitutions}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* ✅ LOGO + NAME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {institutions.map((inst, i) => {
          const logo = inst.homepage_url
            ? getLogoUrl(inst.homepage_url)
            : null;

          return (
            <div
              key={i}
              className="flex items-center gap-4 border p-4 rounded shadow-sm"
            >
              {/* LOGO */}
              {logo ? (
                <img
                  src={logo}
                  alt={inst.display_name}
                  className="w-12 h-12 object-contain rounded"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded" />
              )}

              {/* DETAILS */}
              <div>
                <h4 className="font-semibold">{inst.display_name}</h4>
                <p className="text-sm text-gray-600">
                  Country: {inst.country_code}
                </p>

                {inst.homepage_url && (
                  <a
                    href={inst.homepage_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;