from django.db import models
from django.contrib.auth.models import User


class UserDetails(models.Model):
    country = models.TextField()
    phone_number = models.CharField(max_length=20)
    bitcoin_address = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="details")