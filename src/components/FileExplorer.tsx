
import React, { useState } from 'react';
import { 
  folder, 
  folder-open, 
  file-text,
  chevron-right,
  chevron-down,
  plus
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
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root', 'src']));

  const fileStructure: FileNode[] = [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      path: '/src',
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          path: '/src/components',
          children: [
            { id: 'app', name: 'App.tsx', type: 'file', path: '/src/components/App.tsx', language: 'typescript' },
            { id: 'header', name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx', language: 'typescript' }
          ]
        },
        { id: 'index', name: 'index.tsx', type: 'file', path: '/src/index.tsx', language: 'typescript' },
        { id: 'styles', name: 'styles.css', type: 'file', path: '/src/styles.css', language: 'css' }
      ]
    },
    { id: 'package', name: 'package.json', type: 'file', path: '/package.json', language: 'json' },
    { id: 'readme', name: 'README.md', type: 'file', path: '/README.md', language: 'markdown' },
    { id: 'tsconfig', name: 'tsconfig.json', type: 'file', path: '/tsconfig.json', language: 'json' }
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
      'App.tsx': `import React from 'react';
import Header from './Header';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <h1>Welcome to Codetabs!</h1>
        <p>Start building amazing applications.</p>
      </main>
    </div>
  );
};

export default App;`,
      'Header.tsx': `import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;`,
      'package.json': `{
  "name": "codetabs-project",
  "version": "1.0.0",
  "description": "A sample project for Codetabs",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
      'README.md': `# Codetabs Project

This is a sample project created with Codetabs.

## Getting Started

1. Install dependencies: \`npm install\`
2. Start the development server: \`npm start\`
3. Open your browser and visit \`http://localhost:3000\`

## Features

- Modern React development
- TypeScript support
- Live reload
- Syntax highlighting

Happy coding!`
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
                <chevron-down className="w-3 h-3 mr-1 text-[#cccccc]" />
              ) : (
                <chevron-right className="w-3 h-3 mr-1 text-[#cccccc]" />
              )}
              {isExpanded ? (
                <folder-open className="w-4 h-4 mr-2 text-[#dcb67a]" />
              ) : (
                <folder className="w-4 h-4 mr-2 text-[#dcb67a]" />
              )}
            </>
          )}
          {node.type === 'file' && (
            <file-text className="w-4 h-4 mr-2 text-[#cccccc] ml-4" />
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
          <plus className="w-4 h-4 text-[#cccccc]" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {fileStructure.map(node => renderFileNode(node))}
      </div>
    </div>
  );
};

export default FileExplorer;
