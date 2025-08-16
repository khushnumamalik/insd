// BANNER SCRIPT
const desktopImages = [
    "/assets/images/4.png",
    "/assets/images/3.png",
    "/assets/images/2.png",
    "/assets/images/1.png"
];

const mobileImages = [
    "/assets/images/mob4.png",
    "/assets/images/mob3.png",
    "/assets/images/mob2.png",
    "/assets/images/mob1.png"
    
];

let index = 0;
let slideInterval;
const section = document.querySelector(".sec1");
const dotsContainer = document.querySelector(".dots");

function getImages() {
    return window.innerWidth <= 768 ? mobileImages : desktopImages;
}

function createDots(images) {
    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            index = i;
            changeSlide(true); // true = user clicked
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll(".dots span").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}
function changeSlide(isManual = false) {
    const images = getImages();
    section.style.backgroundImage = `url(${images[index]})`;
    updateDots();
    index = (index + 1) % images.length;

    if (isManual) {
        clearInterval(slideInterval);
        startAutoSlide();
    }
}
function startAutoSlide() {
    slideInterval = setInterval(changeSlide, 4000);
}
createDots(getImages());
changeSlide();
startAutoSlide();
window.addEventListener("resize", () => {
    index = 0;
    createDots(getImages());
    changeSlide();
});
// HEADER SECTION
function toggleMenu() {
  document.getElementById('nav-menu').classList.toggle('show');
}
// COUNTDOWN
  function animateCount(el, target) {
      let count = 0;
      const speed = target / 200; // adjust speed
      function update() {
        count += speed;
        if (count < target) {
          el.textContent = Math.floor(count) + "+";
          requestAnimationFrame(update);
        } else {
          el.textContent = target + "+";
        }
      }
      update();
    }

    function startCounters() {
      document.querySelectorAll('.sec2 .stat-number').forEach(num => {
        const target = +num.getAttribute('data-target');
        animateCount(num, target);
      });
    }

    // Trigger when section is visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.sec2'));
    // GALLARY SECTION
      const galleryGrid = document.querySelector('.gallery-grid');
  const leftArrow = document.querySelector('.gallery-arrow.left');
  const rightArrow = document.querySelector('.gallery-arrow.right');

  rightArrow.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: 300, behavior: 'smooth' });
  });

  leftArrow.addEventListener('click', () => {
    galleryGrid.scrollBy({ left: -300, behavior: 'smooth' });
  });

//   AWARD SECTION

    const awardsSlider = document.querySelector(".awards-slider");
const nextAward = document.querySelector(".arrow-right");
const prevAward = document.querySelector(".arrow-left");

let awardIndex = 0;

function showAwardSlide() {
    awardsSlider.style.transform = `translateX(-${awardIndex * 100}%)`;
}

nextAward.addEventListener("click", () => {
    awardIndex = (awardIndex + 1) % awardsSlider.children.length;
    showAwardSlide();
});

prevAward.addEventListener("click", () => {
    awardIndex = (awardIndex - 1 + awardsSlider.children.length) % awardsSlider.children.length;
    showAwardSlide();
});
// Only for mobile slider smooth scroll
document.querySelectorAll('.slider-container1').forEach(slider => {
  slider.addEventListener('wheel', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      slider.scrollBy({ left: e.deltaY < 0 ? -100 : 100, behavior: 'smooth' });
    }
  });
});
// Only for mobile slider smooth scroll
document.querySelectorAll('.slider-container1').forEach(slider => {
  slider.addEventListener('wheel', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      slider.scrollBy({ left: e.deltaY < 0 ? -100 : 100, behavior: 'smooth' });
    }
  });
});


  // show/hide button on scroll
  window.addEventListener("scroll", function () {
    const backToTop = document.getElementById("backToTop");
    if (window.scrollY > 200) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // smooth scroll to top
  document.getElementById("backToTop").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

