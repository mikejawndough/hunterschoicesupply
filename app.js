// Supernatural Fanshop: Hunter's Choice Supply
// Core Application Logic

// ==========================================
// SHOPIFY STOREFRONT API CONFIGURATION
// To load products from Shopify, set active to true and enter your credentials.
// ==========================================
const SHOPIFY_CONFIG = {
  active: true, // Set to true to load catalog live from Shopify!
  shopDomain: "hunterschoicesupply.myshopify.com",
  storefrontAccessToken: "4c5023ab985c3b05bdf2a3a552fb38c6",
  apiVersion: "2023-10"
};

// 1. Product Database (with Custom Inline SVGs)
const PRODUCTS = [
  {
    id: "silver-blade",
    name: "Hunter's Silver Blade",
    price: 89.99,
    category: "gear",
    badge: "Essential",
    cursed: false,
    description: "Hand-forged pure carbon steel blade electroplated with high-grade sterling silver. Perfect for dispatching wearwolves, skinwalkers, and various shapeshifters. Includes a leather sheath engraved with a protective symbol.",
    lore: "John's Journal: 'shapeshifters are killed by silver to the heart. Clean strike. Keep it polished.'",
    stats: {
      "Lethality": "High (Against Vulnerable)",
      "Material": "Sterling Silver Plated Steel",
      "Vulnerability Match": "Shapeshifters, Werewolves",
      "Maintenance": "Polishing required after contact"
    },
    svgIcon: `
      <path d="M 50 15 L 60 45 L 53 45 L 53 80 L 47 80 L 47 45 L 40 45 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="43" y1="80" x2="57" y2="80" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M 50 80 L 50 90" stroke="currentColor" stroke-width="4"/>
      <circle cx="50" cy="90" r="2" fill="currentColor"/>
    `
  },
  {
    id: "winchester-journal",
    name: "John Winchester's Journal Replica",
    price: 125.00,
    category: "lore",
    badge: "Collector",
    cursed: false,
    description: "An exact replica of the legendary leather-bound journal. Contains 80 pages of detailed sketches, monster weaknesses, newspaper clippings, exorcism rituals, and handwritten notes compiled by John Winchester himself.",
    lore: "Dean's Diary: 'Dad's journal is the holy grail. Tells us everything we need to kill whatever is in the dark.'",
    stats: {
      "Page Count": "80 illustrated pages",
      "Binding": "Faux Weathered Leather",
      "Lore Rating": "Maximum (5/5)",
      "Includes": "Lock pick set mockup & newspaper slips"
    },
    svgIcon: `
      <rect x="25" y="15" width="50" height="70" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="32" y1="15" x2="32" y2="85" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <!-- Straps -->
      <path d="M 25 35 H 75" stroke="currentColor" stroke-width="2"/>
      <path d="M 25 65 H 75" stroke="currentColor" stroke-width="2"/>
      <rect x="55" y="32" width="10" height="6" fill="var(--bg-secondary)" stroke="currentColor" stroke-width="1"/>
      <rect x="55" y="62" width="10" height="6" fill="var(--bg-secondary)" stroke="currentColor" stroke-width="1"/>
    `
  },
  {
    id: "winchester-flannel",
    name: "Winchester Signature Flannel",
    price: 49.99,
    category: "apparel",
    badge: "Comfort",
    cursed: false,
    description: "Heavy-duty cotton plaid flannel shirt in classic forest green and black. Built to withstand rough investigations, cemetery digging, and cold nights in the Impala. Features reinforced elbows.",
    lore: "Bobby's Advice: 'Dress like a blue-collar worker. Look normal. No one suspects a couple of guys in flannel.'",
    stats: {
      "Material": "100% Heavy Brushed Cotton",
      "Fit": "Relaxed Hunter Fit",
      "Pockets": "Dual chest button pockets",
      "Durability": "Washed, pre-shrunk, dirt-resistant"
    },
    svgIcon: `
      <path d="M 20 20 L 35 15 L 50 25 L 65 15 L 80 20 L 75 45 L 68 45 L 68 85 L 32 85 L 32 45 L 25 45 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <!-- Plaid details -->
      <line x1="38" y1="25" x2="38" y2="85" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="62" y1="25" x2="62" y2="85" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="50" y1="25" x2="50" y2="85" stroke="currentColor" stroke-width="1.5"/>
      <line x1="32" y1="50" x2="68" y2="50" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
      <line x1="32" y1="70" x2="68" y2="70" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
    `
  },
  {
    id: "salt-iron-kit",
    name: "Salt & Iron Protection Kit",
    price: 29.99,
    category: "gear",
    badge: "Essential",
    cursed: false,
    description: "A compact wooden box containing two cylinders of rock salt (sourced from active mines) and a 6-inch forged iron railroad spike. Essential for sealing window thresholds and fending off angry spirits.",
    lore: "John's Journal: 'Spirits and demons cannot cross a line of pure salt. Forged iron disperses spirit forms instantly.'",
    stats: {
      "Salt Volume": "2x 150g containers",
      "Iron Content": "99% pure forged iron spike",
      "Effectiveness": "Ghost containment & demon stalling",
      "Box Type": "Anti-possession stamped dark wood"
    },
    svgIcon: `
      <rect x="25" y="30" width="50" height="45" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
      <line x1="25" y1="42" x2="75" y2="42" stroke="currentColor" stroke-width="1.5"/>
      <!-- Lock latch -->
      <rect x="46" y="38" width="8" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <!-- Salt shaker small outline -->
      <path d="M 33 50 H 43 V 68 H 33 Z" stroke="currentColor" stroke-width="1"/>
      <!-- Iron spike small outline -->
      <path d="M 57 50 H 63 L 60 68 Z" stroke="currentColor" stroke-width="1"/>
    `
  },
  {
    id: "hex-bag",
    name: "Cursed Witch's Hex Bag",
    price: 34.99,
    category: "artifacts",
    badge: "Artifact",
    cursed: true, // SPIKES EMF METER!
    description: "A dark, hand-stitched burlap pouch bound with twine. Contains mock ritual herbs, bones, and ancient talismans. Warning: Keep away from your electronics. Highly radioactive in EMF waves.",
    lore: "Bobby's Notes: 'Witches use hex bags to cast deadly curses from a distance. If you find one, burn it immediately.'",
    stats: {
      "Paranormal Output": "Dangerously High",
      "Warning": "Will cause extreme EMF spikes!",
      "Contents": "Burlap pouch, chicken bones (mock), runic coins",
      "Cure": "Burn in fire to break the curse"
    },
    svgIcon: `
      <path d="M 35 30 Q 50 45, 65 30 Q 70 65, 50 80 Q 30 65, 35 30 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <!-- Tied string -->
      <ellipse cx="50" cy="40" rx="10" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <path d="M 45 40 Q 38 48, 42 55" stroke="currentColor" stroke-width="1.5"/>
      <path d="M 55 40 Q 62 48, 58 55" stroke="currentColor" stroke-width="1.5"/>
      <!-- Patch details -->
      <rect x="42" y="52" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
    `
  },
  {
    id: "deans-amulet",
    name: "Dean's Amulet (Samulet)",
    price: 39.99,
    category: "artifacts",
    badge: "Replica",
    cursed: false,
    description: "An authentic metal replica of the bronze amulet Sam gave to Dean as a Christmas gift. Depicts a horned deity face. Hangs on a durable black cord. Said to glow in the presence of God.",
    lore: "Castiel: 'This amulet is very rare. It is an instrument... it can detect God.'",
    stats: {
      "Finish": "Antique Bronze Plated Alloy",
      "Pendant Size": "2.2 inches",
      "Cord Length": "24 inches adjustable",
      "Sentimental Value": "Infinite"
    },
    svgIcon: `
      <!-- Amulet outline resembling a face with horns -->
      <path d="M 50 25 C 45 25, 42 35, 42 45 C 42 60, 48 75, 50 78 C 52 75, 58 60, 58 45 C 58 35, 55 25, 50 25 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <!-- Horns -->
      <path d="M 42 35 C 32 30, 30 18, 38 18 C 42 18, 43 25, 42 35" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <path d="M 58 35 C 68 30, 70 18, 62 18 C 58 18, 57 25, 58 35" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <!-- Loop ring -->
      <circle cx="50" cy="20" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    `
  },
  {
    id: "emf-detector-device",
    name: "Classic EMF Detector (Active)",
    price: 79.99,
    category: "gear",
    badge: "Interactive",
    cursed: false,
    description: "A replica of the modified Walkman EMF detector used by Sam and Dean. Displays 5 indicator LEDs and has a ticking meter dial. (Includes a light sensor circuit that buzzes/ticks faster as ambient electromagnetic frequencies change).",
    lore: "Dean's Journal: 'Modified a tape player to capture EMF waves. Spikes near spirits, ghosts, and black magic.'",
    stats: {
      "Frequencies": "Reads 50Hz to 20,000Hz",
      "Lights": "5-stage LED strip gauge",
      "Power": "9V battery (not included)",
      "Materials": "Vintage grey ABS housing"
    },
    svgIcon: `
      <rect x="28" y="20" width="44" height="65" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
      <!-- Speaker grill circles -->
      <circle cx="50" cy="65" r="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- Meter dial -->
      <path d="M 38 45 A 12 12 0 0 1 62 45" stroke="currentColor" stroke-width="1.5"/>
      <line x1="50" y1="45" x2="44" y2="38" stroke="currentColor" stroke-width="2"/>
      <!-- LED indicator dots -->
      <circle cx="38" cy="27" r="2" fill="currentColor"/>
      <circle cx="44" cy="27" r="2" fill="currentColor"/>
      <circle cx="50" cy="27" r="2" fill="currentColor"/>
      <circle cx="56" cy="27" r="2" fill="currentColor"/>
      <circle cx="62" cy="27" r="2" fill="currentColor"/>
    `
  },
  {
    id: "angel-blade",
    name: "Archangel Blade Replica",
    price: 95.00,
    category: "gear",
    badge: "Replica",
    cursed: false,
    description: "A gorgeous, solid metal replica of the triangular dagger wielded by Angels of the Lord. Highly polished silver finish with a comfortable, ergonomically detailed twisted grip handle.",
    lore: "Castiel: 'An angel blade can kill angels, archangels, demons, and reapers. Do not handle lightly.'",
    stats: {
      "Material": "Chrome Polished Solid Stainless Steel",
      "Length": "18.5 inches total",
      "Shape": "Triangular three-sided blade",
      "Weight": "1.8 lbs"
    },
    svgIcon: `
      <!-- Triple-edged blade path -->
      <path d="M 50 10 L 56 60 L 52 62 L 52 85 L 48 85 L 48 62 L 44 60 Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <!-- Twisted handle details -->
      <line x1="48" y1="67" x2="52" y2="70" stroke="currentColor" stroke-width="1.5"/>
      <line x1="48" y1="73" x2="52" y2="76" stroke="currentColor" stroke-width="1.5"/>
      <line x1="48" y1="79" x2="52" y2="82" stroke="currentColor" stroke-width="1.5"/>
      <!-- Center spine ridge -->
      <line x1="50" y1="10" x2="50" y2="60" stroke="currentColor" stroke-width="1"/>
    `
  },
  {
    id: "devils-trap-decal",
    name: "Devil's Trap Rug Decal",
    price: 34.99,
    category: "artifacts",
    badge: "Defensive",
    cursed: false,
    description: "A 3-foot circular vinyl rug containing a meticulously printed Devil's Trap. Perfect for placing under carpets, at thresholds, or in the center of your training room. Guaranteed to trap lower to mid-tier demons.",
    lore: "Dean Winchester: 'Once they walk inside, they can't leave. They lose their mojo. Easy interrogation.'",
    stats: {
      "Diameter": "36 inches (3 feet)",
      "Material": "Heavy-duty non-slip vinyl",
      "Symbolism": "Pentagram with planetary glyphs",
      "Sturdiness": "Scuff-resistant, washable"
    },
    svgIcon: `
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 2"/>
      <polygon points="50,19 74,68 20,38 80,38 26,68" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <!-- Small planetary glyph mock indicators -->
      <circle cx="50" cy="27" r="1.5" fill="currentColor"/>
      <circle cx="70" cy="62" r="1.5" fill="currentColor"/>
      <circle cx="30" cy="62" r="1.5" fill="currentColor"/>
      <circle cx="75" cy="42" r="1.5" fill="currentColor"/>
      <circle cx="25" cy="42" r="1.5" fill="currentColor"/>
    `
  }
];

