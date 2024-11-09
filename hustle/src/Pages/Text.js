import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>PubMed Article Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {articles.map((article) => (
          <div key={article.uid}>
            <h3>{article.title}</h3>
            <p>{article.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PubMedFetch;
