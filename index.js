// ✅ Navbar Animation
window.addEventListener("load", () => {
   gsap.to(".navbar", { y: 0, opacity: 1, duration: 1, ease: "power4.out" });

   gsap.from(".nav-links a", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.5,
      ease: "back.out(1.7)",
   });
});

// 🍔 Toggle Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
   menuToggle.classList.toggle("active");
   navLinks.classList.toggle("active");
});

// 🩸 Scroll Navbar Effect
window.addEventListener("scroll", () => {
   const navbar = document.querySelector(".navbar");
   if (window.scrollY > 80) navbar.classList.add("scrolled");
   else navbar.classList.remove("scrolled");
});

// 🖼️ Demon Slayer Gallery
const demonSlayerImages = [
   "https://4kwallpapers.com/images/walls/thumbs_2t/23652.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23653.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23651.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23649.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23648.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23647.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23646.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23644.jpg",
   "https://4kwallpapers.com/images/walls/thumbs_2t/23643.jpg",
];

gsap.registerPlugin(ScrollTrigger);

const gallery = document.getElementById("gallery");
if (gallery) {
   demonSlayerImages.forEach((url) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `<img src="${url}" alt="Demon Slayer Scene" loading="lazy" />`;
      gallery.appendChild(div);
   });
}

// 🎬 Hero Animation
gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1.2, ease: "power3.out" });
gsap.from(".hero-btn", { opacity: 0, scale: 0.8, delay: 0.8, duration: 1 });

// 📸 Scroll Animation for Gallery
gsap.from(".gallery-item", {
   scrollTrigger: {
      trigger: ".gallery-section",
      start: "top 80%",
   },
   opacity: 0,
   y: 100,
   stagger: 0.2,
   duration: 1,
   ease: "power3.out",
});

// 🖼️ Image Preview Modal
const modal = document.getElementById("previewModal");
const modalImg = document.getElementById("previewImage");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", (e) => {
   if (e.target.matches(".gallery-item img")) {
      modal.style.display = "flex";
      modalImg.src = e.target.src;
      gsap.fromTo(modalImg, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
   } else if (e.target === closeModal || e.target === modal) {
      gsap.to(modal, {
         opacity: 0,
         duration: 0.3,
         onComplete: () => {
            modal.style.display = "none";
            modal.style.opacity = 1;
         },
      });
   }
});

// 🔥 Fire Blade Intro
window.addEventListener("load", () => {
   const tl = gsap.timeline({
      onComplete: () => {
         gsap.to("#fireIntro", {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            onComplete: () => document.getElementById("fireIntro")?.remove(),
         });
      },
   });

   const fireSlash = document.querySelector(".fire-slash");
   const sound = document.getElementById("slashSound");

   if (fireSlash && sound) {
      tl.to(fireSlash, {
         width: "100%",
         duration: 0.6,
         ease: "power4.out",
         onStart: () => {
            sound.currentTime = 0;
            sound.play().catch(() => { });
            createEmbers(20);
         },
      })
         .to(fireSlash, { rotate: 10, scaleY: 10, opacity: 0, duration: 0.3, ease: "power2.inOut" })
         .to(fireSlash, { opacity: 0, duration: 0.3 });
   }
});

// 🧨 Ember Generator
function createEmbers(count) {
   const container = document.getElementById("fireIntro");
   if (!container) return;
   for (let i = 0; i < count; i++) {
      const ember = document.createElement("div");
      ember.classList.add("ember");
      ember.style.left = Math.random() * 100 + "vw";
      ember.style.top = 50 + Math.random() * 50 + "vh";
      ember.style.animationDuration = 1.5 + Math.random() + "s";
      ember.style.animationDelay = Math.random() * 0.5 + "s";
      container.appendChild(ember);
      setTimeout(() => ember.remove(), 2500);
   }
}

// ⚔️ Slayer Section Animation
gsap.from(".slayer-card", {
   scrollTrigger: { trigger: ".slayer-section", start: "top 85%" },
   opacity: 0,
   y: 100,
   stagger: 0.2,
   duration: 1,
   ease: "power3.out",
});

// 🌌 Scrolling Embers
const emberContainer = document.createElement("div");
emberContainer.classList.add("scroll-embers");
document.body.appendChild(emberContainer);

function spawnScrollEmbers() {
   for (let i = 0; i < 8; i++) {
      const ember = document.createElement("div");
      ember.classList.add("scroll-ember");
      ember.style.left = Math.random() * 100 + "vw";
      ember.style.top = 100 + Math.random() * 50 + "vh";
      emberContainer.appendChild(ember);
      gsap.to(ember, {
         y: -200 - Math.random() * 100,
         x: Math.random() * 30 - 15,
         opacity: 0,
         duration: 3 + Math.random() * 2,
         ease: "power1.out",
         onComplete: () => ember.remove(),
      });
   }
}

ScrollTrigger.create({
   trigger: document.body,
   start: "top top",
   end: "bottom bottom",
   onUpdate: (self) => {
      if (self.direction === 1) spawnScrollEmbers();
   },
});

// 💀 About Section Animation
gsap.from(".about-content", {
   scrollTrigger: { trigger: ".about-section", start: "top 80%" },
   opacity: 0,
   x: -100,
   duration: 1.5,
   ease: "power4.out",
});

gsap.from(".about-image", {
   scrollTrigger: { trigger: ".about-section", start: "top 80%" },
   opacity: 0,
   x: 100,
   duration: 1.5,
   ease: "power4.out",
});



// 🎥 Lazy Load Videos (fixed version)
document.addEventListener("DOMContentLoaded", () => {
   const lazyVideos = document.querySelectorAll("video[data-src]");
   const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            const video = entry.target;
            if (!video.src) video.src = video.dataset.src;
            video.load();
            obs.unobserve(video);
         }
      });
   }, { threshold: 0.25 });

   lazyVideos.forEach((video) => observer.observe(video));
});

