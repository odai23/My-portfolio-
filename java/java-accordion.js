//toggle bar

window.onload = function () {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".navbar");

  menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
  });
};

//background top
const bgImageEl = document.getElementById("cover-img");

window.addEventListener("scroll", function () {
  updateImage();
});

function updateImage() {
  bgImageEl.style.opacity = 1 - window.scrollY / 700;
}
////////////////////////////////////////////////////////////////////////////////////////////////
const accordion = document.querySelector(".accordion");

accordion.addEventListener("click", (e) => {
  const activePanel = e.target.closest(".accordion-panel");
  if (!activePanel) return;
  toggleAccordion(activePanel);
});

function toggleAccordion(panelToActivate) {
  const trigger =
    panelToActivate.parentElement.querySelectorAll(".accordion-trigger");
  const contents =
    panelToActivate.parentElement.querySelectorAll(".accordion-content");

  trigger.forEach((trigger) => {
    trigger.setAttribute("aria-expanded", false);
  });

  contents.forEach((content) => {
    content.setAttribute("aria-hidden", true);
  });

  panelToActivate
    .querySelector(".accordion-trigger")
    .setAttribute("aria-expanded", true);
  panelToActivate
    .querySelector(".accordion-content")
    .setAttribute("aria-hidden", false);
}

//accordion javascript

let accordionImage = document.querySelectorAll(".accordion-image");
let goButton = document.querySelectorAll(".go-button");
let getLatestOpenImg;
let windowWidth = window.innerWidth;
let category; // Declare category variable globally

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

goButton.forEach((button, index) => {
  button.onclick = function () {
    getLatestOpenImg = 1;

    let container = document.body;
    let newImgWindow = document.createElement("div");
    container.appendChild(newImgWindow);
    newImgWindow.setAttribute("class", "img-window");
    newImgWindow.setAttribute("onclick", "closeImg()");

    category = accordionImage[index].getAttribute("data-category"); // get category of the image
    let newImg = new Image();
    newImg.src = `../imgs/${category}/${index + 1}.jpg`;
    newImgWindow.appendChild(newImg);
    newImg.classList.add("popup-img");
    newImg.setAttribute("id", "current-img");

    newImg.onload = function () {
      let newNextBtn = document.createElement("a");
      newNextBtn.innerHTML = '<i class="fas fa-chevron-right next"></i>';
      container.appendChild(newNextBtn);
      newNextBtn.setAttribute("class", "img-btn-next");
      newNextBtn.setAttribute("onclick", "changeImg(1)");

      let newPrevBtn = document.createElement("a");
      newPrevBtn.innerHTML = '<i class="fas fa-chevron-left prev"></i>';
      container.appendChild(newPrevBtn);
      newPrevBtn.setAttribute("class", "img-btn-prev");
      newPrevBtn.setAttribute("onclick", "changeImg(0)");
    };
  };
});
function changeImg(change) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (change === 1) {
    calcNewImg = getLatestOpenImg + 1;
    if (calcNewImg > goButton.length) {
      calcNewImg = 1;
    }
  } else if (change === 0) {
    calcNewImg = getLatestOpenImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = goButton.length;
    }
  }

  newImg.setAttribute("src", `../imgs/${category}/${calcNewImg}.jpg`);
  newImg.setAttribute("class", "popup-img");
  newImg.setAttribute("id", "current-img");

  getLatestOpenImg = calcNewImg;
}
