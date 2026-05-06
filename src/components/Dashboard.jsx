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
  const [images, setImages] = useState({});
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);

  const fetchColleges = async () => {
    setLoading(true);

    const res = await fetch(
      `https://api.openalex.org/institutions?filter=country_code:${countryCodes[country]}&per-page=100`
    );
    const data = await res.json();
    setColleges(data.results || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // ✅ WIKIPEDIA IMAGE FETCH
  const fetchImage = async (name) => {
    try {
      const title = name.replace(/ /g, "_");
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
      );
      const data = await res.json();

      if (data.thumbnail?.source) {
        setImages((prev) => ({
          ...prev,
          [name]: data.thumbnail.source,
        }));
      }
    } catch {}
  };

  useEffect(() => {
    colleges.forEach((c) => fetchImage(c.display_name));
  }, [colleges]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Colleges & Universities ({country})
      </h2>

      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Sign Out
      </button>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colleges.map((c, i) => (
          <div key={i} className="border rounded overflow-hidden">
            {/* ✅ REAL IMAGE */}
            {images[c.display_name] ? (
              <img
                src={images[c.display_name]}
                alt={c.display_name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            <div className="p-3">
              <h4 className="font-semibold">{c.display_name}</h4>

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