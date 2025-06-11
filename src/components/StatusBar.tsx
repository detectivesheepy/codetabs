
import React from 'react';
import { Terminal } from 'lucide-react';

interface StatusBarProps {
  onTerminalToggle: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onTerminalToggle }) => {
  return (
    <div className="bg-[#007acc] text-white px-4 py-1 flex items-center justify-between text-xs">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#28ca42] rounded-full"></div>
          <span>Connected</span>
        </div>
        
        <div>
          main ↑0 ↓0
        </div>
        
        <div>
          0 Errors, 0 Warnings
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div>Ln 1, Col 1</div>
        <div>Spaces: 2</div>
        <div>UTF-8</div>
        <div>TypeScript</div>
        
        <button 
          onClick={onTerminalToggle}
          className="flex items-center space-x-1 px-2 py-1 hover:bg-[#005a9e] rounded"
        >
          <Terminal className="w-3 h-3" />
          <span>Terminal</span>
        </button>
        
        <div>100%</div>
      </div>
    </div>
  );
};

export default StatusBar;
