# Generated by Django 4.2 on 2023-04-23 20:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="efflux", old_name="type", new_name="e_type",
        ),
    ]