// 2. Typewriter Quote Loop
const HERO_QUOTES = [
  "Saving people, hunting things, the family business.",
  "Keep your salt lines fresh and your iron loaded.",
  "Driver picks the music, shotgun shuts his cakehole.",
  "Yesterday was Tuesday, but today is Tuesday too!",
  "I'm the one who gripped you tight and raised you from perdition."
];

class Typewriter {
  constructor(elementId, quotes, speed = 80, pause = 2500) {
    this.element = document.getElementById(elementId);
    this.quotes = quotes;
    this.speed = speed;
    this.pause = pause;
    this.quoteIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    if (this.element) {
      this.type();
    }
  }

  type() {
    const currentQuote = this.quotes[this.quoteIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentQuote.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentQuote.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.speed;

    if (!this.isDeleting && this.charIndex === currentQuote.length) {
      // Pause at full quote
      delay = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
      delay = 500; // Small pause before typing next
    } else if (this.isDeleting) {
      delay /= 2; // Delete faster
    }

    setTimeout(() => this.type(), delay);
  }
}

// 3. Web Audio API EMF Click Synthesizer
class EMFAudioSynth {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.clickIntervalId = null;
    this.intensity = 0; // 0 to 1
    // Load volume preference; default to true (muted) to comply with browser autoplay blocks
    const saved = localStorage.getItem("scanner_audio_muted");
    this.muted = saved !== "false";
  }

