
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EditorArea from '../components/EditorArea';
import Terminal from '../components/Terminal';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import { SidebarProvider } from '../contexts/SidebarContext';
import { EditorProvider } from '../contexts/EditorContext';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  const [terminalVisible, setTerminalVisible] = useState(false);

  useEffect(() => {
    const handleToggleTerminal = () => {
      setTerminalVisible(prev => !prev);
    };

    const handleNewTerminal = () => {
      setTerminalVisible(true);
      console.log('New terminal instance created');
    };

    const handleSplitTerminal = () => {
      setTerminalVisible(true);
      console.log('Terminal split created');
    };

    window.addEventListener('toggleTerminal', handleToggleTerminal);
    window.addEventListener('newTerminal', handleNewTerminal);
    window.addEventListener('splitTerminal', handleSplitTerminal);

    return () => {
      window.removeEventListener('toggleTerminal', handleToggleTerminal);
      window.removeEventListener('newTerminal', handleNewTerminal);
      window.removeEventListener('splitTerminal', handleSplitTerminal);
    };
  }, []);

  return (
    <SidebarProvider>
      <EditorProvider>
        <div className="h-screen bg-[#1e1e1e] text-[#cccccc] flex flex-col overflow-hidden">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <EditorArea />
              {terminalVisible && (
                <Terminal onClose={() => setTerminalVisible(false)} />
              )}
            </div>
          </div>
          <StatusBar onTerminalToggle={() => setTerminalVisible(!terminalVisible)} />
          <Toaster />
        </div>
      </EditorProvider>
    </SidebarProvider>
  );
};

export default Index;
