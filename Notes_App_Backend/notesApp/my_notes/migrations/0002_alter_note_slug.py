# Generated by Django 5.0.5 on 2024-09-23 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]