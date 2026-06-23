from pydantic import BaseModel

class ReviewRequest(BaseModel):
    reviews: list[str]