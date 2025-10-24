

// 🚀 FORCED REFLOW FIX - Add at very top
gsap.config({
   force3D: true,
   nullTargetWarn: false,
   autoSleep: 60
});

// Disable heavy animations on mobile
const isMobile = window.innerWidth <= 768;
if (isMobile) {
   gsap.globalTimeline.timeScale(0.7); // Slow down all animations on mobile
   ScrollTrigger.config({
      syncInterval: 150, // Reduce scroll checks
      ignoreMobileResize: true
   });
}

gsap.registerPlugin(ScrollTrigger);

// ✅ Optimized Navbar Animation - Reduced complexity
document.addEventListener("DOMContentLoaded", () => {
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

// 🖼️ OPTIMIZED Gallery - Load images progressively
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
   // Create fragment to batch DOM updates
   const fragment = document.createDocumentFragment();

   demonSlayerImages.forEach((url, index) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `<img data-src="${url}" alt="Demon Slayer Character ${index + 1}" loading="lazy" width="300" height="300" />`;
      fragment.appendChild(div);
   });

   // Add all at once (single reflow)
   gallery.appendChild(fragment);
}

// 🎬 Optimized Hero Animation
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

// 🌊 PARALLAX EFFECTS - Only desktop, OPTIMIZED
if (!isMobile) {
   // Hero parallax with reduced scrub
   gsap.to(".video-bg video", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
         trigger: ".hero",
         start: "top top",
         end: "bottom top",
         scrub: true, // Changed from 1.5 to true (faster)
         invalidateOnRefresh: true
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
         scrub: true,
         invalidateOnRefresh: true
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
         scrub: true,
         invalidateOnRefresh: true
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
         scrub: true,
         invalidateOnRefresh: true
      }
   });
}

