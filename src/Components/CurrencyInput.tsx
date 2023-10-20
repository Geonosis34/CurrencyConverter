import React from 'react';

interface CurrencyInputProps {
    value: number;
    onChange: (value: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange }) => {
    return (
        <input 
            type="number" 
            value={value} 
            onChange={(e) => onChange(+e.target.value)} 
            className="dropdown-input"
        />
    );
}

export default CurrencyInput;