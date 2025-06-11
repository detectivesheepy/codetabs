
import React from 'react';
import { 
  Folder, 
  Search, 
  Settings,
  FileText,
  LayoutGrid
} from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import FileExplorer from './FileExplorer';
import SearchPanel from './SearchPanel';
import ExtensionsPanel from './ExtensionsPanel';

const Sidebar = () => {
  const { activePanel, setActivePanel, isCollapsed } = useSidebar();

  const sidebarItems = [
    { id: 'explorer', icon: Folder, label: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'extensions', icon: LayoutGrid, label: 'Extensions' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const renderPanel = () => {
    switch (activePanel) {
      case 'explorer':
        return <FileExplorer />;
      case 'search':
        return <SearchPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      case 'settings':
        return <div className="p-4">Settings panel coming soon...</div>;
      default:
        return <FileExplorer />;
    }
  };

  return (
    <div className="flex bg-[#252526] border-r border-[#3e3e42]">
      {/* Activity Bar */}
      <div className="w-12 bg-[#2d2d30] flex flex-col items-center py-2 space-y-2">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`p-2 rounded hover:bg-[#3e3e42] transition-colors ${
                activePanel === item.id ? 'bg-[#094771] text-white' : 'text-[#cccccc]'
              }`}
              title={item.label}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>

      {/* Panel Content */}
      {!isCollapsed && (
        <div className="w-64 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b border-[#3e3e42]">
            <span className="text-[#cccccc] font-medium uppercase text-xs tracking-wide">
              {sidebarItems.find(item => item.id === activePanel)?.label}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {renderPanel()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
