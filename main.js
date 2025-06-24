// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// --- Custom Cursor ---
const cursor = document.querySelector('.custom-cursor');
window.addEventListener('mousemove', e => {
  gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
});

const growElements = document.querySelectorAll('a, button, .color-btn');
growElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// --- Header Scroll ---
const header = document.querySelector('.main-header');
ScrollTrigger.create({
  trigger: 'body',
  start: 'top top-=-80px',
  end: 'bottom top',
  onUpdate: self => {
    if (self.direction === 1) { // Scrolling down
      header.classList.add('scrolled');
    } else { // Scrolling up
      if (self.scroll() < 50) {
        header.classList.remove('scrolled');
      }
    }
  }
});

// --- Hero Section Animation ---
gsap.from('.product-images', {
  scrollTrigger: '.hero-section',
  duration: 1,
  opacity: 0,
  x: -100,
  ease: 'power3.out',
  delay: 0.2
});
gsap.from('.product-info > *', {
  scrollTrigger: '.hero-section',
  duration: 1,
  opacity: 0,
  y: 50,
  stagger: 0.1,
  ease: 'power3.out',
  delay: 0.4
});

// --- Lifestyle Gallery Parallax ---
gsap.utils.toArray('.gallery-item').forEach(item => {
  gsap.to(item, {
    yPercent: -30 * (item.dataset.speed || 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.lifestyle-gallery',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// --- Section Fade-in Animations ---
const sections = document.querySelectorAll('.why-us-section, .video-section, .faq-section');
sections.forEach(section => {
  gsap.from(section.querySelectorAll('.section-title, .video-wrapper, .faq-item'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15
  });
});

// --- Color Swatches Logic ---
const colorBtns = document.querySelectorAll('.color-btn');
const mainImage = document.getElementById('main-image');
colorBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    colorBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    // Animate image change
    gsap.to(mainImage, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        mainImage.src = 'images/' + this.getAttribute('data-img');
        gsap.to(mainImage, { opacity: 1, duration: 0.3 });
      }
    });
  });
});

// --- Tabs Logic ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    tabBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    tabContents.forEach(tc => tc.style.display = 'none');
    document.getElementById('tab-' + this.dataset.tab).style.display = 'block';
  });
});

// --- FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    
    // Close all other items
    faqItems.forEach(i => {
      i.classList.remove('active');
      gsap.to(i.querySelector('.faq-answer'), { maxHeight: 0, duration: 0.3 });
    });
    
    // Open the clicked item
    if (!isOpen) {
      item.classList.add('active');
      gsap.to(answer, { maxHeight: answer.scrollHeight, duration: 0.4, ease: 'power2.out' });
    }
  });
});

// Quantity
const qtyInput = document.getElementById('qty-input');
document.getElementById('qty-minus').onclick = () => {
  let v = parseInt(qtyInput.value);
  if (v > 1) qtyInput.value = v - 1;
};
document.getElementById('qty-plus').onclick = () => {
  let v = parseInt(qtyInput.value);
  if (v < 10) qtyInput.value = v + 1;
};

// Đánh giá sao (hiệu ứng hover, click)
const stars = document.querySelectorAll('.star');
let userRating = 0;
stars.forEach(star => {
  star.addEventListener('mouseenter', function() {
    const val = +this.dataset.value;
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < val; i++) stars[i].classList.add('selected');
  });
  star.addEventListener('mouseleave', function() {
    stars.forEach(s => s.classList.remove('selected'));
    if (userRating > 0) for (let i = 0; i < userRating; i++) stars[i].classList.add('selected');
  });
  star.addEventListener('click', function() {
    userRating = +this.dataset.value;
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < userRating; i++) stars[i].classList.add('selected');
    alert('Cảm ơn bạn đã đánh giá ' + userRating + ' sao!');
  });
});

// Chia sẻ mạng xã hội (demo)
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const social = this.dataset.social;
    let url = window.location.href;
    if (social === 'fb') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
    else if (social === 'tw') window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url), '_blank');
    else if (social === 'zalo') alert('Chia sẻ Zalo: Hãy copy link trang này!');
  });
});

// Hiệu ứng động cho ảnh và nút mua hàng
const buyBtn = document.querySelector('.buy-btn');
buyBtn.addEventListener('click', function() {
  buyBtn.classList.add('buy-animate');
  setTimeout(() => buyBtn.classList.remove('buy-animate'), 500);
});
const style = document.createElement('style');
style.innerHTML = `
  #main-image.img-animate {
    animation: popImg 0.4s cubic-bezier(.77,0,.18,1);
  }
  @keyframes popImg {
    0% { transform: scale(0.92) rotate(-4deg); opacity: 0.7; }
    60% { transform: scale(1.08) rotate(2deg); opacity: 1; }
    100% { transform: scale(1) rotate(0); opacity: 1; }
  }
  .buy-btn.buy-animate {
    animation: popBtn 0.5s cubic-bezier(.77,0,.18,1);
  }
  @keyframes popBtn {
    0% { transform: scale(1); }
    40% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);
