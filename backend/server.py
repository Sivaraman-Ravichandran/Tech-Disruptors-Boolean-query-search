from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging
import os

app = Flask(__name__)
CORS(app)

# Fetch API key from environment variable or set it here directly (not recommended for production)
SERPAPI_API_KEY = os.getenv('SERPAPI_API_KEY', '2581020de06d3cbb4b237f811dcefbaa407b96ecad5f17151c770ebc67d42c7f')

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = app.logger

@app.route('/reverse-image-search-url', methods=['GET'])
def reverse_image_search_url():
    image_url = request.args.get('image_url')
    if not image_url:
        logger.warning("No image_url parameter provided in request")
        return jsonify({'error': 'image_url parameter is required'}), 400

    return perform_image_search(image_url)

@app.route('/reverse-image-search-upload', methods=['POST'])
def reverse_image_search_upload():
    if 'file' not in request.files:
        logger.warning("No file part in the request")
        return jsonify({'error': 'file parameter is required'}), 400

    file = request.files['file']
    if file.filename == '':
        logger.warning("No selected file")
        return jsonify({'error': 'No selected file'}), 400

    # Save the file temporarily for the search (if SerpApi or another service requires a URL, upload the image to a hosting service first)
    file_path = os.path.join('temp', file.filename)
    file.save(file_path)

    # Here, you would need to upload the image to a service that provides a URL for it, then use that URL with SerpApi
    # For now, assuming the file upload service URL is `uploaded_image_url`
    uploaded_image_url = "your_image_upload_service_url"

    return perform_image_search(uploaded_image_url)

def perform_image_search(image_url):
    try:
        logger.debug(f"Received image_url: {image_url}")

        serpapi_url = "https://serpapi.com/search.json"
        params = {
            'engine': 'google_reverse_image',
            'image_url': image_url,
            'api_key': SERPAPI_API_KEY
        }

        response = requests.get(serpapi_url, params=params)
        response.raise_for_status()

        response_data = response.json()
        
        logger.debug(f"Response status: {response.status_code}")
        logger.debug(f"Full response data: {response_data}")

        # Filter for results from PubMed only
        pubmed_results = [
            result for result in response_data.get('image_results', [])
            if 'https://www.ncbi.nlm.nih.gov' in result.get('link', '')
        ]

        logger.debug(f"Filtered PubMed results: {pubmed_results}")

        return jsonify({'image_results': pubmed_results})

    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching data from SerpApi: {e}")
        return jsonify({'error': 'Failed to fetch data from SerpApi'}), 500

if __name__ == '__main__':
    os.makedirs('temp', exist_ok=True)  # Create a temporary directory for file storage
    app.run(port=5000, debug=True)
