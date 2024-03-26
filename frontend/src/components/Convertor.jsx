import React, { useState } from "react";
import converter from "romonisednepali";

const RomanToNepaliConverter = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    const text = e.target.value;
    const convertedText = converter.convert(text);
    setInputText(convertedText);
  };

  return (
    <div>
      <h2>Romanized Text to Nepali Unicode Converter</h2>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type Romanized text here..."
      />
      <div>
        <p>Nepali Unicode: {inputText}</p>
      </div>
    </div>
  );
};

export default RomanToNepaliConverter;
