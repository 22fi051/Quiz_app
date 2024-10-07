from rest_framework import serializers
from quiz.models import Quiz
from datetime import datetime

class QuizSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "created_at", "updated_at"]