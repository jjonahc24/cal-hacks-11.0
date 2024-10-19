from flask import Blueprint, request, jsonify

def register_users(app):
    app.register_blueprint(user_bp, url_prefix='/users')

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods = ['GET'])
def listing_entry():
    return jsonify({"data": "Users!"}), 200
