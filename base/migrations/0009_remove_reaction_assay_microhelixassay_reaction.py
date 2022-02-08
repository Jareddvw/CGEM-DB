# Generated by Django 4.0.2 on 2022-02-04 08:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_remove_microhelixassay_reaction_reaction_assay'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reaction',
            name='assay',
        ),
        migrations.AddField(
            model_name='microhelixassay',
            name='reaction',
            field=models.OneToOneField(default='', on_delete=django.db.models.deletion.CASCADE, to='base.reaction'),
        ),
    ]
