# Alpha.HR — Premium Portfolio & Fullscreen AI Bot Experience

A complete, premium, responsive personal portfolio website for **Mohammad Alpha Hayat Rat**, featuring an animated fullscreen AI chatbot overlay (`Alpha.HR AI`).

## ✨ Features

1. **Personal Portfolio Website**:
   - Clean white and sky-blue color palette (`#f0f9ff`, `#0ea5e9`, etc.).
   - Glassmorphism, subtle gradients, soft shadows, and modern typography (`Plus Jakarta Sans`).
   - Hero section introducing Alpha.HR as a student, developer, and aspiring tech startup founder.
   - About Me, Skills & Technologies, Featured Projects with working links (`BDBZ`, `GaanX`, `AHR Home Rent System`, and GitHub profile), and Contact.
   - Floating, glowing "New AI Bot" button.

2. **Animated Fullscreen AI Bot (`Alpha.HR AI`)**:
   - Opens in a smooth fullscreen glassmorphism overlay (400–700ms zoom/fade/scale animation).
   - Locks background scrolling when open and restores previous scroll position on close.
   - Supports closing via Escape key, close button, or New Chat confirmation.
   - Typing indicator, auto-scroll, copy-response button, and responsive mobile safe areas.

3. **Manually Maintained World Leaders Directory**:
   - Simple editable JavaScript data object covering Bangladesh, India, Pakistan, Nepal, United States, and United Kingdom.
   - Current as of October 2026. Distinguishes UK monarch from Prime Minister, explains US presidential dual role, and includes "Last manually updated" timestamp.

4. **World Clock & Time**:
   - Live timezone calculations using JavaScript `Intl.DateTimeFormat` and IANA time zones for Dhaka, Kolkata, Karachi, Kathmandu, London, New York, Washington DC, Tokyo, Dubai, Riyadh, and Sydney.

5. **Currency Converter to BDT**:
   - Supports USD, INR, PKR, NPR, GBP, EUR, SAR, AED, QAR, KWD, MYR, JPY, CNY, CAD, and AUD with intelligent language parsing (English, Banglish, and Bangla).

6. **Multilingual Support**:
   - Fully understands English, Banglish, and Bangla queries.

## 🚀 Deployment Instructions

### GitHub Pages Deployment
1. Push all files (`index.html`, `style.css`, `script.js`, `README.md`, `.env.example`) to your GitHub repository (`https://github.com/alpha-hr-bd/portfolio`).
2. Go to your repository settings on GitHub.
3. Navigate to **Pages** under **Code and automation**.
4. Set the source branch to `main` (or `master`) and `/root`.
5. Click **Save**. Your site will be live on GitHub Pages!

### Secure AI Backend Setup (Optional for GenAI API)
If you connect a secure serverless backend for generative Gemini AI responses:
1. Copy `.env.example` to `.env`.
2. Add your secret API key to `GEMINI_API_KEY`.
3. Deploy your backend route handler keeping keys secure from client-side exposure.
