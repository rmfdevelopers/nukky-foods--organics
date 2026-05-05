'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ChefHat, Leaf, ShieldCheck, Phone, Mail, MapPin, 
  ArrowRight, CheckCheck, Loader2, Menu, X, 
  Users, Heart, Search, ImageOff, Instagram
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-QUOTE
// Typography Personality: refined

const brand = {
  name: "Nukky Foods & Organics",
  tagline: "Healthy Nutritious Organic Foods",
  description: "Lagos-based artisanal food processor dedicated to fortified organics, premium spices, and sustainably sourced seafood.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1542959931-953c9bbe8639?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1726177974744-5f33cea4f16d?q=80&w=1080",
    "https://images.unsplash.com/photo-1719726760546-cd0c8a812a4d?q=80&w=1080",
    "https://images.unsplash.com/photo-1666281107556-a9bfa2571fcd?q=80&w=1080",
    "https://images.unsplash.com/photo-1679525437150-4f9776cfd4ad?q=80&w=1080"
  ]
};

const products = [
  { name: "Fortified Multigrain Pap", description: "A nutrient-dense blend of sprouted grains, perfect for growing children and wellness-conscious adults.", price: "₦5,500" },
  { name: "Premium Kiln-Dried Catfish", description: "Expertly seasoned and slowly smoked for a rich, deep flavor profile with zero preservatives.", price: "₦15,000" },
  { name: "Pure Unrefined Shea Butter", description: "Grade-A organic shea butter sourced from the heart of Nigeria, retaining all natural healing properties.", price: "₦7,500" },
  { name: "Artisanal Spice Collection", description: "A curated set of Turmeric, Ginger, and local Ogbono powders for the discerning kitchen.", price: "₦12,500" }
];

const features = [
  { title: "Farm-to-Table Quality", description: "We oversee every stage of the food processing cycle to ensure maximum nutrient retention.", icon: <Leaf size={24} /> },
  { title: "Artisanal Processing", description: "Small-batch production that prioritizes hygiene and traditional fortification methods.", icon: <ChefHat size={24} /> },
  { title: "Zero Additives", description: "Our products are 100% organic, free from synthetic colors, flavors, or preservatives.", icon: <ShieldCheck size={24} /> }
];

