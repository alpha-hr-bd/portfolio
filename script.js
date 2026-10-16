/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

/* ==========================================
   STATIC DATA: WORLD LEADERS (Manually Maintained)
   Last Updated: October 16, 2026
   ========================================== */
const WORLD_LEADERS = {
    lastUpdated: "October 16, 2026",
    note: "Manually maintained static political leader dataset.",
    countries: {
        "bangladesh": {
            country: "Bangladesh",
            headOfState: { title: "President", name: "Mirza Fakhrul Islam Alamgir" },
            headOfGovernment: { title: "Prime Minister", name: "Tarique Rahman" }
        },
        "india": {
            country: "India",
            headOfState: { title: "President", name: "Droupadi Murmu" },
            headOfGovernment: { title: "Prime Minister", name: "Narendra Modi" }
        },
        "pakistan": {
            country: "Pakistan",
            headOfState: { title: "President", name: "Asif Ali Zardari" },
            headOfGovernment: { title: "Prime Minister", name: "Shehbaz Sharif" }
        },
        "nepal": {
            country: "Nepal",
            headOfState: { title: "President", name: "Ram Chandra Paudel" },
            headOfGovernment: { title: "Prime Minister", name: "Balendra Shah" }
        },
        "united states": {
            country: "United States",
            note: "The US President is both Head of State and Head of Government.",
            leader: { title: "President", name: "Donald Trump" }
        },
        "united kingdom": {
            country: "United Kingdom",
            headOfState: { title: "Monarch", name: "King Charles III" },
            headOfGovernment: { title: "Prime Minister", name: "Andy Burnham" }
        }
    }
};

/* ==========================================
   WORLD TIME ZONES & CITIES
   ========================================== */
const WORLD_CITIES = [
    { name: "Dhaka", tz: "Asia/Dhaka", country: "Bangladesh" },
    { name: "Kolkata", tz: "Asia/Kolkata", country: "India" },
    { name: "Karachi", tz: "Asia/Karachi", country: "Pakistan" },
    { name: "Kathmandu", tz: "Asia/Kathmandu", country: "Nepal" },
    { name: "London", tz: "Europe/London", country: "United Kingdom" },
    { name: "New York", tz: "America/New_York", country: "United States" },
    { name: "Washington DC", tz: "America/New_York", country: "United States" },
    { name: "Tokyo", tz: "Asia/Tokyo", country: "Japan" },
    { name: "Dubai", tz: "Asia/Dubai", country: "UAE" },
    { name: "Riyadh", tz: "Asia/Riyadh", country: "Saudi Arabia" },
    { name: "Sydney", tz: "Australia/Sydney", country: "Australia" }
];

/* ==========================================
   CURRENCY RATES TO BDT (Demo & Reliable Baseline)
   ========================================== */
const CURRENCY_RATES_TO_BDT = {
    USD: 118.50,
    INR: 1.41,
    PKR: 0.42,
    NPR: 0.88,
    GBP: 154.20,
    EUR: 129.80,
    SAR: 31.60,
    AED: 32.25,
    QAR: 32.55,
    KWD: 385.00,
    MYR: 25.40,
    JPY: 0.79,
    CNY: 16.65,
    CAD: 86.50,
    AUD: 78.40,
    BDT: 1.00
};

/* ==========================================
   FULLSCREEN AI BOT STATE & INTERACTION
   ========================================== */
let scrollPosition = 0;
let chatSession = [
    {
        sender: 'ai',
        text: "Hey! I'm Alpha.HR AI Assistant. Ask me about world time, dates, currencies, world leaders, education, technology or everyday questions in English, Bangla, or Banglish!"
    }
];

const aiOverlay = document.getElementById('aiOverlay');
const aiWindow = document.getElementById('aiWindow');
const chatContainer = document.getElementById('chatContainer');
const chatInput = document.getElementById('chatInput');
const typingIndicator = document.getElementById('typingIndicator');

function openAiBot() {
    scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    
    aiOverlay.classList.remove('pointer-events-none', 'opacity-0');
    aiWindow.classList.remove('scale-90');
    aiWindow.classList.add('animate-open-ai');
    
    renderChat();
    setTimeout(() => chatInput.focus(), 300);
}

function closeAiBot() {
    aiWindow.classList.remove('animate-open-ai');
    aiWindow.classList.add('animate-close-ai');
    aiOverlay.classList.add('opacity-0');
    
    setTimeout(() => {
        aiOverlay.classList.add('pointer-events-none');
        aiWindow.classList.remove('animate-close-ai');
        aiWindow.classList.add('scale-90');
        
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }, 300);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !aiOverlay.classList.contains('pointer-events-none')) {
        closeAiBot();
    }
});

