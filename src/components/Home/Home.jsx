// import React from "react";
// import Navigation from "../Navigation/Navigation";
// import "./Home.css";
// export default function Home() {
//   return (
//     <div className="home-container">
//       <Navigation />

//       <main className="main-content">
//         <div className="overlay">
//           <h1>Welcome to ServiceHUB</h1>
//           <p>Your one-stop solution for all your needs</p>
//           {/* <SearchBar /> */}
//         </div>
//       </main>
//       <section className="about-us">
//         <h2>About Us</h2>
//         <p>
//           ServiceHUB is dedicated to connecting you with the best service
//           providers in the industry. Our mission is to simplify your search for
//           quality services and ensure that you find exactly what you need with
//           ease.
//         </p>
//       </section>
//       <footer className="footer">
//         <p>&copy; 2024 ServiceHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import Navigation from "../Navigation/Navigation";
import "./Home.css";
export default function Home() {
  const categories = [
    { name: "Salon & Beauty", icon: "💇" },
    { name: "Barber", icon: "✂️" },
    { name: "Spa", icon: "💆" },
    { name: "Health & Wellness", icon: "🏥" },
    { name: "Fitness & Sports", icon: "🏋️" },
    { name: "Professional Services", icon: "👨‍💼" },
    { name: "Tutoring Services", icon: "📚" },
    { name: "Education & Non-profits", icon: "🏫" },
    { name: "Banking & Finance", icon: "💰" },
    { name: "Retail", icon: "🛒" },
    { name: "Real Estate", icon: "🏡" },
    { name: "Communities & Facilities", icon: "🏢" },
    { name: "Govt and Public Sector", icon: "🏛️" },
    //{ name: 'Pet Services', icon: '🐾' },
    { name: "Home Services and Cleanings", icon: "🧹" },
    { name: "Automotive Services", icon: "🚗" },
    { name: "AC Repair Services", icon: "🔧" },
  ];
  const features = [
    {
      icon: "📱",
      title: "Online Booking System",
      description:
        "Remove friction from your booking process by minimizing the communication gap with your customers",
    },
    {
      icon: "⏰",
      title: "Business Hour Settings",
      description:
        "You can control business hours at both the staff and service levels giving you the flexibility you need",
    },
    {
      icon: "📅",
      title: "Back to Back Bookings",
      description:
        "Customers selecting multiple services will only be shown times where all chosen services can be availed together",
    },
    {
      icon: "🔔",
      title: "Appointment Alerts and Mails",
      description:
        "Receive instant notifications via sms, email, or straight in the app when an appointment is booked or cancelled",
    },
    {
      icon: "🔄",
      title: "Recurring Bookings",
      description:
        "Allow customers to schedule multiple future appointments in one go to ensure repeat business",
    },
  ];
  return (
    <div className="home-container">
      <Navigation />
      <div className="page-wrapper">
        <main className="main-content"></main>
        <div className="content-below-bg">
          <h1>Welcome to ServiceHUB</h1>
          <p>Connecting You to Every Service You Need</p>
          {/* <SearchBar /> */}
        </div>

        <section className="steps">
          <h1>
            Online Service booking made simple with a 3-step setup process
          </h1>
          <div className="step">
            <img className="steps-img" src="/public/Capture.PNG" alt="Step 1" />
            <h2>1. Companies Post their Services</h2>
            <p className="step-content">
              Companies uploading their services onto the platform.Companies
              transparently display pricing structures and service durations,
              empowering clients to budget and plan accordingly. Clear
              communication of costs fosters trust and eliminates
              uncertainties.This pivotal step initiates the seamless journey for
              clients to explore, assess, and ultimately engage with the
              services offered by these companies.
            </p>
          </div>
          <div className="step">
            <img
              className="steps-img"
              src="/public/Capture2.PNG"
              alt="Step 2"
            />
            <h2>2. Customers Check for Availability of Services</h2>
            <p className="step-content">
              Real-time availability, interactive calendar views, and customized
              notifications ensure that customers have access to up-to-date
              scheduling information. Integration with company websites and
              social media platforms enhances accessibility, while transparent
              booking policies and responsive customer support contribute to a
              seamless booking experience.
            </p>
          </div>
          <div className="step">
            <img
              className="steps-img"
              src="/public/Capture3.PNG"
              alt="Step 3"
            />
            <h2>3. Customers can Book the Services</h2>
            <p className="step-content">
              Accept online bookings hassle-free 24x7. This step simplifies the
              process for customers, allowing them to schedule appointments or
              make reservations hassle-free.With the flexibility to book
              services anytime, anywhere, customers can seamlessly secure their
              desired appointments, contributing to a streamlined and efficient
              booking experience for both customers and service providers.
            </p>
          </div>
        </section>

        <div className="service-categories">
          <h1>ServiceHub can serve almost any industry segment</h1>
          <p>
            Our Service booking system is fit for all service-based local
            businesses, multi-location enterprises, franchises, and more.
          </p>
          <div className="categories">
            {categories.map((category, index) => (
              <div className="category" key={index}>
                <div className="icon">{category.icon}</div>
                <div className="name">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="feature-list">
          <h1>
            Flexible booking settings allow you to have complete control over
            your schedule
          </h1>
          <div className="features">
            {features.map((feature, index) => (
              <div className="feature" key={index}>
                <div className="icon">{feature.icon}</div>
                <div className="title">{feature.title}</div>
                <div className="description">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* <section className="about-us">
        <h2>About Us</h2>
        <p>
          ServiceHUB is dedicated to connecting you with the best service
          providers in the industry. Our mission is to simplify your search for
          quality services and ensure that you find exactly what you need with
          ease.
        </p>
      </section> */}
        <footer className="footer">
          <div className="footer-content">
            <div class="footer-section connect">
              <h3>CONNECT WITH US</h3>
              <div class="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="footer-section contact">
              <h3>CONTACT US</h3>
              <address>
                ServiceHub Software Inc.
                <br />
                Global Village Tech Park
                <br />
                Bangalore-560059
                <br />
                IND
                <br />
                <a href="mailto:servicehubt@gmail.com">servicehubt@gmail.com</a>
              </address>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ServiceHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