  init() {
    if (this.muted) return; // Keep AudioContext inactive if explicitly muted
    if (this.audioCtx) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return;
    }
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("scanner_audio_muted", this.muted.toString());
    if (!this.muted) {
      this.init();
    }
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Synthesize short static pop/click sound
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    osc.type = 'triangle';
    // Randomize pitch slightly for organic geiger sound
    osc.frequency.setValueAtTime(80 + Math.random() * 200, this.audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.25 * this.intensity, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  setIntensity(val) {
    this.intensity = val; // 0 to 1
    
    if (val > 0) {
      this.init();
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.startLoop();
      }
    } else {
      this.stopLoop();
    }
  }

  startLoop() {
    this.stopLoop();
    const scheduleNext = () => {
      if (!this.isPlaying || this.intensity === 0) return;
      
      this.playClick();
      
      // Higher intensity = faster ticks
      const minDelay = 40; // ms
      const maxDelay = 800; // ms
      const delay = maxDelay - (this.intensity * (maxDelay - minDelay)) + (Math.random() * 50 - 25);
      
      this.clickIntervalId = setTimeout(scheduleNext, Math.max(minDelay, delay));
    };
    
    scheduleNext();
  }

  stopLoop() {
    this.isPlaying = false;
    if (this.clickIntervalId) {
      clearTimeout(this.clickIntervalId);
      this.clickIntervalId = null;
    }
  }
}

// 4. Shop State Manager
class ShopApp {
  constructor() {
    this.products = [...PRODUCTS]; // Default to local mock products
    // State
    this.cart = this.loadCartFromStorage();
    this.appliedPromo = null;
    this.currentCategory = "all";
    this.searchQuery = "";
    this.audioSynth = new EMFAudioSynth();
    
    // Elements
    this.productGrid = document.getElementById("product-grid");
    this.searchInput = document.getElementById("search-input");
    this.filterButtonsContainer = document.getElementById("filter-buttons");
    this.cartBadge = document.getElementById("cart-badge");
    this.cartItemsContainer = document.getElementById("cart-items");
    this.cartSubtotal = document.getElementById("cart-subtotal");
    this.cartDiscount = document.getElementById("cart-discount");
    this.cartDiscountRow = document.getElementById("cart-discount-row");
    this.cartTotal = document.getElementById("cart-total");
    this.promoInput = document.getElementById("promo-input");
    this.promoApplyBtn = document.getElementById("promo-apply-btn");
    this.promoFeedback = document.getElementById("promo-feedback");
    
    // EMF elements
    this.emfMeter = document.getElementById("emf-meter");
    this.emfNeedle = document.getElementById("emf-needle");
    this.emfStatus = document.getElementById("emf-status");
    
    // Modals
    this.detailModal = document.getElementById("detail-modal");
    this.detailContent = document.getElementById("detail-content");
    this.checkoutModal = document.getElementById("checkout-modal");
    this.receiptBox = document.getElementById("receipt-box");
    this.audioToggleBtn = document.getElementById("audio-toggle-btn");
    
    // Init actions
    this.initTypewriter();
    this.initEvents();
    this.initCatalog(); // Async load Shopify or local products
    this.updateCartUI();
    this.initQuiz();
    this.updateAudioToggleUI(this.audioSynth.muted);
    this.initAmbientEMF();
  }

