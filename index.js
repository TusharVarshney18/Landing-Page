// ⚡ PERFORMANCE OPTIMIZED - Demon Slayer Website
// Make sure your HTML has: <script src="index.js" defer></script>

// Enable GSAP GPU acceleration
gsap.config({ force3D: true });
gsap.registerPlugin(ScrollTrigger);

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

// 🖼️ Demon Slayer Gallery - Using Compressed Local Images
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

const gallery = document.getElementById("gallery");
if (gallery) {
   demonSlayerImages.forEach((url, index) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `<img data-src="${url}" alt="Demon Slayer Character ${index + 1}" loading="lazy" />`;
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

// 🌊 PARALLAX EFFECTS - Performance Optimized
// Only run on desktop for better mobile performance
const isDesktop = window.innerWidth > 768;

if (isDesktop) {
   // Hero Section Parallax
   gsap.to(".video-bg video", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
         trigger: ".hero",
         start: "top top",
         end: "bottom top",
         scrub: 1.5,
      }
   });

   gsap.to(".hero-title", {
      yPercent: -50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
         trigger: ".hero",
         start: "top top",
         end: "bottom top",
         scrub: 1,
      }
   });

   gsap.to(".hero-btn", {
      yPercent: -30,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
         trigger: ".hero",
         start: "top top",
         end: "bottom top",
         scrub: 1,
      }
   });

   // About Section Parallax
   gsap.to(".about-image img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
         trigger: ".about-section",
         start: "top bottom",
         end: "bottom top",
         scrub: 2,
      }
   });

   // Gallery Items Parallax (variable speeds)
   gsap.utils.toArray(".gallery-item").forEach((item, i) => {
      const speed = 0.5 + (i % 3) * 0.2;
      gsap.to(item, {
         yPercent: (1 - speed) * 30,
         ease: "none",
         scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
         }
      });
   });

   // Enemy Cards Parallax
   gsap.utils.toArray(".enemy-card").forEach((card) => {
      gsap.to(card, {
         y: -50,
         ease: "none",
         scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
         }
      });
   });
}

// 📸 Single ScrollTrigger for Gallery Animation
gsap.from(".gallery-item", {
   scrollTrigger: {
      trigger: ".gallery-section",
      start: "top 75%",
      once: true,
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

// 👹 Animate Enemy Cards
gsap.from(".enemy-card", {
   scrollTrigger: {
      trigger: ".enemies-section",
      start: "top 80%",
      once: true
   },
   opacity: 0,
   y: 50,
   stagger: 0.2,
   duration: 0.8,
   ease: "power2.out",
});

// 🎥 OPTIMIZED: Lazy Load for Images AND Videos
document.addEventListener("DOMContentLoaded", () => {
   const lazyImages = document.querySelectorAll("img[data-src]");
   const lazyVideos = document.querySelectorAll("video[data-src]");

   // Lazy load images
   if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               const img = entry.target;
               img.src = img.dataset.src;
               img.classList.add('loaded');
               observer.unobserve(img);
            }
         });
      }, {
         rootMargin: '50px',
         threshold: 0.01
      });

      lazyImages.forEach((img) => imageObserver.observe(img));
   } else {
      lazyImages.forEach((img) => img.src = img.dataset.src);
   }

   // Lazy load videos
   if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               const video = entry.target;
               const source = video.querySelector("source[data-src]");

               if (source) {
                  source.src = source.dataset.src;
                  video.load();
               } else if (video.dataset.src) {
                  video.src = video.dataset.src;
                  video.load();
               }

               video.classList.add('loaded');
               observer.unobserve(video);
            }
         });
      }, {
         rootMargin: '100px',
         threshold: 0.01
      });

      lazyVideos.forEach((video) => videoObserver.observe(video));
   } else {
      lazyVideos.forEach((video) => {
         const source = video.querySelector("source[data-src]");
         if (source) {
            source.src = source.dataset.src;
            video.load();
         }
      });
   }
});

// 🧹 Clean up ScrollTriggers when leaving page
window.addEventListener('beforeunload', () => {
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
