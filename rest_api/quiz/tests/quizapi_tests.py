import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from quiz.models import Quiz, Question, Choice
from quiz.serializers import QuizSerializer

@pytest.mark.django_db
class TestQuizViews:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.client = APIClient()
        self.quiz = Quiz.objects.create(title="Sample Quiz", description="Sample Description")
        self.question = Question.objects.create(quiz_id=self.quiz, question_text="Django is a ____")
        self.choice1 = Choice.objects.create(question_id=self.question, choice_text="Framework", is_correct=True)
        self.choice2 = Choice.objects.create(question_id=self.question, choice_text="Library", is_correct=False)
        self.choice3 = Choice.objects.create(question_id=self.question, choice_text="Language", is_correct=False)

    def test_quiz_list(self):
        url = reverse("quiz-list")
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["title"] == "Sample Quiz"

    def test_quiz_detail(self):
        url = reverse("quiz-detail", args=[self.quiz.id])
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == self.quiz.id
        assert response.data["title"] == self.quiz.title
        assert response.data["description"] == self.quiz.description
        assert len(response.data["questions"]) == 1

    def test_submit_quiz(self):
        url = reverse("quiz_submit", args=[self.quiz.id])
        data = [
            {
                "question_id": self.question.id,
                "selected_choice_id": self.choice1.id
            },
            {
                "question_id": self.question.id,
                "selected_choice_id": self.choice2.id
            },
            {
                "question_id": self.question.id,
                "selected_choice_id": self.choice3.id
            }
        ]
        response = self.client.post(url, data, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["score"] == 1
        assert response.data["total"] == 3
        assert response.data["results"][0]["is_correct"] == True
        assert response.data["results"][1]["is_correct"] == False
        assert response.data["results"][2]["is_correct"] == False
