'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Flame, 
  ShieldCheck, 
  ChefHat, 
  Users, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  ImageOff, 
  Loader2, 
  CheckCheck,
  Zap
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
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

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-primary/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Divider = ({ tagline, brandName }: { tagline: string, brandName: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto overflow-hidden">
      <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`} />
      <span className="text-primary/40 font-heading italic text-lg tracking-wide whitespace-nowrap opacity-70">
        {tagline}
      </span>
      <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-all duration-1000 ${isVisible ? 'w-full' : 'w-0'}`} />
    </div>
  );
};

// --- Main Page ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const brand = {
    name: "Nukky Foods & Organics",
    tagline: "Healthy Nutritious Organic Foods",
    description: "Premium food processor specializing in fortified pap, organic spices, and pure skincare oils, dedicated to bringing nature's nutrition from our farm to your table.",
    industry: "food",
    region: "nigeria",
    currency: "₦"
  };

  const contact = {
    whatsapp: "+2348035020163",
    instagram: "@nukkyfoods",
    email: "",
    address: "Lagos, Nigeria"
  };

  const products = [
    { name: "Signature Fortified Pap Mix", description: "Nutrient-dense fresh and dry pap blend, fortified with organic grains for the perfect family breakfast.", price: "₦8,500", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format" },
    { name: "Oven-Dried Premium Catfish", description: "Hygenically processed and slow-smoked to preserve flavor and protein content. No preservatives.", price: "₦18,500", image: "https://images.unsplash.com/photo-1544070282-1921227a6146?q=80&w=800&auto=format" },
    { name: "Organic Honey & Turmeric Set", description: "Pure, unadulterated wild honey paired with our potent, farm-fresh turmeric powder.", price: "₦12,000", image: "https://images.unsplash.com/photo-1589733429478-2430ee5b6a15?q=80&w=800&auto=format" },
    { name: "Luxe Shea & Coconut Oil Duo", description: "Cold-pressed coconut oil and whipped organic shea butter for holistic skin and hair health.", price: "₦25,000", image: "https://images.unsplash.com/photo-1590136608242-f22291fe02e5?q=80&w=800&auto=format" }
  ];

  const features = [
    { title: "100% Organic Sourcing", description: "Every ingredient is vetted for purity, ensuring no chemicals touch your plate.", icon: Leaf },
    { title: "Fortified Nutrition", description: "Our processing methods enhance bio-availability, maximizing the health benefits of every meal.", icon: Zap },
    { title: "Quality Guaranteed", description: "Rigorous quality checks at every stage, from washing to packaging.", icon: ShieldCheck },
    { title: "Artisanal Processing", description: "Hand-selected and traditionally processed to maintain the authentic taste of nature.", icon: ChefHat }
  ];

  const stats = [
    { number: "5,700+", label: "Healthy Families" },
    { number: "100%", label: "Organic Certified" },
    { number: "24/7", label: "Lagos Delivery" }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Animation Refs ---
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();

  // --- Form Logic ---
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative bg-secondary overflow-x-hidden">
      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-5 ${
        scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-xl transition-colors ${
              scrolled ? 'bg-accent text-primary' : 'bg-primary text-white'
            }`}>N</div>
            <span className={`font-heading text-xl font-bold tracking-tight ${scrolled ? 'text-white' : 'text-primary'}`}>Nukky</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            {['Story', 'Shop', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent ${
                  scrolled ? 'text-white/80' : 'text-primary'
                }`}
              >
                {link}
              </a>
            ))}
            <a href="#contact" className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 ${
              scrolled ? 'bg-accent text-primary' : 'bg-primary text-white'
            }`}>
              Order Now
            </a>
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenu(true)}>
            <Menu className={scrolled ? 'text-white' : 'text-primary'} />
          </button>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 flex flex-col shadow-2xl">
          <button className="self-end mb-12" onClick={() => setMobileMenu(false)}>
            <X className="text-white" size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Story', 'Shop', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setMobileMenu(false)}
                className="text-white text-3xl font-heading font-medium border-b border-white/10 pb-4"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenu(false)}
              className="bg-accent text-primary px-8 py-4 rounded-xl font-bold text-center mt-4"
            >
              Discover Collection
            </a>
          </div>
          <div className="mt-auto space-y-4">
            <p className="text-white/40 text-xs font-mono uppercase tracking-[0.2em]">Our Hub</p>
            <p className="text-white/80">{contact.address}</p>
            <p className="text-white/80">{contact.whatsapp}</p>
          </div>
        </div>
      </div>

      {/* --- HERO (HR-C Variant) --- */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1.2fr_1fr] items-stretch bg-secondary overflow-hidden pt-20">
        <div className="flex flex-col justify-center px-8 md:px-20 py-16">
          <p className={`text-primary/60 font-mono text-xs tracking-[0.4em] uppercase mb-6 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Premium Food Processor
          </p>
          <h1 className={`font-heading text-5xl md:text-[5.5rem] font-medium text-primary leading-[0.95] transition-all duration-1000 delay-300 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-12'}`}>
            Elegance in <br /><span className="italic font-light">Every Grain.</span>
          </h1>
          <p className={`text-primary/70 mt-8 text-xl max-w-md leading-relaxed transition-all duration-1000 delay-500 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Experience the pinnacle of organic Nigerian nutrition, curated by Raimi Itunu for the health-conscious family.
          </p>
          <div className={`flex gap-6 mt-12 transition-all duration-1000 delay-700 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#shop" className="bg-primary text-white px-10 py-4 font-bold rounded-full hover:scale-105 transition-transform duration-300">
              Explore Collection
            </a>
          </div>
          <div className="mt-20 flex gap-10 border-t border-primary/10 pt-8 opacity-60">
            {stats.slice(0, 2).map((s, i) => (
              <div key={i}>
                <p className="font-heading text-3xl font-bold text-primary">{s.number}</p>
                <p className="text-primary/60 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref={heroReveal.ref} className="relative min-h-[50vh] md:min-h-full">
          <div className={`absolute inset-0 bg-primary/10 transition-all duration-1000 ${heroReveal.isVisible ? 'max-w-full' : 'max-w-0'}`} />
          <SafeImage 
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format" 
            alt="Nukky Organic Process" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/10 to-transparent" />
        </div>
      </section>

      <Divider tagline="Healthy Nutritious Organic Foods" brandName="Nukky" />

      {/* --- FEATURES (F-NUMBERED Variant) --- */}
      <section id="story" className="py-28 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-5xl font-medium text-primary">The Nukky Standard</h2>
            <p className="text-primary/60 mt-4">Why discerning families choose our organic harvest.</p>
          </div>
          <div ref={featuresReveal.ref} className="divide-y divide-primary/10">
            {features.map((f, i) => (
              <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-heading text-primary/20 text-5xl font-light italic shrink-0 w-16">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-primary">{f.title}</h3>
                  <p className="text-primary/60 mt-3 max-w-xl leading-relaxed">{f.description}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 text-primary">
                  <f.icon size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SIGNATURE: FOUNDER'S HERITAGE --- */}
      <section className="py-28 bg-primary text-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div ref={aboutReveal.ref} className={`relative transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden z-10">
              <SafeImage 
                src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=800&auto=format" 
                alt="Raimi Itunu - Founder" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-accent/10 rounded-3xl -z-0" />
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 hidden lg:block">
              <div className="bg-accent text-primary p-8 rounded-2xl shadow-2xl">
                <p className="font-heading text-4xl font-bold leading-none">Raimi Itunu</p>
                <p className="text-xs font-mono uppercase tracking-widest mt-2 opacity-60">Quality Custodian</p>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6">Founder's Heritage</p>
            <h2 className="font-heading text-5xl font-medium mb-8 leading-tight">The Heart Behind <br /><span className="italic">The Harvest</span></h2>
            <div className="space-y-6 text-secondary/70 text-lg leading-relaxed">
              <p>Nukky Foods & Organics was born from a singular vision by Raimi Itunu: that every Nigerian home deserves access to untainted, life-giving food.</p>
              <p>As a detail-oriented entrepreneur, Raimi oversees every stage of production with a quality-driven philosophy. What began as a passion for healthy living has evolved into a premium processing hub where traditional wisdom meets modern hygiene standards.</p>
              <p>At Nukky, we don't just sell food; we offer a commitment to your longevity and vitality through meticulous quality control.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8">
              {stats.slice(1).map((s, i) => (
                <div key={i} className="border-l border-white/10 pl-6">
                  <p className="font-heading text-3xl font-bold text-accent">{s.number}</p>
                  <p className="text-secondary/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS (P-STAGGER Variant) --- */}
      <section id="shop" className="py-28 px-6 bg-secondary overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-28">
          <div className="text-center mb-16">
            <h2 className="font-heading text-6xl font-medium text-primary">Signature Harvest</h2>
            <p className="text-primary/60 mt-4 max-w-xl mx-auto">Premium fortified staples and organic essentials for your lifestyle.</p>
          </div>
          {products.map((p, i) => (
            <div key={i} ref={productsReveal.ref} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-primary/40 text-xs font-bold tracking-widest uppercase mb-4 block">
                  Signature 0{i + 1}
                </span>
                <h3 className="font-heading text-4xl md:text-5xl font-medium text-primary leading-tight">{p.name}</h3>
                <p className="text-primary/60 mt-6 text-lg leading-relaxed">{p.description}</p>
                <div className={`mt-8 flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                  <span className="text-4xl font-heading font-bold text-primary">{p.price}</span>
                  <a href="#contact" className="bg-primary text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 group">
                    Place Order <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- GALLERY (Bonus Masonry) --- */}
      <section className="py-28 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="font-heading text-5xl font-medium text-primary">Farm to Table</h2>
            <p className="text-primary/50 max-w-sm">A visual journey through our organic processing standards.</p>
          </div>
          <div ref={galleryReveal.ref} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format",
              "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format",
              "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=800&auto=format",
              "https://images.unsplash.com/photo-1589733429478-2430ee5b6a15?q=80&w=800&auto=format",
              "https://images.unsplash.com/photo-1590136608242-f22291fe02e5?q=80&w=800&auto=format",
              "https://images.unsplash.com/photo-1544070282-1921227a6146?q=80&w=800&auto=format"
            ].map((src, i) => (
              <div key={i} className={`break-inside-avoid relative rounded-2xl overflow-hidden transition-all duration-700 ${galleryReveal.isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Process ${i}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (T-SPOTLIGHT) --- */}
      <section className="py-28 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-medium text-primary mb-20 italic">The Word on Nukky</h2>
          <div ref={testimonialsReveal.ref} className="space-y-12">
            {[
              { name: "Mrs. Adebayo", text: "The fortified pap is a game changer for my kids. You can taste the purity in every spoonful.", role: "Lagos Resident" },
              { name: "Chidi Okafor", text: "The catfish is the cleanest I've ever bought. Nukky Foods is now my only source for organic spices.", role: "Fitness Coach" }
            ].map((t, i) => (
              <div key={i} className={`relative py-12 px-10 rounded-3xl border border-primary/10 bg-gradient-to-b from-primary/5 to-transparent transition-all duration-700 ${testimonialsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent border border-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold leading-none">&ldquo;</span>
                </div>
                <p className="font-heading text-2xl md:text-3xl text-primary leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="font-bold text-primary uppercase tracking-widest text-sm">{t.name}</p>
                    <p className="text-primary/40 text-xs mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT (C2 Variant) --- */}
      <section id="contact" className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-secondary [clip-path:polygon(0_0,60%_0,45%_100%,0_100%)] hidden md:block" />
        <div ref={contactReveal.ref} className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl md:text-[6vw] font-medium text-primary md:text-primary leading-[0.9] mb-8">
              Begin Your <br /><span className="italic text-primary md:text-primary font-light">Wellness Journey</span>
            </h2>
            <div className="space-y-6 text-primary/60">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-accent group-hover:text-primary">
                  <Phone size={20} />
                </div>
                <p className="font-medium">{contact.whatsapp}</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-accent group-hover:text-primary">
                  <Instagram size={20} />
                </div>
                <p className="font-medium">{contact.instagram}</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-accent group-hover:text-primary">
                  <MapPin size={20} />
                </div>
                <p className="font-medium">{contact.address}</p>
              </div>
            </div>
          </div>
          
          <div className={`w-full max-w-md ml-auto transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary rounded-3xl shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
                  <CheckCheck size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-primary mb-3">Order Received</h3>
                <p className="text-primary/60">Our wellness consultants will reach out shortly via WhatsApp to confirm your selection.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-secondary p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                <h3 className="font-heading text-2xl font-bold text-primary mb-8">Enquire or Order</h3>
                <div className="space-y-4">
                  {['name', 'email', 'phone'].map(field => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      required
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary placeholder-primary/40 text-sm outline-none transition-all focus:border-primary"
                      onChange={e => setForm({...form, [field]: e.target.value})}
                    />
                  ))}
                  <textarea rows={4} placeholder="What are you harvesting today?"
                    required
                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-primary placeholder-primary/40 text-sm outline-none resize-none transition-all focus:border-primary"
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-all flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : "Request Quote"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-primary text-secondary pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary font-heading font-black text-2xl">N</div>
                <span className="font-heading text-3xl font-medium tracking-tight">Nukky Foods & Organics</span>
              </div>
              <p className="text-secondary/50 text-lg max-w-sm leading-relaxed mb-8 italic">
                Sharp delivery, nationwide. Nature's nutrition from our farm to your table.
              </p>
              <div className="flex gap-6">
                <a href={contact.whatsapp} className="text-secondary/40 hover:text-accent transition-colors"><Phone size={20} /></a>
                <a href="#" className="text-secondary/40 hover:text-accent transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-secondary/40 hover:text-accent transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-xl font-medium mb-8">Explore</h4>
              <ul className="space-y-4 text-secondary/40">
                <li><a href="#story" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#shop" className="hover:text-white transition-colors">Organic Shop</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xl font-medium mb-8">Hub</h4>
              <p className="text-secondary/40 leading-relaxed">
                {contact.address}<br />
                Mon — Sat: 8AM — 6PM<br />
                {contact.whatsapp}
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-secondary/20 text-sm font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Nukky Foods & Organics. All rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] font-mono tracking-[0.3em] uppercase opacity-30">
              <p>Privacy</p>
              <p>Terms</p>
              <p>Founder Heritage</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}