# Generated by Django 3.0 on 2023-11-08 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='els',
            name='name',
            field=models.CharField(default='vistor', max_length=32, verbose_name='姓名'),
        ),
        migrations.AlterField(
            model_name='snake',
            name='name',
            field=models.CharField(default='vistor', max_length=32, verbose_name='姓名'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='vistor', max_length=32, verbose_name='姓名'),
        ),
    ]
