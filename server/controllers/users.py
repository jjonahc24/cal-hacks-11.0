import extensions
from bson import ObjectId
from flask import jsonify
import models
import utils

def GetAllUserControl():
    try:
        result = GetAllUsers()
        return jsonify(result), 200
    except:
        return 500

def GetUserControl(id):
    try:
        result = GetUser(id)
        return jsonify(result), 200
    except:
        return 500

def AddUserControl(request_json):
    try:
        result = AddUser(request_json)
        return jsonify(result), 200 
    except:
        return 500

def GetUserEmailControl(request_json):
    try:
        result = GetUserEmail(request_json)
        return jsonify(result), 200 
    except:
        return 500

def GetAllUsers():
    try:
        user_collect = extensions.mongo.cx["Calhacks11"].User.find({})
        user_list = list(user_collect)

        result = {"users": []} 
        for user_data in user_list:
            user_data["_id"] = str(user_data["_id"])
            result["users"].append(user_data)
        
        return result

    except Exception as e:
        return {'error': str(e)}

def GetUser(id):
    try:
        # Search for the document in the 'users' collection by _id
        user_data = extensions.mongo.db.User.find_one({'_id': ObjectId(id)})
        
        if user_data:
            user_data['_id'] = str(user_data['_id'])
            return user_data
    
    except Exception as e:
        return {'error': str(e)}

def AddUser(request_json):
    try:
        user_collect = extensions.mongo.db.User
        user = models.UserModel(**request_json)
        user_dict = utils.Convert_model(user)
        res = user_collect.insert_one(user_dict)
        user_dict["_id"] = str(res.inserted_id)
        return user_dict

    except Exception as e:
        return {'error': str(e)}

def GetUserEmail(request_json):
    try:
        user_data = extensions.mongo.db.User.find_one({'email': request_json.get('email')})
        
        if (user_data):
            user_data['_id'] = str(user_data['_id'])
            return user_data

    except Exception as e:
        return {'error': str(e)}
