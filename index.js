//navbar
// ⚔️ Navbar GSAP Animation
window.addEventListener("load", () => {
   gsap.to(".navbar", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
   });

   gsap.from(".nav-links a", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.5,
      ease: "back.out(1.7)",
   });
});

// 🍔 Toggle Menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
   menuToggle.classList.toggle("active");
   navLinks.classList.toggle("active");
});

// 🩸 Scroll effect for navbar
window.addEventListener("scroll", () => {
   const navbar = document.querySelector(".navbar");
   if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
   } else {
      navbar.classList.remove("scrolled");
   }
});







window.demonSlayerImages = [
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

// 🩸 Add images dynamically
const gallery = document.getElementById("gallery");
window.demonSlayerImages.forEach((url) => {
   const div = document.createElement("div");
   div.className = "gallery-item";
   div.innerHTML = `<img src="${url}" alt="Demon Slayer Scene" />`;
   gallery.appendChild(div);
});

// 🔥 Hero animations
gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1.2, ease: "power3.out" });
gsap.from(".hero-btn", { opacity: 0, scale: 0.8, delay: 0.8, duration: 1 });

// ⚔️ Scroll-triggered gallery animations
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

document.querySelectorAll(".gallery-item img").forEach((img) => {
   img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
      gsap.fromTo(
         modalImg,
         { scale: 0.8, opacity: 0 },
         { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
   });
});

closeModal.addEventListener("click", () => {
   gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
         modal.style.display = "none";
         modal.style.opacity = 1;
      },
   });
});

// Close modal on background click
modal.addEventListener("click", (e) => {
   if (e.target === modal) closeModal.click();
});


// 🔥 Fire Blade Intro Animation
window.addEventListener("load", () => {
   const tl = gsap.timeline({
      onComplete: () => {
         gsap.to("#fireIntro", {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            onComplete: () => document.getElementById("fireIntro").remove(),
         });
      },
   });

   const fireSlash = document.querySelector(".fire-slash");
   const sound = document.getElementById("slashSound");

   // Play sound when slash starts
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
      .to(fireSlash, {
         rotate: 10,
         scaleY: 10,
         opacity: 0,
         duration: 0.3,
         ease: "power2.inOut",
      })
      .to(fireSlash, { opacity: 0, duration: 0.3 });
});

// 🔥 Random ember particles
function createEmbers(count) {
   const container = document.getElementById("fireIntro");
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



gsap.from(".slayer-card", {
   scrollTrigger: {
      trigger: ".slayer-section",
      start: "top 85%",
   },
   opacity: 0,
   y: 100,
   stagger: 0.2,
   duration: 1,
   ease: "power3.out",
});



// 🌌 Scroll Reactive Embers (Mugen Train vibe)
gsap.registerPlugin(ScrollTrigger);

let emberContainer = document.createElement("div");
emberContainer.classList.add("scroll-embers");
document.body.appendChild(emberContainer);

// Create random floating embers
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

// Trigger embers as you scroll
ScrollTrigger.create({
   trigger: document.body,
   start: "top top",
   end: "bottom bottom",
   onUpdate: (self) => {
      if (self.direction === 1) {
         spawnScrollEmbers();
      }
   },
});





gsap.from(".about-content", {
   scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
   },
   opacity: 0,
   x: -100,
   duration: 1.5,
   ease: "power4.out",
});

gsap.from(".about-image", {
   scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
   },
   opacity: 0,
   x: 100,
   duration: 1.5,
   ease: "power4.out",
});




// 👹 Demon Enemies Carousel Animation
gsap.to(".enemies-grid", {
   xPercent: -100,
   repeat: -1,
   duration: 40,
   ease: "linear",
   modifiers: {
      xPercent: gsap.utils.wrap(-100, 0),
   },
});


// 👁️ Scroll-triggered fade-in
gsap.from(".enemies-section .enemy-card", {
   opacity: 0,
   y: 100,
   stagger: 0.3,
   duration: 1,
   scrollTrigger: {
      trigger: ".enemies-section",
      start: "top 80%",
   },
});
