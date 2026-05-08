import React from "react";
import { ExternalLink, MapPin, School, ArrowUpRight } from "lucide-react";

const Card = ({ country, college, image }) => {
  const name = college?.display_name || "Unknown Institution";
  const type = college?.type || "University";
  const city = college?.location?.city || "Global";
  const url = college?.homepage_url || "#";

  return (
    <div className="group relative w-full bg-white rounded-[2rem] p-3 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.15)] transition-all duration-500 flex flex-col">
      
      <div className="relative h-52 w-full overflow-hidden rounded-[1.5rem]">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <School className="text-slate-300" size={40} />
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
            <MapPin size={12} className="text-purple-600" />
            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">{country}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="flex flex-col flex-1 px-4 py-6">
        
        <div className="flex justify-between items-start mb-2">
           <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded">
            {type.replace("_", " ")}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-800 leading-tight line-clamp-2 mb-4 group-hover:text-purple-600 transition-colors">
          {name}
        </h2>

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
             <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
             <span className="text-xs font-medium italic">{city} Campus</span>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn w-full h-12 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl font-bold text-sm overflow-hidden relative transition-all duration-300 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              Visit Website <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-tr-[2rem] -z-10"></div>
    </div>
  );
};

export default Card;