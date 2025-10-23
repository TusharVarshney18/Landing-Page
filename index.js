// ⚡ PERFORMANCE FIX: Use defer/async and move script to bottom of HTML
// Add this to your HTML: <script src="script.js" defer></script>

// 🔥 REMOVED: Fire Blade Intro - This blocks initial load
// Replace with simpler fade-in if needed

// ✅ Optimized Navbar Animation - Reduced complexity
document.addEventListener("DOMContentLoaded", () => {
   // Single timeline for navbar (batched animations)
   const navTl = gsap.timeline();
   navTl.to(".navbar", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
   })
      .from(".nav-links a", {
         y: -20,
         opacity: 0,
         duration: 0.4,
         stagger: 0.1,
         ease: "power2.out"
      }, "-=0.5");
});

// 🍔 Toggle Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
   menuToggle.classList.toggle("active");
   navLinks.classList.toggle("active");
});

// 🩸 Throttled Scroll Navbar Effect
let scrollTimeout;
window.addEventListener("scroll", () => {
   if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
         const navbar = document.querySelector(".navbar");
         if (window.scrollY > 80) navbar.classList.add("scrolled");
         else navbar.classList.remove("scrolled");
         scrollTimeout = null;
      }, 100);
   }
}, { passive: true });

// 🖼️ Demon Slayer Gallery - Optimized with IntersectionObserver
const demonSlayerImages = [
   "./assets/1.jpg",
   "./assets/2.jpg",
   "./assets/3.jpg",
   "./assets/4.jpg",
   "./assets/5.jpg",
   "./assets/6.jpg",
   "./assets/7.jpg",
   "./assets/8.jpg",
   "./assets/9.jpg",
   "./assets/10.jpg",

];

gsap.registerPlugin(ScrollTrigger);

const gallery = document.getElementById("gallery");
if (gallery) {
   demonSlayerImages.forEach((url) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      // Lazy loading with native loading attribute
      div.innerHTML = `<img data-src="${url}" alt="Demon Slayer Scene" loading="lazy" />`;
      gallery.appendChild(div);
   });
}

// 🎬 Optimized Hero Animation - Reduced duration
gsap.from(".hero-title", {
   opacity: 0,
   y: 30,
   duration: 0.8,
   ease: "power2.out"
});
gsap.from(".hero-btn", {
   opacity: 0,
   scale: 0.9,
   delay: 0.4,
   duration: 0.6
});

// 📸 Single ScrollTrigger for Gallery with will-change
gsap.from(".gallery-item", {
   scrollTrigger: {
      trigger: ".gallery-section",
      start: "top 75%",
      once: true, // Only animate once
   },
   opacity: 0,
   y: 50,
   stagger: 0.15,
   duration: 0.8,
   ease: "power2.out",
});

// 🖼️ Optimized Image Preview Modal
const modal = document.getElementById("previewModal");
const modalImg = document.getElementById("previewImage");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", (e) => {
   if (e.target.matches(".gallery-item img")) {
      modal.style.display = "flex";
      modalImg.src = e.target.dataset.src || e.target.src;
      gsap.fromTo(modalImg,
         { scale: 0.9, opacity: 0 },
         { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
   } else if (e.target === closeModal || e.target === modal) {
      gsap.to(modal, {
         opacity: 0,
         duration: 0.2,
         onComplete: () => {
            modal.style.display = "none";
            modal.style.opacity = 1;
         },
      });
   }
});

// REMOVED: Ember Generator and Scroll Embers
// These create constant DOM manipulation and kill performance

// ⚔️ Optimized Slayer Section Animation
gsap.from(".slayer-card", {
   scrollTrigger: {
      trigger: ".slayer-section",
      start: "top 80%",
      once: true
   },
   opacity: 0,
   y: 50,
   stagger: 0.15,
   duration: 0.8,
   ease: "power2.out",
});

// 💀 About Section Animation - Batched
ScrollTrigger.batch([".about-content", ".about-image"], {
   onEnter: (elements) => {
      gsap.from(elements, {
         opacity: 0,
         x: (i) => i === 0 ? -50 : 50,
         duration: 1,
         stagger: 0.2,
         ease: "power2.out",
      });
   },
   start: "top 80%",
   once: true,
});

// 🎥 Optimized Lazy Load for Images AND Videos
document.addEventListener("DOMContentLoaded", () => {
   const lazyMedia = document.querySelectorAll("img[data-src], video[data-src]");

   if ('IntersectionObserver' in window) {
      const mediaObserver = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               const media = entry.target;
               media.src = media.dataset.src;
               if (media.tagName === 'VIDEO') media.load();
               media.classList.add('loaded');
               observer.unobserve(media);
            }
         });
      }, {
         rootMargin: '50px',
         threshold: 0.01
      });

      lazyMedia.forEach((media) => mediaObserver.observe(media));
   } else {
      // Fallback for older browsers
      lazyMedia.forEach((media) => {
         media.src = media.dataset.src;
         if (media.tagName === 'VIDEO') media.load();
      });
   }
});

// Clean up ScrollTriggers when leaving page
window.addEventListener('beforeunload', () => {
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
