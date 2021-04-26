from api.config import db  # , SECRET_KEY


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    hashed_password = db.Column(db.String(256))
    roles = db.Column(db.String(128))
    is_active = db.Column(db.Boolean, default=False, server_default="0")
    __table_args__ = {"keep_existing": True}

    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        return self.hashed_password

    # HOW DO I CREATE MY OWN ATTRIBUTE??
    # @property
    # def username(self):
    #     return self.username

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
