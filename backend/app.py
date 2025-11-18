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

# IRCTC Official Menu Pricing
IRCTC_MENU_PRICES = {
    'beverages': {
        'tea': {'price': 10, 'item': 'Tea', 'category': 'Beverage'},
        'coffee': {'price': 15, 'item': 'Coffee', 'category': 'Beverage'},
        'cold drink': {'price': 20, 'item': 'Cold Drink', 'category': 'Beverage'},
        'water': {'price': 15, 'item': 'Water Bottle (1L)', 'category': 'Beverage'},
        'water bottle': {'price': 15, 'item': 'Water Bottle', 'category': 'Beverage'},
    },
    'snacks': {
        'samosa': {'price': 15, 'item': 'Samosa (2 pcs)', 'category': 'Snack'},
        'vada pav': {'price': 20, 'item': 'Vada Pav', 'category': 'Snack'},
        'sandwich': {'price': 40, 'item': 'Veg Sandwich', 'category': 'Snack'},
        'veg sandwich': {'price': 40, 'item': 'Veg Sandwich', 'category': 'Snack'},
        'burger': {'price': 50, 'item': 'Veg Burger', 'category': 'Snack'},
    },
    'meals': {
        'thali': {'price': 120, 'item': 'Veg Thali', 'category': 'Meal'},
        'veg thali': {'price': 120, 'item': 'Veg Thali', 'category': 'Meal'},
        'non veg thali': {'price': 150, 'item': 'Non-Veg Thali', 'category': 'Meal'},
        'biryani': {'price': 100, 'item': 'Veg Biryani', 'category': 'Meal'},
        'chicken biryani': {'price': 140, 'item': 'Chicken Biryani', 'category': 'Meal'},
    },
    'breakfast': {
        'idli': {'price': 40, 'item': 'Idli (4 pcs)', 'category': 'Breakfast'},
        'dosa': {'price': 50, 'item': 'Dosa', 'category': 'Breakfast'},
        'poha': {'price': 30, 'item': 'Poha', 'category': 'Breakfast'},
    }
}

# Train Schedules
TRAIN_SCHEDULES = {
    '12951': {'name': 'Mumbai Rajdhani', 'route': 'Mumbai Central - New Delhi', 'type': 'Rajdhani', 'pantryAvailable': True},
    '12301': {'name': 'Kolkata Rajdhani', 'route': 'Howrah - New Delhi', 'type': 'Rajdhani', 'pantryAvailable': True},
    '22439': {'name': 'Vande Bharat Express', 'route': 'New Delhi - Varanasi', 'type': 'Vande Bharat', 'pantryAvailable': True},
    '12138': {'name': 'Punjab Mail', 'route': 'Mumbai CST - Firozpur', 'type': 'Mail/Express', 'pantryAvailable': True},
    '12002': {'name': 'Bhopal Shatabdi', 'route': 'New Delhi - Bhopal', 'type': 'Shatabdi', 'pantryAvailable': True},
}

# Validation Thresholds
VALIDATION_THRESHOLDS = {
    'VERIFIED': 10,
    'ESCALATED': 25,
    'DISPUTED': -5,
    'TRUSTED_USER': 50,
}

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

def validate_train(train_number: str) -> Optional[Dict]:
    """Validate train number and return train info"""
    if not train_number:
        return None
    train_info = TRAIN_SCHEDULES.get(str(train_number).strip())
    if train_info:
        return {**train_info, 'valid': True, 'number': train_number}
    return {'valid': False, 'number': train_number, 'name': 'Unknown Train'}

def lookup_irctc_price(item_name: str) -> Optional[Dict]:
    """Lookup official IRCTC price for an item"""
    if not item_name:
        return None
    lower_item = item_name.lower()
    
    for category, items in IRCTC_MENU_PRICES.items():
        if lower_item in items:
            return items[lower_item]
        # Try partial match
        for key, value in items.items():
            if lower_item in key or key in lower_item:
                return value
    return None

