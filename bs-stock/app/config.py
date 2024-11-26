class Config:
  DEBUG = True
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'sqlite:///bs-stock.db'
  SQLALCHEMY_TRACK_MODIFICATIONS = False