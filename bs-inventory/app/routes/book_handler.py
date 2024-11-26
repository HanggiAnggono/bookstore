from flask import Blueprint, jsonify, request

from app.models.book import Book
from app import db
from utils.http_util import success_response, error_response
from ..services.stock_service import get_stock_by_book_id

book_blueprint = Blueprint("books", __name__, url_prefix="/books/")


@book_blueprint.route("/", methods=["GET"])
def get_books():
    books = Book.query.all()
    response = [book.to_dict() for book in books]
    return success_response(data=response, code=200)


@book_blueprint.route("/", methods=["POST"])
def create_book():
    data = request.get_json()
    title = data.get("title")
    author = data.get("author")
    published_date = data.get("published_date")

    new_book = Book(title=title, author=author, published_date=published_date)

    db.session.add(new_book)
    db.session.commit()

    return success_response("Book created successfully", new_book.to_dict(), 201)


@book_blueprint.route("/<int:book_id>", methods=["GET", "PUT", "DELETE"])
def handle_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return error_response("Book not found", code=404)

    if request.method == "GET":
        return success_response(data=book.to_dict())

    elif request.method == "PUT":
        data = request.get_json()
        title = data.get("title")
        author = data.get("author")
        published_date = data.get("published_date")

        book.title = title
        book.author = author
        book.published_date = published_date

        db.session.commit()

        return success_response(data=book.to_dict())

    elif request.method == "DELETE":
        db.session.delete(book)
        db.session.commit()

        return success_response(data={"id": book_id}, code=200)


# purchase a book but check for available stock first on stock service
@book_blueprint.route("/<int:book_id>/purchase", methods=["POST"])
def purchase_book(book_id):
    book = Book.query.get(book_id)
    data = request.get_json()
    quantity = data.get("quantity")

    stock = get_stock_by_book_id(book_id)

    if not stock:
        return error_response("Stock not found", code=404)

    if stock["data"]["quantity"] < quantity:
        return error_response("Not enough stock", code=400)

    return success_response(data=book.to_dict())
