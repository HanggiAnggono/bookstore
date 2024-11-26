from flask import Blueprint, request
from utils.http_util import error_response, success_response
from app.models.stock import Stock

stock_blueprint = Blueprint("stocks", __name__, url_prefix="/stocks/")

# get book stock by id
@stock_blueprint.route("/get_stock_by_book_id", methods=["GET"])
def get_stock_by_book_id():
  # get book id from query param
  book_id = request.args.get("book_id")
  stock = Stock.query.filter_by(book_id=book_id).first()

  if not stock:
    return error_response("Stock not found", code=404)

  return success_response(data=stock.to_dict(), code=200)
