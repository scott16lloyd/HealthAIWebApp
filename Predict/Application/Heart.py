import pyrebase
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.impute import SimpleImputer

config = {
  "apiKey": "AIzaSyAHFVjJjJeM_Soz2lsJOEIwSBiLWOS_RY0",
  "authDomain": "healthai-40b47.firebaseapp.com",
  "databaseURL": "https://healthai-40b47-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "healthai-40b47",
  "storageBucket": "healthai-40b47.appspot.com",
  "messagingSenderId": "493505764604",
  "appId": "1:493505764604:web:2decb83a82f453f0398b79",
  "measurementId": "G-YDS75RSZME"
}

firebase = pyrebase.initialize_app(config)
database = firebase.database()

heart_disease_data = database.child("HeartDisease").get().val()
heart_disease_df = pd.DataFrame.from_dict(heart_disease_data)

heart_disease_df['Sex'] = heart_disease_df['Sex'].map({'M': 0, 'F': 1})

X = heart_disease_df[['Age', 'BP', 'Chest pain type', 'Cholesterol', 'Max HR', 'Sex']]
y = heart_disease_df['Heart Disease']

# Impute missing values with the mean
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.3, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Heart Accuracy:", accuracy)
print("Heart Model training successful")

def train_heart_disease_model(data):
    
    #Exclude non-numeric columns from imputation
    numeric_columns = data.select_dtypes(include=['number'])
    imputer = SimpleImputer(strategy='mean')
    X_imputed = imputer.fit_transform(numeric_columns)
  
    
    model = RandomForestClassifier()
    model.fit(X_imputed, data['Heart Disease'])
    

    return model, imputer


def predict_heart_disease(data, model, imputer):
    
    # Replace NaN values with the mean
    data_imputed = pd.DataFrame(imputer.transform(data), columns=data.columns)
    
    numeric_columns = data_imputed.select_dtypes(include=['number'])
    prediction = model.predict(numeric_columns)  
    probability = model.predict_proba(numeric_columns)
    return prediction, probability
