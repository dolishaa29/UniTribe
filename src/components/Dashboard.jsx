import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Card from "./Card";

const countryCodes = {
  India: "IN",
  "United States": "US",
  Canada: "CA",
};

const Dashboard = () => {
  const [state, setState] = useState({
    country: "India",
    colleges: [],
    images: {},
    loading: false,
  });

  // ✅ logout (firebase intact)
  const handleSignOut = async () => {
    await signOut(auth);
  };

  // ✅ fetch colleges
  const fetchColleges = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    const res = await fetch(
      `https://api.openalex.org/institutions?filter=country_code:${countryCodes[state.country]}`
    );

    const data = await res.json();

    setState((prev) => ({
      ...prev,
      colleges: data.results,
      loading: false,
    }));
  };

  // ✅ fetch image
  const fetchImage = async (name) => {
    try {
      const title = name.replace(/ /g, "_");
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
      );
      const data = await res.json();

      if (data.thumbnail?.source) {
        setState((prev) => ({
          ...prev,
          images: {
            ...prev.images,
            [name]: data.thumbnail.source,
          },
        }));
      }
    } catch (err) {
      console.log("Image error", err);
    }
  };

  // ✅ jab colleges aaye → images
  useEffect(() => {
    state.colleges.forEach((item) => {
      fetchImage(item.display_name);
    });
  }, [state.colleges]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Colleges ({state.country})</h2>

      <button onClick={handleSignOut}>Sign Out</button>
      <br /><br />

      {/* ✅ country select */}
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

      {/* ✅ MAP + PROPS PASS */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {state.colleges.map((item, index) => (
          <Card
            key={index}
            country={state.country}          // ✅ selected country
            college={item}                  // ✅ poora college object
            image={state.images[item.display_name]} // ✅ image
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;