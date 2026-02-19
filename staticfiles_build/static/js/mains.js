document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     SAFE HELPERS
  ========================= */
  const $ = (id) => document.getElementById(id);
  const on = (id, event, handler) => {
    const el = $(id);
    if (el) el.addEventListener(event, handler);
  };

  /* =========================
     DEFAULT CONFIG
  ========================= */
  const defaultConfig = {
    company_name: "Raw Unwind Safaris",
    company_slogan: "Travel. Explore. Share the Moment.",
    hero_headline: "Travel. Explore. Share the Moment.",
    hero_subtext:
      "Discover Kenya's soul through transformative journeys. From cruise ports to cultural celebrations.",
    about_intro: "We are Kenya's premier sustainable safari company.",
    mission_text:
      "To create unforgettable safari experiences that inspire conservation.",
    vision_text: "A world where every journey heals.",
    partnership_text: "Proud partners of Mikoko Pamoja.",
    cta_button_text: "Explore Journeys",
    donate_button_text: "Support Conservation",
    background_color: "#faf8f3",
    primary_color: "#1a4d2e",
    text_color: "#0d2818",
    secondary_text_color: "#3d5a46",
    accent_color: "#c9a227",
  };

  let config = { ...defaultConfig };

  /* =========================
     CONFIG HANDLER
  ========================= */
  async function onConfigChange(cfg) {
    config = { ...defaultConfig, ...cfg };

    const setText = (id, value) => {
      const el = $(id);
      if (el) el.textContent = value;
    };

    setText("nav-company-name", config.company_name);
    setText("nav-slogan", config.company_slogan);
    setText("hero-headline", config.hero_headline);
    setText("hero-subtext", config.hero_subtext);
    setText("about-intro", config.about_intro);
    setText("mission-text", config.mission_text);
    setText("vision-text", config.vision_text);
    setText("partnership-text", config.partnership_text);
    setText("footer-company-name", config.company_name);
    setText("footer-slogan", config.company_slogan);

    setText("nav-cta", config.cta_button_text);
    setText("hero-cta", config.cta_button_text);
    setText("hero-donate", config.donate_button_text);

    const primary = config.primary_color;
    const setStyle = (id, prop, value) => {
      const el = $(id);
      if (el) el.style[prop] = value;
    };

    setStyle("nav-cta", "backgroundColor", primary);
    setStyle("hero-cta", "backgroundColor", primary);
    setStyle("hero-donate", "color", primary);
    setStyle("hero-donate", "borderColor", primary);
    setStyle("form-submit", "backgroundColor", primary);
  }

  /* =========================
     AKIBA PAYMENT CALCULATOR
  ========================= */
  on("akiba-calculate", "click", () => {
    const price = parseFloat($("akiba-package")?.value);
    const months = parseInt($("akiba-months")?.value);

    if (!price || !months) return;

    const deposit = Math.round(price * 0.2);
    const remaining = price - deposit;
    const monthly = Math.round(remaining / months);

    if ($("akiba-deposit"))
      $("akiba-deposit").textContent = deposit.toLocaleString();
    if ($("akiba-monthly"))
      $("akiba-monthly").textContent = monthly.toLocaleString();
    if ($("akiba-months-display"))
      $("akiba-months-display").textContent = months;
    if ($("akiba-total")) $("akiba-total").textContent = price.toLocaleString();
    $("akiba-result")?.classList.remove("hidden");
  });

  /* =========================
     CARBON CALCULATOR
  ========================= */
  on("carbon-form", "submit", (e) => {
    e.preventDefault();

    const destination = $("destination")?.value;
    const travelers = parseInt($("travelers")?.value) || 1;
    const origin = $("origin")?.value;

    if (!destination || !origin) return;

    const data = {
      nairobi: { transport: 150, accommodation: 60, activities: 40 },
      kisumu: { transport: 220, accommodation: 95, activities: 65 },
    }[destination];

    if (!data) return;

    const multiplier = { africa: 1, europe: 1.8 }[origin] || 1;

    const transport = Math.round(data.transport * multiplier * travelers);
    const accommodation = Math.round(data.accommodation * travelers);
    const activities = Math.round(data.activities * travelers);
    const total = transport + accommodation + activities;

    if ($("carbon-amount"))
      $("carbon-amount").textContent = total.toLocaleString();
    $("carbon-result")?.classList.remove("hidden");
  });

  /* =========================
     CONTACT FORM
  ========================= */
  on("inquiry-form", "submit", function (e) {
    e.preventDefault();
    $("form-success")?.classList.remove("hidden");
    this.reset();
    setTimeout(() => $("form-success")?.classList.add("hidden"), 5000);
  });

  /* =========================
     CHATBOX
  ========================= */
  const chatbox = $("chatbox");

  on("chat-toggle", "click", () => {
    if (!chatbox) return;
    chatbox.classList.toggle("hidden");
  });

  on("chat-close", "click", () => {
    chatbox?.classList.add("hidden");
  });

  on("chat-form", "submit", (e) => {
    e.preventDefault();
    const input = $("chat-input");
    if (!input || !input.value.trim()) return;
    addUserMessage(input.value.trim());
    input.value = "";
    setTimeout(() => addBotResponse(), 800);
  });

  function addUserMessage(text) {
    const box = $("chat-messages");
    if (!box) return;
    box.innerHTML += `<div class="text-right text-sm text-white bg-[#1a4d2e] p-3 rounded-xl">${text}</div>`;
    box.scrollTop = box.scrollHeight;
  }

  function addBotResponse() {
    const box = $("chat-messages");
    if (!box) return;
    box.innerHTML += `<div class="text-sm text-[#1a4d2e] bg-[#e7efe9] p-3 rounded-xl">Thanks for reaching out! 🌍</div>`;
    box.scrollTop = box.scrollHeight;
  }

  /* =========================
     SDK INIT (SAFE)
  ========================= */
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
    });
  }
});
