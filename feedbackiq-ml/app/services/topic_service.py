import psutil
import os

process = psutil.Process(os.getpid())
print(
    f"Memory before import: "
    f"{process.memory_info().rss / 1024 / 1024:.2f} MB"
)

from bertopic import BERTopic
print(
    f"Memory after BERTopic import: "
    f"{process.memory_info().rss / 1024 / 1024:.2f} MB"
)
def extract_topics(reviews):

    topic_model = BERTopic(
        verbose=True,
        calculate_probabilities=False,
        min_topic_size=5,
    )

    topics, probs = topic_model.fit_transform(
        reviews
    )
    print(
    f"Memory after model creation: "
    f"{process.memory_info().rss / 1024 / 1024:.2f} MB"
)
    return topic_model