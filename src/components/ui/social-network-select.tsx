"use client";

import { useState } from "react";

interface SocialNetwork {
  id: string;
  name: string;
  logo: React.ReactNode;
  connected: boolean;
}

interface SocialNetworkSelectProps {
  networks: SocialNetwork[];
  selectedNetworks: string[];
  onSelect: (selectedIds: string[]) => void;
  className?: string;
}

export function SocialNetworkSelect({
  networks,
  selectedNetworks,
  onSelect,
  className = "",
}: SocialNetworkSelectProps) {
  const toggleNetwork = (id: string) => {
    let newSelected;
    
    if (selectedNetworks.includes(id)) {
      newSelected = selectedNetworks.filter((networkId) => networkId !== id);
    } else {
      newSelected = [...selectedNetworks, id];
    }
    
    onSelect(newSelected);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Selecione as redes sociais
      </label>
      
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {networks.map((network) => (
          <button
            key={network.id}
            type="button"
            disabled={!network.connected}
            onClick={() => toggleNetwork(network.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors
              ${!network.connected ? 'opacity-50 cursor-not-allowed bg-gray-800' : 
                selectedNetworks.includes(network.id) 
                  ? 'bg-purple-800 border-2 border-purple-600' 
                  : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            <div className="text-2xl mb-1">{network.logo}</div>
            <div className="text-sm font-medium">{network.name}</div>
            {!network.connected && (
              <div className="text-xs text-gray-400 mt-1">Não conectado</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Logos para redes sociais
export const FacebookLogo = () => (
  <span role="img" aria-label="Facebook" className="text-blue-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  </span>
);

export const InstagramLogo = () => (
  <span role="img" aria-label="Instagram" className="text-pink-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.67.642-1.28 1.153-1.772a4.904 4.904 0 011.772-1.153c.637-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.669.01 2.986.058 4.04.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.669 0 2.986-.01 4.04-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.04 0-2.669-.01-2.986-.058-4.04-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.064a5.139 5.139 0 110 10.277 5.139 5.139 0 010-10.277zm0 8.468a3.334 3.334 0 100-6.666 3.334 3.334 0 000 6.666zm6.538-8.684a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    </svg>
  </span>
);

export const TikTokLogo = () => (
  <span role="img" aria-label="TikTok" className="text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.4 5.4s-.36.64 0 0zm-1.98 2.122A4.308 4.308 0 0015.8 5.82a4.358 4.358 0 01-.22-1.3h-3.35v8.56l-.01 2.42a2.507 2.507 0 01-2.511 2.51c-.98 0-1.85-.56-2.24-1.43a2.504 2.504 0 011.92-3.56v-3.38a5.864 5.864 0 00-3.88 5.52A5.87 5.87 0 0011.37 20a5.87 5.87 0 005.87-5.87v-3.04h1.74a4.288 4.288 0 01-4.36 3.193v-3.19a4.278 4.278 0 004.36-3.193z" />
    </svg>
  </span>
); 