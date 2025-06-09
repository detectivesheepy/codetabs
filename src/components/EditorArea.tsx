
import React from 'react';
import { X } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import CodeEditor from './CodeEditor';

const EditorArea = () => {
  const { openTabs, activeTab, setActiveTab, closeTab } = useEditor();

  if (openTabs.length === 0) {
    return (
      <div className="flex-1 bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-center text-[#969696]">
          <div className="text-6xl font-light mb-4">Codetabs</div>
          <div className="text-lg mb-8">The Modern Code Editor</div>
          <div className="space-y-2 text-sm">
            <div>Welcome to your new development environment</div>
            <div>Open a file from the explorer to start coding</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="flex bg-[#2d2d30] border-b border-[#3e3e42] overflow-x-auto">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-3 py-2 border-r border-[#3e3e42] cursor-pointer min-w-0 ${
              activeTab === tab.id 
                ? 'bg-[#1e1e1e] text-[#cccccc]' 
                : 'bg-[#2d2d30] text-[#969696] hover:text-[#cccccc]'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm truncate">{tab.name}</span>
            {tab.isModified && (
              <div className="w-2 h-2 bg-[#007acc] rounded-full ml-2 flex-shrink-0"></div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="ml-2 p-1 hover:bg-[#3e3e42] rounded flex-shrink-0"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            className={`h-full ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            <CodeEditor file={tab} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorArea;
