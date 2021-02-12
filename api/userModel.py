from api.config import db  # , SECRET_KEY

# from passlib.apps import custom_app_context as pwd_context
# from itsdangerous import (
#     TimedJSONWebSignatureSerializer as Serializer,
#     BadSignature,
#     SignatureExpired,
# )


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    password = db.Column(db.String(256))
    roles = db.Column(db.String(128))
    is_active = db.Column(db.Boolean, default=True, server_default="1")
    __table_args__ = {"keep_existing": True}

    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active


# class User(db.Model):
#     __tablename__ = "users"
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(32), index=True)
#     password_hash = db.Column(db.String(128))

#     __table_args__ = {"keep_existing": True}

#     def hash_password(self, password):
#         self.password_hash = pwd_context.encrypt(password)

#     def verify_password(self, password):
#         return pwd_context.verify(password, self.password_hash)

#     def generate_auth_token(self, expiration=600):
#         s = Serializer(SECRET_KEY, expires_in=expiration)
#         return s.dumps({"id": self.id})

#     @staticmethod
#     def verify_auth_token(token):
#         s = Serializer(SECRET_KEY)
#         try:
#             data = s.loads(token)
#         except SignatureExpired:
#             return None  # valid token, but expired
#         except BadSignature:
#             return None  # invalid token
#         user = User.query.get(data["id"])
#         return user