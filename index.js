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

// 🌊 Breathing Styles Animation - FIXED VERSION
window.addEventListener('load', function () {
   // Wait for everything to load, then initialize breathing styles
   setTimeout(() => {
      const styleCards = document.querySelectorAll('.style-card');

      if (styleCards.length > 0) {
         console.log('Found breathing style cards:', styleCards.length);

         // Use fromTo for better control
         gsap.fromTo(".style-card",
            {
               opacity: 0,
               y: 60
            },
            {
               opacity: 1,
               y: 0,
               stagger: 0.15,
               duration: 0.8,
               ease: "power2.out",
               scrollTrigger: {
                  trigger: ".breathing-styles",
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none none",
                  once: true,
                  onEnter: () => console.log('✅ Breathing styles animated!'),
                  onEnterBack: () => console.log('Back in view'),
               }
            }
         );

         // Interactive hover effects
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

         console.log('✅ Breathing styles animations initialized');
      } else {
         console.warn('⚠️ No breathing style cards found!');
      }
   }, 100); // Small delay to ensure DOM is ready
});


// 🌊 Breathing Style Detailed Data
// 🌊 Complete Breathing Style Data for ALL Main Characters
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

   flame: {
      name: "Flame Breathing",
      icon: "🔥",
      user: "Kyojuro Rengoku - Flame Hashira",
      image: "./assets/breathing/flamebreathing.jpg",
      description: "Flame Breathing is a Breathing Style that mimics flames and replicates it with the user's movements, techniques and abilities. Users visualize themselves seemingly creating and manipulating fire when unleashing its techniques. This style emphasizes powerful, overwhelming offensive techniques that consume everything in their path.",
      forms: [
         "First Form: Unknowing Fire",
         "Second Form: Rising Scorching Sun",
         "Third Form: Blazing Universe",
         "Fourth Form: Blooming Flame Undulation",
         "Fifth Form: Flame Tiger",
         "Ninth Form: Rengoku (Rengoku's Original)"
      ],
      battles: [
         "vs Enmu (Lower Moon 1) on Mugen Train",
         "vs Akaza (Upper Moon 3) - Legendary Final Stand"
      ],
      stats: {
         offensive: 95,
         defensive: 70,
         speed: 85
      }
   },

   thunder: {
      name: "Thunder Breathing",
      icon: "⚡",
      user: "Zenitsu Agatsuma",
      image: "./assets/breathing/thunderbreathing.jpg",
      description: "Thunder Breathing is a Breathing Style that mimics lightning, specifically swift strikes and movements akin to lightning ripping through the sky. Most techniques focus on a single, powerful strike delivered at blinding speed, requiring total concentration and explosive muscle power. Zenitsu perfected only the First Form but created his own Seventh Form.",
      forms: [
         "First Form: Thunderclap and Flash",
         "First Form: Thunderclap and Flash, Six Fold",
         "First Form: Thunderclap and Flash, Eight Fold",
         "First Form: Thunderclap and Flash, God Speed",
         "Second Form: Rice Spirit",
         "Third Form: Thunder Swarm",
         "Fourth Form: Distant Thunder",
         "Fifth Form: Heat Lightning",
         "Sixth Form: Rumble and Flash",
         "Seventh Form: Honoikazuchi no Kami (Zenitsu's Original)"
      ],
      battles: [
         "vs Tongue Demon",
         "vs Spider Demon (Son)",
         "vs Kaigaku (Upper Moon 6)",
         "vs Muzan Kibutsuji"
      ],
      stats: {
         offensive: 92,
         defensive: 65,
         speed: 98
      }
   },

   wind: {
      name: "Wind Breathing",
      icon: "💨",
      user: "Sanemi Shinazugawa - Wind Hashira",
      image: "./assets/breathing/windbreathing.jpg",
      description: "Wind Breathing is a Breathing Style that mimics wind, specifically powerful torrents of air and whirlwinds. Users can generate powerful gusts and slashing wind attacks. Known for its aggressive, unpredictable slashing movements that overwhelm opponents with relentless offense.",
      forms: [
         "First Form: Dust Whirlwind Cutter",
         "Second Form: Claws-Purifying Wind",
         "Third Form: Clean Storm Wind Tree",
         "Fourth Form: Rising Dust Storm",
         "Fifth Form: Cold Mountain Wind",
         "Sixth Form: Black Wind Mountain Mist",
         "Seventh Form: Gale, Sudden Gusts",
         "Eighth Form: Primary Gale Slash"
      ],
      battles: [
         "vs Kokushibo (Upper Moon 1)",
         "vs Muzan Kibutsuji - Final Battle"
      ],
      stats: {
         offensive: 93,
         defensive: 75,
         speed: 90
      }
   },

   stone: {
      name: "Stone Breathing",
      icon: "🪨",
      user: "Gyomei Himejima - Stone Hashira",
      image: "./assets/breathing/stonebreathing.jpg",

      description: "Stone Breathing is a Breathing Style that mimics earth and stone, specifically their strength and mass, and replicates it with the user's movements and techniques. This is considered the most powerful Breathing Style, emphasizing overwhelming strength and defensive capabilities. Gyomei is the strongest Hashira.",
      forms: [
         "First Form: Serpentinite Bipolar",
         "Second Form: Upper Smash",
         "Third Form: Stone Skin",
         "Fourth Form: Volcanic Rock, Rapid Conquest",
         "Fifth Form: Arcs of Justice"
      ],
      battles: [
         "vs Kokushibo (Upper Moon 1)",
         "vs Muzan Kibutsuji - Final Battle"
      ],
      stats: {
         offensive: 98,
         defensive: 95,
         speed: 75
      }
   },

   mist: {
      name: "Mist Breathing",
      icon: "🌫️",
      user: "Muichiro Tokito - Mist Hashira",
      image: "./assets/breathing/mistbreathing.jpg",
      description: "Mist Breathing is a Breathing Style derived from Wind Breathing. It mimics mist, specifically its obscurity and confusion properties. Techniques focus on disorienting opponents with erratic movements and creating visual illusions through speed. Muichiro, the youngest Hashira, mastered this style at age 14.",
      forms: [
         "First Form: Low Clouds, Distant Haze",
         "Second Form: Eight-Layered Mist",
         "Third Form: Scattering Mist Splash",
         "Fourth Form: Shifting Flow Slash",
         "Fifth Form: Sea of Clouds and Haze",
         "Sixth Form: Lunar Dispersing Mist",
         "Seventh Form: Obscuring Clouds (Muichiro's Original)"
      ],
      battles: [
         "vs Gyokko (Upper Moon 5)",
         "vs Kokushibo (Upper Moon 1)",
         "vs Muzan Kibutsuji"
      ],
      stats: {
         offensive: 88,
         defensive: 80,
         speed: 94
      }
   },

   insect: {
      name: "Insect Breathing",
      icon: "🦋",
      user: "Shinobu Kocho - Insect Hashira",
      image: "./assets/breathing/insectbreathing.jpg",
      description: "Insect Breathing is a Breathing Style derived from Flower Breathing, which itself derives from Water Breathing. This style focuses on using poison to kill demons since the user lacks the physical strength to decapitate them. Shinobu developed this unique style using wisteria poison.",
      forms: [
         "Butterfly Dance: Caprice",
         "Dance of the Bee Sting: True Flutter",
         "Dance of the Dragonfly: Compound Eye Hexagon",
         "Dance of the Centipede: Hundred-Legged Zigzag"
      ],
      battles: [
         "vs Spider Demon (Daughter)",
         "vs Doma (Upper Moon 2) - Sacrificial Battle"
      ],
      stats: {
         offensive: 75,
         defensive: 70,
         speed: 95
      }
   },

   serpent: {
      name: "Serpent Breathing",
      icon: "🐍",
      user: "Obanai Iguro - Serpent Hashira",
      image: "./assets/breathing/serpentbreathing.jpg",
      description: "Serpent Breathing is a Breathing Style derived from Water Breathing. This style mimics serpents, specifically their winding, twisting movements and venomous strikes. The techniques are unpredictable and can curve around obstacles, making it difficult to defend against.",
      forms: [
         "First Form: Winding Serpent Slash",
         "Second Form: Venom Fangs of the Narrow Head",
         "Third Form: Coil Choke",
         "Fourth Form: Twin-Headed Reptile",
         "Fifth Form: Slithering Serpent"
      ],
      battles: [
         "vs Nakime (Upper Moon 4)",
         "vs Muzan Kibutsuji - Final Battle"
      ],
      stats: {
         offensive: 87,
         defensive: 82,
         speed: 89
      }
   },

   sound: {
      name: "Sound Breathing",
      icon: "🎵",
      user: "Tengen Uzui - Sound Hashira",
      image: "./assets/breathing/soundbreathing.jpg",
      description: "Sound Breathing is a Breathing Style derived from Thunder Breathing. This flashy style combines physical might with explosive techniques, creating thunderous shockwaves. Tengen uses dual Nichirin cleavers and explosive beads, making him the most flamboyant fighter.",
      forms: [
         "First Form: Roar",
         "Fourth Form: Constant Resounding Slashes",
         "Fifth Form: String Performance"
      ],
      battles: [
         "vs Gyutaro and Daki (Upper Moon 6) - Epic Battle"
      ],
      stats: {
         offensive: 91,
         defensive: 78,
         speed: 92
      }
   },

   love: {
      name: "Love Breathing",
      icon: "💗",
      user: "Mitsuri Kanroji - Love Hashira",
      image: "./assets/breathing/lovebreathing.jpg",
      description: "Love Breathing is a Breathing Style derived from Flame Breathing. This unique style takes advantage of Mitsuri's special muscle composition (8 times denser than normal), allowing her to use a whip-like sword with incredible flexibility and speed. Her techniques are graceful yet devastatingly powerful.",
      forms: [
         "First Form: Shivers of First Love",
         "Second Form: Love Pangs",
         "Third Form: Catlove Shower",
         "Fifth Form: Swaying Love, Wildclaw",
         "Sixth Form: Cat-Legged Winds of Love"
      ],
      battles: [
         "vs Hantengu (Upper Moon 4)",
         "vs Muzan Kibutsuji - Final Battle"
      ],
      stats: {
         offensive: 89,
         defensive: 76,
         speed: 93
      }
   },

   beast: {
      name: "Beast Breathing",
      icon: "🐗",
      user: "Inosuke Hashibira",
      image: "./assets/breathing/beastbreathing.jpg",
      description: "Beast Breathing is a self-taught Breathing Style created by Inosuke after living in the mountains with wild boars. This savage style focuses on aggressive, animalistic attacks with dual serrated swords. Unlike other styles, it wasn't derived from any existing form and reflects Inosuke's wild instincts.",
      forms: [
         "First Fang: Pierce",
         "Second Fang: Rip and Tear",
         "Third Fang: Devour",
         "Fourth Fang: Slice 'n' Dice",
         "Fifth Fang: Crazy Cutting",
         "Sixth Fang: Palisade Bite",
         "Seventh Form: Spatial Awareness",
         "Eighth Fang: Explosive Rush",
         "Ninth Fang: Extending Bendy Slash",
         "Tenth Fang: Whirling Fangs",
         "Eleventh Fang: Sudden Throwing Strike"
      ],
      battles: [
         "vs Spider Demon (Father)",
         "vs Daki (Upper Moon 6)",
         "vs Doma (Upper Moon 2)",
         "vs Muzan Kibutsuji"
      ],
      stats: {
         offensive: 86,
         defensive: 72,
         speed: 87
      }
   },

   sun: {
      name: "Sun Breathing (Hinokami Kagura)",
      icon: "☀️",
      user: "Tanjiro Kamado",
      image: "./assets/breathing/sunbreathing.jpg",
      description: "Sun Breathing, also known as Hinokami Kagura, is the original Breathing Style from which all other styles were derived. This legendary technique was created by Yoriichi Tsugikuni and passed down in the Kamado family as a dance. It's the most powerful breathing style, effective against Muzan himself.",
      forms: [
         "Dance (Waltz)",
         "Clear Blue Sky",
         "Raging Sun",
         "Burning Bones, Summer Sun",
         "Setting Sun Transformation",
         "Solar Heat Haze",
         "Beneficent Radiance",
         "Sunflower Thrust",
         "Dragon Sun Halo Head Dance",
         "Fire Wheel",
         "Fake Rainbow",
         "Flame Dance",
         "Thirteenth Form (Combination of all forms)"
      ],
      battles: [
         "vs Rui (Lower Moon 5)",
         "vs Enmu (Lower Moon 1)",
         "vs Gyutaro (Upper Moon 6)",
         "vs Hantengu (Upper Moon 4)",
         "vs Akaza (Upper Moon 3)",
         "vs Muzan Kibutsuji - Final Battle"
      ],
      stats: {
         offensive: 96,
         defensive: 85,
         speed: 91
      }
   }
};





