# Generated by Django 4.0.2 on 2022-04-20 03:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reaction',
            name='references',
        ),
        migrations.DeleteModel(
            name='Reference',
        ),
    ]
