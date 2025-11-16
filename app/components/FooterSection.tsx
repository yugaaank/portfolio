import React from 'react';
import '../globals.css';
// --- Icon Components (Used by Footer) ---

const IconTwitter = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zM11.4 13.925h1.56L4.166 2.01H2.45L11.4 13.925z" />
  </svg>
);

const IconDiscord = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.54 0c-.85 0-1.54.65-1.78 1.48C17.29 1.3 16.8 1.15 16.3 1C16.27 1 16.24 1 16.2 1c-3.6 0-6.7 2.26-7.7 5.25C8.47 5.25 8.44 5.25 8.4 5.25c-.03 0-.07 0-.1 0h-.07C4.6 5.25.5 8.35.5 12.6c0 4.1 3.3 7.4 7.4 7.4h.07c.03 0 .07 0 .1 0c.03 0 .06 0 .07 0c.7-.5 1.28-1.17 1.74-1.95c-.38.16-.8.25-1.24.25c-2.38 0-4.32-1.7-4.32-3.8c0-1.82 1.55-3.3 3.52-3.47l.86-.07l.3-.8C9.1 8.8 10.7 7.5 12.45 7.5c.35 0 .68.05 1 .13l.2.06l.5-.5c.8-1.12 2-1.8 3.3-1.8c.17 0 .34.03.5.05l.4.1l.1-.4C18 .65 18.7 0 19.54 0zm-3.8 6.13c-.9 0-1.63.7-1.63 1.55c0 .85.73 1.55 1.63 1.55c.9 0 1.63-.7 1.63-1.55c0-.85-.73-1.55-1.63-1.55zm-7.4 0c-.9 0-1.63.7-1.63 1.55c0 .85.73 1.55 1.63 1.55c.9 0 1.63-.7 1.63-1.55c0-.85-.73-1.55-1.63-1.55z" />
  </svg>
);

const IconGitHub = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

const IconLinkedIn = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.94 12.248V5.396H2.57V13.39h2.37zM3.76 4.39c-.73 0-1.216-.484-1.216-1.09c0-.608.485-1.09 1.216-1.09s1.216.483 1.216 1.09c0 .607-.485 1.09-1.216 1.09zM13.42 13.39H11.05V9.46c0-.94-.02-2.15-1.31-2.15c-1.31 0-1.51.983-1.51 2.083v3.992H5.87V5.396h2.24v1.02h.03c.31-.59 1.07-1.21 2.2-1.21c2.35 0 2.78 1.47 2.78 3.38v4.8z" />
  </svg>
);

// --- Footer Component ---
const Footer = () => {
  const links = {
    Brand: [
      { name: 'GencentAI', href: '#' },
      { name: 'Manifesto', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Docs', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Licenses', href: '#' },
    ],
  };

  return (
    <footer className="bg-black border-t-2 border-lime-400/30">
      <div className="container mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {Object.entries(links).map(([title, list]) => (
            <div key={title}>
              <h4 className="font-exo font-bold text-white uppercase mb-4">{title}</h4>
              <ul className="space-y-2">
                {list.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-lime-400 transition-colors duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-8 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Gencent AI. All rights reserved.
          </p>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-lime-400 transform hover:scale-110 transition-all duration-300"><IconTwitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-lime-400 transform hover:scale-110 transition-all duration-300"><IconDiscord className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-lime-400 transform hover:scale-110 transition-all duration-300"><IconGitHub className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-lime-400 transform hover:scale-110 transition-all duration-300"><IconLinkedIn className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;