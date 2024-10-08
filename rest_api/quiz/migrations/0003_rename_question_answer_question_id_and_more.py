# Generated by Django 5.1.1 on 2024-10-07 17:42

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("quiz", "0002_question_choice_answer"),
    ]

    operations = [
        migrations.RenameField(
            model_name="answer",
            old_name="question",
            new_name="question_id",
        ),
        migrations.RenameField(
            model_name="choice",
            old_name="question",
            new_name="question_id",
        ),
        migrations.RenameField(
            model_name="question",
            old_name="quiz",
            new_name="quiz_id",
        ),
    ]
