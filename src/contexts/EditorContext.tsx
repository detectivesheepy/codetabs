
import React, { createContext, useContext, useState } from 'react';

interface FileTab {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isModified: boolean;
}

interface EditorContextType {
  openTabs: FileTab[];
  activeTab: string | null;
  setActiveTab: (tabId: string) => void;
  openFile: (file: FileTab) => void;
  closeTab: (tabId: string) => void;
  updateFileContent: (tabId: string, content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openTabs, setOpenTabs] = useState<FileTab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const openFile = (file: FileTab) => {
    const existingTab = openTabs.find(tab => tab.path === file.path);
    if (existingTab) {
      setActiveTab(existingTab.id);
    } else {
      setOpenTabs(prev => [...prev, file]);
      setActiveTab(file.id);
    }
  };

  const closeTab = (tabId: string) => {
    setOpenTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId) {
      const remainingTabs = openTabs.filter(tab => tab.id !== tabId);
      setActiveTab(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null);
    }
  };

  const updateFileContent = (tabId: string, content: string) => {
    setOpenTabs(prev => prev.map(tab => 
      tab.id === tabId 
        ? { ...tab, content, isModified: true }
        : tab
    ));
  };

  return (
    <EditorContext.Provider value={{
      openTabs,
      activeTab,
      setActiveTab,
      openFile,
      closeTab,
      updateFileContent
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
