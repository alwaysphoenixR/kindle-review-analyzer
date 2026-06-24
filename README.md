# FeedbackIQ

<div align="center">

### Transform Customer Reviews into Actionable Insights with AI

FeedbackIQ is an AI-powered review intelligence platform that analyzes large-scale customer feedback and converts raw reviews into meaningful business insights using Natural Language Processing (NLP).

[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-ML_Service-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Accuracy](https://img.shields.io/badge/Model_Accuracy-88.54%25-orange)](#model-performance)

</div>

---

## Demo

> Add your project GIF here once available.

```text
assets/
└── feedbackiq-demo.gif
```

```md
![FeedbackIQ Demo](assets/feedbackiq-demo.gif)
```

---

## Problem Statement

Modern businesses receive thousands of customer reviews across marketplaces, applications, and digital platforms.

Manually analyzing this feedback is:

- Time-consuming
- Expensive
- Error-prone
- Difficult to scale

FeedbackIQ automates this process by leveraging machine learning and topic modeling to identify customer sentiment, uncover recurring themes, and generate actionable insights within minutes.

---

## Features

### CSV-Based Review Analysis

Upload customer review datasets directly through a simple interface.

### Sentiment Analysis

Classify reviews and understand overall customer satisfaction.

- Positive Reviews
- Negative Reviews
- Neutral Reviews

### Topic Extraction

Discover recurring customer concerns and feedback patterns using BERTopic.

Examples:

- Battery Life Issues
- Customer Support Complaints
- Delivery Delays
- Product Quality Concerns

### Interactive Analytics Dashboard

Visualize:

- Sentiment Distribution
- Review Statistics
- Topic Insights
- Historical Reports

### Report Management

- View Previous Reports
- Access Historical Analysis
- Delete Reports
- Compare Review Data Over Time

### Statistics Endpoint

Track platform-level metrics:

- Total Reports Generated
- Total Reviews Analyzed
- Average Positive Sentiment

---

## How It Works

```text
User Uploads CSV
        │
        ▼
Frontend (React)
        │
        ▼
Backend API (Express.js)
        │
        ▼
ML Service (FastAPI)
        │
 ┌──────┴──────┐
 ▼             ▼
Sentiment   Topic
Analysis   Extraction
(Logistic   (BERTopic)
Regression)
        │
        ▼
MongoDB
        │
        ▼
Analytics Dashboard
```

---

## Architecture

```text
┌─────────────────────┐
│     React App       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Express Backend   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  FastAPI ML Service │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      MongoDB        │
└─────────────────────┘
```

---

## Tech Stack

### Frontend

- React
- Vite
- Axios
- React Router
- Modern Responsive UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

### Machine Learning

- FastAPI
- Scikit-Learn
- TF-IDF Vectorization
- Logistic Regression
- BERTopic
- Pandas
- NumPy

---

## Machine Learning Pipeline

### Sentiment Analysis

The sentiment engine is built using:

- Text Preprocessing
- TF-IDF Vectorization
- Logistic Regression Classifier

#### Model Performance

| Model | Accuracy |
|---------|---------:|
| Logistic Regression | **88.54%** |

### Training Dataset

The model was trained on a custom combined dataset sourced from:

- Amazon Reviews
- IBM Customer Feedback
- Google Play Store Reviews

This combination improves the model's ability to generalize across multiple review domains.

---

## Topic Modeling

FeedbackIQ uses BERTopic to identify recurring themes from customer feedback.

Example:

### Input Reviews

```text
Battery drains quickly.
Battery backup is poor.
The phone only lasts a few hours.
```

### Generated Topic

```text
Battery Life Issues
```

---

## CSV Format

Your CSV file must contain a column named:

```csv
review
Amazing product
Battery life is terrible
Customer support was very helpful
```

### Important

The column name must be exactly:

```text
review
```

Not:

```text
Review
REVIEWS
customer_review
feedback
```

---

## API Endpoints

### Upload Reviews

```http
POST /upload
```

Uploads and validates CSV data.

---

### Create Report

```http
POST /reports
```

Creates a new analysis report.

---

### Get All Reports

```http
GET /reports
```

Returns all generated reports.

---

### Get Report By ID

```http
GET /reports/:id
```

Returns detailed report information.

---

### Delete Report

```http
DELETE /reports/:id
```

Removes a report.

---

### Statistics

```http
GET /reports/stats
```

Example Response:

```json
{
  "totalReports": 12,
  "totalReviewsAnalyzed": 15432,
  "averagePositivePercentage": 78.4
}
```

---

## Project Structure

```text
FEEDBACKIQ/
│
├── frontend/
│
├── backend/
│
├── ml/
│
├── assets/
│   └── feedbackiq-demo.gif
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/alwaysphoenixR/FEEDBACKIQ.git
cd FEEDBACKIQ
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### ML Service Setup

```bash
cd ml

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Environment Variables

### Backend

```env
PORT=
MONGO_URI=
ML_SERVICE_URL=
```

### ML Service

```env
MODEL_PATH=
```

---

## User Experience

FeedbackIQ is designed to make large-scale review analysis effortless.

While reviews are being processed, users are shown a friendly waiting screen:

> “Analyzing reviews... This may take a while. Brew a coffee ☕ while FeedbackIQ works.”

---

## Future Improvements

- Aspect-Based Sentiment Analysis
- Multi-language Support
- Comparative Report Analysis
- PDF Report Export
- AI-Powered Recommendations
- Trend Analysis Over Time
- Real-Time Review Monitoring
- LLM-Based Insight Generation

---

## Why FeedbackIQ?

FeedbackIQ demonstrates:

### Frontend Engineering

- React Development
- API Integration
- Responsive Dashboard Design

### Backend Engineering

- REST API Development
- File Upload Handling
- Database Design
- Service-Oriented Architecture

### Machine Learning

- NLP Pipelines
- Sentiment Analysis
- Topic Modeling
- FastAPI Deployment

### System Design

- Frontend ↔ Backend ↔ ML Communication
- Multi-Service Architecture
- Production-Oriented Design

---

## Author

**Rajveer Singh**

Computer Science & Engineering  
NIT Raipur

---

## Star the Repository

If you found this project useful, consider giving it a star.

It helps support the project and motivates future improvements.
