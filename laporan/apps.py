from django.apps import AppConfig


class LaporanConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'laporan'

    def ready(self):
        import laporan.signals
