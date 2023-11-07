# forms.py
from django import forms
from .models import Aitools_Files

class Aitools_FilesForms(forms.ModelForm):
    class Meta:
        model = Aitools_Files
        fields = ['title', 'file','add_time']
