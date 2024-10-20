from flask import Blueprint, request
import controllers

def register_users(app):
    app.register_blueprint(user_bp, url_prefix='/users')

user_bp = Blueprint('users', __name__)

@user_bp.route('/', methods = ['GET', 'POST'])
def get_all():
    if request.method == "POST":
        result = controllers.AddUserControl(request.json)
        return result
    else:
        result = controllers.GetAllUserControl()
        return result

@user_bp.route('/<string:id>/')
def get_single(id):
    result = controllers.GetUserControl(id)
    return result
