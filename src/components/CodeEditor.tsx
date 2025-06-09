
import React, { useState, useEffect } from 'react';
import { useEditor } from '../contexts/EditorContext';

interface FileTab {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isModified: boolean;
}

interface CodeEditorProps {
  file: FileTab;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file }) => {
  const { updateFileContent } = useEditor();
  const [content, setContent] = useState(file.content);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  useEffect(() => {
    setContent(file.content);
  }, [file.content]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    updateFileContent(file.id, newContent);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleContentChange(e.target.value);
    
    // Calculate cursor position
    const textarea = e.target;
    const text = textarea.value;
    const cursorPos = textarea.selectionStart;
    const lines = text.substr(0, cursorPos).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    setCursorPosition({ line, column });
  };

  const getLanguageColor = (language: string) => {
    const colors = {
      typescript: '#3178c6',
      javascript: '#f7df1e',
      css: '#1572b6',
      json: '#000000',
      markdown: '#083fa1',
      html: '#e34c26'
    };
    return colors[language as keyof typeof colors] || '#cccccc';
  };

  const lines = content.split('\n');

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      {/* Line Numbers */}
      <div className="bg-[#1e1e1e] border-r border-[#3e3e42] px-2 py-4 text-[#858585] text-sm font-mono select-none">
        {lines.map((_, index) => (
          <div key={index} className="leading-6 text-right">
            {index + 1}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={handleTextareaChange}
          className="w-full h-full p-4 bg-transparent text-[#cccccc] font-mono text-sm leading-6 resize-none outline-none"
          style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
          spellCheck={false}
        />
        
        {/* Status indicator */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-4 text-xs text-[#858585]">
          <div className="flex items-center space-x-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getLanguageColor(file.language) }}
            ></div>
            <span>{file.language}</span>
          </div>
          <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
