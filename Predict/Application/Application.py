import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer

import Colon
import Heart
import Lung

GENDER_MAPPING = {"M": 0, "F": 1}


# Function to generate random patient data
# Function to generate random patient data
def generate_single_patient_data(model_type):
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
    ChestPain = np.random.randint(0, 2)
    Cholestrol = np.random.randint(100, 300)
    Max_HR = np.random.randint(60, 220)

    chronic_Disease = np.random.randint(0, 2)
    coughing = np.random.randint(0, 2)
    fatigue = np.random.randint(0, 2)
    shortness_of_breath = np.random.randint(0,2)
    swallowing_difficulty = np.random.randint(0, 2)
    wheezing = np.random.randint(0, 2)
    yellow_fingers = np.random.randint(0, 2)

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
    }

    patient_data_heart = {
        'Age': age,
        'Sex': GENDER_MAPPING[sex], 
        'BP': bp,
        'Chest pain type': ChestPain,
        'Cholesterol': Cholestrol,
        'Max HR': Max_HR,
    }

    patient_data_lung = {
        'AGE': age,
        'GENDER': GENDER_MAPPING[sex],  
        'ALCOHOL CONSUMING': alcohol,
        'CHEST PAIN': ChestPain,
        'CHRONIC DISEASE': chronic_Disease,
        'COUGHING': coughing,
        'FATIGUE': fatigue,
        'SHORTNESS OF BREATH': shortness_of_breath,
        'SMOKING': smoking,
        'SWALLOWING DIFFICULTY': swallowing_difficulty,
        'WHEEZING': wheezing,
        'YELLOW_FINGERS': yellow_fingers,
    }



    if model_type == 'colon':
        return patient_data_colon
    elif model_type == 'heart':
        return patient_data_heart
    elif model_type == 'lung':
        return patient_data_lung
    else:
        raise ValueError(f"Invalid model_type: {model_type}")

# Example usage:
single_patient_data_colon = generate_single_patient_data('colon')
single_patient_data_heart = generate_single_patient_data('heart')
single_patient_data_lung = generate_single_patient_data('lung')

if __name__ == "__main__":
    # Generate patient data for colon model
    single_patient_data_colon = generate_single_patient_data('colon')

    # Train the colon cancer model
    colon_model, colon_imputer, train_columns_colon = Colon.train_colon_cancer_model()

    print("Input Data for Colon Prediction:")
    print(pd.DataFrame([single_patient_data_colon]))

    # Predict colon cancer
    colon_result, colon_probability = Colon.predict_colon_cancer(
        pd.DataFrame([single_patient_data_colon]), colon_model, colon_imputer, GENDER_MAPPING, train_columns_colon
    )

    # Print results with risk percentage
    print("\nColon Cancer Data:")
    print("Colon Result (Probability of Positive Class):", colon_result[0])
    print("Colon Risk Percentage:", colon_probability[0]*100)

    # Generate patient data for heart model
    single_patient_data_heart = generate_single_patient_data('heart')

    # Train the heart disease model
    heart_model, heart_imputer, train_columns_heart = Heart.train_heart_disease_model()

    print("\nInput Data for Heart Disease Prediction:")
    print(pd.DataFrame([single_patient_data_heart]))

    # Predict heart disease
    heart_result, heart_probability = Heart.predict_heart_disease(
        pd.DataFrame([single_patient_data_heart]), heart_model, heart_imputer, GENDER_MAPPING, train_columns_heart
    )

    # Print results with risk percentage
    print("\nHeart Disease Data:")
    #print("Heart Result (Probability of Positive Class):", heart_result[0])
    print("Heart Risk Percentage:", heart_probability[0]*100)

     
    # Generate patient data for lung model
    single_patient_data_lung = generate_single_patient_data('lung')


    #Train the lung cancer model
    lung_model, lung_imputer, train_columns_lung = Lung.train_lung_cancer_model()

    print("\nInput Data for Lung Prediction:")
    print(pd.DataFrame([single_patient_data_lung]))

    # Predict lung cancer
lung_result, lung_probability = Lung.predict_lung_cancer(
    pd.DataFrame([single_patient_data_lung]), lung_model, lung_imputer, GENDER_MAPPING
)

# Print results with risk percentage
print("\nLung Cancer Data:")
print("Lung Result (Probability of Positive Class):", lung_result[0])


print("Lung Risk Percentage:", (lung_probability[0]) * 100)
