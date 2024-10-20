from flask import Blueprint, request, jsonify
from controllers.listings import create, get, delete

def register_listings(app):
    app.register_blueprint(listing_bp, url_prefix='/listings')

listing_bp = Blueprint('listings', __name__)

@listing_bp.route('/', methods = ['GET'])
def get_listings():
    id_filter = request.args.get('id')
    owner_id_filter = request.args.get('owner_id')
    address_filter = request.args.get('address')
    start_date_filter = request.args.get('start_date')
    end_date_filter = request.args.get('end_date')
    return get(id_filter, owner_id_filter, address_filter, start_date_filter, end_date_filter)

@listing_bp.route('/create', methods = ['POST'])
def create_listing():
    return create(request.get_json())

@listing_bp.route('/delete/<id>', methods = ['DELETE'])
def delete_listing(id):
    return delete(id)
    

