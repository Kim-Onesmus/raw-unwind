const defaultConfig = {
  company_name: "Raw Unwind Safaris",
  company_slogan: "Travel. Explore. Share the Moment.",
  hero_headline: "Travel. Explore. Share the Moment.",
  hero_subtext:
    "Discover Kenya's soul through transformative journeys. From cruise ports to cultural celebrations, from healing safaris to carbon-conscious travel. In partnership with Mikoko Pamoja, every adventure preserves Africa's beauty.",
  about_intro:
    "We are Kenya's premier sustainable safari company, dedicated to creating transformative travel experiences that honor both people and planet. Since our founding, we've connected travelers with Africa's untamed beauty while supporting local communities and conservation efforts.",
  mission_text:
    "To create unforgettable safari experiences that inspire conservation, empower local communities, and achieve net-zero carbon impact. We believe luxury travel can be a force for positive change.",
  vision_text:
    "A world where every journey heals—healing the land, the communities we visit, and the travelers themselves. Where sustainable tourism becomes the gold standard for exploring our planet's wonders.",
  partnership_text:
    "We're proud partners of Mikoko Pamoja—the world's first community-led blue carbon project. Together, we protect vital mangrove ecosystems along Kenya's coast while supporting local livelihoods. Every safari with Raw Unwind contributes directly to this groundbreaking conservation initiative.",
  cta_button_text: "Explore Journeys",
  donate_button_text: "Support Conservation",
  background_color: "#faf8f3",
  primary_color: "#1a4d2e",
  text_color: "#0d2818",
  secondary_text_color: "#3d5a46",
  accent_color: "#c9a227",
};

let config = { ...defaultConfig };

async function onConfigChange(cfg) {
  config = { ...defaultConfig, ...cfg };

  // Update text content
  document.getElementById("nav-company-name").textContent =
    config.company_name || defaultConfig.company_name;
  document.getElementById("nav-slogan").textContent =
    config.company_slogan || defaultConfig.company_slogan;
  document.getElementById("hero-headline").textContent =
    config.hero_headline || defaultConfig.hero_headline;
  document.getElementById("hero-subtext").textContent =
    config.hero_subtext || defaultConfig.hero_subtext;
  document.getElementById("about-intro").textContent =
    config.about_intro || defaultConfig.about_intro;
  document.getElementById("mission-text").textContent =
    config.mission_text || defaultConfig.mission_text;
  document.getElementById("vision-text").textContent =
    config.vision_text || defaultConfig.vision_text;
  document.getElementById("partnership-text").textContent =
    config.partnership_text || defaultConfig.partnership_text;
  document.getElementById("footer-company-name").textContent =
    config.company_name || defaultConfig.company_name;
  document.getElementById("footer-slogan").textContent =
    config.company_slogan || defaultConfig.company_slogan;

  // Update buttons
  document.getElementById("nav-cta").textContent =
    config.cta_button_text || defaultConfig.cta_button_text;
  document.getElementById("hero-cta").textContent =
    config.cta_button_text || defaultConfig.cta_button_text;
  document.getElementById("hero-donate").textContent =
    config.donate_button_text || defaultConfig.donate_button_text;

  // Update colors
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const bgColor = config.background_color || defaultConfig.background_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const secondaryTextColor =
    config.secondary_text_color || defaultConfig.secondary_text_color;
  const accentColor = config.accent_color || defaultConfig.accent_color;

  // Apply colors
  document.getElementById("nav-cta").style.backgroundColor = primaryColor;
  document.getElementById("hero-cta").style.backgroundColor = primaryColor;
  document.getElementById("hero-donate").style.borderColor = primaryColor;
  document.getElementById("hero-donate").style.color = primaryColor;
  document.getElementById("form-submit").style.backgroundColor = primaryColor;

  document.getElementById("hero-headline").style.color = textColor;
  document.getElementById("hero-subtext").style.color = secondaryTextColor;
  document.getElementById("about-intro").style.color = secondaryTextColor;
}

function mapToCapabilities(cfg) {
  return {
    recolorables: [
      {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => {
          cfg.background_color = value;
          window.elementSdk.setConfig({ background_color: value });
        },
      },
      {
        get: () => cfg.primary_color || defaultConfig.primary_color,
        set: (value) => {
          cfg.primary_color = value;
          window.elementSdk.setConfig({ primary_color: value });
        },
      },
      {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => {
          cfg.text_color = value;
          window.elementSdk.setConfig({ text_color: value });
        },
      },
      {
        get: () =>
          cfg.secondary_text_color || defaultConfig.secondary_text_color,
        set: (value) => {
          cfg.secondary_text_color = value;
          window.elementSdk.setConfig({ secondary_text_color: value });
        },
      },
      {
        get: () => cfg.accent_color || defaultConfig.accent_color,
        set: (value) => {
          cfg.accent_color = value;
          window.elementSdk.setConfig({ accent_color: value });
        },
      },
    ],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined,
  };
}

