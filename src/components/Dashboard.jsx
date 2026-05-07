import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Card from "./Card";

// ✅ simple country object
const countryCodes = {
  India: "IN",
  "United States": "US",
  Canada: "CA",
  Australia: "AU",
  "United Kingdom": "GB",
  Dubai: "AE",
  Russia: "RU",
};

const Dashboard = () => {
  // ✅ single state (sab values yahin)
  const [state, setState] = useState({
    country: "India",
    colleges: [],
    images: {},
    loading: false,
  });

  console.log("STATE:", state);

  // ✅ LOGOUT (firebase same)
  const handleSignOut = async () => {
    await signOut(auth);
    console.log("User logged out");
  };

  // ✅ colleges fetch
  const fetchColleges = async () => {
    console.log("Fetching colleges for:", state.country);

    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    const res = await fetch(
      `https://api.openalex.org/institutions?filter=country_code:${countryCodes[state.country]}`
    );

    const data = await res.json();
    console.log("Colleges Data:", data.results);

    setState((prev) => ({
      ...prev,
      colleges: data.results,
      loading: false,
    }));
  };

  // ✅ image fetch
  const fetchImage = async (collegeName) => {
    try {
      const title = collegeName.replace(/ /g, "_");
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
      );
      const data = await res.json();

      console.log("Image Data:", data);

      if (data.thumbnail?.source) {
        setState((prev) => ({
          ...prev,
          images: {
            ...prev.images,
            [collegeName]: data.thumbnail.source,
          },
        }));
      }
    } catch (err) {
      console.log("Image error", err);
    }
  };

  // ✅ jab colleges aaye
  useEffect(() => {
    state.colleges.forEach((item) => {
      fetchImage(item.display_name);
    });
  }, [state.colleges]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Colleges & Universities ({state.country})</h2>

      {/* ✅ Sign out (firebase) */}
      <button onClick={handleSignOut} style={{ background: "red", color: "#fff" }}>
        Sign Out
      </button>

      <br /><br />

      {/* ✅ Country select */}
      <select
        value={state.country}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            country: e.target.value,
          }))
        }
      >
        <option>India</option>
        <option>United States</option>
        <option>Canada</option>
      </select>

      <button onClick={fetchColleges} style={{ marginLeft: "10px" }}>
        Search
      </button>

      {state.loading && <p>Loading...</p>}

      {/* ✅ Cards */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {state.colleges.map((item, index) => (
          <Card
            key={index}
            name={item.display_name}
            website={item.homepage_url}
            image={state.images[item.display_name]}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;