import React, { MutableRefObject, useRef, useState } from 'react';
import './style.css';

const handleCopyToClipboard = (textEl: MutableRefObject<Node>) => {
  try {
    const wdsl = window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNode(textEl.current);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  } catch (e) {
    console.log('Error copy', e);
  }
};
export const App: React.FC = () => {
  const textEl = useRef(null);
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%&*';
    let chars = '';
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
  };
  return (
    <div className="password-generator-container">
      <div className="option-controls">
        <input
          type="number"
          min="4"
          max="20"
          placeholder="Cantidad"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Number(e.target.value))}
          className="border p-2 text-gray-700 rounded w-30"
        />
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Mayúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Minúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Números
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Símbolos
        </label>
      </div>
      <button onClick={generatePassword} className="generate-button">
        Generar Contraseña
      </button>
      {password && (
        <>
          <p className="password-display" ref={textEl}>
            {password}
          </p>
          <button
            onClick={() => handleCopyToClipboard(textEl)}
            className="copy-button"
          >
            <i aria-hidden="true" className="fa-regular fa-copy" />
          </button>
        </>
      )}
    </div>
  );
};
