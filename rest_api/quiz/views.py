from django.shortcuts import render
from .models import Quiz
from rest_framework import viewsets
from .serializers import QuizSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

