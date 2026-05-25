'use client';

import React from 'react';
import Link from 'next/link';

import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from '@gravity-ui/icons';

const footerLinks = {
  Product: [
    'Job discovery',
    'Worker AI',
    'Companies',
    'Salary data',
  ],
  Navigations: [
    'Help center',
    'Career library',
    'Contact',
  ],
  Resources: [
    'Brand Guideline',
    'Newsroom',
  ],
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full border border-violet-500/10" />
        <div className="absolute left-1/2 top-10 h-[450px] w-[800px] -translate-x-1/2 rounded-full border border-violet-500/10" />
        <div className="absolute left-1/2 top-20 h-[400px] w-[700px] -translate-x-1/2 rounded-full border border-violet-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          
          {/* Left Content */}
          <div className="max-w-sm">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
                <span className="text-xl font-bold text-white">
                  P
                </span>
              </div>

              <div className="leading-none">
                <h2 className="text-lg font-bold text-white">
                  Hire Loop
                </h2>
                
              </div>
            </Link>

            {/* Description */}
            <p className="mt-8 text-base leading-8 text-zinc-500">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="mt-14 flex items-center gap-4">
              
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-violet-600"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-violet-500"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-violet-600"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              
              <h3 className="text-lg font-semibold text-violet-500">
                {title}
              </h3>

              <ul className="mt-8 space-y-5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-base text-zinc-500 transition hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-8 text-center lg:flex-row">
          
          <p className="text-sm text-zinc-500">
            Copyright 2024 — Hire Loop
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Terms & Policy
            </Link>

            <Link
              href="#"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;