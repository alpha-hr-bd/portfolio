/* Alpha.HR interactions — works on both index.html and builder.html */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => "৳" + Math.round(value).toLocaleString("en-BD");

  // Portfolio navigation, scroll effects and year.
  const menuButton = $(".menu-toggle");
  const nav = $(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    $$(".nav-links a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
    }));
  }
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const progress = $(".scroll-progress");
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true }); updateProgress();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    $$(".reveal").forEach(el => observer.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("is-visible"));

  // Lightweight scripted FAQ-style portfolio assistant; no AI/API claims.
  const launcher = $(".chat-launcher"), chat = $(".chat-widget"), closeChat = $(".chat-close");
  const messages = $(".chat-messages"), chatForm = $(".chat-form"), chatInput = chatForm && $("input", chatForm);
  if (launcher && chat && messages && chatForm) {
    const historyKey = "alphaHrChatHistory";
    const addMessage = (text, who, save = true) => {
      const bubble = document.createElement("div");
      bubble.className = "chat-message " + who; bubble.textContent = text;
      messages.appendChild(bubble); messages.scrollTop = messages.scrollHeight;
      if (save) {
        const history = JSON.parse(sessionStorage.getItem(historyKey) || "[]");
        history.push({ text, who }); sessionStorage.setItem(historyKey, JSON.stringify(history.slice(-30)));
      }
    };
    try {
      const saved = JSON.parse(sessionStorage.getItem(historyKey) || "[]");
      saved.forEach(item => addMessage(item.text, item.who, false));
    } catch (_) { sessionStorage.removeItem(historyKey); }
    const openChat = open => {
      chat.classList.toggle("open", open);
      chat.setAttribute("aria-hidden", String(!open));
      launcher.setAttribute("aria-expanded", String(open));
      if (open) chatInput && chatInput.focus();
    };
    launcher.addEventListener("click", () => openChat(!chat.classList.contains("open")));
    closeChat.addEventListener("click", () => openChat(false));
    const answerFor = question => {
      const q = question.toLowerCase();
      if (/service|offer|do you build|what can/.test(q)) return "Alpha.HR can help plan portfolio websites, business websites, landing pages and custom frontend experiences. Use the project builder to describe the exact features you need.";
      if (/project|start|builder|quote|price|cost|budget/.test(q)) return "Great! Open the project builder to share your website type, pages, features, design preferences, budget and timeline. It prepares an indicative estimate and a WhatsApp proposal.";
      if (/contact|whatsapp|phone|instagram|youtube|github/.test(q)) return "You can reach Dev. Alpha.HR on WhatsApp at 01812-478792. Instagram: @not.leak.0. YouTube: Talevo Animations. GitHub: alpha-hr-bd.";
      if (/who|about|alpha|developer|name/.test(q)) return "Alpha.HR is the developer brand of Md. Alpha Hayat Rat. This portfolio shares web development interests, services and project information.";
      if (/github pages|hosting|backend|database/.test(q)) return "GitHub Pages is useful for static websites, but it does not run server-side code or provide a backend database. Dynamic features need a separate backend or third-party service.";
      return "Thanks for your question! I can help with information about Alpha.HR, services, the project builder and contact options. For a detailed request, please use the project builder.";
    };
    const send = question => {
      const text = question.trim(); if (!text) return;
      addMessage(text, "user"); chatInput.value = "";
      const typing = document.createElement("div"); typing.className = "chat-message bot typing";
      typing.innerHTML = "<span></span><span></span><span></span>"; messages.appendChild(typing); messages.scrollTop = messages.scrollHeight;
      window.setTimeout(() => { typing.remove(); addMessage(answerFor(text), "bot"); }, 650);
    };
    chatForm.addEventListener("submit", event => { event.preventDefault(); send(chatInput.value); });
    $$(".quick-replies button").forEach(button => button.addEventListener("click", () => send(button.dataset.question || button.textContent)));
  }

  // Builder: collect answers, produce an indicative breakdown, and create a WhatsApp brief.
  const form = $("#project-form");
  if (!form) return;
  const estimatePanel = $("#estimate-panel");
  const totalNode = $("#estimate-total");
  const breakdownNode = $("#estimate-breakdown");
  const formProgress = $("#form-progress");
  const formProgressLabel = $("#form-progress-label");

  const selected = name => $$(`input[name="${CSS.escape(name)}"]:checked`, form).map(el => el.value);
  const value = id => { const el = $("#" + id, form); if (el) return el.value.trim(); const radio = $(`input[name="${CSS.escape(id)}"]:checked`, form); return radio ? radio.value : ""; };
  const checked = name => selected(name).length;
  const isTech = tech => selected("Technology").includes(tech);
  const countPages = () => selected("Pages").length + Math.max(0, Number(value("extraPages")) || 0);

  function calculateEstimate() {
    const types = selected("Website type");
    const techs = selected("Technology");
    const features = selected("Features");
    const pages = countPages();
    const isStatic = isTech("GitHub Pages") || isTech("HTML + CSS + JavaScript");
    const hasBackend = features.some(x => /Database|Login|Dashboard|User Profiles|Order Management|Payment|bKash|Nagad|TopUp|File Upload|API Integration/i.test(x))
      || types.some(x => /E-Commerce|TopUp|POS|Social Media|Custom Web Application|Booking/i.test(x));
    let low = isStatic ? 500 : 1500, high = isStatic ? 1000 : 3000;
    low += Math.max(0, pages - 3) * 150; high += Math.max(0, pages - 3) * 300;
    const featureRates = {
      "Responsive Design":[0,0], "Admin Dashboard":[700,1600], "User Dashboard":[500,1200],
      "Login / Registration":[400,900], "User Profiles":[250,600], "Database":[900,2200],
      "Product Management":[500,1100], "Shopping Cart":[500,1000], "Checkout":[400,900],
      "Payment Integration":[800,1800], "bKash / Nagad":[700,1600], "Order Management":[600,1400],
      "TopUp Order System":[1000,2500], "Booking System":[500,1200], "Search & Filters":[250,600],
      "Live Chat":[200,500], "Notifications":[300,700], "Email Notifications":[300,800],
      "PDF Invoice":[300,700], "Reports & Analytics":[500,1200], "File Upload":[300,800],
      "Image Gallery":[150,350], "Video Support":[100,300], "AI Chatbot":[600,1800],
      "API Integration":[600,1800], "SEO Optimization":[200,500], "Google Analytics":[100,250],
      "Multi-language Support":[500,1200], "Dark Mode":[200,450], "Other Custom Features":[500,1500]
    };
    features.forEach(feature => { const rate = featureRates[feature] || [0,0]; low += rate[0]; high += rate[1]; });
    if (hasBackend && isStatic) { low += 2000; high += 6000; }
    if (types.some(x => /E-Commerce|TopUp|POS|Social Media|Custom Web Application/i.test(x))) { low += 1000; high += 2500; }
    if (techs.includes("WordPress")) { low += 700; high += 1600; }
    if (techs.includes("Laravel") || techs.includes("Node.js")) { low += 2500; high += 6000; }
    const style = value("designStyle");
    if (/Premium|Creative/.test(style)) { low += 400; high += 1000; }
    if (value("Animation") === "Rich animations") { low += 500; high += 1200; }
    if (value("Logo") === "Need help") { low += 300; high += 800; }
    if (value("Content") === "Need help") { low += 300; high += 900; }

    const domainChoice = selected("Domain & hosting");
    let domainLow = 0, domainHigh = 0, hostingLow = 0, hostingHigh = 0;
    if (domainChoice.includes("I want a paid domain")) { domainLow = 1000; domainHigh = 2500; }
    if (domainChoice.includes("I need a free domain")) { domainLow = 0; domainHigh = 0; }
    if (domainChoice.includes("I need paid hosting")) { hostingLow = 1500; hostingHigh = 6000; }
    if (domainChoice.includes("I need free hosting")) { hostingLow = 0; hostingHigh = 0; }
    const thirdLow = features.includes("Payment Integration") || features.includes("bKash / Nagad") || features.includes("AI Chatbot") ? 0 : 0;
    const thirdHigh = features.includes("Payment Integration") || features.includes("bKash / Nagad") || features.includes("AI Chatbot") ? 1500 : 500;
    const maintenanceLow = hasBackend ? 500 : 0, maintenanceHigh = hasBackend ? 2000 : 500;
    const rows = [
      ["Developer charge", `${money(low)} – ${money(high)}`],
      ["Domain cost (initial / provider-dependent)", `${money(domainLow)} – ${money(domainHigh)}`],
      ["Hosting cost (provider-dependent)", `${money(hostingLow)} – ${money(hostingHigh)}`],
      ["Third-party services (indicative)", `${money(thirdLow)} – ${money(thirdHigh)}`],
      ["Optional maintenance (periodic)", `${money(maintenanceLow)} – ${money(maintenanceHigh)}`]
    ];
    const overallLow = low + domainLow + hostingLow + thirdLow;
    const overallHigh = high + domainHigh + hostingHigh + thirdHigh;
    return { low, high, rows, overallLow, overallHigh, isStatic, hasBackend, pages };
  }
  function renderEstimate() {
    const oldNote = $("#backend-estimate-note"); if (oldNote) oldNote.remove();
    const estimate = calculateEstimate();
    totalNode.textContent = `${money(estimate.overallLow)} – ${money(estimate.overallHigh)}`;
    breakdownNode.replaceChildren();
    estimate.rows.forEach(([label, amount]) => {
      const row = document.createElement("div"); row.className = "estimate-line";
      const name = document.createElement("span"); name.textContent = label;
      const price = document.createElement("b"); price.textContent = amount;
      row.append(name, price); breakdownNode.append(row);
    });
    if (estimate.isStatic && estimate.hasBackend) {
      const note = document.createElement("div"); note.className = "inline-note";
      note.textContent = "Your selected static platform does not directly support the backend features requested. A separate backend/service or a different hosting technology will be needed; this is reflected as an additional planning allowance.";
      breakdownNode.after(note);
      note.id = "backend-estimate-note";
    } else {
      const old = $("#backend-estimate-note"); if (old) old.remove();
    }
    estimatePanel.classList.add("visible");
  }

  function updateFormProgress() {
    const required = ["customerName", "projectName", "email", "whatsapp", "description", "purpose"];
    const complete = required.filter(id => value(id)).length;
    const percent = Math.round(complete / required.length * 100);
    formProgress.style.width = percent + "%";
    formProgressLabel.textContent = percent + "% of required details completed";
  }
  form.addEventListener("input", () => { updateFormProgress(); renderEstimate(); });
  form.addEventListener("change", () => { updateFormProgress(); renderEstimate(); });
  renderEstimate(); updateFormProgress();

  const getField = name => {
    const el = $$("[name]", form).find(node => node.name === name && !["checkbox","radio"].includes(node.type));
    if (el) return el.value.trim() || "Not specified";
    const values = selected(name); return values.length ? values.join(", ") : "Not specified";
  };
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const requiredGroups = [
      { name: "Website type", label: "Please select at least one website type." },
      { name: "Technology", label: "Please select a platform or technology." }
    ];
    for (const group of requiredGroups) {
      if (!checked(group.name)) {
        const first = $(`input[name="${CSS.escape(group.name)}"]`, form);
        first && first.focus();
        alert(group.label);
        return;
      }
    }
    const est = calculateEstimate();
    const lines = [
      "🌐 ALPHA.HR — NEW WEBSITE PROJECT PROPOSAL",
      "────────────────────────────",
      "",
      "A. PROJECT INFORMATION",
      `Customer: ${getField("Customer name")}`,
      `Project: ${getField("Project name")}`,
      `Email: ${getField("Email")}`,
      `WhatsApp: ${getField("WhatsApp number")}`,
      `Main purpose: ${getField("Main purpose")}`,
      `Description: ${getField("Project description")}`,
      "",
      "B. WEBSITE TYPE",
      getField("Website type"),
      "",
      "C. PLATFORM & TECHNOLOGY",
      getField("Technology"),
      "",
      "D. PAGES",
      `Selected pages: ${getField("Pages")}`,
      `Additional pages: ${getField("Additional pages")}`,
      `Estimated total page count: ${est.pages}`,
      "",
      "E. FEATURES",
      getField("Features"),
      "",
      "F. DESIGN PREFERENCES",
      `Colors: ${getField("Color scheme")}`,
      `Style: ${getField("Design style")}`,
      `Reference: ${getField("Reference website")}`,
      `Logo: ${getField("Logo")}`,
      `Content: ${getField("Content")}`,
      `Mobile-first: ${getField("Mobile-first")}`,
      `Animation: ${getField("Animation")}`,
      "",
      "G. DOMAIN & HOSTING",
      getField("Domain & hosting"),
      "",
      "H. BUDGET & TIMELINE",
      `Customer budget: ${getField("Budget")}`,
      `Timeline: ${getField("Timeline")}`,
      "",
      "I. ADDITIONAL REQUIREMENTS",
      getField("Additional requirements"),
      "",
      "INDICATIVE COST BREAKDOWN",
      ...est.rows.map(([label, amount]) => `${label}: ${amount}`),
      `Indicative project total (excluding periodic maintenance): ${money(est.overallLow)} – ${money(est.overallHigh)}`,
      "",
      "Note: Final pricing will be confirmed after reviewing your complete project requirements. This is a planning estimate, not a fixed quote. Domain, hosting and third-party charges depend on provider and plan.",
      "",
      "Sent from the Alpha.HR Project Builder."
    ];
    const url = "https://wa.me/8801812478792?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
  });
})();
