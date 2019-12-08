from django.db import models
from django.contrib.auth.models import User


class UserDetails(models.Model):
    country = models.TextField()
    phone_number = models.CharField(max_length=20)
    bitcoin_address = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="details")
    bank_name = models.TextField(blank=True, null=True, default="")
    account_name = models.TextField(blank=True, null=True, default="")
    account_number = models.IntegerField(blank=True, null=True, default=0)

    def __str__(self):
        return self.user.username
