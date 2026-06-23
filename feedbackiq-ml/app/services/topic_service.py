from bertopic import BERTopic

def extract_topics(reviews):

    topic_model = BERTopic(
        verbose=True,
        calculate_probabilities=False,
        min_topic_size=5,
    )

    topics, probs = topic_model.fit_transform(
        reviews
    )

    return topic_model