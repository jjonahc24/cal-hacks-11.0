import extensions
from bson import objectid
from flask import jsonify

def GetAllUserControl():
    try:
        result = GetAllUsers()
        
        return jsonify(result), 200
    
    except:
        return 500

def GetUserControl():
    try:
        return jsonify(result), 200
    except:
        return 500

# Returns Pydantic Model
def GetAllUsers():
    try:
        user_collect = extensions.mongo.cx["Calhacks11"].User.find({})
        user_list = list(user_collect)
        result = {"users": []} 
        for user_data in user_list:
            user_data['_id'] = str(user_data['_id'])
            result["users"].append(user_data)

        
        return result

    except Exception as e:
        return {'error': str(e)}

def GetUser(id):
    try:
        # Search for the document in the 'users' collection by _id
        user_data = mongo.db.users.find_one({'_id': ObjectId(id)})

        if user_data:
            user = UserModel(**user_data)
    
    except Exception as e:
        return {'error': str(e)}
