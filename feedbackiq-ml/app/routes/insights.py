from fastapi import APIRouter

from app.schemas import ReviewRequest

from app.services.sentiment_service import (
    predict_sentiment
)

from app.services.topic_service import (
    extract_topics
)

from app.services.insight_service import (
    generate_insights
)

router = APIRouter()

@router.post("/insights")
def insights(request: ReviewRequest):

    predictions = predict_sentiment(
        request.reviews
    )

    negative_reviews = []

    for review, pred in zip(
        request.reviews,
        predictions
    ):
        if pred == 0:
            negative_reviews.append(review)

    if len(negative_reviews) < 3:
        return {
            "message":
            "Not enough negative reviews"
        }

    topic_model = extract_topics(
        negative_reviews
    )

    insights = generate_insights(
        topic_model,
        top_n=5
    )

    return {
        "negative_reviews": len(
            negative_reviews
        ),
        "top_complaints": insights
    }