import { Mail, Globe, Zap, Shield, BarChart, ArrowLeft } from "lucide-react";
import { BrowserRouter, useNavigate } from 'react-router-dom'; 

function AboutContent() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6 font-sans">
      
      <div className="max-w-3xl text-center mb-12 relative w-full px-4 sm:px-0">
        
        <button
          onClick={handleGoBack}
          className="absolute left-0 top-0 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1 font-semibold p-2 rounded-lg -ml-4 sm:-ml-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>

        <h1 className="text-4xl font-bold text-blue-600 mb-4 mt-8 sm:mt-0">About Shortly</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Shortly is a fast and simple URL shortener designed to make link sharing effortless. 
          Shorten, manage, and track your links in just a few clicks. Built for speed, simplicity, and security.
        </p>
      </div>

      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 mb-12 text-center w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to simplify how people share information online. 
          We believe even the smallest tools can make the web more efficient, accessible, and beautiful. 
          Shortly aims to be your go-to link shortener that’s reliable, fast, and smart.
        </p>
      </div>

      <div className="max-w-5xl grid md:grid-cols-3 gap-8 mb-16 w-full px-4 sm:px-0">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
          <Zap className="mx-auto text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm">
            Get short links instantly with our optimized backend — no delays, no fuss.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
          <Shield className="mx-auto text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Secure Links</h3>
          <p className="text-gray-600 text-sm">
            Every link you create is unique and safe to share — your data stays protected.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
          <BarChart className="mx-auto text-blue-600 w-10 h-10 mb-3" />
          <h3 className="font-semibold text-lg mb-2">Track Analytics</h3>
          <p className="text-gray-600 text-sm">
            Coming soon — get click stats and insights to measure your reach.
          </p>
        </div>
      </div>

      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 mb-12 text-center w-full">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Built With</h2>
        <p className="text-gray-700">
          <strong>React</strong>, <strong>Tailwind CSS</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong> — 
          combining power, performance, and modern design principles.
        </p>
      </div>

      <div className="max-w-3xl text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">Get in Touch</h2>
        <p className="text-gray-700 mb-4">
          Have questions, suggestions, or collaboration ideas? I’d love to hear from you!
        </p>
        <a
          href="mailto:youremail@example.com"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 font-medium"
        >
          <Mail className="w-5 h-5" />
          Contact Me
        </a>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Shortly — Created by <span className="font-semibold text-blue-600">Kalpana Chauhan</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AboutContent />
    </BrowserRouter>
  );
}
