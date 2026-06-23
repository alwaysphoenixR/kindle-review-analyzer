# from fastapi import FastAPI
# from fastapi import UploadFile
# from fastapi import File
# import pandas as pd
# from app.schemas import ReviewRequest
# from app.services.report_service import (
#     generate_report
# )
# from app.utils.cleaner import cleaner
# from app.services.sentiment_service import (
#     predict_sentiment
# )
# from app.services.insight_service import (
#     analyze_topic,generate_insights
# )
# from app.model_loader import (
#     model,
#     vectorizer
# )
# from app.services.topic_service import (
#     extract_topics
# )
# from app.routes.upload import (
#     router as upload_router
# )

# from app.routes.predict import (
#     router as predict_router
# )

# from app.routes.report import (
#     router as report_router
# )

# app = FastAPI()


# app.include_router(
#     predict_router
# )

# app.include_router(
#     report_router
# )

# app.include_router(
#     upload_router
# )
# @app.get("/model-info")
# def model_info():

#     return {
#         "model": str(type(model)),
#         "vectorizer": str(type(vectorizer))
#     }
# # @app.post("/predict")
# # @app.post("/predict")
# # def predict(request: ReviewRequest):
# #     predictions = predict_sentiment(
# #         request.reviews
# #     )

# #     return {
# #         "predictions": predictions.tolist()
# #     }

#     # cleaned_reviews = [
#     #     cleaner(review)
#     #     for review in request.reviews
#     # ]

#     # X = vectorizer.transform(
#     #     cleaned_reviews
#     # )

#     # predictions = model.predict(X)

#     # return {
#     #     "predictions": predictions.tolist()
#     # }
# @app.post("/analyze")
# def analyze(request: ReviewRequest):
#     predictions = predict_sentiment(
#     request.reviews
# )

#     # cleaned_reviews = [
#     #     cleaner(review)
#     #     for review in request.reviews
#     # ]

#     # X = vectorizer.transform(
#     #     cleaned_reviews
#     # )

#     # predictions = model.predict(X)

#     total = len(predictions)

#     positive = int(
#         (predictions == 1).sum()
#     )

#     negative = int(
#         (predictions == 0).sum()
#     )

#     return {
#         "total_reviews": total,

#         "positive_reviews": positive,

#         "negative_reviews": negative,

#         "positive_percentage":
#             round(
#                 positive * 100 / total,
#                 2
#             ),

#         "negative_percentage":
#             round(
#                 negative * 100 / total,
#                 2
#             )
#     }
# @app.post("/topics")
# def topics(request: ReviewRequest):
     
#     predictions = predict_sentiment(
#      request.reviews
#     )

#     # cleaned_reviews = [
#     #     cleaner(review)
#     #     for review in request.reviews
#     # ]

#     # X = vectorizer.transform(
#     #     cleaned_reviews
#     # )

#     # predictions = model.predict(X)

#     negative_reviews = []

#     for review, pred in zip(
#         request.reviews,
#         predictions
#     ):
#         if pred == 0:
#             negative_reviews.append(review)

#     print(f"Total reviews: {len(request.reviews)}")
#     print(f"Negative reviews: {len(negative_reviews)}")

#     if len(negative_reviews) < 15:
#         return {
#             "message": (
#                 f"Need at least 15 negative reviews. "
#                 f"Found {len(negative_reviews)}"
#             )
#         }

#     topic_model = extract_topics(
#         negative_reviews
#     )

#     topic_info = (
#         topic_model
#         .get_topic_info()
#     )

#     # Remove outlier topic (-1)
#     # topic_info = topic_info[
#     #     topic_info["Topic"] != -1
#     # ]

#     topic_info = topic_info.head(10)

#     topic_info = topic_info.to_dict(
#         orient="records"
#     )

#     return {
#         "negative_review_count": len(negative_reviews),
#         "topics": topic_info
#     }
# @app.post("/insights")
# def insights(request: ReviewRequest):
#     predictions = predict_sentiment(
#     request.reviews
# )

#     # cleaned_reviews = [
#     #     cleaner(r)
#     #     for r in request.reviews
#     # ]

#     # X = vectorizer.transform(
#     #     cleaned_reviews
#     # )

#     # predictions = model.predict(X)

#     negative_reviews = []

#     for review, pred in zip(
#         request.reviews,
#         predictions
#     ):
#         if pred == 0:
#             negative_reviews.append(review)

#     if len(negative_reviews) < 3:
#         return {
#             "message": "Not enough negative reviews"
#         }

#     topic_model = extract_topics(
#         negative_reviews
#     )

#     insights = generate_insights(
#         topic_model,
#         top_n=5
#     )

#     return {
#         "negative_reviews": len(
#             negative_reviews
#         ),
#         "top_complaints": insights
#     }
# # @app.post("/report")
# # def report(request: ReviewRequest):
# #     return generate_report(
# #         request.reviews
# #     )
   
# # @app.post("/upload-csv")
# # def upload_csv(
# #     file: UploadFile = File(...)
# # ):

# #     df = pd.read_csv(
# #         file.file
# #     )

# #     if "review" not in df.columns:

# #         return {
# #             "error":
# #             "CSV must contain a column named 'review'"
# #         }

# #     reviews = (
# #         df["review"]
# #         .dropna()
# #         .astype(str)
# #         .tolist()
# #     )

# #     return generate_report(
# #         reviews
# #     )
from fastapi import FastAPI

from app.routes.predict import router as predict_router
from app.routes.report import router as report_router
from app.routes.upload import router as upload_router
from app.routes.analyze import router as analyze_router
from app.routes.topics import router as topics_router
from app.routes.insights import router as insights_router

app = FastAPI()
@app.get("/")
def home():

    return {
        "message": "FeedbackIQ ML Service Running"
    }
app.include_router(predict_router)
app.include_router(report_router)
app.include_router(upload_router)
app.include_router(analyze_router)
app.include_router(topics_router)
app.include_router(insights_router)