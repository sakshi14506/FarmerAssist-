// app.js (module)
// Shared SPA helpers: flow control, translations, TTS, profile handling, optional firebase hooks

// ---------------------- Firebase placeholder ----------------------
// Uncomment and replace with your config if using cloud save
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const FIREBASE_CONFIG = {
  apiKey: "PASTE_APIKEY",
  authDomain: "PASTE_AUTHDOMAIN",
  projectId: "PASTE_PROJECTID",
  storageBucket: "PASTE_STORAGEBUCKET",
  messagingSenderId: "PASTE_SENDERID",
  appId: "PASTE_APPID"
};

const fbApp = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(fbApp);
const db = getFirestore(fbApp);
// Example: await setDoc(doc(db,'farmers', userId), { profile })
*/

// ---------------------- Languages & Phrases ----------------------
export const LANGS = [
  { code:'en', name:'English' }, 
  { code:'hi', name:'हिन्दी' }, 
  { code:'mr', name:'मराठी' }, 
  { code:'gu', name:'ગુજરાતી' },
  { code:'ta', name:'தமிழ்' }, 
  { code:'te', name:'తెలుగు' }, 
  { code:'bn', name:'বাংলা' }, 
  { code:'pa', name:'ਪੰਜਾਬੀ' }
];

export const PHRASES = {
  en: { namaste:'Namaste', welcome:'Welcome', chooseLang:'Choose language', profileUpdated:'Profile updated', prepareFertiliser:'Steps to prepare an organic fertiliser (home-made):', bioTitle:'Biofuel guidance for', searchPlaceholder:'Search guidance, crops, fertilizer...' },
  hi: { namaste:'नमस्ते', welcome:'स्वागत है', chooseLang:'भाषा चुनें', profileUpdated:'प्रोफ़ाइल अपडेट हुई', prepareFertiliser:'ऑर्गेनिक खाद तैयार करने के चरण:', bioTitle:'बायोफ्यूल मार्गदर्शन', searchPlaceholder:'मार्गदर्शन खोजें, फ़सल, उर्वरक...' },
  mr: { namaste:'नमस्कार', welcome:'स्वागत आहे', chooseLang:'भाषा निवडा', profileUpdated:'प्रोफाइल अद्ययावत', prepareFertiliser:'ऑर्गेनिक खते बनवण्याच्या पायऱ्या:', bioTitle:'बायोफ्युएल मार्गदर्शन', searchPlaceholder:'मार्गदर्शन शोधा, पिके, खत...' },
  gu: { namaste:'નમસ્તે', welcome:'સ્વાગત', chooseLang:'ભાષા પસંદ કરો', profileUpdated:'પ્રોફાઇલ અપડેટ થઈ', prepareFertiliser:'જૈવિક ખાતર બનાવવાની પદ્ધતિ:', bioTitle:'બાયોફ્યૂઅલ માર્ગદર્શન', searchPlaceholder:'માર્ગદર્શન શોધો...' },
  ta: { namaste:'வணக்கம்', welcome:'வரவேற்பு', chooseLang:'மொழியைத் தேர்ந்தெடுக்கவும்', profileUpdated:'சுயவிவரம் புதுப்பிக்கப்பட்டது', prepareFertiliser:'சेंद्रிய உரம் தயாரிப்பு திட்டம்:', bioTitle:'பயோஃப்யூஅல் வழிகாட்டி', searchPlaceholder:'வழிகாட்டி தேடுங்கள்...' },
  te: { namaste:'నమస్కారం', welcome:'స్వాగతం', chooseLang:'భాష ఎంచుకోండి', profileUpdated:'ప్రొఫైల్ నవీకరించబడింది', prepareFertiliser:'సేంద్రియ ఎరువు తయారీ దశలు:', bioTitle:'బయోఫ్యూయల్ మార్గదర్శకం', searchPlaceholder:'గైడ్ శోధన...' },
  bn: { namaste:'নমস্কার', welcome:'স্বাগতম', chooseLang:'ভাষা নির্বাচন করুন', profileUpdated:'প্রোফাইল আপডেট হয়েছে', prepareFertiliser:'জৈব সার তৈরির ধাপ:', bioTitle:'বায়োফুয়েল নির্দেশিকা', searchPlaceholder:'গাইড অনুসন্ধান...' },
  pa: { namaste:'ਨਮਸਕਾਰ', welcome:'ਸਵਾਗਤ', chooseLang:'ਭਾਸ਼ਾ ਚੁਣੋ', profileUpdated:'ਪ੍ਰੋਫਾਈਲ ਅਪਡੇਟ ਹੋਈ', prepareFertiliser:'ਦੇਸੀ ਖਾਦ ਬਣਾਉਣ ਦੇ ਕਦਮ:', bioTitle:'ਬਾਇਓਫਿਊਲ ਮਾਰਗਦਰਸ਼ਨ', searchPlaceholder:'ਗਾਈਡ ਖੋਜੋ...' }
};

