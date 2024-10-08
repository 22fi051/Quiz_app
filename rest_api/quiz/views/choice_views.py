from rest_framework import viewsets
from ..serializers import ChoiceSerializer
from ..models import Choice

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer