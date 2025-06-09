
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CommandPalette from './CommandPalette';

const TopBar = () => {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const menuItems = [
    { label: 'File', items: ['New File', 'Open File', 'Save', 'Save As', 'Close'] },
    { label: 'Edit', items: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Find'] },
    { label: 'View', items: ['Command Palette', 'Explorer', 'Search', 'Extensions', 'Terminal'] },
    { label: 'Go', items: ['Go to File', 'Go to Line', 'Go to Symbol'] },
    { label: 'Run', items: ['Start Debugging', 'Run Without Debugging', 'Stop'] },
    { label: 'Terminal', items: ['New Terminal', 'Split Terminal'] },
    { label: 'Help', items: ['Welcome', 'Documentation', 'About'] }
  ];

  return (
    <>
      <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-2 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-[#007acc] font-bold text-lg">Codetabs</div>
          <nav className="flex space-x-1">
            {menuItems.map((menu) => (
              <div key={menu.label} className="relative group">
                <button className="px-3 py-1 text-sm hover:bg-[#3e3e42] rounded">
                  {menu.label}
                </button>
                <div className="absolute top-full left-0 bg-[#252526] border border-[#3e3e42] rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[160px]">
                  {menu.items.map((item) => (
                    <button
                      key={item}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-[#2a2d2e] first:rounded-t last:rounded-b"
                      onClick={() => {
                        if (item === 'Command Palette') {
                          setShowCommandPalette(true);
                        }
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center space-x-2 px-3 py-1 bg-[#3c3c3c] rounded hover:bg-[#464647] transition-colors"
            onClick={() => setShowCommandPalette(true)}
          >
            <Search size={14} />
            <span className="text-sm text-[#cccccc]">Search files (Ctrl+P)</span>
          </button>
          
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
          </div>
        </div>
      </div>
      
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}
    </>
  );
};

export default TopBar;
