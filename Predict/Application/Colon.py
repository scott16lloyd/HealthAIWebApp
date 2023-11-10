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

colon_cancer_data = database.child("ColonCancer").get().val()
colon_cancer_df = pd.DataFrame.from_dict(colon_cancer_data)

colon_cancer_df['Sex'] = colon_cancer_df['Sex'].map({'M': 0, 'F': 1})
colon_cancer_df['Colon Cancer'] = colon_cancer_df['Colon Cancer'].map({'NO': 0, 'YES': 1})

X = colon_cancer_df.drop('Colon Cancer', axis=1)
y = colon_cancer_df['Colon Cancer']

# Impute missing values with the mean
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.3, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Colon Accuracy:", accuracy)
print("Colon Model training successful")



def train_colon_cancer_model(data, gender_mapping):
    
    numeric_columns = data.select_dtypes(include=['number'])

    imputer = SimpleImputer(strategy='mean')
    X_imputed = imputer.fit_transform(numeric_columns)

    model = RandomForestClassifier()
    model.fit(X_imputed, data['Colon Cancer'])


    return model, imputer

def predict_colon_cancer(data, model, imputer, gender_mapping):
    
    data['Sex'] = data['Sex'].map(gender_mapping)
    numeric_columns = data.select_dtypes(include=['number'])

    # Impute missing values using the imputer
    numeric_columns_imputed = imputer.transform(numeric_columns)

    prediction = model.predict(numeric_columns_imputed)
    probability = model.predict_proba(numeric_columns_imputed)

    return prediction, probability