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
    id: "silver-blade-tee",
    name: "Silver Blade Graphic Tee",
    price: 24.99,
    category: "apparel",
    badge: "Premium",
    cursed: false,
    description: "A premium 100% ring-spun cotton tee featuring a custom, highly detailed silver blade print. Soft to the touch and built to last through long road trips and active patrols.",
    lore: "John's Journal: 'Always pack a silver graphic. Blend in with civilians. Stay comfortable in the heat.'",
    stats: {
      "Fabric": "100% Combed Ring-spun Cotton",
      "Print Type": "Direct-to-Garment (DTG) print",
      "Fit": "Relaxed Unisex Fit",
      "Sizes": "S to 3XL"
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
    name: "Winchester Journal Notebook",
    price: 19.99,
    category: "lore",
    badge: "New",
    cursed: false,
    description: "A 150-page ruled hardcover notebook featuring a detailed John Winchester journal mock-up cover print. Perfect for keeping track of your thoughts, daily schedules, or monster research.",
    lore: "Dean: 'Write it down. Every detail. That's how we remember what we're fighting.'",
    stats: {
      "Page Count": "150 lined pages",
      "Cover Print": "High-gloss John Winchester journal wrap",
      "Paper Style": "50lb text weight ruled paper",
      "Size": "6 x 8 inches"
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
    badge: "Classic",
    cursed: false,
    description: "Heavy-duty cotton plaid flannel shirt in classic forest green and black. Built to withstand rough investigations, cemetery digs, and cold nights in the Impala.",
    lore: "Bobby's Advice: 'Dress like a blue-collar worker. Look normal. No one suspects a couple of guys in flannel.'",
    stats: {
      "Material": "100% Heavy Brushed Cotton",
      "Fit": "Relaxed Hunter Fit",
      "Pockets": "Dual chest button pockets",
      "Sizes": "S to 2XL"
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
    id: "salt-iron-mug",
    name: "Salt & Iron Ceramic Mug",
    price: 14.99,
    category: "gear",
    badge: "Best Seller",
    cursed: false,
    description: "An 11oz high-grade white ceramic coffee mug featuring a classic Salt & Iron Protection design. A perfect way to ward off spirits while enjoying your morning brew. Dishwasher and microwave safe.",
    lore: "John's Journal: 'Spirits and demons cannot cross a line of pure salt. Keep it close to your coffee.'",
    stats: {
      "Volume": "11oz (325ml)",
      "Material": "100% white ceramic",
      "Care": "Dishwasher & Microwave safe",
      "Print": "Double-sided sublimation print"
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
    id: "hex-bag-tote",
    name: "Witch Hex Bag Canvas Tote",
    price: 18.99,
    category: "artifacts",
    badge: "Accessories",
    cursed: false,
    description: "A heavy-weight cotton canvas tote bag featuring a high-resolution printed witch hex bag graphic. Ideal for carrying notebooks, laptops, or groceries on the road.",
    lore: "Bobby's Notes: 'Witches use hex bags to cast curses from a distance. Use this tote to carry your books instead.'",
    stats: {
      "Material": "10oz 100% Cotton Canvas",
      "Dimensions": "15 x 15 inches",
      "Strap Drop": "11-inch reinforced handles",
      "Capacity": "Holds up to 20 lbs"
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
    name: "Dean's Amulet Replica Necklace",
    price: 15.00,
    category: "artifacts",
    badge: "Replica",
    cursed: false,
    description: "An authentic metal replica of the bronze amulet Sam gave to Dean as a Christmas gift. Hangs on a durable, adjustable black cord. An essential piece of fan memorabilia.",
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
    id: "emf-detector-hoodie",
    name: "EMF Detector Graphic Hoodie",
    price: 39.99,
    category: "apparel",
    badge: "Printed",
    cursed: false,
    description: "A cozy cotton-blend fleece hoodie featuring a detailed, glow-in-the-dark styled EMF activity meter graphic print. Perfect for staying warm while scanning the perimeter.",
    lore: "Dean's Journal: 'Modified tape players read EMF. Keep a hoodie ready for night cases.'",
    stats: {
      "Fabric": "50% Cotton, 50% Polyester fleece",
      "Weight": "8.0 oz/yd² midweight",
      "Print": "Durable screen-print graphic",
      "Sizes": "S to 3XL"
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
    id: "angel-blade-tumbler",
    name: "Angel Blade Stainless Tumbler",
    price: 29.99,
    category: "gear",
    badge: "Insulated",
    cursed: false,
    description: "A 20oz double-wall vacuum insulated stainless steel travel tumbler featuring a laser-engraved Archangel Blade design. Keeps drinks ice-cold for 24 hours or hot for 12.",
    lore: "Castiel: 'An angel blade is a powerful weapon. Keep your drinks cold while patrolling.'",
    stats: {
      "Capacity": "20oz (590ml)",
      "Material": "18/8 Kitchen-grade Stainless Steel",
      "Insulation": "Double-wall vacuum insulation",
      "Lid": "BPA-free splash resistant sliding lid"
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
    id: "devils-trap-mousepad",
    name: "Devil's Trap Circular Mouse Pad",
    price: 12.99,
    category: "artifacts",
    badge: "Desk Gear",
    cursed: false,
    description: "A circular neoprene mouse pad featuring a printed Devil's Trap planetary seal. Non-slip rubber backing and a silky cloth surface ensure smooth cursor sweeps.",
    lore: "Dean Winchester: 'Once they walk inside, they can't leave. Keeps your cursor trapped right where you want it.'",
    stats: {
      "Diameter": "8.5 inches",
      "Material": "Smooth polyester surface with neoprene rubber base",
      "Thickness": "0.12 inches (3mm) backing",
      "Anti-slip": "Heavy-grip textured bottom"
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

// 3. Shop State Manager
class ShopApp {
  constructor() {
    this.products = [...PRODUCTS]; // Default to local mock products
    // State
    this.cart = this.loadCartFromStorage();
    this.appliedPromo = null;
    this.currentCategory = "all";
    this.searchQuery = "";
    
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
    
    // Modals
    this.detailModal = document.getElementById("detail-modal");
    this.detailContent = document.getElementById("detail-content");
    this.checkoutModal = document.getElementById("checkout-modal");
    this.receiptBox = document.getElementById("receipt-box");
    
    // Reviews elements
    this.reviewsList = document.getElementById("reviews-list");
    this.reviewForm = document.getElementById("review-form");
    this.ratingInput = document.getElementById("rating-input");
    this.ratingHidden = document.getElementById("review-rating");
    
    // Newsletter elements
    this.newsletterForm = document.getElementById("newsletter-form");
    this.newsletterEmail = document.getElementById("newsletter-email");
    this.newsletterFeedback = document.getElementById("newsletter-feedback");
    
    // Popup newsletter elements
    this.newsletterModal = document.getElementById("newsletter-modal");
    this.popupNewsletterForm = document.getElementById("popup-newsletter-form");
    this.popupNewsletterEmail = document.getElementById("popup-newsletter-email");
    this.popupNewsletterFeedback = document.getElementById("popup-newsletter-feedback");
    
    // Mobile navigation elements
    this.menuToggle = document.getElementById("menu-toggle");
    this.navElement = document.querySelector("header nav");
    
    // Pagination elements
    this.paginationContainer = document.getElementById("pagination-container");
    this.currentPage = 1;
    this.itemsPerPage = 6;
    
    // Order tracking elements
    this.trackModal = document.getElementById("track-modal");
    this.trackForm = document.getElementById("track-form");
    this.trackOrderId = document.getElementById("track-order-id");
    this.trackResult = document.getElementById("track-result");
    
    // Init actions
    this.initTypewriter();
    this.initEvents();
    this.initCatalog(); // Async load Shopify or local products
    this.updateCartUI();
    this.initReviews();
    this.initQuiz();
    this.initNewsletterPopup();
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
      this.currentPage = 1;
      this.renderProducts();
    });

    // Filters
    this.filterButtonsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      
      this.filterButtonsContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      this.currentCategory = btn.dataset.category;
      this.currentPage = 1;
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

    // Star Rating click listener
    if (this.ratingInput) {
      const stars = this.ratingInput.querySelectorAll(".star-btn");
      
      const updateStars = (val) => {
        stars.forEach(s => {
          const sVal = parseInt(s.dataset.value);
          s.classList.toggle("active", sVal <= val);
        });
      };
      
      updateStars(parseInt(this.ratingHidden.value));

      stars.forEach(star => {
        star.addEventListener("click", () => {
          const val = parseInt(star.dataset.value);
          this.ratingHidden.value = val;
          updateStars(val);
        });
      });
    }

    // Review Form submit listener
    if (this.reviewForm) {
      this.reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("review-name");
        const textInput = document.getElementById("review-text");
        
        const newReview = {
          name: nameInput.value.trim(),
          rating: parseInt(this.ratingHidden.value),
          text: textInput.value.trim()
        };
        
        this.reviews.unshift(newReview);
        this.saveReviewsToStorage();
        this.renderReviews();
        
        nameInput.value = "";
        textInput.value = "";
        this.ratingHidden.value = "5";
        if (this.ratingInput) {
          const stars = this.ratingInput.querySelectorAll(".star-btn");
          stars.forEach(s => s.classList.add("active"));
        }
        
        alert("Field report logged to archives.");
      });
    }

    // Newsletter signup listener
    if (this.newsletterForm) {
      this.newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = this.newsletterEmail.value.trim().toLowerCase();
        
        const subscribers = JSON.parse(localStorage.getItem("hunters_subscribers") || "[]");
        if (subscribers.includes(email)) {
          this.newsletterFeedback.textContent = "Coordinates already registered in the archives!";
          this.newsletterFeedback.className = "newsletter-feedback error";
          return;
        }
        
        subscribers.push(email);
        localStorage.setItem("hunters_subscribers", JSON.stringify(subscribers));
        
        this.newsletterFeedback.innerHTML = `
          Welcome to the dispatch! Use code <strong style="color:var(--accent-gold); text-shadow:0 0 6px var(--accent-gold-glow);">BABY1967</strong> for 10% off your orders.
        `;
        this.newsletterFeedback.className = "newsletter-feedback success";
        this.newsletterEmail.value = "";
      });
    }

    // Top nav newsletter link click to open popup
    const navNewsletterBtn = document.getElementById("nav-newsletter-btn");
    if (navNewsletterBtn && this.newsletterModal) {
      navNewsletterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.newsletterModal.showModal();
      });
    }

    // Popup Close button
    const popupCloseBtn = document.getElementById("newsletter-modal-close");
    if (popupCloseBtn && this.newsletterModal) {
      popupCloseBtn.addEventListener("click", () => {
        this.newsletterModal.close();
      });
    }

    // Popup newsletter form submit
    if (this.popupNewsletterForm) {
      this.popupNewsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = this.popupNewsletterEmail.value.trim().toLowerCase();
        
        const subscribers = JSON.parse(localStorage.getItem("hunters_subscribers") || "[]");
        if (subscribers.includes(email)) {
          this.popupNewsletterFeedback.textContent = "Coordinates already registered in the archives!";
          this.popupNewsletterFeedback.className = "popup-newsletter-feedback error";
          return;
        }
        
        subscribers.push(email);
        localStorage.setItem("hunters_subscribers", JSON.stringify(subscribers));
        localStorage.setItem("hunters_dismissed_popup", "true");
        
        this.popupNewsletterFeedback.innerHTML = `
          Welcome to the dispatch! Use code <strong style="color:var(--accent-gold); text-shadow:0 0 6px var(--accent-gold-glow);">BABY1967</strong> for 10% off your orders.
        `;
        this.popupNewsletterFeedback.className = "popup-newsletter-feedback success";
        this.popupNewsletterEmail.value = "";
      });
    }

    // Mobile hamburger menu toggle
    if (this.menuToggle && this.navElement) {
      this.menuToggle.addEventListener("click", () => {
        this.menuToggle.classList.toggle("open");
        this.navElement.classList.toggle("open");
      });

      // Close menu when clicking a link
      const navLinks = this.navElement.querySelectorAll("a");
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          this.menuToggle.classList.remove("open");
          this.navElement.classList.remove("open");
        });
      });
    }

    // Open tracking modal click
    const navTrackBtn = document.getElementById("nav-track-btn");
    if (navTrackBtn && this.trackModal) {
      navTrackBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.trackResult) this.trackResult.style.display = "none";
        if (this.trackOrderId) this.trackOrderId.value = "";
        this.trackModal.showModal();
      });
    }

    // Close tracking modal click
    const trackCloseBtn = document.getElementById("track-modal-close");
    if (trackCloseBtn && this.trackModal) {
      trackCloseBtn.addEventListener("click", () => {
        this.trackModal.close();
      });
    }

    // Track order form submit
    if (this.trackForm) {
      this.trackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const trackingNumber = this.trackOrderId.value.trim();
        
        // Construct live tracking URLs
        const uspsUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(trackingNumber)}`;
        const trackingUrl = `https://t.17track.net/en#nums=${encodeURIComponent(trackingNumber)}`;
        
        this.trackResult.innerHTML = `
          <div class="track-info-header" style="margin-bottom: 1rem;">
            <span>Carrier Code: <strong style="color:var(--accent-gold);">${trackingNumber}</strong></span>
          </div>
          
          <p style="font-size: 0.8rem; text-align: left; margin-bottom: 1rem; color: var(--text-secondary); line-height: 1.4;">
            Live shipment coordinates generated. Click the buttons below to open official portals, or inspect the live carrier dispatch tracker embedded below.
          </p>
          
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem;">
            <a href="${uspsUrl}" target="_blank" rel="noopener noreferrer" class="gold-btn" style="flex: 1; text-decoration: none; justify-content: center; font-size: 0.8rem; padding: 0.6rem;">
              USPS Tracker
            </a>
            <a href="${trackingUrl}" target="_blank" rel="noopener noreferrer" class="gold-btn" style="flex: 1; text-decoration: none; justify-content: center; font-size: 0.8rem; padding: 0.6rem; border-color: rgba(255,255,255,0.15);">
              17Track Portal
            </a>
          </div>
          
          <!-- Embedded 17Track Live Iframe Widget -->
          <div style="border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden; background: #fff; height: 350px;">
            <iframe src="https://t.17track.net/en#nums=${encodeURIComponent(trackingNumber)}" style="width: 100%; height: 100%; border: none;" loading="lazy"></iframe>
          </div>
        `;
        this.trackResult.style.display = "block";
      });
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
          <p>No products matching your query were found in our store archives.</p>
        </div>
      `;
      if (this.paginationContainer) {
        this.paginationContainer.innerHTML = "";
      }
      return;
    }

    // Paginate products
    const totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    this.productGrid.innerHTML = paginatedProducts.map(prod => `
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

    this.renderPagination(totalPages);
  }

  renderPagination(totalPages) {
    if (!this.paginationContainer) return;

    if (totalPages <= 1) {
      this.paginationContainer.innerHTML = "";
      return;
    }

    let buttonsHTML = "";
    
    // Prev arrow
    buttonsHTML += `
      <button class="pagination-btn arrow-btn" ${this.currentPage === 1 ? "disabled" : ""} data-action="prev" aria-label="Previous Page">
        &lsaquo;
      </button>
    `;

    // Numbers
    for (let i = 1; i <= totalPages; i++) {
      buttonsHTML += `
        <button class="pagination-btn ${this.currentPage === i ? "active" : ""}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    // Next arrow
    buttonsHTML += `
      <button class="pagination-btn arrow-btn" ${this.currentPage === totalPages ? "disabled" : ""} data-action="next" aria-label="Next Page">
        &rsaquo;
      </button>
    `;

    this.paginationContainer.innerHTML = buttonsHTML;

    // Listeners for pagination buttons
    const btns = this.paginationContainer.querySelectorAll(".pagination-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const page = e.target.dataset.page;
        const action = e.target.dataset.action;

        if (page) {
          this.currentPage = parseInt(page);
        } else if (action === "prev" && this.currentPage > 1) {
          this.currentPage--;
        } else if (action === "next" && this.currentPage < totalPages) {
          this.currentPage++;
        }

        this.renderProducts();
        
        // Scroll smoothly back to top of shop section
        const shopSection = document.getElementById("shop");
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // Cart Management
  addToCart(id) {
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
    // Extract lines connection dynamically to support both local cart and Shopify Cart API
    let rawLines = [];
    if (Array.isArray(this.cart)) {
      rawLines = this.cart;
    } else if (this.cart && this.cart.lines) {
      if (Array.isArray(this.cart.lines)) {
        rawLines = this.cart.lines;
      } else if (this.cart.lines.edges && Array.isArray(this.cart.lines.edges)) {
        rawLines = this.cart.lines.edges.map(edge => edge.node);
      } else if (this.cart.lines.nodes && Array.isArray(this.cart.lines.nodes)) {
        rawLines = this.cart.lines.nodes;
      }
    }

    const normalizedItems = rawLines.map(item => {
      // Determine product details defensively across local cart and Shopify schemas
      let id = "";
      let name = "";
      let price = 0;
      let quantity = item.quantity || 1;
      let imageUrl = null;
      let svgIcon = null;

      if (item.product) {
        const p = item.product;
        id = p.id || item.id || "";
        name = p.title || p.name || "Product";
        
        // Parse price defensively
        if (p.price !== undefined && p.price !== null) {
          if (typeof p.price === "number") {
            price = p.price;
          } else if (typeof p.price === "string") {
            price = parseFloat(p.price);
          } else if (p.price.amount) {
            price = parseFloat(p.price.amount);
          }
        }
        
        imageUrl = p.imageUrl || (p.featuredImage?.url) || (p.images?.edges?.[0]?.node?.url) || null;
        svgIcon = p.svgIcon || null;
      } else {
        // Fallback for Shopify Cart Line connection (merchandise nested)
        const merch = item.merchandise || {};
        const prod = merch.product || {};
        
        id = merch.id || item.id || "";
        name = prod.title || merch.title || item.title || "Shopify Product";
        
        // Parse price defensively
        const rawPrice = merch.price || item.price;
        if (rawPrice !== undefined && rawPrice !== null) {
          if (typeof rawPrice === "number") {
            price = rawPrice;
          } else if (typeof rawPrice === "string") {
            price = parseFloat(rawPrice);
          } else if (rawPrice.amount) {
            price = parseFloat(rawPrice.amount);
          }
        } else if (item.estimatedCost?.totalAmount?.amount) {
          price = parseFloat(item.estimatedCost.totalAmount.amount);
        }
        
        imageUrl = merch.image?.url || prod.featuredImage?.url || null;
      }

      return {
        id,
        name,
        price: isNaN(price) ? 0 : price,
        quantity,
        imageUrl,
        svgIcon
      };
    });

    // Count badge
    const totalCount = normalizedItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartBadge.textContent = totalCount;
    this.cartBadge.style.display = totalCount > 0 ? "flex" : "none";

    // Drawer list
    if (normalizedItems.length === 0) {
      this.cartItemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <p>Your trunk trunk is currently empty.</p>
          <p style="font-size: 0.8rem; margin-top: 0.5rem;">Secure some gear before heading out!</p>
        </div>
      `;
    } else {
      this.cartItemsContainer.innerHTML = normalizedItems.map(item => `
        <div class="cart-item">
          ${item.imageUrl ? 
            `<img class="cart-item-icon" src="${item.imageUrl}" alt="${item.name}">` :
            (item.svgIcon ? `<svg class="cart-item-icon" viewBox="0 0 100 100">${item.svgIcon}</svg>` : `<div class="cart-item-icon" style="background:var(--bg-secondary);"></div>`)
          }
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            <div class="cart-item-quantity">
              <button class="qty-btn" data-id="${item.id}" data-change="-1">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">&times;</button>
        </div>
      `).join("");
    }

    // Calculations
    const subtotal = normalizedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
    if (code === "BABY1967") {
      this.appliedPromo = { code, type: "percent", value: 0.10 };
      this.promoFeedback.textContent = "10% First Time Discount Applied!";
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
          <div class="pod-info-banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span><strong>Print-on-Demand item:</strong> Printed in the bunker. Please allow 2-5 days for printing & curing before shipment.</span>
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
    // Filter out local mock products that don't have a valid Shopify GID (starts with gid://)
    const lines = this.cart
      .filter(item => {
        const id = item.product.shopifyVariantId || item.product.id;
        return id && id.startsWith("gid://");
      })
      .map(item => ({
        merchandiseId: item.product.shopifyVariantId || item.product.id,
        quantity: item.quantity
      }));

    if (lines.length === 0) {
      throw new Error("No real Shopify products in your cart. Local mock items cannot be checked out on Shopify.");
    }

    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
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
          input: { lines }
        }
      })
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const json = await response.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    const errors = json.data.cartCreate.userErrors;
    if (errors && errors.length > 0) {
      throw new Error(errors[0].message);
    }

    return json.data.cartCreate.cart.checkoutUrl;
  }

  // 5. Field Reports & Reviews Engine
  initReviews() {
    this.reviews = this.loadReviewsFromStorage();
    this.renderReviews();
  }

  loadReviewsFromStorage() {
    const saved = localStorage.getItem("hunters_reviews");
    return saved ? JSON.parse(saved) : [];
  }

  saveReviewsToStorage() {
    localStorage.setItem("hunters_reviews", JSON.stringify(this.reviews));
  }

  renderReviews() {
    if (!this.reviewsList) return;
    
    if (this.reviews.length === 0) {
      this.reviewsList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem; border: 1px dashed var(--border-color); border-radius: var(--radius-md); background: rgba(18, 14, 10, 0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <p style="font-family: var(--font-title); font-size: 1rem; color: var(--text-secondary); letter-spacing: 0.05em; text-transform: uppercase;">No Reports Logged</p>
          <p style="font-size: 0.85rem; max-width: 280px; line-height: 1.4;">Be the first to report your protective gear findings from the road!</p>
        </div>
      `;
      return;
    }
    
    this.reviewsList.innerHTML = this.reviews.map(rev => `
      <div class="review-card">
        <div class="review-header">
          <span class="review-author">${rev.name}</span>
          <span class="review-stars">${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}</span>
        </div>
        <p class="review-text">"${rev.text}"</p>
      </div>
    `).join("");
  }

  // 6. Popup Newsletter Engine
  initNewsletterPopup() {
    // If they already subscribed or dismissed, don't auto-pop
    if (localStorage.getItem("hunters_dismissed_popup") === "true") return;
    
    // Auto-trigger 6 seconds after page loads
    setTimeout(() => {
      if (this.newsletterModal && !this.newsletterModal.open) {
        this.newsletterModal.showModal();
        
        // Store dismissed flag when dialog is closed so it doesn't pop up next page load
        this.newsletterModal.addEventListener("close", () => {
          localStorage.setItem("hunters_dismissed_popup", "true");
        }, { once: true });
      }
    }, 6000);
  }

  // 7. Hunter's Quiz Engine
  initQuiz() {
    const quizData = [
      {
        q: "According to Lucifer, how many things in all of creation is the legendary Colt unable to kill?",
        options: ["3 things", "5 things", "7 things", "12 things"],
        correct: 1 // 5 things
      },
      {
        q: "What is the specific code word/phrase Sam and Dean use to signal that they are in immediate danger?",
        options: ["Motel Six", "Funkytown", "Baby 67", "Kansas Road"],
        correct: 1 // Funkytown
      },
      {
        q: "What common household cleaning chemical is highly toxic to Leviathans, burning their skin upon contact?",
        options: ["Bleach", "Ammonia", "Borax", "Baking Soda"],
        correct: 2 // Borax
      },
      {
        q: "In the fan-favorite episode 'Mystery Spot', which of the following is NOT one of the ways Dean dies during Sam's endless Tuesday loop?",
        options: ["Hit by a car", "Electrocuted by a radio", "Choking on a taco", "Falling down an elevator shaft"],
        correct: 3 // Falling down an elevator shaft
      },
      {
        q: "What is Sam Winchester's official LSAT score, mentioned when discussing his pre-law days at Stanford?",
        options: ["168", "174", "178", "180"],
        correct: 1 // 174
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

}

// 5. Application Bootstrapper
document.addEventListener("DOMContentLoaded", () => {
  window.shopApp = new ShopApp();
});
