from django import forms

from .models import Profile


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['photo', 'phone', 'location']
        widgets = {
            'photo': forms.ClearableFileInput(attrs={
                'class': 'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
                'accept': 'image/*',
            }),
            'phone': forms.TextInput(attrs={
                'class': 'w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
                'placeholder': 'Masukkan nomor telepon',
            }),
            'location': forms.TextInput(attrs={
                'class': 'w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500',
                'placeholder': 'Masukkan lokasi atau alamat',
            }),
        }
