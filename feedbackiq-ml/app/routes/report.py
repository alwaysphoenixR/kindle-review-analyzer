from fastapi import APIRouter
from app.schemas import ReviewRequest
from app.services.report_service import generate_report

router = APIRouter()

@router.post("/report")
def report(request: ReviewRequest):

    return generate_report(
        request.reviews
    )