from fastapi import APIRouter

from app.schemas import ReviewRequest

from app.services.sentiment_service import (
    predict_sentiment
)

from app.services.topic_service import (
    extract_topics
)

router = APIRouter()

@router.post("/topics")
def topics(request: ReviewRequest):

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

    if len(negative_reviews) < 15:
        return {
            "message": (
                f"Need at least 15 negative reviews. "
                f"Found {len(negative_reviews)}"
            )
        }

    topic_model = extract_topics(
        negative_reviews
    )

    topic_info = (
        topic_model
        .get_topic_info()
    )

    topic_info = topic_info.head(10)

    topic_info = topic_info.to_dict(
        orient="records"
    )

    return {
        "negative_review_count": len(
            negative_reviews
        ),
        "topics": topic_info
    }