// Open breathing style modal
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

   // Set modal class for color theming
   modal.className = `breathing-modal active ${styleType}`;

   // Populate data
   document.getElementById('breathingBadge').textContent = data.icon;
   document.getElementById('breathingStyleName').textContent = data.name;
   document.getElementById('breathingUser').textContent = data.user;
   document.getElementById('breathingDesc').textContent = data.description;
   document.getElementById('breathingImage').src = data.image;
   document.getElementById('breathingImage').alt = data.user;

   // Populate forms list
   const formsList = document.getElementById('breathingFormsList');
   formsList.innerHTML = '';
   data.forms.forEach(form => {
      const li = document.createElement('li');
      li.textContent = form;
      formsList.appendChild(li);
   });

   // Populate battles list
   const battlesList = document.getElementById('breathingBattlesList');
   battlesList.innerHTML = '';
   data.battles.forEach(battle => {
      const li = document.createElement('li');
      li.textContent = battle;
      battlesList.appendChild(li);
   });

   // Animate stats
   setTimeout(() => {
      document.getElementById('statOffensive').style.width = data.stats.offensive + '%';
      document.getElementById('statDefensive').style.width = data.stats.defensive + '%';
      document.getElementById('statSpeed').style.width = data.stats.speed + '%';
   }, 100);

   // Animate modal entrance
   gsap.fromTo('.breathing-modal-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
   );

   // Prevent body scroll
   document.body.style.overflow = 'hidden';
}

// Close breathing modal
document.getElementById('closeBreathingModal').addEventListener('click', closeBreathingModal);
document.getElementById('breathingModal').addEventListener('click', function (e) {
   if (e.target === this) {
      closeBreathingModal();
   }
});

function closeBreathingModal() {
   const modal = document.getElementById('breathingModal');
   gsap.to('.breathing-modal-content', {
      opacity: 0,
      y: 30,
      duration: 0.3,
      onComplete: () => {
         modal.classList.remove('active');
         document.body.style.overflow = 'auto';
      }
   });
}

// Keyboard shortcut to close
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') {
      const modal = document.getElementById('breathingModal');
      if (modal.classList.contains('active')) {
         closeBreathingModal();
      }
   }
});



// 🧹 Clean up ScrollTriggers when leaving page
window.addEventListener('beforeunload', () => {
   ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
