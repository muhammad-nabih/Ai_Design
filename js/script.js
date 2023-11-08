const landingPage = document.querySelector(".landing-page");
const settingBox = document.querySelector(".setting-box");
const toggleSetting = document.querySelector(".toggle-setting");
const linksListLanding = document.querySelectorAll(".links li");
const colorsItemsLinks = document.querySelectorAll(".colorsItems li");
const stop = document.querySelector("#stop");
const run = document.querySelector("#run");
const backgroundRandomInterval = setInterval(
  updateBackgroundImageOfLanding,
  5000
);

function toggleRandomBackgroundImage(action) {
  action.addEventListener("click", (e) => {
    if (e.target.id === "stop") {
      clearInterval(backgroundRandomInterval);
      toggleActiveState(stop, run);
    } else if (e.target.id === "run") {
      backgroundRandomInterval = setInterval(
        updateBackgroundImageOfLanding,
        5000
      );
      toggleActiveState(run, stop);
    }
  });
}

function toggleActiveState(activeElement, inactiveElement) {
  activeElement.classList.add("active");
  inactiveElement.classList.remove("active");
}

toggleRandomBackgroundImage(stop);
toggleRandomBackgroundImage(run);

// Check localStorage is Not Empty
const colorStorage = localStorage.getItem("optionColor");
const activeColor = localStorage.getItem("activeLink");

function activeLi(colorsItemsLinks) {
  if (activeColor) {
    colorsItemsLinks.forEach((link) =>
      link.id === activeColor
        ? link.classList.add("active")
        : link.classList.remove("active")
    );
  }
}
activeLi(colorsItemsLinks);

if (colorStorage) {
  document.documentElement.style.setProperty("--main-color", colorStorage);
  localStorage.setItem("optionColor", colorStorage);
}
function setColorOption(color) {
  document.documentElement.style.setProperty("--main-color", color);
  localStorage.setItem("optionColor", color);
}

// [==> Start Spin Effect And Slider Effect  <==]
toggleSetting.addEventListener("click", () => {
  settingBox.classList.toggle("open");
  document.querySelector(".fa-gear").classList.toggle("fa-spin");
});
//[==> End Spin Effect And Slider Effect  <==]

// [==> Start Colors Changed  <==]
const colorsItems = document.querySelectorAll(".colorsItems li");
colorsItems.forEach((colorItem) => {
  colorItem.addEventListener("click", (e) => {
    const color = e.target.dataset.color;
    setColorOption(color);
  });
});
//[==> End Colors Changed  <==]

// [==> Start Random Background Section <==]
const imageArray = [
  "images/landing1.jpg",
  "images/landing2.jpg",
  "images/landing3.jpg",
  "images/landing4.jpg",
  "images/landing5.jpg",
];

// Get Random image
function getRandomImage() {
  let randomNumber = Math.floor(Math.random() * imageArray.length);
  const imageName = imageArray[randomNumber];
  return imageName;
}

// Update Background Image Of Landing
function updateBackgroundImageOfLanding() {
  let imageSource = getRandomImage();
  const img = new Image();
  img.src = imageSource;
  img.onload = (e) => {
    landingPage.style.backgroundImage = `url(${imageSource})`;
    landingPage.style.transitionDuration = ".2s";
  };
}

// [==> End Random Background Section <==]

// [==> Start Type Effect With Using type.js library <==]
function createTypedEffect() {
  let typed = new Typed("#type-output", {
    strings: [
      "Our website harnesses provides innovative solutions",
      " by <span class='highlighter'>AI</span>",
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000,
    fadeOut: true,
    loop: true,
    cursorChar: "",
  });
}
createTypedEffect();
//^ [==> End Type Effect With Using type.js library <==]

// [==> Start Active Link Settings Function  <==]
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
activeLinkSettings(linksListLanding);
activeLinkSettings(colorsItemsLinks);

// [==> End Active Link Settings Function  <==]
