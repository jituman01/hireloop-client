'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import {
  Bars,
  Xmark,
  Briefcase,
  Persons,
  CreditCard,
} from '@gravity-ui/icons';

const navItems = [
  {
    label: 'Browse Jobs',
    href: '/jobs',
    icon: Briefcase,
  },
  {
    label: 'Company',
    href: '/company',
    icon: Persons,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    icon: CreditCard,
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side Logo */}
        <Link href="/" className="flex items-center gap-3">
          
          {/* Logo */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/20">
            <span className="text-xl font-bold text-white">P</span>
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <h2 className="text-lg font-bold text-white">
              Hire Loop
            </h2>
          
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Desktop Menu */}
          <div className="hidden items-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-xl lg:flex">
            
            {/* Nav Items */}
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Vertical Divider */}
            <div className="mx-4 h-6 w-px bg-white/10" />

            {/* Sign In */}
            <Link
              href="/signin"
              className="px-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              Sign In
            </Link>

            {/* CTA Button */}
            <Link
              href="/signup"
              className="ml-4 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <Bars className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen
            ? 'max-h-[500px] border-t border-white/10 opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3 bg-[#0B0F19]/95 px-4 py-5 backdrop-blur-xl">
          
          {/* Mobile Nav Links */}
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-12 items-center justify-center rounded-xl bg-white text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;