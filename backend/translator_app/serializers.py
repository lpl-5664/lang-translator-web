from rest_framework import serializers
from .models import Translation, Languages

class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ['source_language', 'target_language', 'input_text', 'translated_text']
        read_only_fields = ('translated_text',)

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Languages
        fields = ['id', 'name', 'code']