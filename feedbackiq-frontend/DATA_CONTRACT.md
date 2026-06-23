# DATA CONTRACT: FeedbackIQ API

## 1. Core Base Configuration
* **Base URL:** `http://localhost:3000`
* **Headers:** `Content-Type: application/json` (except for file uploads)

---

## 2. Global Type Definitions (TypeScript)

export interface Complaint {
  _id?: string;
  topic_id: number;
  count: number;
  theme: string;
  summary: string;
  recommendation: string;
}

export interface Report {
  _id: string;
  filename: string;
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  positivePercentage: number;
  negativePercentage: number;
  topComplaints: Complaint[];
  createdAt: string; 
  updatedAt: string; 
}

export interface GlobalStats {
  totalReports: number;
  totalReviewsAnalyzed: number;
  averagePositivePercentage: number;
  averageNegativePercentage: number;
}

---

## 3. Endpoint Specifications

### A. Upload Feedback CSV
* **Method / Route:** `POST /upload`
* **Request Type:** `multipart/form-data`
* **Payload:** `file` (CSV File Binary)
* **Success Response (201 Created):**
    {
        "message": "Report generated successfully",
        "reportId": "...",
        "report": {
            "_id": "...",
            "filename": "google_df_tt.csv",
            "totalReviews": 1000,
            "positiveReviews": 479,
            "negativeReviews": 521,
            "positivePercentage": 47.9,
            "negativePercentage": 52.1,
            "topComplaints": [...]
        }
    }

---

### B. Fetch All Reports (Summary List)
* **Method / Route:** `GET /report`
* **Success Response (200 OK):** Array of Report objects (excluding topComplaints).

---

### C. Fetch Detailed Report by ID
* **Method / Route:** `GET /report/:id`
* **Success Response (200 OK):** Full Report object.

---

### D. Delete Report
* **Method / Route:** `DELETE /report/:id`
* **Success Response (200 OK):** `{"message": "Report deleted successfully"}`

---

### E. Fetch Global Analytics Dashboard Stats
* **Method / Route:** `GET /report/stats`
* **Success Response (200 OK):** GlobalStats object.