# #
#This is the API (using flask) used to host responses and requests
# Must be kept running in order to send and recieve data from chatbot
# Currently cannot read from dataset but will be implemented later (unless other methods)
# Uses DocBot_Requests to communicate from API to user and vice versa
# On a development server, recommended to use a aproduction WSGI server for deployment

from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Connecting to ChatGPT with API Key
api_key = "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"
openai.api_key = api_key

@app.route('/diagnose', methods=['POST'])
def diagnose():
    try:
        # Get user input from the request
        user_input = request.json['user_input']

        # Defining context for the API to instruct ChatGPT on it's directive to the user
        system_message = "You are a medical chatbot to predict specifically heart disease, lung cancer and colon cancer. If you are asked anything unrelated to these topics please advise the user this is not your speciality. Please ask questions to determine the risk of these on a given patient and provide information on disease risk and treatment."

        # Send a prompt to GPT
        prompt = f"{system_message}\nUser: {user_input}\n"
        response = openai.Completion.create(
            engine="text-davinci-003", #ChatGPT-3 model name
            prompt=prompt,
            max_tokens= 1000,  #This can cut off the chatbot after spending a set amount of tokens on a response to conserve tokens (cost)
            n=1, #Number of responses from a single prompt
            stop=None #No specific stopping point of response
        )

        # Extract and return the AI-generated response
        ai_response = response.choices[0].text.strip()
        return jsonify({"response": ai_response})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
