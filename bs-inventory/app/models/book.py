import app


class Book(app.db.Model):
    id = app.db.Column(app.db.Integer, primary_key=True)
    title = app.db.Column(app.db.String(255), nullable=False)
    author = app.db.Column(app.db.String(255), nullable=False)
    published_date = app.db.Column(app.db.String(255), nullable=True)

    def __repr__(self):
        return "<Book %r>" % self.title

    def to_dict(self):
        return {
            column.name: getattr(self, column.name) for column in self.__table__.columns
        }
