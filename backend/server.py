from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

SERPAPI_API_KEY = '2581020de06d3cbb4b237f811dcefbaa407b96ecad5f17151c770ebc67d42c7f'

# Set up logging
logging.basicConfig(level=logging.DEBUG)  # Set logging level to DEBUG
logger = app.logger  # Use Flask's logger

@app.route('/reverse-image-search', methods=['GET'])
def reverse_image_search():
    image_url = request.args.get('image_url')
    if not image_url:
        logger.warning("No image_url parameter provided in request")
        return jsonify({'error': 'image_url parameter is required'}), 400

    try:
        # Log the received image URL
        logger.debug(f"Received image_url: {image_url}")
        
        # Construct the SerpApi request URL
        serpapi_url = f"https://serpapi.com/search.json"
        params = {
            'engine': 'google_reverse_image',
            'image_url': image_url,
            'api_key': SERPAPI_API_KEY
        }
        
        # Make a request to SerpApi
        response = requests.get(serpapi_url, params=params)
        response.raise_for_status()  # Raise an error for bad responses

        # Log the response status and data from SerpApi
        logger.debug(f"Response status: {response.status_code}")
        logger.debug(f"Response data: {response.json()}")
        
        # Return the SerpApi response as JSON
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching data from SerpApi: {e}")
        return jsonify({'error': 'Failed to fetch data from SerpApi'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
