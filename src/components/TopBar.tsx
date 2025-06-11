
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CommandPalette from './CommandPalette';
import { useEditor } from '../contexts/EditorContext';
import { useSidebar } from '../contexts/SidebarContext';

const TopBar = () => {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const { openFile, activeTab, openTabs, updateFileContent } = useEditor();
  const { setActivePanel, setIsCollapsed } = useSidebar();

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
    
    switch (action) {
      // File menu actions
      case 'New File':
        const newFileId = `new-file-${Date.now()}`;
        openFile({
          id: newFileId,
          name: 'untitled.txt',
          path: `/untitled.txt`,
          content: '',
          language: 'text',
          isModified: false
        });
        break;
        
      case 'Open File':
        setShowCommandPalette(true);
        break;
        
      case 'Save':
        if (activeTab) {
          const currentTab = openTabs.find(tab => tab.id === activeTab);
          if (currentTab) {
            // Simulate save - in a real app this would save to backend/filesystem
            updateFileContent(activeTab, currentTab.content);
            console.log(`Saved file: ${currentTab.name}`);
          }
        }
        break;
        
      case 'Save As':
        if (activeTab) {
          const currentTab = openTabs.find(tab => tab.id === activeTab);
          if (currentTab) {
            const newName = prompt('Enter new filename:', currentTab.name);
            if (newName) {
              const newFileId = `save-as-${Date.now()}`;
              openFile({
                id: newFileId,
                name: newName,
                path: `/${newName}`,
                content: currentTab.content,
                language: currentTab.language,
                isModified: false
              });
            }
          }
        }
        break;
        
      case 'Close':
        // Close functionality would be handled by the tab close button
        console.log('Close current file');
        break;

      // Edit menu actions
      case 'Undo':
        document.execCommand('undo');
        break;
        
      case 'Redo':
        document.execCommand('redo');
        break;
        
      case 'Cut':
        document.execCommand('cut');
        break;
        
      case 'Copy':
        document.execCommand('copy');
        break;
        
      case 'Paste':
        document.execCommand('paste');
        break;
        
      case 'Find':
        // Trigger browser find
        if (document.querySelector('textarea') || document.querySelector('[contenteditable]')) {
          const event = new KeyboardEvent('keydown', {
            key: 'f',
            ctrlKey: true,
            bubbles: true
          });
          document.dispatchEvent(event);
        }
        break;

      // View menu actions
      case 'Command Palette':
        setShowCommandPalette(true);
        break;
        
      case 'Explorer':
        setActivePanel('explorer');
        setIsCollapsed(false);
        break;
        
      case 'Search':
        setActivePanel('search');
        setIsCollapsed(false);
        break;
        
      case 'Extensions':
        setActivePanel('extensions');
        setIsCollapsed(false);
        break;
        
      case 'Terminal':
        // This would need to be handled by the parent component
        console.log('Toggle terminal');
        break;

      // Go menu actions
      case 'Go to File':
        setShowCommandPalette(true);
        break;
        
      case 'Go to Line':
        const lineNumber = prompt('Enter line number:');
        if (lineNumber) {
          console.log(`Go to line: ${lineNumber}`);
          // In a real editor, this would scroll to the specific line
        }
        break;
        
      case 'Go to Symbol':
        console.log('Go to symbol - would show symbol picker');
        break;

      // Run menu actions
      case 'Start Debugging':
        console.log('Starting debugging session...');
        break;
        
      case 'Run Without Debugging':
        console.log('Running without debugging...');
        break;
        
      case 'Stop':
        console.log('Stopping execution...');
        break;

      // Terminal menu actions
      case 'New Terminal':
        console.log('Opening new terminal...');
        break;
        
      case 'Split Terminal':
        console.log('Splitting terminal...');
        break;

      // Help menu actions
      case 'Welcome':
        openFile({
          id: 'welcome',
          name: 'Welcome.md',
          path: '/Welcome.md',
          content: `# Welcome to Codetabs!

This is a powerful VS Code-like editor running in your browser.

## Quick Start
- Use the Explorer panel to manage files
- Open the Command Palette with Ctrl+P
- Access the terminal from the status bar
- Use Ctrl+S to save files

Happy coding! 🚀`,
          language: 'markdown',
          isModified: false
        });
        break;
        
      case 'Documentation':
        window.open('https://docs.lovable.dev/', '_blank');
        break;
        
      case 'About':
        alert('Codetabs - A VS Code Alternative for the Web\nBuilt with React, TypeScript, and Tailwind CSS');
        break;

      default:
        console.log(`Unhandled menu action: ${action}`);
    }
  };

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
                      onClick={() => handleMenuAction(item)}
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
