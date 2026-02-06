import React, { useState } from 'react';

interface CalculatorPreviewProps {
  code?: string;
  isGenerating?: boolean;
}

const CalculatorPreview: React.FC<CalculatorPreviewProps> = ({ code, isGenerating }) => {
  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleButtonPress = (button: string) => {
    if (button >= '0' && button <= '9' || button === '.') {
      if (shouldResetDisplay) {
        setDisplay(button === '.' ? '0.' : button);
        setShouldResetDisplay(false);
      } else {
        if (display === '0' && button !== '.') {
          setDisplay(button);
        } else {
          setDisplay(display + button);
        }
      }
      
      if (operator === '') {
        setNum1(num1 + button);
      } else {
        setNum2(num2 + button);
      }
    } else if (button === '+' || button === '-' || button === '*' || button === '/') {
      if (num1 && operator && num2) {
        // Calculate previous operation first
        let result = 0;
        if (operator === '+') {
          result = parseFloat(num1) + parseFloat(num2);
        } else if (operator === '-') {
          result = parseFloat(num1) - parseFloat(num2);
        } else if (operator === '*') {
          result = parseFloat(num1) * parseFloat(num2);
        } else if (operator === '/') {
          result = parseFloat(num1) / parseFloat(num2);
        }
        setDisplay(result.toString());
        setNum1(result.toString());
        setNum2('');
      }
      setOperator(button);
      setShouldResetDisplay(true);
    } else if (button === '=') {
      if (num1 && operator && num2) {
        let result = 0;
        if (operator === '+') {
          result = parseFloat(num1) + parseFloat(num2);
        } else if (operator === '-') {
          result = parseFloat(num1) - parseFloat(num2);
        } else if (operator === '*') {
          result = parseFloat(num1) * parseFloat(num2);
        } else if (operator === '/') {
          result = num2 !== '0' ? parseFloat(num1) / parseFloat(num2) : 0;
        }
        setDisplay(result.toString());
        setNum1('');
        setNum2('');
        setOperator('');
        setShouldResetDisplay(true);
      }
    } else if (button === 'C' || button === 'AC') {
      setDisplay('0');
      setNum1('');
      setNum2('');
      setOperator('');
      setShouldResetDisplay(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse">🔢</div>
          <div className="text-white font-mono text-sm">Generating calculator...</div>
        </div>
      </div>
    );
  }

  const buttons = [
    [{ label: 'C', type: 'function' }, { label: '±', type: 'function' }, { label: '%', type: 'function' }, { label: '/', type: 'operator' }],
    [{ label: '7', type: 'number' }, { label: '8', type: 'number' }, { label: '9', type: 'number' }, { label: '*', type: 'operator' }],
    [{ label: '4', type: 'number' }, { label: '5', type: 'number' }, { label: '6', type: 'number' }, { label: '-', type: 'operator' }],
    [{ label: '1', type: 'number' }, { label: '2', type: 'number' }, { label: '3', type: 'number' }, { label: '+', type: 'operator' }],
    [{ label: '0', type: 'number', span: 2 }, { label: '.', type: 'number' }, { label: '=', type: 'equals' }],
  ];

  const getButtonClass = (type: string) => {
    switch (type) {
      case 'function':
        return 'bg-zinc-600 hover:bg-zinc-500 text-white';
      case 'operator':
        return 'bg-orange-500 hover:bg-orange-400 text-white';
      case 'equals':
        return 'bg-orange-500 hover:bg-orange-400 text-white';
      default:
        return 'bg-zinc-700 hover:bg-zinc-600 text-white';
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 to-black p-3 sm:p-4 overflow-y-auto flex flex-col">
      {/* Display */}
      <div className="mb-4 sm:mb-6 mt-8 sm:mt-12">
        <div className="bg-black/50 rounded-lg p-4 sm:p-6 border border-white/10">
          <div className="text-right">
            <div className="text-white/40 text-xs sm:text-sm font-mono mb-1 min-h-[16px]">
              {num1 && operator && `${num1} ${operator}`}
            </div>
            <div className="text-white text-3xl sm:text-4xl md:text-5xl font-mono font-light break-all overflow-x-auto">
              {display}
            </div>
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className="flex-1 flex flex-col gap-2 sm:gap-3">
        {buttons.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-4 gap-2 sm:gap-3">
            {row.map((btn, btnIdx) => (
              <button
                key={btnIdx}
                onClick={() => handleButtonPress(btn.label)}
                className={`
                  ${getButtonClass(btn.type)}
                  ${btn.span === 2 ? 'col-span-2' : ''}
                  h-12 sm:h-14 md:h-16 rounded-lg
                  font-semibold text-lg sm:text-xl md:text-2xl
                  active:scale-95 transition-all duration-150
                  shadow-lg hover:shadow-xl
                `}
              >
                {btn.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mt-3 sm:mt-4 pt-3 border-t border-white/10">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-white/60 font-mono">Calculator</span>
          <span className="text-green-400 font-mono">Ready</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPreview;
