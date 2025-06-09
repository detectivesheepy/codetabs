
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const searchResults = [
    { file: 'src/App.tsx', line: 12, preview: 'const App: React.FC = () => {', match: 'App' },
    { file: 'src/components/Header.tsx', line: 5, preview: 'const Header: React.FC = () => {', match: 'Header' },
    { file: 'package.json', line: 2, preview: '"name": "codetabs-project",', match: 'codetabs' }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#3c3c3c] border border-[#464647] rounded px-3 py-2 text-[#cccccc] text-sm focus:outline-none focus:border-[#007acc]"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-[#969696]" />
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={replaceWith}
            onChange={(e) => setReplaceWith(e.target.value)}
            placeholder="Replace"
            className="w-full bg-[#3c3c3c] border border-[#464647] rounded px-3 py-2 text-[#cccccc] text-sm focus:outline-none focus:border-[#007acc]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 text-xs">
        <label className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="w-3 h-3"
          />
          <span className="text-[#cccccc]">Aa</span>
        </label>
        
        <label className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={wholeWord}
            onChange={(e) => setWholeWord(e.target.checked)}
            className="w-3 h-3"
          />
          <span className="text-[#cccccc]">Ab</span>
        </label>
        
        <label className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="w-3 h-3"
          />
          <span className="text-[#cccccc]">.*</span>
        </label>
      </div>

      <div className="space-y-2">
        <button className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white py-2 px-3 rounded text-sm">
          Replace All
        </button>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-[#3c3c3c] hover:bg-[#464647] text-[#cccccc] py-1 px-2 rounded text-xs">
            Replace
          </button>
          <button className="flex-1 bg-[#3c3c3c] hover:bg-[#464647] text-[#cccccc] py-1 px-2 rounded text-xs">
            Find
          </button>
        </div>
      </div>

      {searchTerm && (
        <div className="space-y-2">
          <div className="text-[#cccccc] text-sm font-medium">
            {searchResults.length} results in {new Set(searchResults.map(r => r.file)).size} files
          </div>
          
          {searchResults.map((result, index) => (
            <div key={index} className="bg-[#2d2d30] rounded p-2 cursor-pointer hover:bg-[#3e3e42]">
              <div className="text-[#569cd6] text-xs">{result.file}</div>
              <div className="text-[#cccccc] text-sm flex items-center">
                <span className="text-[#969696] mr-2">{result.line}:</span>
                <span>{result.preview}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
