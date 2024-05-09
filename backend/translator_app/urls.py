from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TranslationViewSet, LanguageViewSet

router = DefaultRouter()
router.register(r'translator_app', TranslationViewSet)
router.register(r'languages', LanguageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
