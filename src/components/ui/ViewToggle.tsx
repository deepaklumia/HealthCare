import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { ViewMode } from '../../types';

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onChange }: Props) {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
      <button
        onClick={() => onChange('grid')}
        className={`p-1.5 rounded-md transition-colors ${mode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        title="Grid View"
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-1.5 rounded-md transition-colors ${mode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        title="List View"
      >
        <List size={18} />
      </button>
    </div>
  );
}
