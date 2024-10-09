from django.urls import path
from django.urls.conf import include
from rest_framework import routers
from .views import QuizViewSet, QuestionViewSet, ChoiceViewSet, SubmitQuizView

router = routers.DefaultRouter()
router.register("quiz", QuizViewSet, basename="quiz")
router.register("question", QuestionViewSet, basename="question")
router.register("choice", ChoiceViewSet, basename="choice")

urlpatterns = [
    path("", include(router.urls)),
    path("quiz/<int:quiz_id>/submit/", SubmitQuizView.as_view(), name="quiz_submit")
]