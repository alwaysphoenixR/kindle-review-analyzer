from app.utils.cleaner import cleaner
from app.model_loader import (
    model,
    vectorizer
)

def predict_sentiment(reviews):

    cleaned_reviews = [
        cleaner(review)
        for review in reviews
    ]

    X = vectorizer.transform(
        cleaned_reviews
    )

    predictions = model.predict(X)

    return predictions