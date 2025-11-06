from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import re
from typing import Dict, List, Optional

app = Flask(__name__)
CORS(app)

# In-memory storage (replace with database in production)
complaints_db: List[Dict] = []
complaint_counter = 1

# Analysis patterns (ported from JS)
CATEGORY_PATTERNS = {
    'Overpricing': [
        r'overcharg',
        r'charged?\s+(?:rs|inr|₹)?\s*\d+\s*(?:extra|more)',
        r'price\s+(?:was\s+)?(?:too|very|extremely)\s+high',
        r'mrp'
    ],
    'Quality Issue': [
        r'stale|spoiled|sour|soggy|cold|uncooked|burnt|raw',
        r'poor\s+quality',
        r'tast(?:e|ed)\s+(?:bad|awful|strange)'
    ],
    'Hygiene Concern': [
        r'dirty|unclean|smelly|smell',
        r'flies|cockroach|insect|worm',
        r'hygiene',
        r'contaminat'
    ]
}

KNOWN_ITEMS = [
    'water bottle', 'veg thali', 'non veg thali', 'biryani', 'fried rice',
    'paneer curry', 'chicken curry', 'samosa', 'puff', 'tea', 'coffee',
    'sandwich', 'burger', 'cutlet', 'poha', 'idli', 'dosa', 'vada',
    'upma', 'noodles', 'juice', 'lassi'
]

def detect_category(text: str) -> str:
    text_lower = text.lower()
    for category, patterns in CATEGORY_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text_lower, re.IGNORECASE):
                return category
    return 'Other'

def extract_price(text: str) -> Optional[float]:
    price_pattern = r'(?:₹|rs\.?|inr)\s*(\d+(?:\.\d+)?)'
    fallback_pattern = r'(\d+(?:\.\d+)?)\s*(?:rupees|bucks)'
    match = re.search(price_pattern, text, re.IGNORECASE) or re.search(fallback_pattern, text, re.IGNORECASE)
    if match:
        try:
            return float(match.group(1))
        except ValueError:
            return None
    return None

def extract_item(text: str) -> Optional[str]:
    text_lower = text.lower()
    for item in KNOWN_ITEMS:
        if item in text_lower:
            return item.title()
    return None

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'ScamShield Rail API'}), 200

@app.route('/api/analyze', methods=['POST'])
def analyze_complaint():
    data = request.get_json()
    description = data.get('description', '').strip()
    
    if not description:
        return jsonify({
            'summary': 'Passenger reports an onboard issue.',
            'entities': {},
            'category': 'Other'
        }), 200
    
    category = detect_category(description)
    item_name = extract_item(description)
    price = extract_price(description)
    
    entities = {}
    if item_name:
        entities['itemName'] = item_name
    if price is not None:
        entities['price'] = price
    
    summary = f"Passenger reports {category.lower()} issue"
    if item_name:
        summary += f" with {item_name.lower()}"
    if price:
        summary += f", charged ₹{price}"
    summary += f". {description[:100]}..."
    
    return jsonify({
        'summary': summary,
        'entities': entities,
        'category': category
    }), 200

@app.route('/api/complaints', methods=['GET', 'POST'])
def handle_complaints():
    global complaint_counter
    
    if request.method == 'GET':
        return jsonify(complaints_db), 200
    
    elif request.method == 'POST':
        data = request.get_json()
        complaint = {
            'id': complaint_counter,
            'ticketId': f"SCAM-2024-{str(complaint_counter).zfill(6)}",
            'trainNo': data.get('trainNo'),
            'vendorName': data.get('vendorName'),
            'itemName': data.get('itemName'),
            'reportedPrice': data.get('reportedPrice'),
            'mrp': data.get('mrp'),
            'description': data.get('description'),
            'status': 'Filed',
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'upvotes': 0,
            'downvotes': 0,
            'user': data.get('user', {'id': 1, 'name': 'Anonymous'}),
            'history': [{'status': 'Filed', 'timestamp': datetime.utcnow().isoformat() + 'Z'}],
            'comments': []
        }
        complaints_db.append(complaint)
        complaint_counter += 1
        return jsonify(complaint), 201

@app.route('/api/complaints/<int:complaint_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_complaint(complaint_id):
    complaint = next((c for c in complaints_db if c['id'] == complaint_id), None)
    
    if not complaint:
        return jsonify({'error': 'Complaint not found'}), 404
    
    if request.method == 'GET':
        return jsonify(complaint), 200
    
    elif request.method == 'PUT':
        data = request.get_json()
        complaint.update(data)
        return jsonify(complaint), 200
    
    elif request.method == 'DELETE':
        complaints_db.remove(complaint)
        return jsonify({'message': 'Complaint deleted'}), 200

@app.route('/api/complaints/<int:complaint_id>/vote', methods=['POST'])
def vote_complaint(complaint_id):
    complaint = next((c for c in complaints_db if c['id'] == complaint_id), None)
    
    if not complaint:
        return jsonify({'error': 'Complaint not found'}), 404
    
    data = request.get_json()
    vote_type = data.get('type')
    
    if vote_type == 'up':
        complaint['upvotes'] += 1
    elif vote_type == 'down':
        complaint['downvotes'] += 1
    else:
        return jsonify({'error': 'Invalid vote type'}), 400
    
    return jsonify(complaint), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
