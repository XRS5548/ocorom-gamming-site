// app/components/footer-minimal.tsx
'use client';

import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function FooterMinimal() {
  const currentYear = new Date().getFullYear();
  
  const links = {
    Games: [
      { name: 'Color Prediction', href: '/games/color-prediction' },
      { name: 'Number Prediction', href: '/games/number-prediction' },
      { name: 'Spin Wheel', href: '/games/spin-wheel' },
      { name: 'Dice Game', href: '/games/dice-game' },
    ],
    Legal: [
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
    Support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
      { name: 'Wallet', href: '/wallet' },
    ],
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ocorom</span> */}
              <img src="/logo.png" alt="logo" width={120} />
            </div>
            <p className="text-gray-400 text-sm">
              Fast prediction games with virtual coins
            </p>
          </div>
          
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-white font-medium mb-3 text-sm">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} ocorom. All rights reserved. Virtual coins only.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            For entertainment purposes only. 18+
          </p>
        </div>
      </div>
    </footer>
  );
}