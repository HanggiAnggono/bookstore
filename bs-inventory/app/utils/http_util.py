from flask import jsonify


def create_response(success=True, message=None, data=None, error=None, code=200):
  if (success == False):
    return jsonify({'error': error, 'message': message, 'code': code}), code

  return jsonify({'success': success, 'message': message, 'data': data, 'code': code}), code

def error_response(message=None, error=None, code=400):
    return jsonify({'error': error, 'message': message, 'code': code}), code


def success_response(message=None, data=None, code=200):
    return (
        jsonify({"success": True, "message": message, "data": data, "code": code}),
        code,
    )
