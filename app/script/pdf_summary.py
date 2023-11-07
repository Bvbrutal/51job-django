import PyPDF2
from sumy.nlp.stemmers import Stemmer
from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lsa import LsaSummarizer
from sumy.utils import get_stop_words


# import nltk
# nltk.download('punkt')

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def summarize_text(text, num_sentences=3):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    stemmer = Stemmer("english")
    summarizer = LsaSummarizer(stemmer)
    summarizer.stop_words = get_stop_words("english")
    summary = []
    for sentence in summarizer(parser.document, num_sentences):
        summary.append(str(sentence))
    return " ".join(summary)


def pdf_summary(pdf_path):

    # 提取PDF文本内容
    pdf_text = extract_text_from_pdf(pdf_path)

    # 生成摘要
    summary = summarize_text(pdf_text)

    return summary

if __name__ == '__main__':
    summary=pdf_summary('./static/data/pdf_summary/工程伦理小作业 2020212118 彭松焕.pdf')
    print(summary)