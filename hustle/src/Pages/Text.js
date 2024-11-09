import React, { useState } from "react";
import axios from "axios";
import "./Text.css"; // Import the CSS file

const PubMedFetch = () => {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "804ddd7039a0aa6beca67d3c099ec923fd09";

  const fetchArticles = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`,
        {
          params: {
            db: "pubmed",
            term: query,
            retmode: "json",
            api_key: API_KEY,
          },
        }
      );

      const ids = response.data.esearchresult.idlist.join(",");
      if (ids) {
        const articleDetails = await axios.get(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi`,
          {
            params: {
              db: "pubmed",
              id: ids,
              retmode: "json",
              api_key: API_KEY,
            },
          }
        );

        setArticles(
          Object.values(articleDetails.data.result).filter(
            (article) => article.uid
          )
        );
      } else {
        setArticles([]);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles();
  };
  return (
    <div className="container">
      <h1>Search by Text</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter search term (e.g., 'cancer AND therapy NOT surgery')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div>
        {articles.map((article) => (
          <div className="article" key={article.uid}>
            <h3>{article.title}</h3>
            <p>
              <strong>Source:</strong> {article.source}
            </p>
            <p>
              <strong>Published:</strong> {article.pubdate}
            </p>
            <p>
              <strong>Authors:</strong>{" "}
              {article.authors?.map((a) => a.name).join(", ")}
            </p>
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${article.uid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              View Full Article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PubMedFetch;
