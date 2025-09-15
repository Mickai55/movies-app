// web/src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Film, Database, Search } from "lucide-react";

const features = [
  {
    icon: <Search className="w-6 h-6 text-indigo-500" />,
    title: "Search Movies",
    desc: "Fetch movies from the OMDb API by title.",
  },
  {
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    title: "Save to Database",
    desc: "Unique movies and posters stored in MongoDB.",
  },
  {
    icon: <Film className="w-6 h-6 text-indigo-500" />,
    title: "Explore Collection",
    desc: "Browse movies in a clean, modern UI.",
  },
];

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <section className="relative py-20 px-6 rounded-2xl overflow-hidden shadow-lg">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 
                        animate-[gradientShift_7s_ease_infinite] bg-[length:200%_200%] duration-300"
        />
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to MoviesApp</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Look for movies and TV shows from OMDb database, store them uniquely in MongoDB
            and browse them in style.
          </p>
          <Link
            to="/list"
            className="inline-block px-8 py-3 font-semibold rounded-lg 
             bg-white text-purple-800 shadow 
             transform transition-transform duration-300 
             hover:scale-110 hover:text-purple-500"
          >
            Explore Movie List →
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 bg-white border rounded-xl hover:shadow-md transition flex flex-col items-center text-center"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