function mapToEditPanelValues(cfg) {
  return new Map([
    ["company_name", cfg.company_name || defaultConfig.company_name],
    ["company_slogan", cfg.company_slogan || defaultConfig.company_slogan],
    ["hero_headline", cfg.hero_headline || defaultConfig.hero_headline],
    ["hero_subtext", cfg.hero_subtext || defaultConfig.hero_subtext],
    ["about_intro", cfg.about_intro || defaultConfig.about_intro],
    ["mission_text", cfg.mission_text || defaultConfig.mission_text],
    ["vision_text", cfg.vision_text || defaultConfig.vision_text],
    [
      "partnership_text",
      cfg.partnership_text || defaultConfig.partnership_text,
    ],
    ["cta_button_text", cfg.cta_button_text || defaultConfig.cta_button_text],
    [
      "donate_button_text",
      cfg.donate_button_text || defaultConfig.donate_button_text,
    ],
  ]);
}

// // Akiba Safaris Payment Calculator
// document
//   .getElementById("akiba-calculate")
//   .addEventListener("click", function () {
//     const packagePrice = parseFloat(
//       document.getElementById("akiba-package").value,
//     );
//     const months = parseInt(document.getElementById("akiba-months").value);

//     if (!packagePrice) {
//       return;
//     }

//     const deposit = Math.round(packagePrice * 0.2);
//     const remaining = packagePrice - deposit;
//     const monthlyPayment = Math.round(remaining / months);

//     document.getElementById("akiba-deposit").textContent =
//       deposit.toLocaleString();
//     document.getElementById("akiba-monthly").textContent =
//       monthlyPayment.toLocaleString();
//     document.getElementById("akiba-months-display").textContent = months;
//     document.getElementById("akiba-total").textContent =
//       packagePrice.toLocaleString();

//     document.getElementById("akiba-result").classList.remove("hidden");
//   });

// Donation Impact Calculator
function calculateDonationImpact(amount) {
  const donationAmount = parseFloat(amount);

  if (!donationAmount || donationAmount < 10) {
    return;
  }

  // Calculate impacts (rough estimates for demonstration)
  const mangroveTrees = Math.round(donationAmount * 0.5); // $2 per tree
  const forestAcres = Math.round(donationAmount * 0.02); // $50 per acre
  const farmersSupported = Math.round(donationAmount * 0.01); // $100 per farmer
  const totalCarbon = (donationAmount * 0.025).toFixed(1); // ~40kg CO2 per dollar
  const carsOffRoad = Math.round(donationAmount * 0.005); // ~$200 = 1 car equivalent

  document.getElementById("mangrove-trees").textContent = mangroveTrees;
  document.getElementById("forest-acres").textContent = forestAcres;
  document.getElementById("farmers-supported").textContent = farmersSupported;
  document.getElementById("total-carbon").textContent = totalCarbon;
  document.getElementById("cars-off-road").textContent = carsOffRoad;

  document.getElementById("donation-impact").classList.remove("hidden");
  document
    .getElementById("donation-impact")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Carbon Calculator Logic
const carbonData = {
  nairobi: { base: 250, transport: 150, accommodation: 60, activities: 40 },
  "mombasa-tsavo": {
    base: 580,
    transport: 350,
    accommodation: 130,
    activities: 100,
  },
  "maasai-mara": {
    base: 1250,
    transport: 700,
    accommodation: 350,
    activities: 200,
  },
  kajiado: { base: 420, transport: 250, accommodation: 100, activities: 70 },
  kisumu: { base: 380, transport: 220, accommodation: 95, activities: 65 },
  "grand-circuit": {
    base: 2850,
    transport: 1600,
    accommodation: 850,
    activities: 400,
  },
  wrc: { base: 1580, transport: 900, accommodation: 450, activities: 230 },
};

const flightMultipliers = {
  africa: 1,
  europe: 1.8,
  "north-america": 2.5,
  asia: 2.2,
  oceania: 3.0,
};

document.getElementById("carbon-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const destination = document.getElementById("destination").value;
  const travelers = parseInt(document.getElementById("travelers").value) || 1;
  const origin = document.getElementById("origin").value;

  if (!destination || !origin) {
    return;
  }

  const data = carbonData[destination];
  const flightMultiplier = flightMultipliers[origin];

  const transportCO2 = Math.round(
    data.transport * flightMultiplier * travelers,
  );
  const accommodationCO2 = Math.round(data.accommodation * travelers);
  const activitiesCO2 = Math.round(data.activities * travelers);
  const totalCO2 = transportCO2 + accommodationCO2 + activitiesCO2;

  document.getElementById("carbon-amount").textContent =
    totalCO2.toLocaleString();
  document.getElementById("transport-co2").textContent =
    transportCO2.toLocaleString();
  document.getElementById("accommodation-co2").textContent =
    accommodationCO2.toLocaleString();
  document.getElementById("activities-co2").textContent =
    activitiesCO2.toLocaleString();
  document.getElementById("offset-amount").textContent =
    totalCO2.toLocaleString();
  document.getElementById("mangrove-area").textContent = Math.round(
    totalCO2 * 0.8,
  ).toLocaleString();

  document.getElementById("carbon-result").classList.remove("hidden");
  document
    .getElementById("carbon-result")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Form handling
// document
//   .getElementById("inquiry-form")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     document.getElementById("form-success").classList.remove("hidden");
//     this.reset();
//     setTimeout(() => {
//       document.getElementById("form-success").classList.add("hidden");
//     }, 5000);
//   });

// FAQ Toggle
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");
  const isOpen = !answer.classList.contains("hidden");

  if (isOpen) {
    answer.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  } else {
    answer.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  }
}

// Chatbox
const chatToggle = document.getElementById("chat-toggle");
const chatClose = document.getElementById("chat-close");
const chatbox = document.getElementById("chatbox");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

chatToggle.addEventListener("click", function () {
  if (chatbox.classList.contains("hidden")) {
    chatbox.classList.remove("hidden");
    chatbox.style.animation = "fadeInUp 0.3s ease-out forwards";
  } else {
    chatbox.classList.add("hidden");
  }
});

chatClose.addEventListener("click", function () {
  chatbox.classList.add("hidden");
});

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (message) {
    addUserMessage(message);
    chatInput.value = "";
    setTimeout(() => {
      addBotResponse(message);
    }, 1000);
  }
});

