import React from "react";

const Card = (props) => {
  const { country, college, image } = props;

  // ✅ console debugging
  console.log("Country:", country);
  console.log("College Object:", college);
  console.log("Image:", image);

  return (
    <div style={{ border: "1px solid #ccc", width: "230px", padding: "10px" }}>
      
      {/* ✅ Image */}
      {image ? (
        <img
          src={image}
          alt={college.display_name}
          style={{ width: "100%", height: "120px", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            height: "120px",
            background: "#eee",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Image
        </div>
      )}

      {/* ✅ College Name */}
      <h4>{college.display_name}</h4>

      {/* ✅ Selected Country */}
      <p>
        <strong>Country:</strong> {country}
      </p>

      {/* ✅ Website */}
      {college.homepage_url && (
        <a
          href={college.homepage_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      )}
    </div>
  );
};

export default Card;