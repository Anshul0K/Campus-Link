import { useState } from "react";
import LoginModal from "./Login";
import RegisterModal from "./Register";
import Logo from "../assets/no_bg_logo.png";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center relative overflow-x-hidden">
      {/* Logo and Buttons (Centered) */}
      <header className="flex flex-col items-center mt-5 px-6">
        <img src={Logo} alt="Logo" className="h-20 mb-3" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4 text-center">
          Welcome to Campus Link
        </h1>
        <p className="text-blue-700 max-w-2xl text-center mb-8 text-lg md:text-xl">
          Your gateway to NSUT events, clubs, and student networking. Discover, connect, and participate—all in one place.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            Login
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="mt-28 w-full px-6 md:px-16 grid md:grid-cols-3 gap-10">
        <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">Verified Opportunities</h3>
          <p className="text-blue-700">
            Students can post opportunities for societies, internships, or ambassador programs. All posts are verified by admins to ensure authenticity.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">Networking & Collaboration</h3>
          <p className="text-blue-700">
            Connect with fellow NSUT students, explore projects, and collaborate on events or programs, both on-campus and off-campus.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">NSUT Exclusive</h3>
          <p className="text-blue-700">
            Campus Link is an exclusive platform for NSUT students, ensuring a safe and trusted environment for sharing and discovering opportunities.
          </p>
        </div>
      </section>


      {/* Footer */}
      <footer className="w-full mt-28 bg-blue-100 py-6 text-center text-blue-700 text-sm md:text-base">
        &copy; 2025 Campus Link. All rights reserved.
      </footer>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default Home;
