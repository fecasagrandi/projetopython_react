# Generated by Django 5.2.1 on 2025-06-05 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_habito_pontos_conclusao'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='Pontos',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
