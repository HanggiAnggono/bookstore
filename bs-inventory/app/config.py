class Config:
  DEBUG = True
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'sqlite:///bookstore.db'
  SQLALCHEMY_TRACK_MODIFICATIONS = False