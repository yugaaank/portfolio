const navbar = document.querySelector(".navbar");

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function updateActiveSection() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we're very close to the bottom of the page
    if (window.innerHeight + window.pageYOffset >= documentHeight - 100) {
      // Activate the last nav link (contact)
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#contact") {
          link.classList.add("active");
        }
      });
      return;
    }

    // Otherwise check each section
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop - windowHeight / 2 &&
        scrollPosition < sectionTop + sectionHeight - windowHeight / 2
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Update active section on scroll
  window.addEventListener("scroll", updateActiveSection);

  // Initial check for active section
  updateActiveSection();

  // Hamburger menu functionality
  const hamburger = document.getElementById("hamburger-menu");
  const navLinksContainer = document.getElementById("nav-links");

  function toggleMenu() {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
    navLinksContainer.classList.toggle("active");
  }

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", toggleMenu);
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when a link is clicked
    navLinksContainer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (
          window.innerWidth <= 700 &&
          navLinksContainer.classList.contains("active")
        ) {
          navLinksContainer.classList.remove("active");
          hamburger.setAttribute("aria-expanded", false);
        }
      });
    });
  }

  // Highlight Home link as active based on scroll
  const homeLink = document.querySelector(".nav-home");
  if (homeLink) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeTop = homeSection.offsetTop - 120;
        const homeBottom = homeTop + homeSection.offsetHeight;
        if (scrollY >= homeTop && scrollY < homeBottom) {
          homeLink.classList.add("active");
        } else {
          homeLink.classList.remove("active");
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const buttonText =
    submitButton?.querySelector(".button-text") || submitButton;
  const buttonIcon = submitButton?.querySelector(".button-icon");

  if (form && submitButton) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Change button state to loading
      submitButton.disabled = true;
      if (buttonText) buttonText.textContent = "Sending...";
      if (buttonIcon) buttonIcon.innerHTML = "&#8987;";
      submitButton.classList.remove("success", "error");

      try {
        const formData = new FormData(form);
        const response = await fetch(
          "https://formsubmit.co/yugaankrathore0@gmail.com",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          // Success state
          if (buttonText) buttonText.textContent = "Message Sent!";
          if (buttonIcon) buttonIcon.innerHTML = "&#10004;";
          submitButton.classList.add("success");
          form.reset();

          // Reset button after 3 seconds
          setTimeout(() => {
            if (buttonText) buttonText.textContent = "Send Message";
            if (buttonIcon) buttonIcon.innerHTML = "&#9993;";
            submitButton.disabled = false;
            submitButton.classList.remove("success");
          }, 3000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        // Error state
        if (buttonText) buttonText.textContent = "Error - Try Again";
        if (buttonIcon) buttonIcon.innerHTML = "&#10060;";
        submitButton.classList.add("error");

        setTimeout(() => {
          if (buttonText) buttonText.textContent = "Send Message";
          if (buttonIcon) buttonIcon.innerHTML = "&#9993;";
          submitButton.disabled = false;
          submitButton.classList.remove("error");
        }, 3000);
      }
    });
  }
});