// ---------------------- Text-to-Speech ----------------------
export function speak(text){
  if(!('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const lang = localStorage.getItem('fa_lang') || 'en';
  const codes = { hi:'hi-IN', mr:'mr-IN', gu:'gu-IN', ta:'ta-IN', te:'te-IN', bn:'bn-IN', pa:'pa-IN', en:'en-IN' };
  const u = new SpeechSynthesisUtterance(text);
  u.lang = codes[lang] || 'en-IN';
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

// ---------------------- Flow Utilities ----------------------
export function goTo(page){
  // pages: welcome, login, lang, profile, dash
  const mapping = { welcome:'welcome.html', login:'login.html', lang:'language.html', profile:'profile.html', dash:'dashboard.html' };
  if(mapping[page]) window.location.href = mapping[page];
}

export function setLocalProfile(profile){
  localStorage.setItem('fa_profile', JSON.stringify(profile));
}

export function getLocalProfile(){
  return JSON.parse(localStorage.getItem('fa_profile') || 'null');
}

export function getUser(){
  return localStorage.getItem('fa_user') || null;
}

// ---------------------- NPK & Content Generation ----------------------
export function npkForCrop(crop='', soil=''){
  crop = crop.toLowerCase();
  let base = { N:20, P:10, K:10 };
  if(/wheat/.test(crop)) base = { N:60, P:30, K:20 };
  if(/paddy|rice/.test(crop)) base = { N:80, P:40, K:40 };
  if(/maize|corn/.test(crop)) base = { N:90, P:45, K:45 };
  if(/sugar|sugarcane/.test(crop)) base = { N:120, P:30, K:60 };
  if(soil==='sandy') base.N = Math.round(base.N*0.9);
  if(soil==='clay') base.P = Math.round(base.P*1.1);
  return base;
}

export function generateFertiliserText(profile){
  const lang = localStorage.getItem('fa_lang') || 'en';
  const p = PHRASES[lang] || PHRASES['en'];
  const npk = npkForCrop(profile.crop, profile.soil);
  const recipe = `${p.prepareFertiliser}
1) Collect farmyard manure (cow dung) ~20kg.
2) Add compost/green manure ~10kg.
3) Add wood ash for K ~1–2kg.
4) Mix & decompose 2–3 weeks; keep moist and aerate.
5) Apply as basal or per crop needs.`;
  return `Suggested N-P-K (kg/ha): ${npk.N}-${npk.P}-${npk.K}\n\n${recipe}`;
}

export function generateBioText(profile){
  const lang = localStorage.getItem('fa_lang') || 'en';
  const p = PHRASES[lang] || PHRASES['en'];
  const crop = profile.crop?.toLowerCase() || '';
  let waste = 'mixed straw and stalks';
  if(/paddy|rice/.test(crop)) waste = 'paddy husks & straw';
  if(/sugarcane/.test(crop)) waste = 'sugarcane trash';
  if(/maize|corn/.test(crop)) waste = 'maize stalks and cobs';
  const steps = `1) Collect & dry the waste.
2) Chop/shred into small pieces.
For briquettes: grind, mix with binder (cow dung/starch), press & dry.
For biogas: mix with cow dung in anaerobic digester, 30–60 days retention, capture gas safely.`;
  return `${p.bioTitle} — ${waste}\n\n${steps}`;
}

// ---------------------- Toast ----------------------
export function showToast(msg, time=1700){
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), time);
}