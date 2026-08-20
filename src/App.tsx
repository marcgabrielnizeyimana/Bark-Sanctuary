import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  HeartPulse, 
  Home, 
  Dog, 
  Bone, 
  Stethoscope, 
  DoorOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Users,
  Gift,
  Camera,
  MapPinned,
  ClipboardList,
  Building,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const TikTokIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.9 2.9 0 0 1 2.316-4.643c.277 0 .546.039.803.111V9.378a6.33 6.33 0 0 0-.803-.051C5.973 9.327 3.1 12.2 3.1 15.714c0 3.515 2.873 6.386 6.386 6.386 3.514 0 6.386-2.871 6.386-6.386V8.297a8.21 8.21 0 0 0 4.717 1.488v-3.099a4.808 4.808 0 0 1-1-.001z"/>
  </svg>
);

const MONTHLY_LINKS: Record<number, string> = {
  5: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0D1981277X936950PNHMDI5A",
  10: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9VT17510UJ871991RNHMDCVQ",
  20: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-1GK50076TW0501123NHMDDWA",
  50: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-1860366979941792XNHMDEEY",
  100: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-4Y099377A70004225NHMDESI",
  200: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-5YW36021TL4950021NHMDGVA",
  500: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-81T51567A7599031CNHMDG7I",
  1000: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-49C85872FA232805GNHMDHHY",
};

const ONE_TIME_BASE_URL = "https://www.paypal.com/ncp/payment/JKDWGLV9NC8AY";
const FACEBOOK_URL = "https://www.facebook.com/share/18NGjCf5EA/";
const INSTAGRAM_URL = "https://www.instagram.com/bark_sanctuary?igsh=MXQ5azJrNmRiZjd6aA==";
const TIKTOK_URL = "https://www.tiktok.com/@barksanctuary";

// Subtle scroll blur and staggered item entry variants
const sectionVariants = {
  hidden: { 
    opacity: 0.35, 
    filter: "blur(12px)", 
    scale: 0.97,
    y: 35,
    transition: { 
      type: "spring",
      stiffness: 70,
      damping: 20
    }
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 60,
      damping: 18,
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  },
  hover: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 16 } 
  }
};

const leftVariants = {
  hidden: { opacity: 0, x: -80, scale: 0.96 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 65, damping: 15 } 
  }
};

const rightVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.96 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 65, damping: 15 } 
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(5);
  const [donationFrequency, setDonationFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [currentStoryImg, setCurrentStoryImg] = useState(0);

  // New Modals for Foster & Volunteer Applications inspired by Detroit Pit Crew
  const [isFosterModalOpen, setIsFosterModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  
  // Form submission success states
  const [fosterSubmitted, setFosterSubmitted] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  // Form Fields
  const [fosterForm, setFosterForm] = useState({ name: '', email: '', phone: '', housing: 'house', experience: 'beginner', otherPets: 'no' });
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', phone: '', interest: 'care', availability: 'weekends' });

  // Curated 9:16 high-resolution rescue dog portraits
  const storyImages = [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&h=1600&q=80",
    "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=900&h=1600&q=80",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&h=1600&q=80",
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&h=1600&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStoryImg((prev) => (prev + 1) % storyImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const getDonationLink = () => {
    if (donationFrequency === 'monthly') {
      return MONTHLY_LINKS[donationAmount] || MONTHLY_LINKS[5];
    }
    return `${ONE_TIME_BASE_URL}?amount=${donationAmount}&currency_code=USD`;
  };

  const donationAmounts = [5, 10, 20, 50, 100, 200, 500, 1000];

  const handleFosterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFosterSubmitted(true);
    setTimeout(() => {
      setIsFosterModalOpen(false);
      setFosterSubmitted(false);
      setFosterForm({ name: '', email: '', phone: '', housing: 'house', experience: 'beginner', otherPets: 'no' });
    }, 3000);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSubmitted(true);
    setTimeout(() => {
      setIsVolunteerModalOpen(false);
      setVolunteerSubmitted(false);
      setVolunteerForm({ name: '', email: '', phone: '', interest: 'care', availability: 'weekends' });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafb]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-[#0d131f]/95 backdrop-blur-md border-b border-white/5 z-50 py-3 transition-all duration-300 shadow-xl">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-white font-serif text-2xl font-bold flex items-center gap-3.5 group">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white p-0.5 border-2 border-accent shadow-[0_0_20px_rgba(255,107,53,0.3)] ring-4 ring-accent/20 transition-transform group-hover:scale-105 duration-300 flex items-center justify-center shrink-0">
              <img 
                src="/logo.jpeg" 
                alt="Bark Sanctuary Logo" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-xl md:text-2xl text-white tracking-tight group-hover:text-accent transition-colors">Bark Sanctuary</span>
              <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase font-semibold mt-1">Sacramento Outskirts Rescue</span>
            </div>
          </a>
          
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#home" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Home</a>
            <a href="#about" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Our Story</a>
            <a href="#emergency" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Emergency Report</a>
            <a href="#help" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Ways to Help</a>
            <a href="#impact" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Impact</a>
            <a href="#gallery" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Rescues</a>
            <a href="#contact" className="text-gray-300 hover:text-accent transition-colors font-medium text-sm tracking-wide py-1.5 border-b-2 border-transparent hover:border-accent">Contact</a>
            <a href={ONE_TIME_BASE_URL} target="_blank" rel="noreferrer" className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(255,107,53,0.35)] hover:-translate-y-0.5 flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-current" /> Donate
            </a>
          </nav>

          <button 
            className="lg:hidden text-white hover:text-accent text-2xl transition-colors focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bg-[#0d131f] border-b border-white/5 z-40 p-6 flex flex-col items-center gap-5 lg:hidden shadow-2xl"
          >
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Our Story</a>
            <a href="#emergency" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Emergency Report</a>
            <a href="#help" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Ways to Help</a>
            <a href="#impact" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Impact</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Rescues</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-accent text-lg font-medium transition-colors">Contact</a>
            <a href={ONE_TIME_BASE_URL} target="_blank" rel="noreferrer" className="bg-accent text-white px-8 py-3 rounded-full font-bold text-center w-full shadow-lg">
              Donate Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-[80px] md:pt-[88px]">
        {/* HERO */}
        <section id="home" className="relative h-[calc(100vh-88px)] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80" 
              alt="Hero background" 
              className="w-full h-full object-cover brightness-[0.35]"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-accent/25 border border-accent/40 rounded-full px-4 py-1.5 mb-6 text-accent font-medium text-sm">
              <Sparkles className="w-4 h-4" /> Sacramento Outskirts Rescue & Support
            </div>
            <h1 className="text-white text-5xl md:text-7xl mb-6 leading-tight font-bold tracking-tight">From the Streets to Safety</h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">Every dog deserves a warm bed, a full belly, and a loving family. Join us in rewriting their stories and giving them the second chance they desperately need.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#donate" className="bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center">
                Donate Now
              </a>
              <a href="#emergency" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto text-center">
                <AlertTriangle className="w-5 h-5 shrink-0" /> Report Stray/Injured Dog
              </a>
            </div>
          </motion.div>
        </section>

        {/* EMERGENCY STREET RESCUE - Inspired by Detroit Pit Crew */}
        <motion.section 
          id="emergency" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-red-50 border-y border-red-100 transition-all duration-300"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-stretch bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl" />
                
                <motion.div variants={leftVariants} className="space-y-6 md:w-3/5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 shrink-0" /> Sacramento Emergency Dispatch
                    </div>
                    <h2 className="text-3xl md:text-4xl text-primary font-serif font-bold">Report a Dog in Need</h2>
                    <p className="text-muted leading-relaxed">
                      Just like the heroic efforts of Detroit Pit Crew, we focus on the forgotten, injured, and sick dogs roaming Sacramento's underserved outskirts. If you spot an animal in critical distress, do not look away. Let us know immediately.
                    </p>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 text-red-600 p-2.5 rounded-xl font-bold text-sm shrink-0 w-10 h-10 flex items-center justify-center">1</div>
                      <div>
                        <h4 className="font-bold text-primary flex items-center gap-1.5"><Camera className="w-4 h-4 text-red-500" /> Take a Photo/Video</h4>
                        <p className="text-muted text-sm">Capture their clear condition, size, and body language from a safe distance.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 text-red-600 p-2.5 rounded-xl font-bold text-sm shrink-0 w-10 h-10 flex items-center justify-center">2</div>
                      <div>
                        <h4 className="font-bold text-primary flex items-center gap-1.5"><MapPinned className="w-4 h-4 text-red-500" /> Pinpoint Location</h4>
                        <p className="text-muted text-sm">Note nearest cross-streets, neighborhood details, or exact GPS coordinates.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 text-red-600 p-2.5 rounded-xl font-bold text-sm shrink-0 w-10 h-10 flex items-center justify-center">3</div>
                      <div>
                        <h4 className="font-bold text-primary flex items-center gap-1.5"><Phone className="w-4 h-4 text-red-500" /> Text or Call Our Team</h4>
                        <p className="text-muted text-sm">Send details directly to our helpline: <strong>(916) 555-0198</strong></p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={rightVariants}
                  className="md:w-2/5 w-full bg-red-600 rounded-2xl p-8 text-white text-center shadow-lg flex flex-col justify-between min-h-[300px]"
                >
                  <div className="space-y-4">
                    <AlertTriangle className="w-12 h-12 mx-auto animate-pulse" />
                    <h3 className="text-2xl font-serif font-bold">Need Immediate Help?</h3>
                    <p className="text-red-100 text-sm leading-relaxed">Our emergency crew works tirelessly to rescue street stray dogs suffering from wounds, trauma, extreme neglect, or severe starvation.</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-red-500/40">
                    <p className="text-xs uppercase tracking-wider text-red-200 font-bold mb-1">Rescue Dispatch Helpline</p>
                    <a href="tel:9165550198" className="text-3xl font-bold hover:underline block tracking-tight">(916) 555-0198</a>
                    <span className="text-xs text-red-200">Calls & Texts Monitored Daily</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ABOUT (YOUR STORY PRESERVED ENTIRELY) */}
        <motion.section 
          id="about" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-white transition-all duration-300"
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={leftVariants} className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl group max-w-[320px] md:max-w-[360px] mx-auto w-full border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentStoryImg}
                    src={storyImages[currentStoryImg]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 border-[3px] border-accent rounded-2xl -z-10 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
              </motion.div>
              
              <motion.div 
                variants={rightVariants}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold">
                  Our Legacy & Mission
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight">Born From Struggle, Built On Hope</h2>
                <div className="text-muted text-lg space-y-4 leading-relaxed">
                  <p>In the neglected outskirts of Sacramento, far from the polished streets and bright storefronts, there are neighborhoods most people never see.</p>
                  <p>Places where broken fences lean into dusty yards. Where families struggle just to get by. And where abandoned dogs wander silently — hungry, injured, and invisible.</p>
                  
                  <h3 className="text-2xl font-serif text-primary mt-8 font-bold">Before Bark Sanctuary had a name, it was just a moment.</h3>
                  <p>A single dog, limping through the heat of a Sacramento afternoon. His ribs were visible. One leg barely working. His body covered in dirt, fear, and untreated wounds.</p>
                  
                  <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-accent text-2xl font-semibold my-8">
                    “This one will not die on the street.”
                  </blockquote>
                  
                  <p>Bark Sanctuary was not built from comfort. It was built from struggle. From sacrifice. From refusing to ignore suffering any longer.</p>
                  <p className="font-bold text-primary">Today, we are still fighting for dogs that the world continues to overlook. But now… we are not alone.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* WAYS TO HELP - Inspired by Detroit Pit Crew (Fostering, Volunteering, Wishlist, Adoption) */}
        <motion.section 
          id="help" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-gray-50 border-t border-gray-100 transition-all duration-300"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={childVariants} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-semibold mb-3">
                <HeartPulse className="w-4 h-4 shrink-0" /> Save a Life
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight">Ways You Can Help</h2>
              <p className="text-muted text-xl max-w-2xl mx-auto mt-2">There are so many ways to make a difference besides financial donations. Discover how you can hands-on save dogs with us.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Foster Card */}
              <motion.div 
                variants={childVariants}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="bg-accent/10 p-3.5 rounded-2xl w-fit">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Become a Foster</h3>
                  <p className="text-muted text-sm leading-relaxed">Our rescue is entirely foster-based. Opening your home temporarily allows a street-rescued dog to heal, feel safe, and get ready for their forever family.</p>
                </div>
                <button 
                  onClick={() => setIsFosterModalOpen(true)}
                  className="mt-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white w-full py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Foster Application <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Volunteer Card */}
              <motion.div 
                variants={childVariants}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="bg-primary/5 p-3.5 rounded-2xl w-fit">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Volunteer With Us</h3>
                  <p className="text-muted text-sm leading-relaxed">Whether it is helping clean, walking dogs, transporting animals to critical vet appointments, or assisting with local events, your time is invaluable.</p>
                </div>
                <button 
                  onClick={() => setIsVolunteerModalOpen(true)}
                  className="mt-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white w-full py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Volunteer Sign-Up <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Adoption Card */}
              <motion.div 
                variants={childVariants}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="bg-green-50 p-3.5 rounded-2xl w-fit">
                    <Dog className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Adopt a Dog</h3>
                  <p className="text-muted text-sm leading-relaxed">Give one of our brave street survivors the permanent loving home they deserve. View our active rescue list or get in touch for potential pairings.</p>
                </div>
                <a 
                  href="#gallery"
                  className="mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl font-semibold text-sm transition-colors text-center"
                >
                  View Rescues
                </a>
              </motion.div>

              {/* Supplies Wishlist Card */}
              <motion.div 
                variants={childVariants}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3.5 rounded-2xl w-fit">
                    <Gift className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">Donate Supplies</h3>
                  <p className="text-muted text-sm leading-relaxed">We constantly need puppy food, sturdy leashes, dog beds, medical crates, and flea/tick treatments. Buy directly from our curated wishlists.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  <a 
                    href="https://www.amazon.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors"
                  >
                    Amazon Wishlist
                  </a>
                  <a 
                    href="https://www.chewy.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-xs transition-colors"
                  >
                    Chewy List
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* IMPACT */}
        <motion.section 
          id="impact" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-white transition-all duration-300"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={childVariants} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight">Our Impact</h2>
              <p className="text-muted text-xl max-w-2xl mx-auto mt-2">Thanks to supporters like you, we are changing lives every single day.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Dog, number: "1,240+", label: "Dogs Rescued" },
                { icon: HeartPulse, number: "5,000+", label: "Medical Treatments" },
                { icon: Home, number: "1,150+", label: "Adoptions Completed" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={childVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 p-10 rounded-2xl shadow-md hover:-translate-y-2 transition-all border border-gray-100"
                >
                  <stat.icon className="w-16 h-16 text-accent mx-auto mb-6" />
                  <div className="text-4xl font-bold text-primary mb-2 font-mono">{stat.number}</div>
                  <p className="text-muted font-medium uppercase tracking-wider text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* GALLERY */}
        <motion.section 
          id="gallery" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-gray-50 transition-all duration-300"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={childVariants} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight">Faces of Survival</h2>
              <p className="text-muted text-xl max-w-2xl mx-auto mt-2">Behind every rescue is a story of resilience and unconditional love.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&h=600&q=80", name: "Barnaby", desc: "Rescued from industrial ditch" },
                { img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&h=600&q=80", name: "Luna", desc: "Healed from malnutrition" },
                { img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&h=600&q=80", name: "Max & Cooper", desc: "Adopted together into forever home" },
                { img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&h=600&q=80", name: "Bella", desc: "Safe in loving foster care" }
              ].map((rescue, id) => (
                <motion.div 
                  key={id}
                  variants={childVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg border border-gray-200"
                >
                  <img 
                    src={rescue.img} 
                    alt={rescue.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-left">
                    <h4 className="text-white text-lg font-bold">{rescue.name}</h4>
                    <p className="text-gray-300 text-sm">{rescue.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* WHY DONATE */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-white transition-all duration-300"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={childVariants} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight">Why We Need You</h2>
              <p className="text-muted text-xl max-w-2xl mx-auto mt-2">We rely 100% on public donations to keep our sanctuary doors open. Your contribution directly saves lives.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Bone, title: "Food & Shelter", desc: "A warm bed and a full bowl mean the world to a stray. Your donation ensures no dog goes to sleep hungry or cold." },
                { icon: Stethoscope, title: "Medical Care", desc: "From essential vaccinations to complex life-saving surgeries, we provide top-tier vet care for every dog that arrives." },
                { icon: DoorOpen, title: "A Second Chance", desc: "Your gift funds the complete journey: rescue, intense rehabilitation, behavioral training, and finding their forever family." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={childVariants}
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 p-8 rounded-2xl shadow-sm flex gap-6 text-left hover:-translate-y-1 transition-all border border-gray-100"
                >
                  <div className="bg-accent/10 p-4 rounded-full h-fit shrink-0">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                    <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* DONATE WIDGET */}
        <motion.section 
          id="donate" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-24 bg-[#0d131f] text-white relative overflow-hidden transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div variants={leftVariants} className="space-y-6">
                <h2 className="text-white text-5xl font-serif font-bold leading-tight">Be the reason they survive.</h2>
                <p className="text-gray-300 text-lg leading-relaxed">Select an amount to help us provide immediate food, life-saving medical care, and a safe shelter. Every dollar rewrites a story.</p>
                
                {/* Frequency Toggle */}
                <div className="flex bg-white/5 p-1 rounded-xl w-fit mb-8 border border-white/10">
                  <button 
                    onClick={() => setDonationFrequency('one-time')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${donationFrequency === 'one-time' ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    One-time
                  </button>
                  <button 
                    onClick={() => setDonationFrequency('monthly')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${donationFrequency === 'monthly' ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    Monthly
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-10">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`py-4 rounded-xl font-bold text-lg transition-all border-2 ${
                        donationAmount === amount 
                        ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(255,107,53,0.4)]' 
                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-accent/50 hover:text-white'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <a 
                  href={getDonationLink()} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full bg-accent hover:bg-accent-hover text-white text-center py-5 rounded-2xl font-bold text-2xl transition-all shadow-2xl hover:-translate-y-1"
                >
                  Donate {donationAmount > 0 ? `$${donationAmount}` : ''} {donationFrequency === 'monthly' ? 'Monthly' : 'Now'}
                </a>
              </motion.div>

              <motion.div 
                variants={rightVariants}
                className="bg-white p-10 rounded-3xl text-primary text-center shadow-2xl max-w-sm mx-auto"
              >
                <h4 className="text-2xl font-bold mb-6 font-serif">Quick Donation</h4>
                <div className="bg-gray-50 p-6 rounded-2xl mb-6 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getDonationLink())}`} 
                    alt="Donate QR Code" 
                    className="w-full aspect-square"
                  />
                </div>
                <p className="text-muted font-medium text-sm">Open your camera and scan the QR code to donate ${donationAmount} {donationFrequency === 'monthly' ? 'monthly' : 'now'}.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SPONSORS & VETERINARY PARTNERS - Inspired by Detroit Pit Crew */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionVariants}
          className="py-16 bg-white border-t border-gray-100 transition-all duration-300"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h3 variants={childVariants} className="text-xs uppercase tracking-wider text-muted font-bold mb-8">Our Medical & Veterinary Partners</motion.h3>
            <motion.div 
              variants={childVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <Building className="w-6 h-6 text-primary shrink-0" />
                <span className="font-bold text-primary tracking-tight">Sacramento Vet Emergency</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Stethoscope className="w-6 h-6 text-primary shrink-0" />
                <span className="font-bold text-primary tracking-tight">Capital Care Clinic</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Building className="w-6 h-6 text-primary shrink-0" />
                <span className="font-bold text-primary tracking-tight">Sacramento Pet Alliance</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ClipboardList className="w-6 h-6 text-primary shrink-0" />
                <span className="font-bold text-primary tracking-tight">Happy Tails Health</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section 
          id="contact" 
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.15, margin: "-10% 0px -10% 0px" }}
          variants={sectionVariants}
          className="py-20 bg-gray-50 border-t border-gray-100 transition-all duration-300"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={childVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold tracking-tight">Get In Touch</h2>
              <p className="text-muted text-xl max-w-2xl mx-auto mt-2">Have questions about volunteering or donating? Reach out to us.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <motion.div variants={childVariants} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-primary">Visit Us</h4>
                <p className="text-muted leading-relaxed text-sm">Westhampton Way<br />Sacramento, CA 95835<br />United States</p>
              </motion.div>
              
              <motion.div variants={childVariants} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-primary">Call Us</h4>
                <p className="text-muted leading-relaxed text-sm">(916) 555-0198<br />Mon-Fri, 9am - 5pm</p>
              </motion.div>
              
              <motion.div variants={childVariants} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-primary">Email Us</h4>
                <p className="text-muted leading-relaxed text-sm">peppersstewart3@gmail.com</p>
              </motion.div>
            </div>

            <motion.div variants={childVariants} className="flex justify-center gap-6 mt-16">
              {[
                { icon: Facebook, href: FACEBOOK_URL, label: "Facebook" },
                { icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
                { icon: TikTokIcon, href: TIKTOK_URL, label: "TikTok" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label={social.label}
                  className="bg-white p-4 rounded-full text-primary hover:bg-accent hover:text-white shadow-md transition-all hover:-translate-y-1 border border-gray-100 flex items-center justify-center w-14 h-14"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* RICH, PREMIUM REDESIGNED FOOTER */}
      <footer className="bg-[#0b0f19] border-t border-white/5 text-gray-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Logo & Mission Statement */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white p-0.5 border-2 border-accent shadow-[0_0_20px_rgba(255,107,53,0.3)] ring-4 ring-accent/20 flex items-center justify-center shrink-0">
                  <img 
                    src="/logo.jpeg" 
                    alt="Bark Sanctuary Logo" 
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-white font-serif text-xl font-bold tracking-tight">Bark Sanctuary</h3>
                  <p className="text-accent text-[10px] font-mono tracking-widest uppercase font-bold">Sacramento, CA</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dedicated to rescuing, rehabilitating, and rehoming neglected, abandoned, and sick stray dogs roaming Sacramento's outskirts. Born from refuse, driven by compassion.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, href: FACEBOOK_URL, label: "Facebook" },
                  { icon: Instagram, href: INSTAGRAM_URL, label: "Instagram" },
                  { icon: TikTokIcon, href: TIKTOK_URL, label: "TikTok" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={social.label}
                    className="bg-white/5 hover:bg-accent hover:text-white p-2.5 rounded-full text-gray-300 transition-all duration-300 flex items-center justify-center w-10 h-10"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6 font-mono border-l-2 border-accent pl-3">Resources</h4>
              <ul className="space-y-3.5 text-sm">
                <li><a href="#home" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Home</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Our Story</a></li>
                <li><a href="#emergency" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Emergency Dispatch</a></li>
                <li><a href="#help" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Ways to Help</a></li>
                <li><a href="#impact" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Our Impact</a></li>
                <li><a href="#gallery" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Meet the Rescues</a></li>
              </ul>
            </div>

            {/* Column 3: Ways to Support */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6 font-mono border-l-2 border-accent pl-3">Get Involved</h4>
              <ul className="space-y-3.5 text-sm">
                <li>
                  <button onClick={() => setIsFosterModalOpen(true)} className="hover:text-accent transition-colors text-left flex items-center gap-1.5">
                    <span>&rsaquo;</span> Foster Application
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsVolunteerModalOpen(true)} className="hover:text-accent transition-colors text-left flex items-center gap-1.5">
                    <span>&rsaquo;</span> Volunteer Sign-Up
                  </button>
                </li>
                <li><a href="#donate" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Secure Online Donation</a></li>
                <li><a href="https://www.amazon.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Amazon Supply Wishlist</a></li>
                <li><a href="https://www.chewy.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5"><span>&rsaquo;</span> Chewy Support Registry</a></li>
              </ul>
            </div>

            {/* Column 4: Operational & Emergency Info */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6 font-mono border-l-2 border-accent pl-3">Rescue Hotlines</h4>
              <div className="space-y-4 text-sm">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                    24/7 Dispatch Hotline
                  </div>
                  <a href="tel:9165550198" className="text-lg font-bold text-white hover:text-accent transition-colors block">
                    (916) 555-0198
                  </a>
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Call or text with stray pictures and location pins around Sacramento.
                  </p>
                </div>
                <div className="text-xs space-y-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0" /> Westhampton Way, Sacramento, CA
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent shrink-0" /> peppersstewart3@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left space-y-1">
              <p>&copy; 2019 - 2026 Bark Sanctuary. All rights reserved.</p>
              <p className="text-[10px] text-gray-600">A registered 501(c)(3) Non-Profit Public Charity. Contributions are tax-deductible to the extent allowed by law.</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" /> Securing Sacramento's Forgotten
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE FOSTER APPLICATION MODAL */}
      <AnimatePresence>
        {isFosterModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full text-primary shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsFosterModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              {fosterSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Application Received!</h3>
                  <p className="text-muted text-sm">Thank you for opening your heart to foster. A sanctuary coordinator will reach out to you within 24-48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFosterSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-serif">Apply to Foster</h3>
                    <p className="text-muted text-xs">Help a street survivor in Sacramento prepare for a permanent home.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={fosterForm.name}
                        onChange={(e) => setFosterForm({ ...fosterForm, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                        <input 
                          required 
                          type="email" 
                          value={fosterForm.email}
                          onChange={(e) => setFosterForm({ ...fosterForm, email: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={fosterForm.phone}
                          onChange={(e) => setFosterForm({ ...fosterForm, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                          placeholder="(916) 555-0100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Housing Situation</label>
                      <select 
                        value={fosterForm.housing}
                        onChange={(e) => setFosterForm({ ...fosterForm, housing: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      >
                        <option value="house">House with Fenced Yard</option>
                        <option value="apartment">Apartment / Condo</option>
                        <option value="farm">Acreage / Farm</option>
                        <option value="other">Other / Rented Room</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Experience Level</label>
                        <select 
                          value={fosterForm.experience}
                          onChange={(e) => setFosterForm({ ...fosterForm, experience: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                        >
                          <option value="beginner">First-time Foster</option>
                          <option value="experienced">Have Foster Experience</option>
                          <option value="expert">Experienced with Medical Needs</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Other Pets?</label>
                        <select 
                          value={fosterForm.otherPets}
                          onChange={(e) => setFosterForm({ ...fosterForm, otherPets: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                        >
                          <option value="no">No other pets</option>
                          <option value="yes_dogs">Yes, other dogs</option>
                          <option value="yes_cats">Yes, cats</option>
                          <option value="yes_both">Yes, both dogs & cats</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold transition-colors shadow-lg"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE VOLUNTEER MODAL */}
      <AnimatePresence>
        {isVolunteerModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full text-primary shadow-2xl relative"
            >
              <button 
                onClick={() => setIsVolunteerModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              {volunteerSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Welcome to the Team!</h3>
                  <p className="text-muted text-sm">Your volunteer sign-up was received. We will contact you shortly with upcoming training and dispatch guidelines.</p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-serif">Volunteer Sign-Up</h3>
                    <p className="text-muted text-xs">Help us walk, transport, or feed rescued dogs around Sacramento.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                        <input 
                          required 
                          type="email" 
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                          placeholder="(916) 555-0100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Areas of Interest</label>
                      <select 
                        value={volunteerForm.interest}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, interest: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      >
                        <option value="care">Sanctuary Care & Feeding</option>
                        <option value="transport">Animal Vet Transport</option>
                        <option value="dispatch">Emergency Rescue Assistance</option>
                        <option value="events">Events & Fundraising</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Availability</label>
                      <select 
                        value={volunteerForm.availability}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                      >
                        <option value="weekends">Weekends only</option>
                        <option value="weekdays">Weekdays only</option>
                        <option value="flexible">Flexible / Dynamic Schedule</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold transition-colors shadow-lg"
                  >
                    Submit Volunteer Sign-Up
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