const testimonials = [
  { name: "Oluwatoyin Adeyemi", text: "The fortified pap has been a game-changer for my toddlers. You can tell it is processed with actual care.", role: "Lagos Resident" },
  { name: "Emeka Nwosu", text: "Best dry catfish I've found in the city. Clean, well-dried, and tastes incredible in Oha soup.", role: "Home Chef" }
];

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-stone-200 ${className}`}>
        <ImageOff size={28} className="text-stone-400" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: featRef, isVisible: featVisible } = useScrollReveal();
  const { ref: prodRef, isVisible: prodVisible } = useScrollReveal();
  const { ref: procRef, isVisible: procVisible } = useScrollReveal();
  const { ref: abtRef, isVisible: abtVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contRef, isVisible: contVisible } = useScrollReveal();

  return (
    <main className="relative">
      {/* HEADER */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#046307]/95 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-[#d4a017] rounded flex items-center justify-center text-black font-black text-xs">NF</span>
            NUKKY FOODS
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['The Collection', 'Our Story', 'The Process', 'Inquire'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().split(' ')[0]}`} className="text-white/80 hover:text-[#d4a017] text-sm font-medium transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-[#d4a017] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Discover Nukky
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#046307] p-8 shadow-2xl">
          <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenu(false)}>
            <X size={28} />
          </button>
          <div className="mt-16 space-y-8">
            {['The Collection', 'Our Story', 'The Process', 'Inquire'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().split(' ')[0]}`} onClick={() => setMobileMenu(false)} className="block text-2xl font-heading text-white font-bold">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="block w-full bg-[#d4a017] text-black py-4 text-center font-bold rounded-xl mt-12">
              Discover Nukky
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION (HR-B) */}
      <section id="home" ref={heroRef} className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt="Nukky Organic Foods" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#046307] via-[#046307]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#046307]/40 to-transparent" />
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-9xl font-bold text-white leading-[0.9] tracking-tighter">
            Elevate Your Plate <br/>with Pure Nutrition
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-xl leading-relaxed font-light">
            Nukky Foods brings the essence of nature to your table through premium, fortified organics and artisanally processed pantry essentials.
          </p>
          <div className="flex flex-wrap gap-5 mt-12">
            <a href="#products" className="bg-[#d4a017] text-black px-10 py-4 font-black text-lg hover:brightness-110 transition-all rounded-full shadow-xl">
              Discover the Collection
            </a>
            <a href="#about" className="border-b-2 border-white/40 text-white py-3 px-2 hover:border-[#d4a017] hover:text-[#d4a017] transition-all font-medium self-center text-lg uppercase tracking-widest">
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* D-QUOTE DIVIDER */}
      <div className="py-24 px-8 text-center bg-[#d4a017]/10 border-y border-[#d4a017]/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.1),transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-5xl font-black text-[#046307] max-w-3xl mx-auto leading-tight italic">
          &ldquo;Healthy Nutritious Organic Foods&rdquo;
        </p>
        <p className="relative text-[#046307]/40 mt-5 text-xs tracking-[0.5em] uppercase font-bold">Nukky Foods & Organics</p>
      </div>

      {/* FEATURES SECTION (F-BENTO) */}
      <section id="features" ref={featRef} className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2 className="font-heading text-5xl font-black text-[#046307] mb-4">The Nukky Standard</h2>
            <p className="text-stone-500 text-lg">Why families across Lagos trust our organic process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-[#046307]/5 rounded-[2.5rem] p-12 border border-[#046307]/10 hover:border-[#046307]/30 transition-all duration-500 flex flex-col justify-between group min-h-[350px] ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-2xl bg-[#046307] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {features[0].icon}
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-[#046307]">{features[0].title}</h3>
                <p className="text-stone-600 mt-4 text-lg max-w-lg leading-relaxed">{features[0].description}</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-6">
              {features.slice(1).map((f, i) => (
                <div key={i} style={{ transitionDelay: `${(i + 1) * 150}ms` }} className={`bg-[#f9f5ef] rounded-[2rem] p-8 border border-stone-200 hover:border-[#d4a017] transition-all duration-300 flex flex-col justify-between ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="w-12 h-12 rounded-xl bg-[#d4a017]/20 flex items-center justify-center text-[#d4a017]">{f.icon}</div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[#046307]">{f.title}</h3>
                    <p className="text-stone-500 text-sm mt-2">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (P-HORIZONTAL) */}
      <section id="collection" ref={prodRef} className="py-28 bg-[#046307]">
        <div className="px-6 max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-heading text-5xl font-black text-white">Our Organic Harvest</h2>
            <p className="text-white/50 mt-2">Naturally sourced, expertly processed.</p>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 cursor-not-allowed">←</div>
             <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 cursor-not-allowed">→</div>
          </div>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-12 px-6 snap-x snap-mandatory scrollbar-hide">
          {products.map((p, i) => (
            <div key={i} style={{ transitionDelay: `${i * 150}ms` }} className={`snap-start shrink-0 w-[320px] md:w-[400px] group transition-all duration-700 ${prodVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl">
                <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="bg-[#d4a017] text-black font-black px-4 py-1.5 rounded-lg text-lg mb-4 inline-block">{p.price}</span>
                  <h3 className="font-heading text-3xl font-bold text-white leading-tight">{p.name}</h3>
                </div>
              </div>
              <p className="text-white/60 text-base line-clamp-2 px-4">{p.description}</p>
              <a href="#contact" className="inline-flex items-center gap-2 mt-6 ml-4 text-[#d4a017] font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all">Order Now <ArrowRight size={16} /></a>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS SECTION (BONUS: process) */}
      <section id="process" ref={procRef} className="py-28 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-[#046307] mb-4">Our Craft</h2>
            <p className="text-stone-400 uppercase tracking-[0.3em] text-sm font-bold">Raw Earth to Fortified Nutrition</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4a017] via-[#d4a017]/20 to-transparent hidden md:block" />
            <div className="space-y-16">
              {[
                { number: "01", title: "Selection", description: "Raimi Itunu personally vets our local farmers to ensure only the highest grade raw materials enter our facility." },
                { number: "02", title: "Processing", description: "Using low-heat and artisanal drying techniques to preserve vital enzymes and nutrients." },
                { number: "03", title: "Packaging", description: "Eco-conscious sealing to ensure freshness from our Lagos kitchen to your home." }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-10 items-start group transition-all duration-1000 ${procVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-14 h-14 rounded-full bg-[#046307] flex items-center justify-center shrink-0 relative z-10 shadow-lg group-hover:bg-[#d4a017] transition-all duration-500">
                    <span className="font-heading font-black text-white group-hover:text-black transition-colors text-xl">{step.number}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-heading text-3xl font-bold text-[#046307]">{step.title}</h3>
                    <p className="text-stone-500 mt-3 text-lg leading-relaxed max-w-2xl">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Customized for Founder's Corner) */}
      <section id="story" ref={abtRef} className="py-32 px-6 bg-[#f9f5ef] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl z-10">
                <SafeImage src="https://images.unsplash.com/photo-1707056707268-26f8e958fcf2?q=80&w=1080" alt="Founder's Craft" fill className="object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#046307]/10 rounded-full blur-3xl -z-0" />
             <div className="absolute top-10 -left-10 bg-white p-8 rounded-3xl shadow-xl z-20 max-w-[240px] border border-stone-100 hidden lg:block">
                <p className="font-heading text-[#d4a017] text-4xl font-bold">100%</p>
                <p className="text-stone-500 text-sm font-medium uppercase tracking-widest mt-1">Natural Sourcing</p>
             </div>
          </div>
          <div>
            <span className="text-[#d4a017] font-bold tracking-[0.2em] uppercase text-sm block mb-4">Our Story</span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-[#046307] leading-tight mb-8">The Heart of Nukky Foods</h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              Nukky Foods & Organics was born out of a profound commitment to wellness. Our founder, <strong className="text-[#046307]">Raimi Itunu</strong>, is a detail-oriented entrepreneur who believes that premium health begins with what we consume.
            </p>
            
            {/* BESPOKE FOUNDER'S CORNER */}
            <div className="bg-white p-8 rounded-[2rem] border-l-4 border-[#d4a017] shadow-sm mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-[#d4a017]/10">
                <ChefHat size={80} />
              </div>
              <h4 className="font-heading text-2xl font-bold text-[#046307] mb-3">Founder&apos;s Corner</h4>
              <p className="text-stone-500 italic leading-relaxed relative z-10">
                &ldquo;At Nukky, quality control isn&apos;t just a department—it&apos;s my personal oversight. I vet every farmer and taste every batch because your family deserves the same purity I give to mine.&rdquo;
              </p>
              <p className="mt-4 font-bold text-[#046307]">— Raimi Itunu</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {[
                { number: '5.7k+', label: 'Community', icon: <Users size={20} /> },
                { number: '24hr', label: 'Testing', icon: <Search size={20} /> },
                { number: '100%', label: 'Organic', icon: <Heart size={20} /> }
              ].map((s, i) => (
                <div key={i} style={{ transitionDelay: `${i * 150}ms` }} className={`transition-all duration-1000 ${abtVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <p className="font-heading text-3xl font-black text-[#046307]">{s.number}</p>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mt-1 font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (T-MASONRY) */}
      <section id="reviews" ref={testRef} className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-[#046307] text-center mb-16">Trusted by Mothers & Foodies</h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-[#f9f5ef] p-10 rounded-[2.5rem] border border-stone-100 relative group hover:border-[#d4a017] transition-all duration-500 ${testVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="text-[#046307] text-2xl leading-relaxed font-heading italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-stone-200">
                  <div className="w-12 h-12 rounded-full bg-[#046307] flex items-center justify-center text-white font-bold text-lg font-heading">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#046307]">{t.name}</p>
                    <p className="text-stone-400 text-sm uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (C3) */}
      <section id="inquire" ref={contRef} className="py-32 px-6 bg-[#046307] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/linen.png')] opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-[#d4a017] font-mono text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Contact</span>
          <h2 className={`font-heading text-6xl font-black text-white mb-6 transition-all duration-700 ${contVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            Start Your Wellness Journey
          </h2>
          <p className="text-white/60 mb-16 text-xl font-light">Experience sharp delivery across Lagos with our artisanal organic collection.</p>
          
          <div className="text-left bg-white p-10 rounded-[2.5rem] shadow-2xl">
            {formSent ? (
              <div className="py-12 text-center animate-scaleIn">
                <div className="w-20 h-20 rounded-full bg-[#046307]/10 flex items-center justify-center mb-6 mx-auto border border-[#046307]/20">
                  <CheckCheck size={32} className="text-[#046307]" />
                </div>
                <h3 className="font-heading text-3xl font-black text-[#046307] mb-3">Message Received</h3>
                <p className="text-stone-500 text-lg">We&apos;ll be in touch shortly to confirm your order.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormLoading(true); setTimeout(() => { setFormLoading(false); setFormSent(true); }, 1500); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Your Name" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-[#046307] placeholder-stone-400 outline-none focus:border-[#d4a017] transition-all" />
                  <input type="tel" placeholder="Phone Number" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-[#046307] placeholder-stone-400 outline-none focus:border-[#d4a017] transition-all" />
                </div>
                <input type="text" placeholder="Location in Lagos" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-[#046307] placeholder-stone-400 outline-none focus:border-[#d4a017] transition-all" />
                <textarea rows={4} placeholder="What can we process for you?" required className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 text-[#046307] placeholder-stone-400 outline-none resize-none focus:border-[#d4a017] transition-all"></textarea>
                <button type="submit" disabled={formLoading} className="w-full bg-[#046307] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#d4a017] hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3">
                  {formLoading ? <Loader2 className="animate-spin" /> : "Send Order Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f9f5ef] py-20 px-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <a href="#home" className="text-3xl font-heading font-black text-[#046307] tracking-tight mb-6 block">
              NUKKY FOODS & ORGANICS
            </a>
            <p className="text-stone-500 text-lg max-w-sm mb-10">
              Lagos-based artisanal food processor dedicated to fortified organics and premium wellness. Sharp delivery, nationwide.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/2348035020163" className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#046307] hover:bg-[#046307] hover:text-white transition-all">
                <Phone size={20} />
              </a>
              <a href="https://instagram.com/nukkyfoods" className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#046307] hover:bg-[#046307] hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold text-[#046307] mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['The Collection', 'Our Story', 'The Process', 'Inquire'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase().split(' ')[0]}`} className="text-stone-400 hover:text-[#046307] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold text-[#046307] mb-6">Visit Us</h4>
            <div className="space-y-4 text-stone-400">
              <p className="flex items-start gap-3"><MapPin size={18} className="mt-1 shrink-0 text-[#d4a017]" /> Lagos, Nigeria</p>
              <p className="flex items-start gap-3"><Phone size={18} className="mt-1 shrink-0 text-[#d4a017]" /> +234 803 502 0163</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-400 text-sm">© {new Date().getFullYear()} Nukky Foods & Organics. All rights reserved.</p>
          <div className="flex gap-8 text-stone-400 text-sm">
             <span className="cursor-pointer hover:text-[#046307]">Privacy Policy</span>
             <span className="cursor-pointer hover:text-[#046307]">Terms of Service</span>
          </div>
        </div>
      </footer>
    </main>
  );
}