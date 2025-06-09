
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EditorArea from '../components/EditorArea';
import Terminal from '../components/Terminal';
import StatusBar from '../components/StatusBar';
import TopBar from '../components/TopBar';
import { SidebarProvider } from '../contexts/SidebarContext';
import { EditorProvider } from '../contexts/EditorContext';

const Index = () => {
  const [terminalVisible, setTerminalVisible] = useState(false);

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
        </div>
      </EditorProvider>
    </SidebarProvider>
  );
};

export default Index;
