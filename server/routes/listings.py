from flask import Blueprint, request, jsonify

def register_listings(app):
    app.register_blueprint(listing_bp, url_prefix='/listings')

listing_bp = Blueprint('listings', __name__)

@listing_bp.route('/', methods = ['GET'])
def listing_entry():
    return jsonify({"data": "Listings!"}), 200
