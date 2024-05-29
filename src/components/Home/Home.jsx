import React from "react";
import Navigation from "../Navigation/Navigation";
import "./Home.css";
export default function Home() {
  return (
    <div className="home-container">
      <Navigation />

      <main className="main-content">
        <div className="overlay">
          <h1>Welcome to ServiceHUB</h1>
          <p>Your one-stop solution for all your needs</p>
          {/* <SearchBar /> */}
        </div>
      </main>
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          ServiceHUB is dedicated to connecting you with the best service
          providers in the industry. Our mission is to simplify your search for
          quality services and ensure that you find exactly what you need with
          ease.
        </p>
      </section>
      <footer className="footer">
        <p>&copy; 2024 ServiceHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
