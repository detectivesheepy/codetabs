
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Codetabs Terminal',
    'Type "help" for available commands',
    ''
  ]);
  const [currentPath] = useState('~/codetabs-project');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = (command: string) => {
    const newHistory = [...history, `${currentPath}$ ${command}`];
    
    const cmd = command.trim().toLowerCase();
    
    switch (cmd) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  help     - Show this help message',
          '  clear    - Clear terminal',
          '  ls       - List files',
          '  pwd      - Print working directory',
          '  npm      - Node package manager',
          '  git      - Git version control',
          '  cat      - Display file content',
          '  echo     - Print text',
          ''
        );
        break;
      case 'clear':
        setHistory(['']);
        return;
      case 'ls':
        newHistory.push(
          'src/',
          'package.json',
          'README.md',
          'tsconfig.json',
          'node_modules/',
          ''
        );
        break;
      case 'pwd':
        newHistory.push(currentPath, '');
        break;
      case 'npm install':
        newHistory.push(
          'Installing dependencies...',
          '✓ react@18.2.0',
          '✓ typescript@4.9.0',
          '✓ All dependencies installed successfully',
          ''
        );
        break;
      case 'npm start':
        newHistory.push(
          'Starting development server...',
          'Local:    http://localhost:3000',
          'Network:  http://192.168.1.100:3000',
          '',
          'webpack compiled successfully',
          ''
        );
        break;
      case 'git status':
        newHistory.push(
          'On branch main',
          'Your branch is up to date with "origin/main".',
          '',
          'Changes not staged for commit:',
          '  modified:   src/App.tsx',
          '  modified:   src/index.tsx',
          '',
          'no changes added to commit',
          ''
        );
        break;
      default:
        if (cmd.startsWith('echo ')) {
          newHistory.push(command.substring(5), '');
        } else if (cmd.startsWith('cat ')) {
          newHistory.push(
            `cat: ${command.substring(4)}: File content would be displayed here`,
            ''
          );
        } else if (cmd === '') {
          newHistory.push('');
        } else {
          newHistory.push(`bash: ${cmd}: command not found`, '');
        }
    }
    
    setHistory(newHistory);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-64 bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42]">
        <div className="flex items-center space-x-2">
          <span className="text-[#cccccc] text-sm">Terminal</span>
          <span className="text-[#858585] text-xs">bash</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-[#3e3e42] rounded">
            <Minus size={12} className="text-[#cccccc]" />
          </button>
          <button className="p-1 hover:bg-[#3e3e42] rounded">
            <Square size={12} className="text-[#cccccc]" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#3e3e42] rounded"
          >
            <X size={12} className="text-[#cccccc]" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {history.map((line, index) => (
          <div key={index} className="text-[#cccccc] leading-6">
            {line}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="flex items-center text-[#cccccc] leading-6">
          <span className="text-[#4ec9b0]">{currentPath}</span>
          <span className="text-[#cccccc] mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
