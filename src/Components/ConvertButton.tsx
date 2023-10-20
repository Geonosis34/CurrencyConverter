import React from 'react';

interface ConvertButtonProps {
    onClick: () => void;
}

const ConvertButton: React.FC<ConvertButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick}>Рассчитать</button>
    );
}

export default ConvertButton;