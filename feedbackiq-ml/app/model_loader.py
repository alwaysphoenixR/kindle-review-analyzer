import joblib

MODEL_PATH = r"models/logistic_regression.pkl"
VECTORIZER_PATH = r"models/tfidf_vectorizer.pkl"

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

print("Models Loaded Successfully")