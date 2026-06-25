import json
import os

import firebase_admin
from firebase_admin import auth as firebase_auth
from firebase_admin import credentials
from django.conf import settings

firebase_app = None


def get_firebase_app():
    global firebase_app
    if firebase_app is not None:
        return firebase_app

    if settings.FIREBASE_SERVICE_ACCOUNT_KEY:
        try:
            service_account_info = json.loads(settings.FIREBASE_SERVICE_ACCOUNT_KEY)
            cred = credentials.Certificate(service_account_info)
        except json.JSONDecodeError as exc:
            raise RuntimeError('FIREBASE_SERVICE_ACCOUNT_KEY tidak valid JSON') from exc
    elif settings.FIREBASE_SERVICE_ACCOUNT_PATH:
        cred_path = settings.FIREBASE_SERVICE_ACCOUNT_PATH
        if not os.path.exists(cred_path):
            raise RuntimeError(f'Firebase service account path tidak ditemukan: {cred_path}')
        cred = credentials.Certificate(cred_path)
    else:
        raise RuntimeError('Firebase service account credentials belum dikonfigurasi. Set FIREBASE_SERVICE_ACCOUNT_KEY atau FIREBASE_SERVICE_ACCOUNT_PATH.')

    firebase_app = firebase_admin.initialize_app(cred)
    return firebase_app


def verify_firebase_token(id_token):
    app = get_firebase_app()
    return firebase_auth.verify_id_token(id_token, app=app)
