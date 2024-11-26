import httpx
import app
app.db


def get_stock_by_book_id(book_id):
  stock = httpx.get('http://localhost:5002/api/stocks/get_stock_by_book_id?book_id={book_id}'.format(book_id=book_id))

  if stock.status_code != 200:
    return None

  return stock.json()
