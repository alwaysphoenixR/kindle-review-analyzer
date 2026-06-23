from fastapi import APIRouter

from app.schemas import ReviewRequest
from app.services.sentiment_service import (
    predict_sentiment
)

router = APIRouter()

@router.post("/predict")
def predict(request: ReviewRequest):

    predictions = predict_sentiment(
        request.reviews
    )

    return {
        "predictions": predictions.tolist()
    }