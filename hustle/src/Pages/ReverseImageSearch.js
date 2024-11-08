import React, { useState } from "react";
import axios from "axios";
import "./ReverseImageSearch.css"; // Assuming you've saved your CSS as a separate file
import { useNavigate } from "react-router-dom";

const ReverseImageSearch = () => {
  // State to hold the image URL and results
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/reverse-image-search",
        {
          params: {
            image_url: imageUrl,
          },
        }
      );
      setResults(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error performing reverse image search:", error);
    } finally {
      setLoading(false);
    }
  };
   const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
const resetFunc=()=>{
    setResults(null);
    setImageUrl("");
}
  return (
    <div className="app">
      <h1 className="title">Research</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input"
        />
        <input type="file" onChange={handleFileChange} className="file-input" />
        <div className="btn-search-row">
          <button onClick={resetFunc} className="hunt-button">
            Reset
          </button>
          <button onClick={handleSearch} className="hunt-button">
            Search
          </button>
          <button onClick={()=>{navigate('/')}} className="hunt-button">
            back
          </button>
        </div>
      </div>

      {loading && <p style={{ color: "#00ff00" }}>Searching...</p>}

      {results && (
        <div className="output-container">
          <h2>Search Results:</h2>
          {results.image_results?.map((result, index) => (
            <div key={index} className="result-item">
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={result.thumbnail}
                  alt="Result thumbnail"
                  className="result-thumbnail"
                />
              </a>
              <div className="result-details">
                <p className="result-title">{result.title}</p>
                <p className="result-snippet">{result.snippet}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReverseImageSearch;
