from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .views import QuizViewSet

router = routers.DefaultRouter()
router.register("quiz", QuizViewSet)

urlpatterns = [
    path("", include(router.urls)),
]