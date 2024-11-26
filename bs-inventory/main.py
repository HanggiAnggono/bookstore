from flask import Blueprint, jsonify

from app import create_app, db
from app.routes import book_handler

app = create_app()
app.url_map.strict_slashes = False

with app.app_context():
    db.create_all()


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Bookstore!"})


api_blueprint = Blueprint('api', __name__, url_prefix='/api/')
api_blueprint.register_blueprint(book_handler.book_blueprint)
app.register_blueprint(api_blueprint)

if __name__ == '__main__':
    # When using 'flask run', we don't need app.run()
    # app.run(debug=True)
    pass
