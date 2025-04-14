from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import logging

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Configure Logging
logging.basicConfig(level=logging.INFO)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["DataSet1"]
collection = db["insights"]

@app.route('/data', methods=['GET'])
def get_filtered_data():
    filters = {}
    filter_fields = {
        "end_year": "end_year",
        "topic": "topic",
        "sector": "sector",
        "region": "region",
        "pestle": "pestle",
        "source": "source",
        "swot": "swot_analysis",  # Fixed field name
        "country": "country",
        "city": "city"
    }

    logging.info(f"Received Query Params: {request.args}")  # Debugging

    for param, field in filter_fields.items():
        value = request.args.get(param)
        if value:
            if param == "end_year":  # Handle numeric filtering
                try:
                    filters[field] = int(value)
                except ValueError:
                    return jsonify({"error": "Invalid end_year format"}), 400
            else:
                filters[field] = {"$regex": value, "$options": "i"}  # Case-insensitive search

    logging.info(f"Applied Filters: {filters}")  # Debugging

    try:
        results = list(collection.find(filters, {"_id": 0}).limit(500))  # Limit response size

        if not results:
            return jsonify({"error": "No matching data found"}), 404

        return jsonify(results)
    except Exception as e:
        logging.error(f"Database Query Error: {str(e)}")
        return jsonify({"error": "Database query failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
