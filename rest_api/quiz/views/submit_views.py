from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..serializers import AnswerSerializer
from ..models import Question, Choice

class SubmitQuizView(APIView):
    def post(self, request, quiz_id):
        serializer = AnswerSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        answers = serializer.validated_data

        score = 0
        results = []

        for answer in answers:
            question_id = answer["question_id"]
            selected_choice_id = answer["selected_choice_id"]

            try:
                question = Question.objects.get(id=question_id)
                selected_choice = Choice.objects.get(id=selected_choice_id)
            except (Question.DoesNorExist, Choice.DoesNotExist):
                return Response({"error": "Invalid question or choice"}, status=status.HTTP_400_BAD_REQUEST)

            is_correct = selected_choice.is_correct

            if is_correct:
                score += 1
            
            results.append({
                "question_id": question_id,
                "is_correct": is_correct
            })

        return Response({
            "score": score,
            "total": len(answers),
            "results": results
        }, status=status.HTTP_200_OK)