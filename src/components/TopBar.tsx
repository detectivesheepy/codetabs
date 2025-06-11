
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import CommandPalette from './CommandPalette';
import { useEditor } from '../contexts/EditorContext';
import { useSidebar } from '../contexts/SidebarContext';
import { toast } from '../components/ui/use-toast';

const TopBar = () => {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const { openFile, activeTab, openTabs, updateFileContent, closeTab } = useEditor();
  const { setActivePanel, setIsCollapsed } = useSidebar();

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
    
    switch (action) {
      // File menu actions
      case 'New File':
        const newFileId = `new-file-${Date.now()}`;
        const fileName = prompt('Enter file name:', 'untitled.txt') || 'untitled.txt';
        openFile({
          id: newFileId,
          name: fileName,
          path: `/${fileName}`,
          content: '',
          language: getLanguageFromExtension(fileName),
          isModified: false
        });
        toast({
          title: "File Created",
          description: `Created new file: ${fileName}`,
        });
        break;
        
      case 'Open File':
        setShowCommandPalette(true);
        break;
        
      case 'Save':
        if (activeTab) {
          const currentTab = openTabs.find(tab => tab.id === activeTab);
          if (currentTab) {
            updateFileContent(activeTab, currentTab.content);
            toast({
              title: "File Saved",
              description: `Saved ${currentTab.name}`,
            });
          }
        } else {
          toast({
            title: "No file to save",
            description: "Please open a file first",
            variant: "destructive"
          });
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
                language: getLanguageFromExtension(newName),
                isModified: false
              });
              toast({
                title: "File Saved As",
                description: `Saved as ${newName}`,
              });
            }
          }
        } else {
          toast({
            title: "No file to save",
            description: "Please open a file first",
            variant: "destructive"
          });
        }
        break;
        
      case 'Close':
        if (activeTab) {
          const currentTab = openTabs.find(tab => tab.id === activeTab);
          if (currentTab?.isModified) {
            const shouldSave = confirm(`${currentTab.name} has unsaved changes. Save before closing?`);
            if (shouldSave) {
              updateFileContent(activeTab, currentTab.content);
            }
          }
          closeTab(activeTab);
          toast({
            title: "File Closed",
            description: "File has been closed",
          });
        } else {
          toast({
            title: "No file to close",
            description: "No active file to close",
            variant: "destructive"
          });
        }
        break;

      // Edit menu actions
      case 'Undo':
        const activeEditor = document.querySelector('textarea, [contenteditable="true"]') as HTMLElement;
        if (activeEditor) {
          document.execCommand('undo');
          toast({
            title: "Undo",
            description: "Last action undone",
          });
        } else {
          toast({
            title: "Cannot undo",
            description: "No active editor found",
            variant: "destructive"
          });
        }
        break;
        
      case 'Redo':
        const activeRedoEditor = document.querySelector('textarea, [contenteditable="true"]') as HTMLElement;
        if (activeRedoEditor) {
          document.execCommand('redo');
          toast({
            title: "Redo",
            description: "Action redone",
          });
        } else {
          toast({
            title: "Cannot redo",
            description: "No active editor found",
            variant: "destructive"
          });
        }
        break;
        
      case 'Cut':
        try {
          document.execCommand('cut');
          toast({
            title: "Cut",
            description: "Selection cut to clipboard",
          });
        } catch (error) {
          toast({
            title: "Cut failed",
            description: "Unable to cut selection",
            variant: "destructive"
          });
        }
        break;
        
      case 'Copy':
        try {
          document.execCommand('copy');
          toast({
            title: "Copy",
            description: "Selection copied to clipboard",
          });
        } catch (error) {
          toast({
            title: "Copy failed",
            description: "Unable to copy selection",
            variant: "destructive"
          });
        }
        break;
        
      case 'Paste':
        try {
          document.execCommand('paste');
          toast({
            title: "Paste",
            description: "Content pasted from clipboard",
          });
        } catch (error) {
          toast({
            title: "Paste failed",
            description: "Unable to paste from clipboard",
            variant: "destructive"
          });
        }
        break;
        
      case 'Find':
        const findEditor = document.querySelector('textarea, [contenteditable="true"]') as HTMLElement;
        if (findEditor) {
          findEditor.focus();
          setTimeout(() => {
            const event = new KeyboardEvent('keydown', {
              key: 'f',
              ctrlKey: true,
              bubbles: true
            });
            findEditor.dispatchEvent(event);
          }, 100);
          toast({
            title: "Find",
            description: "Find dialog opened",
          });
        } else {
          toast({
            title: "Cannot find",
            description: "No active editor found",
            variant: "destructive"
          });
        }
        break;

      case 'Fork on GitHub':
        window.open('https://github.com/detectivesheepy/codetabs/fork', '_blank');
        toast({
          title: "Opening GitHub",
          description: "Redirecting to fork the repository",
        });
        break;

      // View menu actions
      case 'Command Palette':
        setShowCommandPalette(true);
        toast({
          title: "Command Palette",
          description: "Command palette opened",
        });
        break;
        
      case 'Explorer':
        setActivePanel('explorer');
        setIsCollapsed(false);
        toast({
          title: "Explorer",
          description: "File explorer panel opened",
        });
        break;
        
      case 'Search':
        setActivePanel('search');
        setIsCollapsed(false);
        toast({
          title: "Search",
          description: "Search panel opened",
        });
        break;
        
      case 'Extensions':
        setActivePanel('extensions');
        setIsCollapsed(false);
        toast({
          title: "Extensions",
          description: "Extensions panel opened",
        });
        break;
        
      case 'Terminal':
        const terminalEvent = new CustomEvent('toggleTerminal');
        window.dispatchEvent(terminalEvent);
        toast({
          title: "Terminal",
          description: "Terminal toggled",
        });
        break;

      // Go menu actions
      case 'Go to File':
        setShowCommandPalette(true);
        toast({
          title: "Go to File",
          description: "File picker opened",
        });
        break;
        
      case 'Go to Line':
        if (activeTab) {
          const lineNumber = prompt('Enter line number:');
          if (lineNumber && !isNaN(Number(lineNumber))) {
            const line = Number(lineNumber);
            toast({
              title: "Go to Line",
              description: `Jumping to line ${line}`,
            });
            // In a real editor, this would scroll to the specific line
            const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
            if (textarea) {
              const lines = textarea.value.split('\n');
              if (line <= lines.length && line > 0) {
                const charPosition = lines.slice(0, line - 1).join('\n').length + (line > 1 ? 1 : 0);
                textarea.setSelectionRange(charPosition, charPosition);
                textarea.focus();
              }
            }
          } else if (lineNumber) {
            toast({
              title: "Invalid line number",
              description: "Please enter a valid line number",
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "No file open",
            description: "Please open a file first",
            variant: "destructive"
          });
        }
        break;
        
      case 'Go to Symbol':
        if (activeTab) {
          toast({
            title: "Go to Symbol",
            description: "Symbol search would be implemented here",
          });
        } else {
          toast({
            title: "No file open",
            description: "Please open a file first",
            variant: "destructive"
          });
        }
        break;

      // Run menu actions
      case 'Start Debugging':
        toast({
          title: "Start Debugging",
          description: "Debugging session started",
        });
        console.log('🐛 Debugging session started...');
        break;
        
      case 'Run Without Debugging':
        toast({
          title: "Run Without Debugging",
          description: "Running application...",
        });
        console.log('🚀 Running application without debugging...');
        break;
        
      case 'Stop':
        toast({
          title: "Stop",
          description: "Execution stopped",
        });
        console.log('⏹️ Stopping execution...');
        break;

      // Terminal menu actions
      case 'New Terminal':
        const newTerminalEvent = new CustomEvent('newTerminal');
        window.dispatchEvent(newTerminalEvent);
        toast({
          title: "New Terminal",
          description: "New terminal instance created",
        });
        break;
        
      case 'Split Terminal':
        const splitTerminalEvent = new CustomEvent('splitTerminal');
        window.dispatchEvent(splitTerminalEvent);
        toast({
          title: "Split Terminal",
          description: "Terminal split created",
        });
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

## Features
- **Multi-tab editing** - Work on multiple files simultaneously
- **Syntax highlighting** - Support for various programming languages
- **File explorer** - Browse and manage your project files
- **Command palette** - Quick access to all editor commands
- **Integrated terminal** - Run commands directly in the editor
- **Search functionality** - Find text across all files

## Keyboard Shortcuts
- **Ctrl+P** - Open Command Palette / Go to File
- **Ctrl+S** - Save current file
- **Ctrl+F** - Find in current file
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo
- **Ctrl+X** - Cut
- **Ctrl+C** - Copy
- **Ctrl+V** - Paste

## Getting Started
1. Create a new file using File > New File
2. Start coding with syntax highlighting
3. Save your work with Ctrl+S
4. Use the terminal for running commands
5. Explore the various panels in the sidebar

Happy coding! 🚀`,
          language: 'markdown',
          isModified: false
        });
        toast({
          title: "Welcome",
          description: "Welcome guide opened",
        });
        break;
        
      case 'Documentation':
        window.open('https://docs.lovable.dev/', '_blank');
        toast({
          title: "Documentation",
          description: "Opening documentation in new tab",
        });
        break;
        
      case 'About':
        const aboutMessage = `Codetabs - A VS Code Alternative for the Web

Version: 1.0.0
Built with: React, TypeScript, and Tailwind CSS
License: MIT

Features:
• Multi-tab file editing
• Syntax highlighting
• File explorer
• Command palette
• Integrated terminal
• Search functionality

Created with ❤️ for developers who want a powerful web-based code editor.

GitHub: https://github.com/detectivesheepy/codetabs`;
        
        alert(aboutMessage);
        toast({
          title: "About Codetabs",
          description: "Version and feature information displayed",
        });
        break;

      default:
        toast({
          title: "Feature not implemented",
          description: `${action} functionality is not yet implemented`,
          variant: "destructive"
        });
        console.log(`Unhandled menu action: ${action}`);
    }
  };

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'sass': 'sass',
      'json': 'json',
      'md': 'markdown',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'xml': 'xml',
      'yml': 'yaml',
      'yaml': 'yaml',
    };
    return languageMap[ext || ''] || 'text';
  };

  const menuItems = [
    { label: 'File', items: ['New File', 'Open File', 'Save', 'Save As', 'Close'] },
    { label: 'Edit', items: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Find', 'Fork on GitHub'] },
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
