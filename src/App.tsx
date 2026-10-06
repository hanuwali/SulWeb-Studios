import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Menu, X, Sparkles, ArrowRight, ArrowLeft, Check, 
  Phone, MapPin, Clock, Star, Shield, Wrench, Scissors, Car, Home, Utensils, Dumbbell, Calendar, Send
} from 'lucide-react';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Manrope:wght@400;500;600;700;800&display=swap');
  body { font-family: 'Manrope', sans-serif; background-color: #09090B; color: #F7F5F1; }
  .font-serif { font-family: 'Instrument Serif', serif; }
  .bg-grid { background-image: linear-gradient(to right, rgba(36, 36, 39, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(36, 36, 39, 0.5) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse at top, black 20%, transparent 70%); }
`;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDemoPage, setActiveDemoPage] = useState<any>(null);

  // Restaurant Menu Tab State inside Demo
  const [menuTab, setMenuTab] = useState('Pizza');

  // Fake Modal State for Demos
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [fakeSubmitted, setFakeSubmitted] = useState(false);

  // Studio Form State
  const [formData, setFormData] = useState({
    name: '', businessName: '', email: '', phone: '', businessType: '', needs: 'Building a business website', budget: '$299', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(
      'service_bapkcza', 
      'template_swv8knz', 
      formData,
      'ahou2pxzcQJVMHvr-' 
    ).then(() => setStatus('success')).catch(() => setStatus('error'));
  };

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFakeSubmitted(true);
    setTimeout(() => {
      setFakeSubmitted(false);
      setModalOpen(false);
    }, 2000);
  };

  const filters = ['All', 'Restaurants', 'Beauty', 'Automotive', 'Fitness', 'Real Estate', 'Professional Services'];
  
  const portfolio = [
    { name: 'Bella Napoli', cat: 'Restaurants', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', bg: '#FBF6EE', text: '#2B1D14', accent: '#B8361E' },
    { name: 'Fade District', cat: 'Beauty', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800', bg: '#0B0B0C', text: '#F4F1EA', accent: '#C9A45C' },
    { name: 'Apex Auto Spa', cat: 'Automotive', img: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800', bg: '#070B14', text: '#EAF2FF', accent: '#2EA8FF' },
    { name: 'PrimeFit', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', bg: '#0A0A0A', text: '#FAFAFA', accent: '#C6FF3D' },
    { name: 'Elite Realty', cat: 'Real Estate', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', bg: '#F7F5F0', text: '#14202B', accent: '#1F3A4D' },
    { name: 'RapidFlow', cat: 'Professional Services', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800', bg: '#F5F8FC', text: '#0B1B33', accent: '#F26B1D' }
  ];

  // --- FULL SCREEN FEATURED DEMOS ---
  if (activeDemoPage) {
    return (
      <div className="min-h-screen transition-colors duration-500 font-sans relative" style={{ backgroundColor: activeDemoPage.bg, color: activeDemoPage.text }}>
        {/* Top Bar to Return */}
        <div className="bg-[#09090B] border-b border-[#242427] text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
          <button onClick={() => setActiveDemoPage(null)} className="flex items-center gap-2 text-sm font-bold bg-[#18181B] hover:bg-[#2C2C30] px-5 py-2.5 rounded-full transition cursor-pointer">
            <ArrowLeft size={16} /> Back to SulWeb Studio
          </button>
          <div className="text-sm text-[#9B9BA3] hidden md:block">
            Live Template: <strong className="text-white">{activeDemoPage.name}</strong>
          </div>
          <button 
            onClick={() => {
              setActiveDemoPage(null);
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} 
            className="bg-[#FF6A2A] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(255,106,42,0.3)] hover:bg-[#FF773D] transition cursor-pointer"
          >
            Request This Style
          </button>
        </div>

        {/* FAKE BOOKING MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#18181B] text-white border border-[#2C2C30] p-8 rounded-[24px] max-w-md w-full relative shadow-2xl">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={20}/></button>
              
              {fakeSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">✓</div>
                  <h3 className="text-xl font-bold mb-2">Success! (Demo Mode)</h3>
                  <p className="text-sm text-gray-400">This is a fake booking form. In your actual live website, this connects directly to you!</p>
                </div>
              ) : (
                <form onSubmit={handleFakeSubmit} className="space-y-4">
                  <h3 className="text-2xl font-extrabold mb-1">{modalTitle}</h3>
                  <p className="text-sm text-gray-400 mb-4">Fill out the details below (Demo Simulation)</p>
                  <input required type="text" placeholder="Your Name" className="w-full bg-[#27272A] border border-[#3F3F46] p-3.5 rounded-xl text-white outline-none text-sm" />
                  <input required type="text" placeholder="Phone Number" className="w-full bg-[#27272A] border border-[#3F3F46] p-3.5 rounded-xl text-white outline-none text-sm" />
                  <input type="date" className="w-full bg-[#27272A] border border-[#3F3F46] p-3.5 rounded-xl text-white outline-none text-sm" />
                  <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-black transition cursor-pointer" style={{ backgroundColor: activeDemoPage.accent }}>
                    Confirm Request
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 1. BELLA NAPOLI (RESTAURANT) */}
        {activeDemoPage.name === 'Bella Napoli' && (
          <div>
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#B8361E]/10 text-[#B8361E]">Authentic Italian Trattoria</span>
              <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 tracking-tight">Bella Napoli</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-80 mb-8">Handcrafted wood-fired pizzas and fresh handmade pastas made with love and imported Italian ingredients.</p>
              <div className="flex justify-center gap-4">
                <a href="#menu" className="bg-[#B8361E] text-white px-8 py-4 rounded-full font-bold shadow-lg">Explore Menu</a>
                <button onClick={() => { setModalTitle('Book a Table at Bella Napoli'); setModalOpen(true); }} className="border border-[#2B1D14]/30 px-8 py-4 rounded-full font-bold cursor-pointer hover:bg-black/5">Book a Table</button>
              </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800" alt="Restaurant interior" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800" alt="Pizza making" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800" alt="Pasta dish" className="rounded-2xl h-64 w-full object-cover shadow-md" />
            </div>

            {/* Tabbed Menu */}
            <div id="menu" className="max-w-4xl mx-auto px-6 py-10">
              <h2 className="text-4xl font-extrabold text-center mb-8">Our Menu</h2>
              <div className="flex justify-center gap-2 mb-10">
                {['Pizza', 'Pasta', 'Antipasti', 'Dolci'].map(tab => (
                  <button key={tab} onClick={() => setMenuTab(tab)} className={`px-6 py-2.5 rounded-full font-bold text-sm transition cursor-pointer ${menuTab === tab ? 'bg-[#B8361E] text-white' : 'bg-black/5 opacity-70 hover:opacity-100'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuTab === 'Pizza' && [
                  { name: 'Margherita DOC', desc: 'San Marzano tomatoes, fresh buffalo mozzarella, basil, EVOO', price: '$19' },
                  { name: 'Diavola Inferno', desc: 'Spicy sopressata salami, Fior di latte, hot honey, chili flakes', price: '$22' },
                  { name: 'Quattro Formaggi', desc: 'Gorgonzola, fontina, mozzarella, parmesan cream, walnuts', price: '$21' }
                ].map(item => (
                  <div key={item.name} className="p-6 rounded-2xl bg-white/60 border border-[#2B1D14]/10 flex justify-between items-start">
                    <div><h3 className="font-bold text-lg">{item.name}</h3><p className="text-sm opacity-70 mt-1">{item.desc}</p></div>
                    <span className="font-extrabold text-[#B8361E] text-lg">{item.price}</span>
                  </div>
                ))}
                {menuTab === 'Pasta' && [
                  { name: 'Truffle Carbonara', desc: 'Rigatoni, guanciale, pecorino romano, egg yolk, black truffle', price: '$24' },
                  { name: 'Lobster Ravioli', desc: 'Handmade pasta stuffed with Maine lobster in a pink vodka sauce', price: '$28' }
                ].map(item => (
                  <div key={item.name} className="p-6 rounded-2xl bg-white/60 border border-[#2B1D14]/10 flex justify-between items-start">
                    <div><h3 className="font-bold text-lg">{item.name}</h3><p className="text-sm opacity-70 mt-1">{item.desc}</p></div>
                    <span className="font-extrabold text-[#B8361E] text-lg">{item.price}</span>
                  </div>
                ))}
                {menuTab === 'Antipasti' && [
                  { name: 'Burrata Caprese', desc: 'Creamy burrata, heirloom tomatoes, balsamic reduction, fresh basil', price: '$16' },
                  { name: 'Arancini Siciliani', desc: 'Crispy risotto balls stuffed with mozzarella and beef ragù', price: '$14' }
                ].map(item => (
                  <div key={item.name} className="p-6 rounded-2xl bg-white/60 border border-[#2B1D14]/10 flex justify-between items-start">
                    <div><h3 className="font-bold text-lg">{item.name}</h3><p className="text-sm opacity-70 mt-1">{item.desc}</p></div>
                    <span className="font-extrabold text-[#B8361E] text-lg">{item.price}</span>
                  </div>
                ))}
                {menuTab === 'Dolci' && [
                  { name: 'Traditional Tiramisu', desc: 'Savoiardi ladyfingers, espresso, mascarpone cream, dark cocoa', price: '$10' },
                  { name: 'Cannoli Siciliani', desc: 'Crispy pastry shell filled with sweet ricotta and chocolate chips', price: '$9' }
                ].map(item => (
                  <div key={item.name} className="p-6 rounded-2xl bg-white/60 border border-[#2B1D14]/10 flex justify-between items-start">
                    <div><h3 className="font-bold text-lg">{item.name}</h3><p className="text-sm opacity-70 mt-1">{item.desc}</p></div>
                    <span className="font-extrabold text-[#B8361E] text-lg">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. FADE DISTRICT (BARBER SHOP) */}
        {activeDemoPage.name === 'Fade District' && (
          <div>
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C9A45C]/10 text-[#C9A45C]">Master Barber Studio</span>
              <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 tracking-tight uppercase">Fade District</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-70 mb-8">Precision haircuts, clean hot towel shaves, and top-tier beard grooming.</p>
              <button onClick={() => { setModalTitle('Book Barber Appointment'); setModalOpen(true); }} className="bg-[#C9A45C] text-black px-8 py-4 rounded-full font-bold shadow-lg cursor-pointer">Book Appointment Now</button>
            </div>

            {/* Barber Photos */}
            <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800" alt="Barber shop chair" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800" alt="Haircut styling" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800" alt="Shaving tools" className="rounded-2xl h-64 w-full object-cover shadow-md" />
            </div>

            <div id="services" className="max-w-4xl mx-auto px-6 py-10">
              <h2 className="text-4xl font-extrabold text-center mb-12">Services & Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Signature Skin Fade', price: '$35', time: '30 mins', desc: 'Precision fade of your choice with razor finish and style.' },
                  { name: 'Beard Sculpting & Trim', price: '$25', time: '25 mins', desc: 'Hot towel, beard line-up, organic oils and razor cleanup.' },
                  { name: 'The Full Treatment', price: '$55', time: '50 mins', desc: 'Haircut + Beard Trim + Shampoo wash + Hot towel service.' },
                  { name: 'Father & Son Combo', price: '$60', time: '45 mins', desc: 'Side-by-side fresh cuts for dad and junior.' }
                ].map(s => (
                  <div key={s.name} className="p-6 rounded-2xl bg-[#161618] border border-[#2A2A2D] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2"><h3 className="font-bold text-xl">{s.name}</h3><span className="text-xl font-black text-[#C9A45C]">{s.price}</span></div>
                      <p className="text-sm opacity-60 mb-4">{s.desc}</p>
                    </div>
                    <button onClick={() => { setModalTitle(`Book: ${s.name}`); setModalOpen(true); }} className="w-full py-2.5 rounded-xl border border-[#C9A45C]/40 text-[#C9A45C] font-bold text-sm hover:bg-[#C9A45C]/10 transition cursor-pointer">Book This Cut</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. APEX AUTO SPA (CAR DETAILING) */}
        {activeDemoPage.name === 'Apex Auto Spa' && (
          <div>
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#2EA8FF]/10 text-[#2EA8FF]">Professional Car Care</span>
              <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 tracking-tight">Apex Auto Spa</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-70 mb-8">Paint correction, ceramic coatings, and premium interior detailing for automotive enthusiasts.</p>
            </div>

            {/* Car Photos */}
            <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800" alt="Car wash detailing" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800" alt="Luxury car polish" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800" alt="Interior detailing" className="rounded-2xl h-64 w-full object-cover shadow-md" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
              <h2 className="text-3xl font-extrabold text-center mb-10">Detailing Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Express Wash', price: '$120', features: ['Hand foam wash', 'Wheel & tire shine', 'Quick interior vacuum', 'Window cleaning'] },
                  { name: 'Full Detail', price: '$290', features: ['Deep interior shampoo', 'Leather conditioning', 'Clay bar paint decontamination', '6-month sealant'] },
                  { name: 'Ultimate Ceramic', price: '$650', features: ['Single-stage paint correction', '9H Ceramic coating applied', 'Wheel-off ceramic treatment', 'Lifetime gloss guarantee'] }
                ].map(pkg => (
                  <div key={pkg.name} className="bg-[#0F1626] border border-[#1C2740] p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-black text-[#2EA8FF] mb-6">{pkg.price}</div>
                      <ul className="space-y-3 text-sm opacity-80 mb-6">
                        {pkg.features.map(f => <li key={f} className="flex gap-2"><Check size={16} className="text-[#2EA8FF]" /> {f}</li>)}
                      </ul>
                    </div>
                    <button onClick={() => { setModalTitle(`Book Package: ${pkg.name}`); setModalOpen(true); }} className="w-full bg-[#2EA8FF] text-[#04121F] py-3 rounded-full font-bold cursor-pointer hover:bg-[#4cb5ff] transition">Book Package</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. PRIMEFIT (GYM) */}
        {activeDemoPage.name === 'PrimeFit' && (
          <div>
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#C6FF3D]/10 text-[#C6FF3D]">24/7 Elite Performance Training</span>
              <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 tracking-tight uppercase">PrimeFit</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-70 mb-8">State-of-the-art equipment, expert coaches, and high-energy group fitness classes.</p>
            </div>

            {/* Gym Photos */}
            <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800" alt="Gym weights" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800" alt="Fitness workout" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800" alt="Cardio area" className="rounded-2xl h-64 w-full object-cover shadow-md" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
              <h2 className="text-3xl font-extrabold text-center mb-10 uppercase">Weekly Class Schedule</h2>
              <div className="space-y-4">
                {[
                  { time: '06:00 AM', class: 'High Intensity Interval (HIIT)', coach: 'Coach Marcus', level: 'All Levels' },
                  { time: '12:15 PM', class: 'Functional Strength & Core', coach: 'Coach Sarah', level: 'Intermediate' },
                  { time: '05:30 PM', class: 'Advanced CrossFit WOD', coach: 'Coach Jax', level: 'Advanced' },
                  { time: '07:00 PM', class: 'Mobility & Recovery Flow', coach: 'Coach Elena', level: 'All Levels' }
                ].map(c => (
                  <div key={c.class} className="bg-[#151515] border border-[#262626] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                      <span className="text-xs font-bold text-[#C6FF3D]">{c.time}</span>
                      <h3 className="text-xl font-bold mt-1">{c.class}</h3>
                    </div>
                    <div className="flex items-center gap-6 text-sm opacity-70">
                      <span>{c.coach}</span>
                      <span className="px-3 py-1 bg-white/5 rounded-full">{c.level}</span>
                      <button onClick={() => { setModalTitle(`Reserve Spot: ${c.class}`); setModalOpen(true); }} className="bg-[#C6FF3D] text-black px-4 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-[#d4ff66]">Reserve</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ELITE REALTY */}
        {activeDemoPage.name === 'Elite Realty' && (
          <div>
            <div className="max-w-5xl mx-auto px-6 py-20 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#1F3A4D]/10 text-[#1F3A4D]">Luxury Real Estate Brokerage</span>
              <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 tracking-tight">Elite Realty</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-70 mb-8">Helping you discover exceptional properties and luxury homes in prime locations.</p>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
              <h2 className="text-3xl font-extrabold text-center mb-10">Featured Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Modern Waterfront Villa', price: '$1,450,000', specs: '4 Beds • 3.5 Baths • 3,200 sqft', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
                  { title: 'Downtown Penthouse Loft', price: '$875,000', specs: '2 Beds • 2 Baths • 1,550 sqft', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' }
                ].map(prop => (
                  <div key={prop.title} className="bg-white rounded-2xl border border-[#E4DED2] overflow-hidden shadow-lg text-[#14202B]">
                    <img src={prop.img} alt={prop.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                      <div className="text-2xl font-extrabold text-[#1F3A4D] mb-1">{prop.price}</div>
                      <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                      <p className="text-sm opacity-60 mb-6">{prop.specs}</p>
                      <button onClick={() => { setModalTitle(`Schedule Tour: ${prop.title}`); setModalOpen(true); }} className="bg-[#1F3A4D] text-white px-6 py-3 rounded-full font-bold text-sm cursor-pointer hover:bg-[#2c526d]">Schedule Viewing</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. RAPIDFLOW PLUMBING */}
        {activeDemoPage.name === 'RapidFlow' && (
          <div>
            <div className="bg-[#F26B1D] text-white py-3 px-6 text-center font-bold text-sm">
              🚨 Emergency Plumbing Issue? We offer 24/7 fast dispatch! Call Now: 1-800-RAPID-FLOW
            </div>
            
            <div className="max-w-5xl mx-auto px-6 py-16 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#F26B1D]/10 text-[#F26B1D]">Reliable Residential & Commercial Services</span>
              <h1 className="text-6xl md:text-8xl font-black mt-4 mb-6 tracking-tight">RapidFlow Plumbing</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-70 mb-8">Licensed, insured, and trusted local experts for all plumbing repairs, drain cleaning, and installations.</p>
            </div>

            {/* Plumbing Photos */}
            <div className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800" alt="Plumber working" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1542013936-69f0eed2b716?w=800" alt="Pipe repair" className="rounded-2xl h-64 w-full object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800" alt="Toolbox" className="rounded-2xl h-64 w-full object-cover shadow-md" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
              <h2 className="text-3xl font-extrabold text-center mb-10">Our Core Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Drain Cleaning', desc: 'High-pressure hydro jetting and rooter service for clogged lines.' },
                  { title: 'Leak Detection', desc: 'Advanced electronic equipment to locate hidden pipe leaks instantly.' },
                  { title: 'Water Heaters', desc: 'Repair, maintenance, and tankless water heater upgrades.' }
                ].map(serv => (
                  <div key={serv.title} className="bg-white text-[#0B1B33] p-6 rounded-2xl border border-[#DCE4EF] shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xl mb-2">{serv.title}</h3>
                      <p className="text-sm opacity-70 mb-4">{serv.desc}</p>
                    </div>
                    <button onClick={() => { setModalTitle(`Request Service: ${serv.title}`); setModalOpen(true); }} className="w-full bg-[#F26B1D] text-white py-2.5 rounded-xl font-bold text-sm cursor-pointer">Book Service</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer inside Demos */}
        <div className="py-12 text-center opacity-60 text-sm border-t border-current/10 mt-20">
          <p>{activeDemoPage.name} Demo Website — Built by SulWeb Studio</p>
        </div>
      </div>
    );
  }

  // --- MAIN STUDIO RENDER ---
  return (
    <div className="min-h-screen bg-[#09090B] text-[#F7F5F1] overflow-x-hidden selection:bg-[#FF6A2A] selection:text-white">
      <style>{fontStyles}</style>

      {/* Grid Background & Glow */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-[#FF6A2A]/20 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Sticky Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#09090B]/80 backdrop-blur-md border-b border-[#242427]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-extrabold tracking-tight text-[#F7F5F1]">SulWeb Studio</a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9B9BA3]">
            {['Services', 'Portfolio', 'Process', 'Pricing', 'About', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#F7F5F1] transition">{item}</a>
            ))}
            <a href="#contact" className="bg-[#FF6A2A] text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(255,106,42,0.25)] hover:bg-[#FF773D] transition">Get Started</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-[160px] pb-24 px-6 max-w-[896px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111113]/85 backdrop-blur-sm border border-[#242427] text-xs font-semibold text-[#9B9BA3] mb-8">
          <Sparkles size={14} className="text-[#FF6A2A]" /> Web design for local businesses
        </div>
        <h1 className="text-[48px] md:text-[84px] font-extrabold leading-[1.02] tracking-tight mb-6">
          Websites That Make Your Business Look <span className="font-serif italic bg-gradient-to-br from-[#FF773D] to-[#FFB13D] bg-clip-text text-transparent">Professional.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] text-[#9B9BA3] mb-10 max-w-2xl mx-auto">
          I design modern, fast, mobile-friendly websites that help local businesses attract customers and grow online.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a href="#portfolio" className="bg-[#FF6A2A] text-white px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(255,106,42,0.25)] hover:bg-[#FF773D] transition flex justify-center items-center gap-2">
            View My Work <ArrowRight size={18} />
          </a>
          <a href="#contact" className="bg-[#111113]/50 backdrop-blur-sm border border-[#242427] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1D1D20] transition flex justify-center items-center">
            Get a Free Quote
          </a>
        </div>
        <p className="text-sm text-[#9B9BA3] flex items-center justify-center gap-2 flex-wrap">
          Modern Design <span className="text-[#FF6A2A]">•</span> Mobile Friendly <span className="text-[#FF6A2A]">•</span> Fast <span className="text-[#FF6A2A]">•</span> Built For Your Business
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-[#242427] bg-[#111113]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><h3 className="text-4xl font-extrabold text-[#F7F5F1]">100%</h3><p className="text-sm text-[#9B9BA3] mt-2">Custom Designs</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#F7F5F1]">&lt;1s</h3><p className="text-sm text-[#9B9BA3] mt-2">Load Times</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#F7F5F1]">24/7</h3><p className="text-sm text-[#9B9BA3] mt-2">Lead Generation</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#F7F5F1]">5★</h3><p className="text-sm text-[#9B9BA3] mt-2">Client Rating</p></div>
        </div>
      </section>

      {/* Portfolio & Demos Section */}
      <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto relative z-10 scroll-mt-[84px]">
        <h2 className="text-4xl font-extrabold mb-4 text-center">Portfolio & Demos</h2>
        <p className="text-[#9B9BA3] text-center mb-12 text-sm">Click any project to explore its full live demo website.</p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${activeFilter === f ? 'bg-[#FF6A2A] text-white' : 'bg-[#18181B] text-[#9B9BA3] border border-[#242427] hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.filter(p => activeFilter === 'All' || p.cat === activeFilter).map(p => (
            <div key={p.name} className="bg-[#111113] rounded-[24px] border border-[#242427] overflow-hidden hover:border-[#FF6A2A]/50 transition duration-300 flex flex-col">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[#FF6A2A] text-xs font-bold uppercase">{p.cat}</span>
                <h3 className="text-xl font-bold mt-1 mb-4">{p.name}</h3>
                
                <button 
                  onClick={() => {
                    setActiveDemoPage(p);
                    window.scrollTo(0, 0);
                  }} 
                  className="text-sm font-bold flex items-center gap-1 hover:text-[#FF6A2A] transition mt-auto cursor-pointer"
                >
                  View Full Live Demo <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto relative z-10 scroll-mt-[84px]">
        <h2 className="text-4xl font-extrabold mb-12 text-center">Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="bg-[#111113] p-8 rounded-[24px] border border-[#242427]">
            <h3 className="text-xl font-bold">Starter</h3>
            <div className="text-4xl font-extrabold my-4">$149</div>
            <ul className="space-y-3 text-sm text-[#9B9BA3] mb-8">
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Single-Page Website</li>
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Mobile Responsive</li>
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Built with the help of AI</li>
            </ul>
            <a href="#contact" className="block w-full text-center bg-[#18181B] border border-[#242427] py-3 rounded-full font-bold hover:bg-[#1D1D20]">Choose Starter</a>
          </div>
          {/* Business */}
          <div className="bg-[#1D1D20] p-8 rounded-[24px] border border-[#FF6A2A] shadow-[0_0_30px_rgba(255,106,42,0.15)] relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6A2A] text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
            <h3 className="text-xl font-bold">Business</h3>
            <div className="text-4xl font-extrabold my-4">$299</div>
            <ul className="space-y-3 text-sm text-[#9B9BA3] mb-8">
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Multi-Section Landing Page</li>
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Contact Forms</li>
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Built with the help of AI</li>
            </ul>
            <a href="#contact" className="block w-full text-center bg-[#FF6A2A] text-white py-3 rounded-full font-bold hover:bg-[#FF773D]">Choose Business</a>
          </div>
          {/* Premium */}
          <div className="bg-[#111113] p-8 rounded-[24px] border border-[#242427]">
            <h3 className="text-xl font-bold">Premium</h3>
            <div className="text-4xl font-extrabold my-4">$499+</div>
            <ul className="space-y-3 text-sm text-[#9B9BA3] mb-8">
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Multi-Page Architecture</li>
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Custom Integrations</li>
              <li className="flex gap-2"><Check size={16} className="text-[#FF6A2A]" /> Built with the help of AI</li>
            </ul>
            <a href="#contact" className="block w-full text-center bg-[#18181B] border border-[#242427] py-3 rounded-full font-bold hover:bg-[#1D1D20]">Choose Premium</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto relative z-10 scroll-mt-[84px]">
        <div className="bg-[#111113] border border-[#242427] rounded-[24px] p-8 md:p-12">
          <h2 className="text-3xl font-extrabold mb-2 text-center">Request a Quote</h2>
          <p className="text-[#9B9BA3] text-center mb-8 text-sm">Need help with domains or website setup? Let me know below.</p>
          
          {status === 'success' ? (
            <div className="text-center p-8 border border-[#FF6A2A]/30 rounded-2xl bg-[#FF6A2A]/5">
              <h3 className="text-xl font-bold text-[#FF6A2A] mb-2">Request Sent!</h3>
              <p className="text-[#9B9BA3]">I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Name" className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="text" placeholder="Business Name" className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none" onChange={e => setFormData({...formData, businessName: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="email" placeholder="Email" className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="text" placeholder="Phone" className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Business Type" className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none" onChange={e => setFormData({...formData, businessType: e.target.value})} />
                <select className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none text-[#9B9BA3]" onChange={e => setFormData({...formData, budget: e.target.value})} value={formData.budget}>
                  <option value="$149">Starter ($149)</option>
                  <option value="$299">Business ($299)</option>
                  <option value="$499+">Premium ($499+)</option>
                </select>
              </div>
              <textarea required rows={4} placeholder="What do you need?" className="w-full bg-[#18181B] border border-[#2C2C30] p-4 rounded-xl focus:border-[#FF6A2A] outline-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              <button disabled={status === 'sending'} className="w-full bg-[#FF6A2A] text-white py-4 rounded-full font-bold hover:bg-[#FF773D] transition disabled:opacity-50 cursor-pointer">
                {status === 'sending' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#242427] py-8 text-center text-sm text-[#9B9BA3] relative z-10">
        <p className="font-bold text-[#F7F5F1] mb-2">SulWeb Studio</p>
        <p>Sulwebstudios@gmail.com | hanuwali8@gmail.com</p>
      </footer>
    </div>
  );
}