def calculate_validation_status(upvotes: int, downvotes: int) -> Dict:
    """Calculate validation status based on votes"""
    net_votes = upvotes - downvotes
    
    if net_votes >= VALIDATION_THRESHOLDS['ESCALATED']:
        return {'level': 'escalated', 'label': 'Auto-Escalated', 'autoEscalate': True}
    elif net_votes >= VALIDATION_THRESHOLDS['VERIFIED']:
        return {'level': 'verified', 'label': 'Community Verified', 'autoEscalate': False}
    elif net_votes <= VALIDATION_THRESHOLDS['DISPUTED']:
        return {'level': 'disputed', 'label': 'Disputed Complaint', 'autoEscalate': False}
    else:
        return {'level': 'pending', 'label': 'Pending Validation', 'autoEscalate': False}

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
    train_number = data.get('trainNumber')
    suggested_item = data.get('itemName')
    
    if not description:
        return jsonify({
            'summary': 'Passenger reports an onboard issue.',
            'entities': {},
            'category': 'Other'
        }), 200
    
    category = detect_category(description)
    item_name = extract_item(description) or suggested_item
    price = extract_price(description)
    
    # Validate train
    train_info = validate_train(train_number) if train_number else None
    
    # Lookup IRCTC price
    irctc_price_info = lookup_irctc_price(item_name) if item_name else None
    
    entities = {}
    if item_name:
        entities['itemName'] = item_name
    if price is not None:
        entities['price'] = price
    if train_info:
        entities['trainInfo'] = train_info
    if irctc_price_info:
        entities['irctcPrice'] = irctc_price_info['price']
        entities['irctcPriceDetails'] = irctc_price_info
    
    summary = f"Passenger reports {category.lower()} issue"
    if item_name:
        summary += f" with {item_name.lower()}"
    if price:
        summary += f", charged ₹{price}"
    if irctc_price_info and price:
        overcharge = price - irctc_price_info['price']
        if overcharge > 0:
            summary += f" (₹{overcharge} over IRCTC price)"
    summary += f". {description[:100]}..."
    
    return jsonify({
        'summary': summary,
        'entities': entities,
        'category': category,
        'trainInfo': train_info,
        'irctcPrice': irctc_price_info['price'] if irctc_price_info else None
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
        complaint['upvotes'] = complaint.get('upvotes', 0) + 1
    elif vote_type == 'down':
        complaint['downvotes'] = complaint.get('downvotes', 0) + 1
    else:
        return jsonify({'error': 'Invalid vote type'}), 400
    
    # Calculate validation status
    validation_status = calculate_validation_status(
        complaint.get('upvotes', 0), 
        complaint.get('downvotes', 0)
    )
    complaint['validationStatus'] = validation_status
    
    # Auto-escalate if needed
    if validation_status['autoEscalate'] and complaint.get('status') == 'Filed':
        complaint['status'] = 'Escalated'
    
    return jsonify(complaint), 200

@app.route('/api/complaints/<int:complaint_id>/validation', methods=['GET'])
def get_validation_insights(complaint_id):
    """Get detailed validation insights for a complaint"""
    complaint = next((c for c in complaints_db if c['id'] == complaint_id), None)
    
    if not complaint:
        return jsonify({'error': 'Complaint not found'}), 404
    
    upvotes = complaint.get('upvotes', 0)
    downvotes = complaint.get('downvotes', 0)
    net_votes = upvotes - downvotes
    
    # Find similar complaints
    similar_complaints = []
    for other in complaints_db:
        if other['id'] == complaint_id:
            continue
        
        similarity = 0
        if other.get('trainNo') == complaint.get('trainNo'):
            similarity += 30
        if other.get('vendorName', '').lower() == complaint.get('vendorName', '').lower():
            similarity += 25
        if other.get('itemName', '').lower() == complaint.get('itemName', '').lower():
            similarity += 20
        
        if similarity >= 40:
            similar_complaints.append({
                'id': other['id'],
                'ticketId': other.get('ticketId'),
                'similarity': similarity,
                'upvotes': other.get('upvotes', 0)
            })
    
    similar_complaints.sort(key=lambda x: x['similarity'], reverse=True)
    
    validation_status = calculate_validation_status(upvotes, downvotes)
    
    # Calculate trust score
    trust_score = 50
    factors = []
    
    total_votes = upvotes + downvotes
    if total_votes > 0:
        ratio = upvotes / total_votes
        vote_score = ratio * 30
        trust_score += vote_score
        factors.append({'factor': 'Vote Ratio', 'impact': f'+{vote_score:.1f}'})
    
    if complaint.get('evidenceUrl'):
        trust_score += 15
        factors.append({'factor': 'Photo Evidence', 'impact': '+15'})
    
    if complaint.get('geolocation'):
        trust_score += 10
        factors.append({'factor': 'GPS Location', 'impact': '+10'})
    
    trust_score = min(max(trust_score, 0), 100)
    trust_rating = 'High' if trust_score >= 80 else 'Medium' if trust_score >= 60 else 'Low'
    
    # Generate recommendations
    recommendations = []
    if net_votes <= VALIDATION_THRESHOLDS['DISPUTED']:
        recommendations.append('⚠️ This complaint has more downvotes than upvotes. Review carefully.')
    if len(similar_complaints) >= 3:
        recommendations.append(f'✓ {len(similar_complaints)} similar complaints found - pattern detected!')
    if not complaint.get('evidenceUrl'):
        recommendations.append('📷 Photo evidence would strengthen this complaint.')
    if trust_score >= 80:
        recommendations.append('⭐ High trust score - reliable complaint.')
    if validation_status['autoEscalate']:
        recommendations.append(f"🚨 Auto-escalated: {validation_status['label']}")
    
    return jsonify({
        'validationStatus': validation_status,
        'netVotes': net_votes,
        'trustScore': {
            'score': trust_score,
            'rating': trust_rating,
            'factors': factors
        },
        'similarComplaints': similar_complaints[:5],
        'recommendations': recommendations
    }), 200

@app.route('/api/trains/<train_number>', methods=['GET'])
def get_train_info(train_number):
    """Get train schedule and info"""
    train_info = validate_train(train_number)
    if train_info and train_info.get('valid'):
        return jsonify(train_info), 200
    return jsonify({'error': 'Train not found', 'number': train_number}), 404

@app.route('/api/menu/<item_name>', methods=['GET'])
def get_menu_price(item_name):
    """Get IRCTC official menu price"""
    price_info = lookup_irctc_price(item_name)
    if price_info:
        return jsonify(price_info), 200
    return jsonify({'error': 'Item not found in IRCTC menu', 'item': item_name}), 404

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
