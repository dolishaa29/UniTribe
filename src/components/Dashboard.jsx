import { useEffect, useState, useCallback } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Card from "./Card";
import { Search, LogOut, GraduationCap, Globe, LayoutGrid, Loader2 } from "lucide-react";

const countryCodes = {
  India: "IN",
  "United States": "US",
  Canada: "CA",
};

const Dashboard = () => {
  const [state, setState] = useState({
    selectedCountry: "India", 
    activeCountry: "India",   
    colleges: [],
    images: {},
    loading: false,
  });

  const handleSignOut = async () => await signOut(auth);

  const fetchColleges = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(
        `https://api.openalex.org/institutions?filter=country_code:${countryCodes[state.selectedCountry]}`
      );
      const data = await res.json();
      
      setState((prev) => ({ 
        ...prev, 
        colleges: data.results, 
        activeCountry: prev.selectedCountry, 
        loading: false 
      }));
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.selectedCountry]);

  const fetchImage = async (name) => {
    try {
      const title = name.replace(/ /g, "_");
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
      const data = await res.json();
      if (data.thumbnail?.source) {
        setState((prev) => ({
          ...prev,
          images: { ...prev.images, [name]: data.thumbnail.source },
        }));
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    state.colleges.forEach((item) => {
      if (!state.images[item.display_name]) fetchImage(item.display_name);
    });
  }, [state.colleges]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      <header className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 px-6 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-3 min-w-fit">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200">
            <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tight hidden md:block">
            UNI<span className="text-purple-600">TRIBE</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <div className="flex items-center px-3 gap-2 border-r border-gray-200">
              <Globe size={16} className="text-purple-500" />
              <select
                value={state.selectedCountry}
                onChange={(e) => setState((prev) => ({ ...prev, selectedCountry: e.target.value }))}
                className="bg-transparent text-[13px] font-bold text-gray-700 outline-none pr-2 cursor-pointer"
              >
                {Object.keys(countryCodes).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <button
              onClick={fetchColleges}
              disabled={state.loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {state.loading ? <Loader2 className="animate-spin" size={14} /> : <Search size={14} />}
              <span>Search</span>
            </button>
          </div>

          <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block"></div>

          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span className="hidden lg:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 md:px-8 py-8 flex-1">
        {state.loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="text-purple-600 animate-spin mb-4" size={40} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Updating Registry...</p>
          </div>
        ) : state.colleges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {state.colleges.map((item, index) => (
              <Card
                key={item.id || index}
                country={state.activeCountry} 
                college={item}
                image={state.images[item.display_name]}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-gray-200 border-dashed mx-auto max-w-4xl">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <LayoutGrid className="text-gray-300" size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No Data Found</h3>
            <p className="text-gray-400 text-sm mt-1">Try searching for a different country.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;