import pandas as pd
import re
import contractions
from bs4 import BeautifulSoup

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import nltk

# -------------------------------
# Download required NLTK resources
# -------------------------------

resources = [
    ("corpora/stopwords", "stopwords"),
    ("tokenizers/punkt", "punkt"),
    ("corpora/wordnet", "wordnet"),
    ("corpora/omw-1.4", "omw-1.4"),
]

for path, resource in resources:
    try:
        nltk.data.find(path)
    except LookupError:
        nltk.download(resource)

# -------------------------------
# Stopwords
# -------------------------------

stop_words = set(stopwords.words("english"))

negations = {
    "not", "no", "nor",
    "don't", "didn't", "won't",
    "wouldn't", "shouldn't",
    "couldn't", "isn't", "wasn't",
    "aren't", "weren't",
    "haven't", "hasn't", "hadn't",
    "can't"
}

custom_stopwords = stop_words - negations

lemmatizer = WordNetLemmatizer()

# -------------------------------
# Cleaning Function
# -------------------------------

def cleaner(text):

    if pd.isna(text):
        return ""

    text = str(text)

    # expand contractions
    text = contractions.fix(text)

    # remove html
    text = BeautifulSoup(text, "html.parser").get_text()

    # remove urls
    text = re.sub(r'https?://\S+|www\.\S+', '', text)

    # remove emails
    text = re.sub(r'\S+@\S+', '', text)

    # remove mentions and hashtags
    text = re.sub(r'[@#]\w+', '', text)

    # lowercase
    text = text.lower()

    # keep only letters
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)

    # remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()

    if text == "":
        return ""

    tokens = word_tokenize(text)

    tokens = [
        lemmatizer.lemmatize(token)
        for token in tokens
        if token.isalpha()
        and token not in custom_stopwords
    ]

    return " ".join(tokens)