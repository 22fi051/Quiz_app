from rest_framework import serializers
from quiz.models import Quiz, Question, Choice, Answer
from datetime import datetime

class ChoiceSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Choice
        fields = ["question_id", "choice_text", "is_correct", "created_at", "updated_at"]

class QuestionSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "quiz_id", "question_text", "created_at", "updated_at", "choices"]

class QuizSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "questions", "created_at", "updated_at"]

class AnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()
    selected_choice_id = serializers.IntegerField()