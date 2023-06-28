import React from 'react';

const Pr10TextsDisplay = ({ pr10Texts }) => {
  const convertToSuperscript = (number) => {
    const superscriptMap = {
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
    };
    return String(number).split('').map((digit) => superscriptMap[digit]).join('');
  };

  if (!pr10Texts || pr10Texts.length === 0) {
    return null; // Return null if pr10Texts is empty or undefined
  }

  const sentence = pr10Texts[0];
  const superscriptedText = sentence.replace(/\d+/g, (match) => `\n${convertToSuperscript(match)}`);
  const sentences = superscriptedText.split('\n');

  return (
    <div>
      {sentences.map((sentence, index) => (
        <p key={index}>
          {sentence}
        </p>
      ))}
    </div>
  );
};

export default Pr10TextsDisplay;
