'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navToggler.length; i++) {
  navToggler[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });
}



/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
const heroSlider = document.querySelector("[data-hero-slider]");
const bookingForm = document.querySelector("[data-booking-form]");
const whatsappWidget = document.querySelector("[data-whatsapp-widget]");
const whatsappOpenBtn = document.querySelector("[data-whatsapp-open]");
const whatsappCloseBtn = document.querySelector("[data-whatsapp-close]");

if (heroSlider) {
  const slideSources = (heroSlider.dataset.heroSlides || "")
    .split(",")
    .map((source) => source.trim())
    .filter(Boolean);

  const slideTrack = document.createElement("div");
  slideTrack.className = "hero-slides";

  slideSources.forEach((source, index) => {
    const slide = document.createElement("div");
    slide.className = `hero-slide${index === 0 ? " active" : ""}`;
    slide.style.backgroundImage = `url('${source}')`;
    slideTrack.appendChild(slide);
  });

  heroSlider.prepend(slideTrack);

  const slides = slideTrack.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    let activeIndex = 0;

    window.setInterval(function () {
      slides[activeIndex].classList.remove("active");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add("active");
    }, 5000);
  }
}

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const rideTypeMap = {
      city: "City ride",
      airport: "Airport transfer",
      long_distance: "Long distance",
      hourly: "Hourly hire"
    };

    const message = [
      "Taxi booking request",
      `Name: ${formData.get("name") || "N/A"}`,
      `Phone: ${formData.get("phone") || "N/A"}`,
      `Pickup: ${formData.get("pickup") || "N/A"}`,
      `Drop-off: ${formData.get("dropoff") || "N/A"}`,
      `Date: ${formData.get("ride_date") || "N/A"}`,
      `Time: ${formData.get("ride_time") || "N/A"}`,
      `Passengers: ${formData.get("passengers") || "N/A"}`,
      `Ride type: ${rideTypeMap[formData.get("ride_type")] || "N/A"}`,
      `Notes: ${formData.get("notes") || "None"}`
    ].join("\n");

    const bookingUrl = `https://wa.me/46764575040?text=${encodeURIComponent(message)}`;
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  });
}

if (whatsappWidget && whatsappOpenBtn && whatsappCloseBtn) {
  whatsappOpenBtn.addEventListener("click", function () {
    whatsappWidget.classList.toggle("active");
  });

  whatsappCloseBtn.addEventListener("click", function () {
    whatsappWidget.classList.remove("active");
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      whatsappWidget.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
