// Selecting DOM elements
const landingPage = document.querySelector(".landing-page");
const settingBox = document.querySelector(".setting-box");
const toggleSetting = document.querySelector(".toggle-setting");
const linksListLanding = document.querySelectorAll(".links li");
const colorsItemsLinks = document.querySelectorAll(".colorsItems li");
const stop = document.querySelector("#stop");
const run = document.querySelector("#run");
const timeline = document.querySelector(".timeline");
const containers = document.querySelectorAll(".timeline .container");
const line = document.querySelector(".line-element");

// options
const intervalDuration = 5000;
let backgroundRandomInterval;

// Function to set up the interval for updating background images
function setupInterval() {
  backgroundRandomInterval = setInterval(
    updateBackgroundImageOfLanding,
    intervalDuration
  );
}

// Checking localStorage for the previous user action (run/stop)
const actionType = localStorage.getItem("actionType");
if (actionType) {
  if (actionType === "run") {
    toggleActiveState(run, stop);
    setupInterval();
  } else {
    toggleActiveState(stop, run);
    clearInterval(backgroundRandomInterval);
  }
}

// Function to toggle random background image based on user action
function toggleRandomBackgroundImage(action) {
  action.addEventListener("click", (e) => {
    if (e.target.id === "stop") {
      toggleActiveState(stop, run);
      localStorage.setItem("actionType", "stop");
      clearInterval(backgroundRandomInterval);
    } else if (e.target.id === "run") {
      toggleActiveState(run, stop);
      localStorage.setItem("actionType", "run");
      setupInterval();
    }
  });
}

// Function to toggle the active state of elements
function toggleActiveState(activeElement, inactiveElement) {
  activeElement.classList.add("active");
  inactiveElement.classList.remove("active");
}

// Initializing toggle functions for run/stop buttons
toggleRandomBackgroundImage(stop);
toggleRandomBackgroundImage(run);

// Checking and applying stored color preferences from localStorage
const colorStorage = localStorage.getItem("optionColor");
const activeColor = localStorage.getItem("activeLink");

// Function to set the active state for color options
function setActiveColorOption(colorsItemsLinks) {
  if (activeColor) {
    colorsItemsLinks.forEach((link) =>
      link.id === activeColor
        ? link.classList.add("active")
        : link.classList.remove("active")
    );
  }
}
setActiveColorOption(colorsItemsLinks);

if (colorStorage) {
  document.documentElement.style.setProperty("--main-color", colorStorage);
  localStorage.setItem("optionColor", colorStorage);
}

// Function to set the color option and update localStorage
function setColorOption(color) {
  document.documentElement.style.setProperty("--main-color", color);
  localStorage.setItem("optionColor", color);
}

// Toggle settings box visibility and add a spin effect
toggleSetting.addEventListener("click", () => {
  settingBox.classList.toggle("open");
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
});

// Function to handle color changes on click
const colorsItems = document.querySelectorAll(".colorsItems li");
colorsItems.forEach((colorItem) => {
  colorItem.addEventListener("click", (e) => {
    const color = e.target.dataset.color;
    setColorOption(color);
  });
});

// Array of background images
const imageArray = [
  "images/landing1.jpg",
  "images/landing2.jpg",
  "images/landing3.jpg",
  "images/landing4.jpg",
  "images/landing5.jpg",
];

// Function to get a random image from the array
function getRandomImage() {
  let randomNumber = Math.floor(Math.random() * imageArray.length);
  const imageName = imageArray[randomNumber];
  return imageName;
}

// Function to update the background image of the landing page
function updateBackgroundImageOfLanding() {
  let imageSource = getRandomImage();
  const img = new Image();
  img.src = imageSource;
  img.onload = (e) => {
    landingPage.style.backgroundImage = `url(${imageSource})`;
    landingPage.style.transitionDuration = ".3s";
  };
}

// Function to create a typing effect using the type.js library
function createTypedEffect() {
  let typed = new Typed("#type-output", {
    strings: [
      "Empowering learning  <span class='highlighter'>AI</span> basics to cutting-edge",
      "for enthusiasts and beginners",
    ],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    fadeOut: true,
    loop: true,
    cursorChar: "",
  });
}
createTypedEffect();

// Function to handle active link settings
function activeLinkSettings(linksList) {
  linksList.forEach((link) => {
    link.addEventListener("click", (event) => {
      linksList.forEach((li) => li.classList.remove("active"));
      link.classList.add("active");
      // Save the ID or a unique identifier of the active link in localStorage
      localStorage.setItem("activeLink", link.id);
    });
  });
}
// Applying active link settings for both links in landing and color options
activeLinkSettings(linksListLanding);
activeLinkSettings(colorsItemsLinks);

//^ Start Timeline section
window.addEventListener("scroll", () => {
  // Check if the user has scrolled to the "our-skills" section
  if (window.scrollY >= timeline.offsetTop - 10) {
    // Iterate through each container and apply animation with delay
    containers.forEach((container, index) => {
      container.classList.add("animation");
      // Apply delay based on index
      container.style.animationDelay = `${index}s`;
    });

    // Apply line animation
    line.classList.add("line-animation");
  }
});

// Start Gallery
const imageBox = document.querySelectorAll(".image-box");

imageBox.forEach((imageBox) => {
  imageBox.addEventListener("click", (e) => {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const imageViewer = document.createElement("div");
    imageViewer.classList.add("imageViewer");
    const img = document.createElement("img");
    img.src = e.target.src;

    imageViewer.appendChild(img);
    overlay.appendChild(imageViewer);
    document.body.appendChild(overlay);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "overlay") {
    e.target.remove();
  }
});

const toggle = document.querySelector(".icon-navbar");
const links = document.querySelector(".navbar-responsive ul");
const introductionText = document.querySelector(
  ".header-area .introduction-text"
);

let statusToggle = false;

toggle.addEventListener("click", () => {
    links.classList.toggle("active");
  if (statusToggle===false) {
    introductionText.style.display = "none";
    statusToggle = true;
  } else {
    introductionText.style.display = "block";
    statusToggle = false;
  }


});
