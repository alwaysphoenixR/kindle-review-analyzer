from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import pandas as pd

from app.services.report_service import (
    generate_report
)

router = APIRouter()

@router.post("/upload-csv")
def upload_csv(
    file: UploadFile = File(...)
):

    df = pd.read_csv(
        file.file
    )

    if "review" not in df.columns:

        return {
            "error":
            "CSV must contain a column named 'review'"
        }

    reviews = (
        df["review"]
        .dropna()
        .astype(str)
        .tolist()
    )

    return generate_report(
        reviews
    )