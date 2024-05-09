from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Translation, Languages
from .serializers import TranslationSerializer, LanguageSerializer
from .utils import load_translation_model

# Create your views here.
class TranslationViewSet(viewsets.ModelViewSet):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer

    def create(self, request, *args, **kwargs):
        serializer = TranslationSerializer(data=request.data)

        if serializer.is_valid():
            source_language = serializer.validated_data.get('source_language')
            target_language = serializer.validated_data.get('target_language')
            input_text = serializer.validated_data.get('input_text')

            translator = load_translation_model(source_language, target_language)

            if translator:
                translated_text = translator.translate(input_text)
                serializer.validated_data['translated_text'] = translated_text
                serializer.save()
                print("Translation result: ", translated_text)

                #self.perform_create(serializer)
                #headers = self.get_success_headers(serializer.data)

                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Translation not supported'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Languages.objects.all()
    serializer_class = LanguageSerializer