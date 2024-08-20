"use client";

import { motion } from "framer-motion";
import NavLink from "@/components/NavLink";
import Video from "next-video";
import getStarted from "/videos/vid.mp4";
export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#28574E] to-[#1E232F] text-white">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <motion.div
          className="p-4 mt-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            World's Best Advanced
            <br />
            Care Platform
          </h1>
        </motion.div>

        <motion.div
          className="p-4 mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl mb-6">
            Find The Best Hospitals and Doctors Across Your Area
          </p>
          <NavLink
            href="/doctors"
            className="px-6 py-3 text-sm md:text-base font-medium bg-white text-[#28574E] rounded-md shadow-md hover:bg-[#1E232F] hover:text-white transition-colors duration-300"
          >
            Find Doctors
          </NavLink>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="./image.png"
            alt="Healthcare Banner"
            className="w-full max-w-3xl rounded-lg shadow-lg"
          />
        </motion.div>
      </main>

      {/* Updated Section */}
      <section className="w-full py-12 bg-[#FFFFFF] text-[#28574E]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Experience Exceptional Healthcare In Canada With Omnicure Canada
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6">
            Discover the pinnacle of healthcare services in Canada, where
            advancements in artificial intelligence (AI), quality care,
            cutting-edge research, expert doctors, and a commitment to patient
            success combine to provide an unparalleled medical tourism
            experience. Omnicure Canada utilizes AI to assist in diagnosing
            patients with remarkable accuracy, ensuring timely and personalized
            treatment plans. Connect with us today and embark on a journey of
            exceptional Canadian healthcare services powered by innovation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="text-xl font-semibold mb-2">Second Opinion</div>
              <p>
                When facing a serious, life-changing illness, we understand the
                critical importance of obtaining expert advice, enhanced by
                AI-driven diagnostics.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-semibold mb-2">Treatment</div>
              <p>
                Get help from the best hospitals and specialists that excel in
                providing premium healthcare directly from Canada, supported by
                AI-powered insights.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xl font-semibold mb-2">Global Plans</div>
              <p>
                Access comprehensive global healthcare plans that ensure your
                well-being no matter where you are, with the aid of advanced AI
                technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-[#FFFFFF] text-[#28574E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-[#28574E] text-white rounded-full flex items-center justify-center">
                🏥
              </div>
              <h3 className="text-xl font-semibold">Top Hospitals</h3>
              <p className="mt-2">
                Access the best medical facilities with state-of-the-art
                technology.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-[#28574E] text-white rounded-full flex items-center justify-center">
                👩‍⚕️
              </div>
              <h3 className="text-xl font-semibold">Expert Doctors</h3>
              <p className="mt-2">
                Connect with the most experienced and caring medical
                professionals.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-[#28574E] text-white rounded-full flex items-center justify-center">
                💊
              </div>
              <h3 className="text-xl font-semibold">Comprehensive Care</h3>
              <p className="mt-2">
                Receive all-inclusive care tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 bg-[#28574E] text-center text-sm">
        <p>&copy; 2024 Care Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
