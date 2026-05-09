from .models import Notifikasi


def notifikasi_context(request):
    """
    Context processor untuk menyediakan data notifikasi ke template.
    """
    notifikasi_belum_dibaca = []
    jumlah_notifikasi = 0

    if request.user.is_authenticated:
        notifikasi_belum_dibaca = Notifikasi.objects.filter(
            penerima=request.user,
            is_read=False
        )[:10]  # Ambil 10 notifikasi terbaru yang belum dibaca
        jumlah_notifikasi = notifikasi_belum_dibaca.count()

    return {
        'notifikasi_belum_dibaca': notifikasi_belum_dibaca,
        'jumlah_notifikasi': jumlah_notifikasi,
    }
