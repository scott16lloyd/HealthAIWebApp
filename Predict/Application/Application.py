import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer

import Colon
import Heart
import Lung

GENDER_MAPPING = {'M': 0, 'F': 1}

# Function to generate random patient data
def generate_single_patient_data():
    age = np.random.randint(30, 80)
    sex = np.random.choice(['M', 'F'])
    alcohol = np.random.randint(0, 2)
    bowel_problems = np.random.randint(0, 2)
    diabetic = np.random.randint(0, 2)
    rectal_bleeding = np.random.randint(0, 2)
    smoking = np.random.randint(0, 2)
    stomach_cramps = np.random.randint(0, 2)
    tiredness = np.random.randint(0, 2)
    weight_loss = np.random.randint(0, 2)

    bp = np.random.randint(80, 200)
    ChestPain = np.random.randint(1, 2)
    Cholestrol = np.random.randint(100, 300)
    Max_HR = np.random.randint(60, 220)

    chronic_Disease = np.random.randint(0, 1)
    coughing = np.random.randint(0, 1)
    fatigue = np.random.randint(0, 1)
    swallowing_difficulty = np.random.randint(0, 1)
    wheezing = np.random.randint(0, 1)
    yellow_fingers = np.random.randint(0, 1)

    patient_data_colon = {
        'Age': age,
        'Sex': GENDER_MAPPING[sex],
        'Alcohol': alcohol,
        'Bowel Problems': bowel_problems,
        'Diabetic': diabetic,
        'Rectal Bleeding': rectal_bleeding,
        'Smoking': smoking,
        'Stomach Cramps': stomach_cramps,
        'Tiredness': tiredness,
        'Weight Loss': weight_loss,
        'Colon Cancer': -1
    }

    patient_data_heart = {
        'Age': age,
        'Sex': GENDER_MAPPING[sex], 
        'BP': bp,
        'Chest pain type': ChestPain,
        'Cholesterol': Cholestrol,
        'Max HR': Max_HR,
        'Heart Disease': -1
    }

    patient_data_lung = {
        'AGE': age,
        'GENDER': GENDER_MAPPING[sex],  
        'Alcohol Consuming': alcohol,
        'Chest Pain': ChestPain,
        'Chronic Disease': chronic_Disease,
        'Coughing': coughing,
        'Fatigue': fatigue,
        'Smoking': smoking,
        'Swallowing Difficulty': swallowing_difficulty,
        'Wheezing': wheezing,
        'Yellow_Fingers': yellow_fingers,
        'LUNG_CANCER': -1
    }

    return patient_data_colon, patient_data_heart, patient_data_lung

if __name__ == "__main__":
    #Generating data
    single_patient_data_colon, single_patient_data_heart, single_patient_data_lung = generate_single_patient_data()

    #Imputer for empty values
    imputer = SimpleImputer(strategy='mean')

    #Train models
    colon_model, colon_imputer = Colon.train_colon_cancer_model(pd.DataFrame([single_patient_data_colon]), GENDER_MAPPING)
    heart_model, heart_imputer = Heart.train_heart_disease_model(pd.DataFrame([single_patient_data_heart]))
    lung_model = Lung.train_lung_cancer_model(pd.DataFrame([single_patient_data_lung]))

    #Transform the heart disease patient data
    single_patient_data_heart_imputed = pd.DataFrame([single_patient_data_heart])
    X_heart = single_patient_data_heart_imputed[['Age', 'BP', 'Chest pain type', 'Cholesterol', 'Max HR', 'Sex']]
    imputed_heart = pd.DataFrame(heart_imputer.fit_transform(X_heart), columns=X_heart.columns)

    #Make predictions for each model with the same patient data
    colon_result = Colon.predict_colon_cancer(pd.DataFrame([single_patient_data_colon]), colon_model, colon_imputer, GENDER_MAPPING)
    heart_result = Heart.predict_heart_disease(imputed_heart, heart_model, heart_imputer)  # Use heart_imputer here
    lung_result = Lung.predict_lung_cancer(pd.DataFrame([single_patient_data_lung]), lung_model)

    print("\nColon Cancer Data:")
    print(single_patient_data_colon)
    print("Colon Result:", colon_result)

    print("\nHeart Disease Data:")
    print(single_patient_data_heart)
    print("Heart Result:", heart_result)

    print("\nLung Cancer Data:")
    print(single_patient_data_lung)
    print("Lung Result:", lung_result)