# Generated by Django 4.2.5 on 2023-11-07 17:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0002_daynumber_userip_visitnumber"),
    ]

    operations = [
        migrations.CreateModel(
            name="Els",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=32, verbose_name="姓名")),
                ("els_score", models.IntegerField(default=0, verbose_name="俄罗斯方块分数")),
                (
                    "els_date",
                    models.DateField(
                        default=django.utils.timezone.now, verbose_name="俄罗斯方块日期"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="HotSearchKeyword",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("keyword", models.CharField(max_length=100)),
                ("count", models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="Snake",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=32, verbose_name="姓名")),
                ("snake_score", models.IntegerField(default=0, verbose_name="贪吃蛇分数")),
                (
                    "snake_date",
                    models.DateField(
                        default=django.utils.timezone.now, verbose_name="贪吃蛇日期"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="name",
            field=models.CharField(default=11, max_length=32, verbose_name="姓名"),
            preserve_default=False,
        ),
    ]
