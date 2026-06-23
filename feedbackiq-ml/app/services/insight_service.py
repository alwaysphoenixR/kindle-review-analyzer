import ollama
import json
import re
def analyze_topic(topic_id, topic_model):

    keywords = [
        word
        for word, score
        in topic_model.get_topic(topic_id)[:10]
    ]

    reviews = topic_model.get_representative_docs(topic_id)

    count = int(
        topic_model.get_topic_info()
        .set_index("Topic")
        .loc[topic_id]["Count"]
    )

    prompt = f"""
You are a senior product analyst.

Topic Keywords:
{keywords}

Representative Reviews:
{reviews[:3]}

Return ONLY valid JSON.

Format:

{{
    "theme": "",
    "summary": "",
    "recommendation": ""
}}

Rules:
- Theme should be 2-5 words.
- Summary should be one sentence.
- Recommendation should be actionable.
- Do not return markdown.
- Do not return explanations.
- Recommendation must be for the company.
- Do NOT advise the user.
- Focus on product improvements.
"""

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response["message"]["content"]
    # remove markdown code fences
    text = re.sub(r"```json", "", text)
    text = re.sub(r"```", "", text)
    text = text.strip()

    try:
        result = json.loads(text)

        return {
            "topic_id": topic_id,
            "count": count,
            **result
        }

    except Exception as e:
     return {
        "topic_id": topic_id,
        "count": count,
        "error": str(e),
        "raw_response": text
    }
def generate_insights(topic_model, top_n=5):
    print(topic_model.get_topic_info())

    topic_info = topic_model.get_topic_info()

    topic_info = topic_info[
        topic_info["Topic"] != -1
    ]

    topic_info = topic_info.sort_values(
        by="Count",
        ascending=False
    )

    insights = []

    for topic_id in topic_info.head(top_n)["Topic"]:

        insight = analyze_topic(
            topic_id,
            topic_model
        )

        insights.append(insight)

    return insights