import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Menu, 
  X, 
  BrainCircuit, 
  Radio, 
  HeartPulse,
  Clock,
  UserCheck,
  Users,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/smaran/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/smaran/ui/navigation-menu";
import { Button } from "@/components/smaran/ui/button";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      title: "Digital Twin",
      href: "#digital-twin",
      icon: HeartPulse,
      description: "Real-time biometric simulation predicting recovery trajectories and vital trends.",
    },
    {
      title: "Recovery Timeline",
      href: "#timeline",
      icon: Clock,
      description: "Adaptive clinical milestone tracking and prognosis overview.",
    },
    {
      title: "Explainable AI",
      href: "#intelligence",
      icon: BrainCircuit,
      description: "Transparent neural reasoning explaining health insights and risk scores.",
    },
    {
      title: "Find Doctor",
      href: "#doctor-discovery",
      icon: UserCheck,
      description: "Match with specialist doctors and schedule follow-ups.",
    },
    {
      title: "Rural Network",
      href: "#rural-asha",
      icon: Radio,
      description: "Offline-first community healthcare bridge for remote areas.",
    },
    {
      title: "ASHA Network",
      href: "#asha-network",
      icon: Users,
      description: "Last-mile community worker dispatch & doorstep emergency checks.",
    },
    {
      title: "Vision",
      href: "#vision",
      icon: Eye,
      description: "Our core mission to transform post-discharge care.",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
      
      {/* Apple-Style Floating Liquid Glass Pill Container */}
      <div 
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 pointer-events-auto relative overflow-hidden ${
          scrolled 
            ? 'bg-white/65 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.14),0_0_24px_-4px_rgba(20,184,166,0.18)]' 
            : 'bg-white/45 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.12),0_0_20px_-6px_rgba(20,184,166,0.12)]'
        }`}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.45)',
          boxShadow: scrolled
            ? 'inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.15), 0 16px 40px -10px rgba(15, 23, 42, 0.14), 0 0 24px -4px rgba(20, 184, 166, 0.18)'
            : 'inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.12), 0 12px 40px -10px rgba(15, 23, 42, 0.12), 0 0 20px -6px rgba(20, 184, 166, 0.12)',
        }}
      >
        {/* Soft Specular Reflection Ray (Top Edge) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        {/* Faint Ambient Teal Edge Glow */}
        <div className="absolute -inset-px rounded-full bg-gradient-to-r from-teal-400/10 via-cyan-400/10 to-emerald-400/10 -z-10 blur-sm pointer-events-none" />

        <div className="px-5 py-2.5 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center">
              <img
                src={logo}
                alt="Sahayak Logo"
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-1 rounded-full bg-teal-500/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
              Sahayak
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center mx-2">
            <NavigationMenu className="bg-white/40 p-1 rounded-full border border-white/50 backdrop-blur-md shadow-inner">
              <NavigationMenuList className="gap-0.5">
                
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:text-slate-950 hover:bg-white/80 focus:bg-white/90 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200`}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button
              onClick={() => {
                /* Action handler will be implemented later */
              }}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-5 py-2 shadow-md shadow-teal-600/20 hover:shadow-teal-600/35 transition-all duration-300 group border-0 cursor-pointer flex items-center gap-1.5"
            >
              Get Started
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Mobile menu toggle button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-700 hover:text-slate-900 bg-white/70 border border-white/60 shadow-2xs focus:outline-none backdrop-blur-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown inside liquid glass container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white/90 border-t border-white/60 px-5 pt-3 pb-6 space-y-4 backdrop-blur-2xl overflow-hidden shadow-xl"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700 px-2 mb-2">Navigation</p>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200/80"
                    >
                      <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-slate-900">{item.title}</span>
                        <span className="block text-[10px] text-slate-500 font-normal">{item.description}</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    /* Action handler will be implemented later */
                  }} 
                  className="inline-flex w-full justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-full text-xs shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
};