// 📸 FIXED: Gallery Animation - Batch processing, NO parallax
ScrollTrigger.batch(".gallery-item", {
   onEnter: (batch) => {
      gsap.from(batch, {
         opacity: 0,
         y: 50,
         stagger: 0.1, // Reduced from 0.15
         duration: 0.6, // Reduced from 0.8
         ease: "power2.out",
         clearProps: "all" // Clean up after animation
      });
   },
   start: "top 85%", // Start earlier
   once: true
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

// 💀 About Section Animation - Batched
ScrollTrigger.batch([".about-content", ".about-image"], {
   onEnter: (elements) => {
      gsap.from(elements, {
         opacity: 0,
         x: (i) => i === 0 ? -50 : 50,
         duration: 0.8,
         stagger: 0.2,
         ease: "power2.out",
         clearProps: "all"
      });
   },
   start: "top 80%",
   once: true,
});

// 👹 Enemy Cards - Batch animation
ScrollTrigger.batch(".enemy-card", {
   onEnter: (batch) => {
      gsap.from(batch, {
         opacity: 0,
         y: 50,
         stagger: 0.15,
         duration: 0.7,
         ease: "power2.out",
         clearProps: "all"
      });
   },
   start: "top 85%",
   once: true
});

// 🎥 OPTIMIZED: Lazy Load for Images AND Videos
document.addEventListener("DOMContentLoaded", () => {
   const lazyImages = document.querySelectorAll("img[data-src]");
   const lazyVideos = document.querySelectorAll("video[data-src]");

   // Lazy load images with reduced threshold
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
         rootMargin: isMobile ? '100px' : '200px', // Load earlier on mobile
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
         rootMargin: isMobile ? '150px' : '100px',
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

// 🌊 Breathing Styles Animation - OPTIMIZED
window.addEventListener('load', function () {
   setTimeout(() => {
      const styleCards = document.querySelectorAll('.style-card');

      if (styleCards.length > 0) {
         // Batch animation for all cards
         ScrollTrigger.batch(".style-card", {
            onEnter: (batch) => {
               gsap.from(batch, {
                  opacity: 0,
                  y: 40,
                  stagger: 0.1,
                  duration: 0.6,
                  ease: "power2.out",
                  clearProps: "all"
               });
            },
            start: "top 85%",
            once: true
         });

         // Interactive hover effects - Only on desktop
         if (!isMobile) {
            styleCards.forEach(card => {
               card.addEventListener('mouseenter', function () {
                  const icon = this.querySelector('.style-icon');
                  if (icon) {
                     gsap.to(icon, {
                        scale: 1.2,
                        rotation: 10,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                     });
                  }
               });

               card.addEventListener('mouseleave', function () {
                  const icon = this.querySelector('.style-icon');
                  if (icon) {
                     gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                     });
                  }
               });
            });
         }
      }
   }, 50); // Reduced from 100ms
});

// 🌊 Breathing Style Data (keep your existing data object here)
const breathingStylesData = {
   water: {
      name: "Water Breathing",
      icon: "🌊",
      user: "Giyu Tomioka - Water Hashira",
      image: "./assets/breathing/waterbreathing.jpg",
      description: "Water Breathing is one of the five main Breathing Styles directly derived from Sun Breathing. This versatile style emphasizes fluid, adaptable movements that flow like water, allowing practitioners to adapt to any situation. It focuses on both offensive and defensive techniques, making it one of the most balanced fighting styles.",
      forms: [
         "First Form: Water Surface Slash",
         "Second Form: Water Wheel",
         "Third Form: Flowing Dance",
         "Fourth Form: Striking Tide",
         "Fifth Form: Blessed Rain After the Drought",
         "Sixth Form: Whirlpool",
         "Seventh Form: Drop Ripple Thrust",
         "Eighth Form: Waterfall Basin",
         "Ninth Form: Splashing Water Flow",
         "Tenth Form: Constant Flux",
         "Eleventh Form: Dead Calm (Giyu's Original)"
      ],
      battles: [
         "vs Spider Demon (Lower Moon 5)",
         "vs Rui (Lower Moon 5)",
         "vs Akaza (Upper Moon 3)",
         "Final Battle against Muzan Kibutsuji"
      ],
      stats: {
         offensive: 85,
         defensive: 90,
         speed: 88
      }
   },
   // ... (keep all your other breathing styles data)
};

// Modal functions (keep your existing modal code)
document.querySelectorAll('.style-card').forEach(card => {
   card.addEventListener('click', function () {
      const style = this.dataset.style;
      const data = breathingStylesData[style];

      if (data) {
         openBreathingModal(style, data);
      }
   });
});

function openBreathingModal(styleType, data) {
   const modal = document.getElementById('breathingModal');
   modal.className = `breathing-modal active ${styleType}`;

   document.getElementById('breathingBadge').textContent = data.icon;
   document.getElementById('breathingStyleName').textContent = data.name;
   document.getElementById('breathingUser').textContent = data.user;
   document.getElementById('breathingDesc').textContent = data.description;
   document.getElementById('breathingImage').src = data.image;
   document.getElementById('breathingImage').alt = data.user;

   const formsList = document.getElementById('breathingFormsList');
   formsList.innerHTML = '';
   data.forms.forEach(form => {
      const li = document.createElement('li');
      li.textContent = form;
      formsList.appendChild(li);
   });

   const battlesList = document.getElementById('breathingBattlesList');
   battlesList.innerHTML = '';
   data.battles.forEach(battle => {
      const li = document.createElement('li');
      li.textContent = battle;
      battlesList.appendChild(li);
   });

   setTimeout(() => {
      document.getElementById('statOffensive').style.width = data.stats.offensive + '%';
      document.getElementById('statDefensive').style.width = data.stats.defensive + '%';
      document.getElementById('statSpeed').style.width = data.stats.speed + '%';
   }, 100);

   gsap.fromTo('.breathing-modal-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
   );

   document.body.style.overflow = 'hidden';
}

function closeBreathingModal() {
   const modal = document.getElementById('breathingModal');
   gsap.to('.breathing-modal-content', {
      opacity: 0,
      y: 20,
      duration: 0.2,
      onComplete: () => {
         modal.classList.remove('active');
         document.body.style.overflow = 'auto';
      }
   });
}

document.getElementById('closeBreathingModal')?.addEventListener('click', closeBreathingModal);
document.getElementById('breathingModal')?.addEventListener('click', function (e) {
   if (e.target === this) closeBreathingModal();
});

document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') {
      const modal = document.getElementById('breathingModal');
      if (modal?.classList.contains('active')) {
         closeBreathingModal();
      }
   }
});

// 🧹 Clean up ScrollTriggers
window.addEventListener('beforeunload', () => {
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
