from flask import Flask, render_template, request, jsonify, Response
import os
import re
import csv
import io
import json

app = Flask(__name__)

# ആവശ്യമെങ്കിൽ Gemini API കീ ഇവിടെയോ .env-ലോ നൽകാം
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

def count_words(text):
    """വാക്കുകളുടെ എണ്ണം കൃത്യമായി തിട്ടപ്പെടുത്തുന്നു (Malayalam & English)."""
    if not text:
        return 0
    return len([w for w in text.strip().split() if w])

def fallback_ticker_extraction(text, lang="ml"):
    """
    API ലഭ്യമല്ലെങ്കിലോ ഓഫ്ലൈൻ ആണെങ്കിലോ കൃത്യമായ വിവരങ്ങൾ മാത്രം എടുത്ത്
    10 വാക്കുകളിൽ താഴെ ടിക്കർ നൽകുന്ന fallback logic.
    """
    clean_lines = [l.strip() for l in text.split("\n") if l.strip() and not l.startswith("ഡെസ്കിൽ")]
    if not clean_lines:
        return "വാർത്ത സംഗ്രഹം ലഭ്യമല്ല"
    
    first_line = clean_lines[0]
    words = first_line.split()
    
    if len(words) <= 10:
        return first_line
    return " ".join(words[:10])

def generate_ticker_ai(source_text, target_lang="ml"):
    """
    Gemini API ഉപയോഗിച്ച് കർശനമായ നിബന്ധനകളോടെ (<=10 words, no hallucination) ടിക്കർ ഉണ്ടാക്കുന്നു.
    """
    if not GEMINI_API_KEY:
        return fallback_ticker_extraction(source_text, target_lang)

    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
You are a broadcast news copy chief for Malayala Manorama news channel.
Create a single TV ticker headline from the following news dispatch.

STRICT CONSTRAINTS:
1. MAXIMUM 10 WORDS. Count must be <= 10 words. Never exceed.
2. Maintain STRICT FIDELITY. Use ONLY facts directly mentioned in the text. DO NOT add speculation, external assumptions, or figures not present.
3. Language: Output MUST be in {'Malayalam (മലയാളം)' if target_lang == 'ml' else 'English'}.
4. Style: Crisp, urgent, authoritative breaking news ticker style.
5. Do NOT include quotation marks, labels, or prefixes like "Breaking:". Just the raw ticker line.

SOURCE TEXT:
{source_text}
"""
        response = model.generate_content(prompt)
        ticker = response.text.strip().replace('"', '').replace("'", "")
        
        # Guardrail: 10 വാക്കിൽ കൂടുതൽ വന്നാൽ ആദ്യ 10 വാക്കാക്കി ചുരുക്കുന്നു
        words = ticker.split()
        if len(words) > 10:
            ticker = " ".join(words[:10])
            
        return ticker
    except Exception as e:
        print(f"AI Generation Error: {e}")
        return fallback_ticker_extraction(source_text, target_lang)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json or {}
    articles = data.get("articles", [])
    lang = data.get("language", "ml")
    
    results = []
    for item in articles:
        src = item.get("text", "").strip()
        if not src:
            continue
        ticker = generate_ticker_ai(src, lang)
        results.append({
            "id": item.get("id"),
            "source": src,
            "ticker": ticker,
            "original_ticker": ticker,
            "word_count": count_words(ticker),
            "priority": "BREAKING",
            "approved": True
        })
    return jsonify({"success": True, "data": results})

@app.route("/api/export/csv", methods=["POST"])
def export_csv():
    data = request.json or {}
    tickers = data.get("tickers", [])
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Rundown Order", "Priority", "Ticker Line", "Word Count", "Source Excerpt"])
    
    for idx, item in enumerate(tickers, start=1):
        writer.writerow([
            idx,
            item.get("priority", "NORMAL"),
            item.get("ticker", ""),
            count_words(item.get("ticker", "")),
            item.get("source", "")[:80] + "..."
        ])
    
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=rundown_tickers.csv"}
    )

if __name__ == "__main__":
    app.run(debug=True, port=5000)