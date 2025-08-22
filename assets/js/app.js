
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
    
// GALLERY: View more toggle
(function(){
  const btn = document.getElementById('viewMoreBtn');
  if(!btn) return;
  const moreItems = Array.from(document.querySelectorAll('#galleryGrid .more-item'));
  let expanded = false;
  // Show 4 on mobile (<=768px): unhide one marked as mobile-default
  function setInitialVisibility(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    moreItems.forEach(el => el.classList.add('is-hidden'));
    if(isMobile){
      const extra = document.querySelector('#galleryGrid .more-item.mobile-default');
      if(extra) extra.classList.remove('is-hidden');
    }
    btn.textContent = 'View more';
    expanded = false;
  }
  setInitialVisibility();
  window.addEventListener('resize', setInitialVisibility);
  function toggle(){
    expanded = !expanded;
    if(expanded){
      moreItems.forEach(el => el.classList.remove('is-hidden'));
      btn.textContent = 'View less';
    } else {
      setInitialVisibility();
    }
  }
  btn.addEventListener('click', toggle);
})();

// GALLERY: lightbox zoom on overlay icon
(function(){
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbClose = document.getElementById('lightboxClose');
  if(!lb || !lbImg || !lbClose) return;

  function open(src){
    lbImg.src = src;
    lb.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function close(){
    lb.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  document.getElementById('galleryGrid')?.addEventListener('click', (e)=>{
    const icon = e.target.closest('.goverlay');
    if(icon){
      const img = icon.parentElement.querySelector('img');
      if(img) open(img.src);
    }
  });
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e)=>{ if(e.target === lb) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
})();

// SERVICES: tab interactions update left image and overlay
(function(){
  const tabs = document.getElementById('servicesTabs');
  const img = document.getElementById('serviceImg');
  const title = document.getElementById('serviceTitle');
  const desc = document.getElementById('serviceDesc');
  if(!tabs || !img || !title || !desc) return;

  tabs.addEventListener('click', (e)=>{
    const btn = e.target.closest('.service-tab');
    if(!btn) return;
    tabs.querySelectorAll('.service-tab').forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    // crossfade image
    img.classList.add('fade-out');
    const newSrc = btn.getAttribute('data-img');
    const temp = new Image();
    temp.onload = ()=>{
      img.src = newSrc;
      img.classList.remove('fade-out');
    };
    temp.src = newSrc;
    img.alt = btn.getAttribute('data-title');
    title.textContent = btn.getAttribute('data-title');
    desc.textContent = btn.getAttribute('data-desc');
    const caption = document.getElementById('serviceCaption');
    if(caption) caption.textContent = btn.getAttribute('data-title');
  });
})();