  loadCartFromStorage() {
    const saved = localStorage.getItem("hunters_cart");
    return saved ? JSON.parse(saved) : [];
  }

  saveCartToStorage() {
    localStorage.setItem("hunters_cart", JSON.stringify(this.cart));
  }

  initTypewriter() {
    new Typewriter("hero-quote-text", HERO_QUOTES);
  }

  initEvents() {
    // Search
    this.searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderProducts();
    });

    // Filters
    this.filterButtonsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      
      this.filterButtonsContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      this.currentCategory = btn.dataset.category;
      this.renderProducts();
    });

    // Add to cart / View details / EMF hover interaction (Event delegation on product grid)
    this.productGrid.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".card-add-btn");
      const viewBtn = e.target.closest(".card-view-btn");
      
      if (addBtn) {
        const id = addBtn.dataset.id;
        this.addToCart(id);
      }
      
      if (viewBtn) {
        const id = viewBtn.dataset.id;
        this.showDetailsModal(id);
      }
    });

    // Proximity EMF hover engine
    this.productGrid.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".product-card");
      if (!card) {
        this.resetEMFMeter();
        return;
      }
      
      const isCursed = card.dataset.cursed === "true";
      if (!isCursed) {
        this.resetEMFMeter();
        return;
      }
      
      // Calculate cursor distance to card center to scale needle intensity!
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const dx = e.clientX - cardCenterX;
      const dy = e.clientY - cardCenterY;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      // Max effect at center, decays over 300px
      const maxDist = 250;
      let intensity = 1 - (distance / maxDist);
      intensity = Math.max(0, Math.min(1, intensity)); // clamp 0-1
      
      this.triggerEMFSpike(intensity);
    });

    this.productGrid.addEventListener("mouseleave", () => {
      this.resetEMFMeter();
    });

    // Cart Popover controls
    const cartDrawer = document.getElementById("cart-drawer");
    
    // Cart actions (Quantity edits & item removals)
    this.cartItemsContainer.addEventListener("click", (e) => {
      const qtyBtn = e.target.closest(".qty-btn");
      const removeBtn = e.target.closest(".cart-item-remove");
      
      if (qtyBtn) {
        const id = qtyBtn.dataset.id;
        const change = parseInt(qtyBtn.dataset.change);
        this.updateQuantity(id, change);
      }
      
      if (removeBtn) {
        const id = removeBtn.dataset.id;
        this.removeFromCart(id);
      }
    });

    // Promo code apply
    this.promoApplyBtn.addEventListener("click", () => this.applyPromoCode());
    this.promoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.applyPromoCode();
    });

    // Checkout Modal open
    document.getElementById("checkout-btn").addEventListener("click", () => {
      if (this.cart.length === 0) {
        alert("Your trunk is empty! Grab some salt before patrolling.");
        return;
      }
      // Hide cart popover
      if (cartDrawer.hidePopover) {
        cartDrawer.hidePopover();
      } else {
        cartDrawer.setAttribute("style", "display: none;");
      }
      this.triggerCheckout();
    });

    // Detail modal closing
    document.getElementById("detail-close-btn").addEventListener("click", () => {
      this.detailModal.close();
    });

    // Fallback for click outside details dialog (light-dismiss)
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      this.detailModal.addEventListener('click', (event) => {
        if (event.target !== this.detailModal) return;
        const rect = this.detailModal.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          this.detailModal.close();
        }
      });
    }

    // Receipt modal return
    document.getElementById("receipt-close-btn").addEventListener("click", () => {
      this.checkoutModal.close();
    });

    // Logo hover EMF trigger
    const logoContainer = document.querySelector(".logo-container");
    if (logoContainer) {
      logoContainer.addEventListener("mousemove", (e) => {
        this.triggerEMFSpike(0.9);
      });
      logoContainer.addEventListener("mouseleave", () => {
        this.resetEMFMeter();
      });
    }

    // Audio Toggle Button
    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering full EMF click behavior
        const isMutedNow = this.audioSynth.toggleMute();
        this.updateAudioToggleUI(isMutedNow);
        if (!isMutedNow) {
          // Play a brief test sweep to verify sound is active
          this.triggerEMFSpike(0.4);
          setTimeout(() => this.resetEMFMeter(), 200);
        }
      });
    }

    // EMF meter click to unmute/test
    if (this.emfMeter) {
      this.emfMeter.addEventListener("click", () => {
        if (this.audioSynth.muted) {
          this.audioSynth.toggleMute();
          this.updateAudioToggleUI(false);
        } else {
          this.audioSynth.init();
        }
        // Give a short mock audio check beep
        this.triggerEMFSpike(0.5);
        setTimeout(() => this.resetEMFMeter(), 250);
      });
    }
  }

  // EMF Meter Engine
  triggerEMFSpike(intensity) {
    // Spiking needle rotation: -70deg (Safe) to +70deg (Danger)
    const angle = -70 + (intensity * 140) + (Math.random() * 10 - 5);
    this.emfNeedle.style.transform = `rotate(${angle}deg)`;
    this.emfNeedle.classList.add("spiking");
    
    if (intensity > 0.15) {
      this.emfStatus.textContent = intensity > 0.7 ? "DANGER (5)" : `ALERT (${Math.ceil(intensity * 5)})`;
      this.emfStatus.className = "emf-status spike";
      this.audioSynth.setIntensity(intensity);
    } else {
      this.resetEMFMeter();
    }
  }

  resetEMFMeter() {
    this.emfNeedle.style.transform = "rotate(-70deg)";
    this.emfNeedle.classList.remove("spiking");
    this.emfStatus.textContent = "Safe";
    this.emfStatus.className = "emf-status";
    this.audioSynth.setIntensity(0);
  }

  updateAudioToggleUI(isMuted) {
    if (this.audioToggleBtn) {
      this.audioToggleBtn.textContent = isMuted ? "🔇" : "🔊";
      this.audioToggleBtn.title = isMuted ? "Unmute audio scanner feed" : "Mute audio scanner feed";
    }
  }

  // Catalog Renderer
  renderProducts() {
    let filtered = this.products.filter(prod => {
      const matchCat = this.currentCategory === "all" || 
                        (SHOPIFY_CONFIG.active ? (prod.collections && prod.collections.includes(this.currentCategory)) : prod.category === this.currentCategory);
      const matchSearch = prod.name.toLowerCase().includes(this.searchQuery) || 
                          prod.description.toLowerCase().includes(this.searchQuery) ||
                          prod.category.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.productGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem 0;">
          <p>No weapons matching your query were found in our store archives.</p>
        </div>
      `;
      return;
    }

    this.productGrid.innerHTML = filtered.map(prod => `
      <article class="product-card" data-id="${prod.id}" data-cursed="${prod.cursed}">
        <div class="product-image-container">
          <span class="product-badge ${prod.cursed ? 'cursed' : ''}">${prod.badge}</span>
          ${prod.imageUrl ? 
            `<img src="${prod.imageUrl}" alt="${prod.name}" style="width:100%; height:100%; object-fit:contain; padding:1.5rem; filter: drop-shadow(0 0 8px rgba(0,0,0,0.5));">` :
            `<svg class="product-svg-icon" viewBox="0 0 100 100">${prod.svgIcon}</svg>`
          }
        </div>
        <div class="product-content">
          <span class="product-category">${prod.category}</span>
          <h3 class="product-title">${prod.name}</h3>
          <span class="product-price">$${prod.price.toFixed(2)}</span>
          <div class="product-card-footer">
            <button class="card-view-btn" data-id="${prod.id}">Details</button>
            <button class="gold-btn card-add-btn" data-id="${prod.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add
            </button>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Cart Management
  addToCart(id) {
    // User interacted - initialize audio context
    this.audioSynth.init();

    const product = this.products.find(p => p.id === id);
    if (!product) return;

    const existing = this.cart.find(item => item.product.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.saveCartToStorage();
    this.updateCartUI();

    // Declarative or JS open of popover drawer
    const drawer = document.getElementById("cart-drawer");
    if (drawer.showPopover) {
      drawer.showPopover();
    }
  }

  updateQuantity(id, change) {
    const item = this.cart.find(item => item.product.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    this.saveCartToStorage();
    this.updateCartUI();
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.product.id !== id);
    this.saveCartToStorage();
    this.updateCartUI();
  }

  updateCartUI() {
    // Count badge
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartBadge.textContent = totalCount;
    this.cartBadge.style.display = totalCount > 0 ? "flex" : "none";

    // Drawer list
    if (this.cart.length === 0) {
      this.cartItemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <p>Your trunk trunk is currently empty.</p>
          <p style="font-size: 0.8rem; margin-top: 0.5rem;">Secure some gear before heading out!</p>
        </div>
      `;
    } else {
      this.cartItemsContainer.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          ${item.product.imageUrl ? 
            `<img class="cart-item-icon" src="${item.product.imageUrl}" alt="${item.product.name}" style="object-fit:contain; padding: 2px;">` :
            `<svg class="cart-item-icon" viewBox="0 0 100 100">${item.product.svgIcon}</svg>`
          }
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.product.name}</h4>
            <span class="cart-item-price">$${item.product.price.toFixed(2)}</span>
            <div class="cart-item-quantity">
              <button class="qty-btn" data-id="${item.product.id}" data-change="-1">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" data-id="${item.product.id}" data-change="1">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.product.id}">&times;</button>
        </div>
      `).join("");
    }

    // Calculations
    const subtotal = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    let discount = 0;
    
    if (this.appliedPromo) {
      if (this.appliedPromo.type === "percent") {
        discount = subtotal * this.appliedPromo.value;
      }
    }

    const total = Math.max(0, subtotal - discount);

    this.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    if (discount > 0) {
      this.cartDiscount.textContent = `-$${discount.toFixed(2)}`;
      this.cartDiscountRow.style.display = "flex";
    } else {
      this.cartDiscountRow.style.display = "none";
    }
    
    this.cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Promo Codes Engine
  applyPromoCode() {
    const code = this.promoInput.value.trim().toUpperCase();
    if (!code) return;

    this.promoFeedback.className = "promo-feedback";
    this.promoFeedback.style.display = "none";

    // Codes validation
    if (code === "FIRSTTRUNK") {
      this.appliedPromo = { code, type: "percent", value: 0.10 };
      this.promoFeedback.textContent = "10% First Time Discount Applied!";
      this.promoFeedback.className = "promo-feedback success";
    } else if (code === "BABY1967") {
      this.appliedPromo = { code, type: "percent", value: 0.15 };
      this.promoFeedback.textContent = "15% Hunter Discount Applied!";
      this.promoFeedback.className = "promo-feedback success";
    } else if (code === "SAMMY") {
      this.appliedPromo = { code, type: "percent", value: 0.10 };
      this.promoFeedback.textContent = "10% Sammy Discount Applied!";
      this.promoFeedback.className = "promo-feedback success";
    } else if (code === "PIE") {
      // Custom Easter Egg Promo
      this.appliedPromo = { code, type: "percent", value: 0.05 };
      this.promoFeedback.textContent = "5% off & Dean's Cherry Pie added to trunk!";
      this.promoFeedback.className = "promo-feedback success";
      
      // Inject cherry pie item if not in cart
      const pieId = "deans-pie";
      const hasPie = this.cart.some(item => item.product.id === pieId);
      if (!hasPie) {
        const pieProduct = {
          id: pieId,
          name: "Dean's Perfect Cherry Pie",
          price: 0.00,
          category: "apparel", // categorized as food/treat
          svgIcon: `
            <path d="M 20 60 Q 50 35, 80 60 Q 80 75, 50 80 Q 20 75, 20 60 Z" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M 20 60 H 80" stroke="currentColor" stroke-width="1.5"/>
            <!-- Flaky slits -->
            <line x1="45" y1="48" x2="48" y2="44" stroke="currentColor" stroke-width="1.5"/>
            <line x1="55" y1="48" x2="52" y2="44" stroke="currentColor" stroke-width="1.5"/>
            <!-- Twists -->
            <circle cx="50" cy="40" r="1.5" fill="currentColor"/>
          `
        };
        this.cart.push({ product: pieProduct, quantity: 1 });
        this.saveCartToStorage();
      }
    } else {
      this.promoFeedback.textContent = "Invalid code. Check Bobby's coordinates.";
      this.promoFeedback.className = "promo-feedback error";
      this.appliedPromo = null;
    }

    this.updateCartUI();
  }

  // Modals Display
  showDetailsModal(id) {
    const prod = this.products.find(p => p.id === id);
    if (!prod) return;

    // Build journal page content
    const statsHTML = Object.entries(prod.stats || {}).map(([lbl, val]) => `
      <div class="journal-stats-row">
        <span class="journal-label">${lbl}:</span>
        <span class="journal-value">${val}</span>
      </div>
    `).join("");

    this.detailContent.innerHTML = `
      <div class="detail-grid">
        <div class="detail-left">
          ${prod.imageUrl ? 
            `<img src="${prod.imageUrl}" alt="${prod.name}" style="width:100%; height:100%; object-fit:contain; max-height:220px; filter: drop-shadow(0 0 10px rgba(0,0,0,0.6));">` : 
            `<svg viewBox="0 0 100 100">${prod.svgIcon}</svg>`
          }
        </div>
        <div class="detail-right">
          <div class="detail-badge-row">
            <span class="detail-badge ${prod.cursed ? 'danger' : ''}">${prod.badge}</span>
            <span class="detail-badge">${prod.category}</span>
          </div>
          <h3 class="detail-title font-title">${prod.name}</h3>
          <p class="detail-desc">${prod.description}</p>
          
          <div class="journal-stats">
            <h4 class="journal-stats-title">Winchester Journal Entry</h4>
            ${statsHTML || '<p style="font-size: 0.8rem; font-style: italic; color: var(--text-muted)">No journal entries logged yet.</p>'}
            <p style="font-size: 0.8rem; font-style: italic; color: var(--accent-gold); margin-top: 0.75rem;">
              "${prod.lore}"
            </p>
          </div>

          <div class="detail-price-row">
            <span class="detail-price">$${prod.price.toFixed(2)}</span>
            <button class="red-btn" id="modal-add-btn" data-id="${prod.id}">Add to Trunk</button>
          </div>
        </div>
      </div>
    `;

    // Modal add button
    document.getElementById("modal-add-btn").addEventListener("click", () => {
      this.addToCart(prod.id);
      this.detailModal.close();
    });

    this.detailModal.showModal();
  }

  async triggerCheckout() {
    if (SHOPIFY_CONFIG.active) {
      try {
        const checkoutUrl = await this.createShopifyCheckout();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      } catch (err) {
        console.error("Shopify Checkout creation failed, using local simulator:", err);
        alert("Shopify checkout failed. Running simulation instead.");
      }
    }

    const orderNumber = "W" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString();
    
    const subtotal = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    let discount = 0;
    if (this.appliedPromo) {
      if (this.appliedPromo.type === "percent") {
        discount = subtotal * this.appliedPromo.value;
      }
    }
    const total = Math.max(0, subtotal - discount);

    const itemsHTML = this.cart.map(item => `
      <div class="receipt-row">
        <span>${item.product.name} (x${item.quantity})</span>
        <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join("");

    this.receiptBox.innerHTML = `
      <div class="receipt-row" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
        <span>ORDER #${orderNumber}</span>
        <span>${date}</span>
      </div>
      ${itemsHTML}
      <div class="receipt-row" style="margin-top: 0.5rem;">
        <span>Subtotal:</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      ${discount > 0 ? `
      <div class="receipt-row" style="color: #28a745;">
        <span>Promo Discount (${this.appliedPromo.code}):</span>
        <span>-$${discount.toFixed(2)}</span>
      </div>
      ` : ""}
      <div class="receipt-row total">
        <span>TOTAL SEALED:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    `;

    // Show checkout modal & animate
    this.checkoutModal.showModal();

    // Clear cart state
    this.cart = [];
    this.appliedPromo = null;
    this.promoInput.value = "";
    this.saveCartToStorage();
    this.updateCartUI();
  }

  // Shopify Integration Methods
  async initCatalog() {
    if (SHOPIFY_CONFIG.active) {
      try {
        const shopifyProds = await this.fetchShopifyProducts();
        if (shopifyProds && shopifyProds.length > 0) {
          this.products = shopifyProds;
          this.renderShopifyCollectionFilters();
        }
      } catch (err) {
        console.error("Shopify integration error, falling back to local database:", err);
      }
    }
    this.renderProducts();
  }

  async fetchShopifyProducts() {
    const query = `
      query GetProductsAndCollections {
        collections(first: 10) {
          edges {
            node {
              title
              handle
            }
          }
        }
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              productType
              vendor
              handle
              tags
              collections(first: 5) {
                edges {
                  node {
                    handle
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const url = `https://${SHOPIFY_CONFIG.shopDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const json = await response.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    // Map and store collections
    const collections = json.data.collections.edges.map(edge => ({
      title: edge.node.title,
      handle: edge.node.handle
    }));
    this.shopifyCollections = collections;

    const edges = json.data.products.edges;
    return edges.map(edge => {
      const node = edge.node;
      const variantNode = node.variants.edges[0]?.node;
      const imageNode = node.images.edges[0]?.node;
      const price = variantNode ? parseFloat(variantNode.price.amount) : 0;
      
      // Get all collection handles this product belongs to
      const productCollections = node.collections.edges.map(e => e.node.handle);

      let category = "gear";
      const typeLower = (node.productType || "").toLowerCase();
      const tags = node.tags.map(t => t.toLowerCase());

      if (typeLower.includes("apparel") || tags.includes("apparel")) {
        category = "apparel";
      } else if (typeLower.includes("book") || typeLower.includes("journal") || tags.includes("lore") || tags.includes("books")) {
        category = "lore";
      } else if (typeLower.includes("artifact") || tags.includes("artifacts") || tags.includes("cursed")) {
        category = "artifacts";
      }

      // Check if product is cursed or is an artifact to trigger the EMF meter behind the scenes
      const isCursed = tags.includes("cursed") || 
                       tags.includes("artifact") || 
                       node.title.toLowerCase().includes("hex bag") || 
                       node.title.toLowerCase().includes("amulet") || 
                       node.title.toLowerCase().includes("blade");

      const stats = {
        "Vendor": node.vendor || "Hunter's Choice Supply",
        "Type": node.productType || "Gear",
        "Shopify ID": node.id.split("/").pop()
      };

      let svgIcon = PRODUCTS[0].svgIcon;
      const matchedLocal = PRODUCTS.find(p => p.id === node.handle || node.title.toLowerCase().includes(p.name.toLowerCase()));
      if (matchedLocal) {
        svgIcon = matchedLocal.svgIcon;
      } else {
        if (category === "apparel") svgIcon = PRODUCTS[2].svgIcon;
        else if (category === "lore") svgIcon = PRODUCTS[1].svgIcon;
        else if (category === "artifacts") svgIcon = PRODUCTS[4].svgIcon;
      }

      return {
        id: node.id,
        name: node.title,
        price: price,
        category: category,
        collections: productCollections,
        badge: isCursed ? "Artifact" : (tags.includes("essential") ? "Essential" : "Gear"),
        cursed: isCursed,
        description: node.description,
        lore: tags.find(t => t.startsWith("lore:"))?.replace("lore:", "") || "A specialized hunter resource.",
        stats: stats,
        svgIcon: svgIcon,
        shopifyVariantId: variantNode?.id,
        imageUrl: imageNode?.url
      };
    });
  }

  renderShopifyCollectionFilters() {
    if (!this.shopifyCollections || this.shopifyCollections.length === 0) return;

    // Start with "All Gear"
    let buttonsHTML = `<button class="filter-btn active" data-category="all">All Gear</button>`;

    // Add buttons for each collection
    buttonsHTML += this.shopifyCollections.map(col => `
      <button class="filter-btn" data-category="${col.handle}">${col.title}</button>
    `).join("");

    this.filterButtonsContainer.innerHTML = buttonsHTML;
  }

  async createShopifyCheckout() {
    const lineItems = this.cart.map(item => ({
      variantId: item.product.shopifyVariantId || item.product.id,
      quantity: item.quantity
    }));

    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            webUrl
          }
          checkoutUserErrors {
            message
          }
        }
      }
    `;

    const url = `https://${SHOPIFY_CONFIG.shopDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_CONFIG.storefrontAccessToken
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: { lineItems }
        }
      })
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const json = await response.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    const errors = json.data.checkoutCreate.checkoutUserErrors;
    if (errors && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return json.data.checkoutCreate.checkout.webUrl;
  }

  // 5. Hunter's Quiz Engine
  initQuiz() {
    const quizData = [
      {
        q: "What is the primary substance used to create boundary lines that ghosts and demons cannot cross?",
        options: ["Cold Iron", "Holy Water", "Rock Salt", "Grave Dust"],
        correct: 2 // Rock Salt
      },
      {
        q: "Which model and year is the Winchesters' iconic muscle car, affectionately known as 'Baby'?",
        options: ["1967 Chevrolet Impala", "1969 Dodge Charger", "1970 Ford Mustang", "1968 Chevrolet Camaro"],
        correct: 0 // 1967 Chevrolet Impala
      },
      {
        q: "What specialized weapon is required to permanently kill a demon without exorcising them?",
        options: ["Silver Blade", "Ruby's Ancient Knife", "Angel Blade", "First Blade"],
        correct: 1 // Ruby's Ancient Knife
      },
      {
        q: "Which ancient angel raised Dean Winchester from hell and became their closest celestial ally?",
        options: ["Uriel", "Gabriel", "Michael", "Castiel"],
        correct: 3 // Castiel
      }
    ];

    let currentQ = 0;
    let score = 0;
    const quizContainer = document.getElementById("quiz-container");

    const renderAlreadyPassedScreen = () => {
      quizContainer.innerHTML = `
        <div class="quiz-results" style="display: flex; flex-direction: column; align-items: center;">
          <span class="quiz-badge">Lore Certification: Active</span>
          <h3 class="quiz-results-title">Lore Master Certified</h3>
          <p class="quiz-results-desc">Welcome back, Hunter! You have already passed the Lore Assessment and earned your official Hunter's Certification. Keep your salt lines fresh and your iron loaded.</p>
          
          <div class="certification-badge" style="margin: 1.5rem 0; text-align: center;">
            <svg viewBox="0 0 100 100" style="width: 100px; height: 100px; stroke: var(--accent-gold); fill: none; stroke-width: 2; filter: drop-shadow(0 0 8px var(--accent-gold-glow));">
              <circle cx="50" cy="50" r="45" stroke-dasharray="4 2" />
              <polygon points="50,15 78,75 15,38 85,38 22,75" />
              <circle cx="50" cy="50" r="10" />
            </svg>
            <span style="display: block; font-family: var(--font-title); color: var(--accent-gold); font-size: 1.1rem; margin-top: 0.8rem; letter-spacing: 0.05em;">Authorized Demon Slayer</span>
          </div>
          
          <p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-top: 0.5rem;">Certification is locked to 1 per hunter trunk.</p>
        </div>
      `;
    };

    const renderQuestion = () => {
      // Enforce single claim via local storage
      if (localStorage.getItem("hunters_quiz_passed") === "true") {
        renderAlreadyPassedScreen();
        return;
      }

      if (currentQ >= quizData.length) {
        renderResults();
        return;
      }

      const qData = quizData[currentQ];
      const progress = (currentQ / quizData.length) * 100;

      quizContainer.innerHTML = `
        <span class="quiz-badge">Hunter's Certification</span>
        <h3 class="quiz-title">Lore Knowledge Assessment</h3>
        
        <div class="quiz-progress">
          <div class="quiz-progress-bar" style="width: ${progress}%"></div>
        </div>

        <div class="quiz-question-container">
          <p class="quiz-question">${qData.q}</p>
          <div class="quiz-options">
            ${qData.options.map((opt, idx) => `
              <button class="quiz-option" data-idx="${idx}">
                <span style="font-family: var(--font-title); color: var(--accent-gold);">${String.fromCharCode(65 + idx)}.</span>
                ${opt}
              </button>
            `).join("")}
          </div>
        </div>
      `;

      const optionButtons = quizContainer.querySelectorAll(".quiz-option");
      optionButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          const selectedIdx = parseInt(btn.dataset.idx);
          const correctIdx = qData.correct;
          
          optionButtons.forEach(b => b.style.pointerEvents = "none");

          if (selectedIdx === correctIdx) {
            score++;
            btn.classList.add("correct");
          } else {
            btn.classList.add("incorrect-selected");
            optionButtons[correctIdx].classList.add("correct");
          }

          setTimeout(() => {
            currentQ++;
            renderQuestion();
          }, 1500);
        });
      });
    };

    const renderResults = () => {
      const isPass = score === quizData.length;
      
      if (isPass) {
        // Seal the pass state locally
        localStorage.setItem("hunters_quiz_passed", "true");

        quizContainer.innerHTML = `
          <div class="quiz-results" style="display: flex; flex-direction: column; align-items: center;">
            <span class="quiz-badge">Assessment: Passed</span>
            <h3 class="quiz-results-title">Lore Master Certified</h3>
            <p class="quiz-results-desc">Impressive! You answered all questions correctly. Bobby Singer would be proud. You have successfully claimed your Hunter's Certification badge.</p>
            
            <div class="certification-badge" style="margin: 1.5rem 0; text-align: center;">
              <svg viewBox="0 0 100 100" style="width: 100px; height: 100px; stroke: var(--accent-gold); fill: none; stroke-width: 2; filter: drop-shadow(0 0 8px var(--accent-gold-glow));">
                <circle cx="50" cy="50" r="45" stroke-dasharray="4 2" />
                <polygon points="50,15 78,75 15,38 85,38 22,75" />
                <circle cx="50" cy="50" r="10" />
              </svg>
              <span style="display: block; font-family: var(--font-title); color: var(--accent-gold); font-size: 1.1rem; margin-top: 0.8rem; letter-spacing: 0.05em;">Authorized Demon Slayer</span>
            </div>
            
            <p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-top: 0.5rem;">Certification is locked to 1 per hunter trunk.</p>
          </div>
        `;
      } else {
        quizContainer.innerHTML = `
          <div class="quiz-results">
            <span class="quiz-badge" style="color: var(--accent-red)">Assessment: Failed</span>
            <h3 class="quiz-results-title" style="color: var(--accent-red)">Back to the Archives</h3>
            <p class="quiz-results-desc">You scored ${score} out of ${quizData.length}. In the field, a mistake like that gets you ghosted. Study John's journal and try again to claim your certification.</p>
            <button class="gold-btn" id="quiz-reset-btn">Consult the Lore (Retry)</button>
          </div>
        `;

        document.getElementById("quiz-reset-btn").addEventListener("click", () => {
          currentQ = 0;
          score = 0;
          renderQuestion();
        });
      }
    };

    renderQuestion();
  }

  // 6. Ambient EMF Engine (Spiritual Sweeps)
  initAmbientEMF() {
    setInterval(() => {
      // Don't trigger if the user is already hovering over an EMF trigger
      if (this.audioSynth.intensity > 0) return;
      
      // 30% chance every 40 seconds
      if (Math.random() > 0.3) return;
      
      // Simulate ambient entity passing by: needle spikes, static plays, LED warning flashes, then fades
      let duration = 3000;
      let start = Date.now();
      
      const sweep = () => {
        let elapsed = Date.now() - start;
        if (elapsed >= duration) {
          this.resetEMFMeter();
          return;
        }
        
        let progress = elapsed / duration;
        let intensity = 0;
        if (progress < 0.2) {
          intensity = (progress / 0.2) * 0.8;
        } else {
          intensity = 0.8 * (1 - (progress - 0.2) / 0.8);
        }
        
        this.triggerEMFSpike(intensity);
        requestAnimationFrame(sweep);
      };
      
      sweep();
    }, 40000);
  }
}

// 6. Application Bootstrapper
document.addEventListener("DOMContentLoaded", () => {
  window.shopApp = new ShopApp();
  
  // Auto-unlock Web Audio context on first user click or key press anywhere
  const unlockAudio = () => {
    if (window.shopApp && window.shopApp.audioSynth) {
      window.shopApp.audioSynth.init();
    }
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
    document.removeEventListener("touchstart", unlockAudio);
  };
  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);
  document.addEventListener("touchstart", unlockAudio);
});
