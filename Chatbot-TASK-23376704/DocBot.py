# This is the API (using flask) used to host responses and requests
# Must be kept running to send and receive data from the chatbot
# Currently cannot read from a dataset but will be implemented later (unless other methods)
# Uses DocBot_Requests to communicate from API to user and vice versa
# On a development server, recommended to use a production WSGI server for deployment

from flask import Flask, request, jsonify
import openai


app = Flask(__name__)


# Connecting to ChatGPT with API Key
api_key = "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"
openai.api_key = api_key


# API endpoint URLs
base_url = 'http://127.0.0.1:5000' #Defining the base URL for the Flask API

# Flask endpoints
start_url = f'{base_url}/start'
post_url = f'{base_url}/post'
exit_url = f'{base_url}/exit'


@app.route('/start', methods=['GET'])
def start_conversation():
    try:
        #Starting the conversation
        return jsonify({"message": "Welcome to the Doc-Bot Chat! Please message here."})
    except Exception as e:
        return jsonify({"error": str(e)})



@app.route('/post', methods=['POST'])
def post_message():
    try:
        # Get user input from the request
        user_input = request.json['user_input']

        # Defining context for the API to instruct ChatGPT on its directive to the user
        system_message = "You are a medical chatbot to predict specifically heart disease, lung cancer, and colon cancer. If you are asked anything unrelated to these topics, please advise the user that this is not your specialty. Please ask questions to determine the risk of these illnesses on a given patient and provide information on disease risk and treatment."

        # Send a prompt to GPT
        prompt = f"{system_message}\nUser: {user_input}\n"
        response = openai.Completion.create(
            engine="text-davinci-003", # ChatGPT-3 model name
            prompt=prompt,
            max_tokens=1000,  # This can cut off the chatbot after spending a set amount of tokens on a response to conserve tokens (cost)
            n=1,  # Number of responses from a single prompt
            stop=None  # No specific stopping point for the response
        )

        # Return the response of the chatbot
        ai_response = response.choices[0].text.strip()
        return jsonify({"response": ai_response})
    except Exception as e:

        return jsonify({"error": str(e)})



@app.route('/exit', methods=['GET'])
def exit_chat():
    try:
        #Exiting the chat
        return jsonify({"message": "Chat closed. Goodbye!"})
    except Exception as e:

        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
