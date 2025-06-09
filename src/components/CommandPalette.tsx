
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface CommandPaletteProps {
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    { label: 'File: New File', description: 'Create a new file', shortcut: 'Ctrl+N' },
    { label: 'File: Open File', description: 'Open an existing file', shortcut: 'Ctrl+O' },
    { label: 'File: Save', description: 'Save current file', shortcut: 'Ctrl+S' },
    { label: 'View: Toggle Terminal', description: 'Show/hide terminal', shortcut: 'Ctrl+`' },
    { label: 'View: Toggle Sidebar', description: 'Show/hide sidebar', shortcut: 'Ctrl+B' },
    { label: 'Go: Go to Line', description: 'Jump to specific line', shortcut: 'Ctrl+G' },
    { label: 'Edit: Find', description: 'Find in current file', shortcut: 'Ctrl+F' },
    { label: 'Edit: Replace', description: 'Find and replace', shortcut: 'Ctrl+H' },
    { label: 'Run: Start Debugging', description: 'Start debugging session', shortcut: 'F5' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands.length, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-[#252526] border border-[#3e3e42] rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center border-b border-[#3e3e42] px-4 py-3">
          <Search size={16} className="text-[#cccccc] mr-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-[#cccccc] outline-none"
            autoFocus
          />
          <button onClick={onClose} className="text-[#cccccc] hover:text-white ml-3">
            <X size={16} />
          </button>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {filteredCommands.map((command, index) => (
            <div
              key={command.label}
              className={`px-4 py-3 flex items-center justify-between cursor-pointer ${
                index === selectedIndex ? 'bg-[#094771]' : 'hover:bg-[#2a2d2e]'
              }`}
              onClick={onClose}
            >
              <div>
                <div className="text-[#cccccc] font-medium">{command.label}</div>
                <div className="text-[#969696] text-sm">{command.description}</div>
              </div>
              <div className="text-[#969696] text-sm">{command.shortcut}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
