# Generated by Django 5.0.5 on 2024-09-22 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('slug', models.SlugField(unique=True)),
                ('category', models.CharField(choices=[('BUSINESS ', 'Business'), ('PERSONAL ', 'Personal'), ('IMPORTANT ', 'Important')], default='PERSONAL', max_length=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
