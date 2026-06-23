from app.services.sentiment_service import predict_sentiment
from app.services.topic_service import extract_topics
from app.services.insight_service import generate_insights

def generate_report(reviews):

    predictions = predict_sentiment(
        reviews
    )

    total_reviews = len(predictions)

    positive_reviews = int(
        (predictions == 1).sum()
    )

    negative_reviews = int(
        (predictions == 0).sum()
    )

    negative_texts = []

    for review, pred in zip(
        reviews,
        predictions
    ):
        if pred == 0:
            negative_texts.append(review)

    complaints = []

    if len(negative_texts) >= 3:

        topic_model = extract_topics(
            negative_texts
        )

        complaints = generate_insights(
            topic_model,
            top_n=5
        )

    return {
        "total_reviews": total_reviews,
        "positive_reviews": positive_reviews,
        "negative_reviews": negative_reviews,
        "positive_percentage": round(
            positive_reviews * 100 / total_reviews,
            2
        ),
        "negative_percentage": round(
            negative_reviews * 100 / total_reviews,
            2
        ),
        "top_complaints": complaints
    }