function sendQuickMessage(message) {
  addUserMessage(message);
  setTimeout(() => {
    addBotResponse(message);
  }, 1000);
}

function addUserMessage(text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "flex justify-end";
  messageDiv.innerHTML = `
                            <div class="flex-1 max-w-xs">
                              <div class="p-4 rounded-2xl rounded-tr-none" style="background-color: #1a4d2e;">
                                <p class="text-sm text-white">${text}</p>
                              </div>
                              <p class="text-xs mt-1 text-right" style="color: #3d5a46;">Just now</p>
                            </div>
                          `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  let response =
    "Thank you for your message! Our team will get back to you shortly. You can also reach us on WhatsApp or email info@rawunwindsafaris.com for immediate assistance.";

  if (lowerMessage.includes("safari") || lowerMessage.includes("package")) {
    response =
      "We offer incredible safari packages including Maasai Mara, Tsavo, and our exclusive WRC Safari Rally VIP experience. Would you like me to share pricing details or help you choose the perfect safari?";
  } else if (
    lowerMessage.includes("accessibility") ||
    lowerMessage.includes("disability")
  ) {
    response =
      "We're fully committed to accessible travel! We provide wheelchair-accessible vehicles, adapted accommodations, and professional mobility assistance at no extra charge. Please contact our accessibility coordinator at info@rawunwindsafaris.com or call +254 741 057 770";
  } else if (
    lowerMessage.includes("cultural") ||
    lowerMessage.includes("event")
  ) {
    response =
      "Our heritage immersions include the Great Migration (July-Oct), Lamu Cultural Festival (Nov), Turkana Festival (May-June), and Nairobi Culinary Week (March & Sept). 40% of proceeds support local communities!";
  } else if (lowerMessage.includes("cancel")) {
    response =
      "Our cancellation policy: 90+ days = full refund minus 10% fee, 60-89 days = 50% refund, 30-59 days = 25% refund, under 30 days = 2-year credit. Travel insurance is highly recommended!";
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = "flex gap-3";
  messageDiv.innerHTML = `
                            <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style="background-color: rgba(26, 77, 46, 0.1);">
                              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#1a4d2e">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                            <div class="flex-1">
                              <div class="p-4 rounded-2xl rounded-tl-none" style="background-color: rgba(26, 77, 46, 0.08);">
                                <p class="text-sm" style="color: #1a4d2e;">${response}</p>
                              </div>
                              <p class="text-xs mt-1" style="color: #3d5a46;">Just now</p>
                            </div>
                          `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  });
}
