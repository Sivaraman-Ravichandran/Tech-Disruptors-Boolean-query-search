import os
import google.generativeai as genai
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend

# Set up Google Generative AI with the API key
genai.configure(api_key=os.getenv("GENAI_API_KEY", "AIzaSyBcgVAiBBe0_JsYuVpM-L55P2LxbLU4DuE"))

# Model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize model and start a chat session
model = genai.GenerativeModel(
    model_name="tunedModels/pubmedqueries-7nl00mb4z24w",
    generation_config=generation_config,
)
chat_session = model.start_chat()

# AI response function
def get_ai_response(user_input):
    try:
        response = chat_session.send_message(user_input)
        return response.text
    except Exception as e:
        print(f"Error in fetching response: {e}")
        return "Sorry, an error occurred while processing your request."

# Define the chat route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")
    ai_response = get_ai_response(user_input)
    return make_response(jsonify({"reply": ai_response}), 200)

# Run the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
