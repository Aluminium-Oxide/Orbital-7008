import React from 'react';

export interface SearchResult {
  building: string;
  level: string;
  node: {
    id: string;
    x: number;
    y: number;
  };
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  visible: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect, visible }) => {
  if (!visible || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      {results.map((result, index) => (
        <div
          key={`${result.building}-${result.level}-${result.node.id}-${index}`}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
          onClick={() => onSelect(result)}
        >
          <div className="font-medium text-gray-800">
            {result.node.id}
          </div>
          <div className="text-sm text-gray-600">
            {result.building} - {result.level}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults; 