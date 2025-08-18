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

  // Gallery Lightbox
  (function () {
    const grid = document.querySelector('.gallery-grid');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const btnClose = document.getElementById('lightboxClose');
    const btnPrev = document.getElementById('lightboxPrev');
    const btnNext = document.getElementById('lightboxNext');
    if (!grid || !lightbox || !lightboxImg) return;

    const images = Array.from(grid.querySelectorAll('img'));
    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = images[currentIndex].src;
      lightbox.classList.add('open');
      document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.classList.remove('no-scroll');
      lightboxImg.src = '';
    }

    function show(delta) {
      currentIndex = (currentIndex + delta + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
    }

    images.forEach((img, idx) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(idx));
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') openLightbox(idx);
      });
      img.setAttribute('tabindex', '0');
    });

    btnClose && btnClose.addEventListener('click', closeLightbox);
    btnPrev && btnPrev.addEventListener('click', () => show(-1));
    btnNext && btnNext.addEventListener('click', () => show(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(-1);
      if (e.key === 'ArrowRight') show(1);
    });
  })();

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

  // Explore Our Programs: scroll reveal for heading and cards
  (function () {
    const revealElements = [
      ...document.querySelectorAll('.programs-sec .text-container'),
      ...document.querySelectorAll('.programs-sec .program-card')
    ];

    if (!revealElements.length) return;

    const programsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // add slight stagger using transitionDelay
          const elementIndex = revealElements.indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(elementIndex * 80, 400)}ms`;
          entry.target.classList.add('in-view');
          programsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => {
      el.classList.add('reveal');
      programsObserver.observe(el);
    });
  })();

  // Subtle 3D tilt for program media (image only) on pointer devices
  (function () {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    const cards = document.querySelectorAll('.programs-sec .program-media');
    const maxTilt = 8; // degrees

    cards.forEach((card) => {
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const pctX = (relX / rect.width) * 2 - 1; // -1 to 1
        const pctY = (relY / rect.height) * 2 - 1; // -1 to 1
        const tiltX = -(pctY * maxTilt);
        const tiltY = pctX * maxTilt;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      };

      const reset = () => {
        card.style.transform = '';
      };

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', reset);
    });
  })();

  // Sec4 reveal removed (undo)


  

