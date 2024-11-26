import app


class Stock(app.db.Model):
  id = app.db.Column(app.db.Integer, primary_key=True)
  book_id = app.db.Column(app.db.Integer, nullable=False)
  quantity = app.db.Column(app.db.Integer, nullable=False)
  action = app.db.Column(app.db.String(255), nullable=False)
  timestamp = app.db.Column(app.db.DateTime, nullable=False)

  def __repr__(self):
    return "<Stock %r %r>" % self.book_id, self.quantity

  def to_dict(self):
    return {
      column.name: getattr(self, column.name) for column in self.__table__.columns
    }