import axios from "axios";

const reverseImageSearch = async (imageUrl) => {
  const apiKey =
    "2581020de06d3cbb4b237f811dcefbaa407b96ecad5f17151c770ebc67d42c7f"; // Replace with your actual API key
  const endpoint = "https://serpapi.com/search?engine=google_reverse_image";

  try {
    const response = await axios.get(endpoint, {
      params: {
        api_key: apiKey,
        image_url: imageUrl, // The URL of the image to search
        google_domain: "google.com", // Optional: customize the Google domain
        hl: "en", // Optional: set the language to English
        gl: "us", // Optional: set the country to the United States
        output: "json", // Set output format to JSON
      },
    });

    // Access the search results from the response
    const searchResults = response.data;
    return searchResults;
  } catch (error) {
    console.error("Error performing reverse image search:", error);
    return null;
  }
};
