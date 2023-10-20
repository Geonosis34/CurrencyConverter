import React, { useState } from 'react';
import './dropdown.css';

interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    console.log('Выбрана валюта:', value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={className || ''}>
      <button onClick={() => setIsOpen(prev => !prev)}>{selectedValue}</button>
      {isOpen && (
        <ul>
          {options.map(option => (
            <li key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;