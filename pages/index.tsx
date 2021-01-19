import Head from "next/head";
import Link from "next/link";
import AppBar from "../components/AppBar";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      style={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SEO title="Spice" />
      <div className="h-64 bg-primary flex justify-center items-end">
        <h1 className="text-white text-6xl">Spice</h1>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 319"
        className="bg-primary"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,197.3C840,181,960,107,1080,80C1200,53,1320,75,1380,85.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div className="container mx-auto">
        <h2 className="text-3xl">What is Spice?</h2>
        <p>
          Spice is a Web Application that helps you and your friends create
          cooking recipes and share them with each other.
        </p>
        <div className="flex">
          <div className="card">
            <h3 className="text-xl mb-4">I want to see some Recipes first.</h3>
            <Link href="/recipes">
              <a className="btn">Check them out</a>
            </Link>
          </div>
          <div className="card">
            <h3 className="text-xl mb-4">I want to create a Recipe.</h3>
            <Link href="/recipes/create">
              <a className="btn">Create a Recipe</a>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
