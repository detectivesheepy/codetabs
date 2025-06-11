
import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileText,
  ChevronRight,
  ChevronDown,
  Plus
} from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  language?: string;
}

const FileExplorer = () => {
  const { openFile } = useEditor();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const fileStructure: FileNode[] = [
    { id: 'index', name: 'index.html', type: 'file', path: '/index.html', language: 'html' },
    { id: 'readme', name: 'README.md', type: 'file', path: '/README.md', language: 'markdown' }
  ];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleFileClick = (file: FileNode) => {
    if (file.type === 'file') {
      openFile({
        id: file.id,
        name: file.name,
        path: file.path,
        content: getFileContent(file.name),
        language: file.language || 'text',
        isModified: false
      });
    }
  };

  const getFileContent = (fileName: string): string => {
    const samples = {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codetabs Starter Project</title>
</head>
<body>
    <h1>Codetabs Starter Project</h1>
</body>
</html>`,
      'README.md': `# Codetabs Starter Project

Welcome to your new Codetabs project! This editor gives you a powerful VS Code-like experience right in your browser.

## Getting Started

### File Management
- **Explorer Panel**: Click the folder icon in the activity bar (left sidebar) to view and manage your files
- **Create New Files**: Click the + button in the Files panel to add new files
- **Open Files**: Click on any file in the explorer to open it in the editor

### Editor Features
- **Tabs**: Open multiple files simultaneously with tab support
- **Syntax Highlighting**: Automatic syntax highlighting for various file types
- **Auto-completion**: Smart code completion while you type

### Navigation
- **Activity Bar**: The leftmost panel with icons for Explorer, Search, Extensions, and Settings
- **Sidebar**: Main content area that shows different panels based on your selection
- **Editor Area**: Central area where you write your code with tab support
- **Terminal**: Access the integrated terminal via the status bar button

### Search & Replace
- **Global Search**: Use the search panel (magnifying glass icon) to find text across all files
- **Find in File**: Use Ctrl+F (Cmd+F on Mac) to search within the current file

### Keyboard Shortcuts
- **Ctrl+P** (Cmd+P): Quick file open
- **Ctrl+S** (Cmd+S): Save file
- **Ctrl+F** (Cmd+F): Find in current file
- **Ctrl+Shift+P** (Cmd+Shift+P): Open command palette

### Terminal
- Click the Terminal button in the status bar to toggle the integrated terminal
- Run commands, build your project, or manage dependencies

### Extensions (Coming Soon)
- Browse and install extensions to enhance your coding experience
- Language support, themes, and productivity tools

## Tips for Productive Coding

1. **Use the Command Palette**: Quick access to all editor commands
2. **Master Keyboard Shortcuts**: Speed up your workflow significantly
3. **Organize with Folders**: Keep your project structure clean and logical
4. **Use Multiple Tabs**: Work on several files simultaneously
5. **Leverage Search**: Quickly find and replace across your entire project

## File Types Supported

Codetabs supports syntax highlighting and features for:
- HTML, CSS, JavaScript
- TypeScript, JSX, TSX
- JSON, XML, YAML
- Markdown
- And many more!

Happy coding! 🚀`
    };
    return samples[fileName as keyof typeof samples] || `// Content for ${fileName}`;
  };

  const renderFileNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const paddingLeft = level * 16 + 8;

    return (
      <div key={node.id}>
        <div
          className="flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer text-sm"
          style={{ paddingLeft }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              handleFileClick(node);
            }
          }}
        >
          {node.type === 'folder' && (
            <>
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 mr-1 text-[#cccccc]" />
              ) : (
                <ChevronRight className="w-3 h-3 mr-1 text-[#cccccc]" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a]" />
              ) : (
                <Folder className="w-4 h-4 mr-2 text-[#dcb67a]" />
              )}
            </>
          )}
          {node.type === 'file' && (
            <FileText className="w-4 h-4 mr-2 text-[#cccccc] ml-4" />
          )}
          <span className="text-[#cccccc]">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2">
        <span className="text-xs text-[#cccccc] uppercase tracking-wide">Files</span>
        <button className="p-1 hover:bg-[#3e3e42] rounded" title="New File">
          <Plus className="w-4 h-4 text-[#cccccc]" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {fileStructure.map(node => renderFileNode(node))}
      </div>
    </div>
  );
};

export default FileExplorer;
