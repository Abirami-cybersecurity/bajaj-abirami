import React, { useState } from "react";
import Select from "react-select";
import "./App.css";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch("https://your-backend-url.com/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON or server error");
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const selectedValues = selectedOptions.map(option => option.value);

    return (
      <div>
        {selectedValues.includes("numbers") && (
          <div>
            <h3>Numbers:</h3>
            <p>{JSON.stringify(numbers)}</p>
          </div>
        )}
        {selectedValues.includes("alphabets") && (
          <div>
            <h3>Alphabets:</h3>
            <p>{JSON.stringify(alphabets)}</p>
          </div>
        )}
        {selectedValues.includes("highest_lowercase_alphabet") && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{JSON.stringify(highest_lowercase_alphabet)}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <input
        type="text"
        placeholder='Enter JSON like {"data": ["A","b","3"]}'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <Select
            isMulti
            options={[
              { value: "numbers", label: "Numbers" },
              { value: "alphabets", label: "Alphabets" },
              { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" }
            ]}
            onChange={handleSelectChange}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