function clearChat() {
    if (confirm("Clear current conversation?")) {
        chatSession = [
            {
                sender: 'ai',
                text: "Conversation cleared! How can I help you today?"
            }
        ];
        renderChat();
    }
}

function renderChat() {
    chatContainer.innerHTML = '';
    chatSession.forEach((msg) => {
        const isUser = msg.sender === 'user';
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-3`;
        
        if (!isUser) {
            msgDiv.innerHTML = `
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="max-w-[80%] sm:max-w-[70%] bg-white border border-sky-100 p-4 rounded-2xl rounded-bl-xs shadow-sm text-slate-800 text-sm leading-relaxed relative group">
                    <div class="whitespace-pre-wrap">${escapeHtml(msg.text)}</div>
                    <button onclick="copyToClipboard(this, \`${escapeJsString(msg.text)}\`)" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs" title="Copy response">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="max-w-[80%] sm:max-w-[70%] bg-gradient-to-r from-sky-500 to-blue-600 p-4 rounded-2xl rounded-br-xs shadow-md text-white text-sm leading-relaxed">
                    <div class="whitespace-pre-wrap">${escapeHtml(msg.text)}</div>
                </div>
                <div class="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs">
                    <i class="fa-solid fa-user"></i>
                </div>
            `;
        }
        chatContainer.appendChild(msgDiv);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function copyToClipboard(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i>`;
        setTimeout(() => btn.innerHTML = originalHTML, 1500);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeJsString(str) {
    return str.replace(/['"\\]/g, '\\$&').replace(/\n/g, '\\n');
}

function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('chatForm').requestSubmit();
    }
}

function sendPresetPrompt(promptText) {
    chatInput.value = promptText;
    document.getElementById('chatForm').requestSubmit();
}

/* ==========================================
   CHAT SUBMISSION & NLP ENGINE
   ========================================== */
function handleChatSubmit(e) {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    chatSession.push({ sender: 'user', text: text });
    chatInput.value = '';
    renderChat();

    typingIndicator.classList.remove('hidden');
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        typingIndicator.classList.add('hidden');
        const aiResponse = generateAiResponse(text);
        chatSession.push({ sender: 'ai', text: aiResponse });
        renderChat();
    }, 600);
}

/* ==========================================
   NLP & INTENT PARSER
   ========================================== */
function generateAiResponse(query) {
    const q = query.toLowerCase().trim();

    // 1. World Leaders Intent
    if (q.includes('leader') || q.includes('president') || q.includes('prime minister') || q.includes('pm') || q.includes('king') || q.includes('government') || q.includes('rastropoti')) {
        let matchedCountry = null;
        for (const key of Object.keys(WORLD_LEADERS.countries)) {
            if (q.includes(key)) {
                matchedCountry = WORLD_LEADERS.countries[key];
                break;
            }
        }

        if (matchedCountry) {
            let res = `👑 **${matchedCountry.country} Leaders** (Manually updated: ${WORLD_LEADERS.lastUpdated}):\n`;
            if (matchedCountry.note) {
                res += `• Note: ${matchedCountry.note}\n`;
            }
            if (matchedCountry.leader) {
                res += `• ${matchedCountry.leader.title}: ${matchedCountry.leader.name}\n`;
            }
            if (matchedCountry.headOfState) {
                res += `• ${matchedCountry.headOfState.title}: ${matchedCountry.headOfState.name}\n`;
            }
            if (matchedCountry.headOfGovernment) {
                res += `• ${matchedCountry.headOfGovernment.title}: ${matchedCountry.headOfGovernment.name}\n`;
            }
            return res;
        } else {
            let summary = `👑 **World Leaders Directory** (Manually maintained as of ${WORLD_LEADERS.lastUpdated}):\n\n`;
            for (const key of Object.keys(WORLD_LEADERS.countries)) {
                const c = WORLD_LEADERS.countries[key];
                summary += `• **${c.country}**: `;
                if (c.leader) summary += `${c.leader.title} ${c.leader.name} (Head of State & Govt)`;
                if (c.headOfState && c.headOfGovernment) summary += `Head of State: ${c.headOfState.name} (${c.headOfState.title}), Head of Govt: ${c.headOfGovernment.name} (${c.headOfGovernment.title})`;
                summary += `\n`;
            }
            summary += `\nAsk about a specific country (e.g., "Who is the PM of Bangladesh?" or "US president").`;
            return summary;
        }
    }

    // 2. World Time & Date Intent
    if (q.includes('time') || q.includes('clock') || q.includes('date') || q.includes('koyta') || q.includes('somoy')) {
        let tzRes = `🕒 **World Clock & Date** (Current Live Time):\n\n`;
        const now = new Date();
        
        WORLD_CITIES.forEach(city => {
            try {
                const timeStr = new Intl.DateTimeFormat('en-US', {
                    timeZone: city.tz,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }).format(now);
                
                const dateStr = new Intl.DateTimeFormat('en-US', {
                    timeZone: city.tz,
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }).format(now);

                tzRes += `• **${city.name}** (${city.country}): ${timeStr}, ${dateStr}\n`;
            } catch (err) {
                // fallback
            }
        });
        return tzRes;
    }

    // 3. Currency Conversion Intent
    if (q.includes('usd') || q.includes('pound') || q.includes('taka') || q.includes('bdt') || q.includes('euro') || q.includes('inr') || q.includes('pkr') || q.includes('npr') || q.includes('dolar') || q.includes('tk') || q.includes('koto') || q.includes('convert')) {
        // Extract number and currency
        const match = q.match(/(\d+(\.\d+)?)\s*([a-zA-Z]{3}|dollar|taka|pound|tk|rs|rs\.|rs)?/);
        const amount = match ? parseFloat(match[1]) : 100;
        
        let targetCurr = 'USD';
        if (q.includes('inr') || q.includes('rupee')) targetCurr = 'INR';
        else if (q.includes('pkr')) targetCurr = 'PKR';
        else if (q.includes('npr')) targetCurr = 'NPR';
        else if (q.includes('gbp') || q.includes('pound')) targetCurr = 'GBP';
        else if (q.includes('eur') || q.includes('euro')) targetCurr = 'EUR';
        else if (q.includes('sar') || q.includes('riyal')) targetCurr = 'SAR';
        else if (q.includes('aed') || q.includes('dirham')) targetCurr = 'AED';
        else if (q.includes('myr') || q.includes('ringgit')) targetCurr = 'MYR';
        else if (q.includes('cad')) targetCurr = 'CAD';
        else if (q.includes('aud')) targetCurr = 'AUD';
        else if (q.includes('jpy') || q.includes('yen')) targetCurr = 'JPY';

        const rate = CURRENCY_RATES_TO_BDT[targetCurr] || CURRENCY_RATES_TO_BDT['USD'];
        const converted = (amount * rate).toFixed(2);

        return `💵 **Currency Conversion**:\n• ${amount} ${targetCurr} = **${converted} BDT**\n\n*(Reference Exchange Rate: 1 ${targetCurr} = ${rate} BDT. Labeled as demo/baseline rate dataset)*`;
    }

    // 4. About Alpha.HR / Portfolio Intent
    if (q.includes('alpha') || q.includes('who are you') || q.includes('developer') || q.includes('student') || q.includes('project') || q.includes('contact')) {
        return `👨‍💻 **Mohammad Alpha Hayat Rat**\n• Role: Student, Frontend Web Developer, and Aspiring Tech Startup Founder.\n• Featured Projects:\n  1. BDBZ (https://bdbookzone.xo.je/)\n  2. GaanX (https://alpha-hr-bd.github.io/GaanX/)\n  3. AHR Home Rent System (https://alpha-hr-bd.github.io/home-rent-xyz/)\n  4. GitHub Profile (https://github.com/alpha-hr-bd)\n\nHow can I assist you with code, time, or currency today?`;
    }

    // 5. Greetings / Banglish / Bangla general
    if (q.includes('hi') || q.includes('hello') || q.includes('assalamu') || q.includes('salam') || q.includes('kemon') || q.includes('kemon acho')) {
        return `Wa alaikum assalam / Hello! I'm Alpha.HR AI. You can ask me about world leaders, world time zones, currency conversion to BDT, or my creator's portfolio projects!`;
    }

    // Default Fallback
    return `I received your message: "${query}".\n\nAs Alpha.HR AI Assistant, I can help you with:\n1. **World Leaders** (e.g., "Who is the PM of India or Bangladesh?")\n2. **World Clock & Time** (e.g., "What is the time in London or Tokyo?")\n3. **Currency Conversion** (e.g., "100 USD to BDT" or "50 pound to taka")\n4. **Portfolio & Developer Info**\n\nFeel free to ask any of these!`;
}
