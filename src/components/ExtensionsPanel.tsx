
import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';

const ExtensionsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('installed');

  const installedExtensions = [
    {
      name: 'TypeScript Hero',
      description: 'Additional tooling for TypeScript',
      publisher: 'rbbit',
      rating: 4.2,
      downloads: '245K',
      installed: true
    },
    {
      name: 'Prettier - Code formatter',
      description: 'Code formatter using prettier',
      publisher: 'Prettier',
      rating: 4.8,
      downloads: '12.5M',
      installed: true
    },
    {
      name: 'ES7+ React/Redux/React-Native snippets',
      description: 'Extensions for React, React-Native and Redux',
      publisher: 'dsznajder',
      rating: 4.7,
      downloads: '4.2M',
      installed: true
    }
  ];

  const popularExtensions = [
    {
      name: 'Live Server',
      description: 'Launch a development local Server',
      publisher: 'ritwickdey',
      rating: 4.6,
      downloads: '15.2M',
      installed: false
    },
    {
      name: 'Auto Rename Tag',
      description: 'Auto rename paired HTML/XML tag',
      publisher: 'formulahendry',
      rating: 4.5,
      downloads: '8.1M',
      installed: false
    },
    {
      name: 'Bracket Pair Colorizer',
      description: 'A customizable extension for colorizing matching brackets',
      publisher: 'CoenraadS',
      rating: 4.3,
      downloads: '6.7M',
      installed: false
    }
  ];

  const extensions = activeTab === 'installed' ? installedExtensions : popularExtensions;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Extensions in Marketplace"
            className="w-full bg-[#3c3c3c] border border-[#464647] rounded px-3 py-2 text-[#cccccc] text-sm focus:outline-none focus:border-[#007acc]"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-[#969696]" />
        </div>

        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('installed')}
            className={`px-3 py-1 text-xs rounded ${
              activeTab === 'installed' 
                ? 'bg-[#094771] text-white' 
                : 'bg-[#3c3c3c] text-[#cccccc] hover:bg-[#464647]'
            }`}
          >
            Installed
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-3 py-1 text-xs rounded ${
              activeTab === 'popular' 
                ? 'bg-[#094771] text-white' 
                : 'bg-[#3c3c3c] text-[#cccccc] hover:bg-[#464647]'
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {extensions.filter(ext => 
          ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ext.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((extension, index) => (
          <div key={index} className="p-4 border-b border-[#3e3e42] hover:bg-[#2a2d2e]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-[#cccccc] font-medium text-sm">{extension.name}</h3>
                <p className="text-[#969696] text-xs mt-1">{extension.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-[#969696]">
                  <span>{extension.publisher}</span>
                  <span>★ {extension.rating}</span>
                  <span>{extension.downloads}</span>
                </div>
              </div>
              
              <div className="ml-3">
                {extension.installed ? (
                  <div className="flex items-center space-x-1">
                    <Settings className="w-4 h-4 text-[#cccccc] cursor-pointer hover:text-white" />
                    <button className="text-xs px-2 py-1 bg-[#dc3545] text-white rounded hover:bg-[#c82333]">
                      Uninstall
                    </button>
                  </div>
                ) : (
                  <button className="text-xs px-3 py-1 bg-[#0e639c] text-white rounded hover:bg-[#1177bb]">
                    Install
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtensionsPanel;
