import React from 'react';

interface ConversionResultProps {
    value: number | null;
    currency: string;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ value, currency }) => {
    return value !== null ? (
        <div className="dropdown-result">
            Результат: {value.toFixed(2)} {currency}
        </div>
    ) : null;
}

export default ConversionResult;