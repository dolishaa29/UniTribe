import React from "react";

const Card = ({ country, college, image }) => {
  return (
    <div className="group w-[340px] h-[520px] bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500 flex flex-col">
      
      <div className="relative overflow-hidden h-56 flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={college.display_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm tracking-wide">
              No Image Available
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-full shadow">
            {country}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        
        <h2 className="text-2xl font-bold text-gray-900 leading-snug line-clamp-2 min-h-[64px]">
          {college.display_name}
        </h2>

        <div className="w-14 h-1 bg-blue-600 rounded-full mt-3 mb-5"></div>
        
        <div className="pt-6">
            <a
              href={college.homepage_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 inline-flex items-center justify-center bg-gray-900 text-white rounded-2xl font-semibold tracking-wide hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View Website
            </a>
          
        </div>
      </div>
    </div>
  );
};

export default Card;