from flask import Blueprint, request
import controllers

def register_users(app):
    app.register_blueprint(user_bp, url_prefix='/users')

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods = ['GET'])
def get_all():
    result = controllers.GetAllUserControl()
    return result

@user_bp.route('/<string:id>/')
def get_single(id):
    result = controllers.GetUser(id)
    return result
