# Generated by Django 2.2 on 2020-01-17 15:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0002_auto_20191231_2125'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdetails',
            name='referrals',
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='referree',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='referrals', to=settings.AUTH_USER_MODEL),
        ),
    ]