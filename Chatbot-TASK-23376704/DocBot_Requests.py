# Imports
import requests

# API endpoint URL
api_url = 'http://127.0.0.1:5000/diagnose'

def send_message(message):
    # Send a POST request to the API
    response = requests.post(api_url, json={"user_input": message})
    
    # Return the response from the API
    return response.json()["response"]

if __name__ == "__main__":
    # Send on start up
    print("Welcome to the Medical Chatbot!")
    print("You can start the conversation. Type 'exit' to quit.")

    while True:
        # Formatting conversation
        user_input = input("You: ")
        
        # Ending the conversation
        if user_input.lower() == "exit":
            break

        bot_response = send_message(user_input)
        print(bot_response)
