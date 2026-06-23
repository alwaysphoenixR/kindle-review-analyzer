from fastapi import APIRouter

from app.schemas import ReviewRequest

from app.services.sentiment_service import (
    predict_sentiment
)

router = APIRouter()

@router.post("/analyze")
def analyze(request: ReviewRequest):

    predictions = predict_sentiment(
        request.reviews
    )

    total = len(predictions)

    positive = int(
        (predictions == 1).sum()
    )

    negative = int(
        (predictions == 0).sum()
    )

    return {
        "total_reviews": total,

        "positive_reviews": positive,

        "negative_reviews": negative,

        "positive_percentage":
            round(
                positive * 100 / total,
                2
            ),

        "negative_percentage":
            round(
                negative * 100 / total,
                2
            )
    }