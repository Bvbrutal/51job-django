# Generated by Django 4.2.5 on 2023-11-08 00:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0004_alter_aitools_files_file"),
    ]

    operations = [
        migrations.CreateModel(
            name="Job_search",
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
                ("keyword_job", models.CharField(max_length=32, verbose_name="关键字")),
                ("keyword_count", models.IntegerField(verbose_name="次数")),
            ],
        ),
    ]
