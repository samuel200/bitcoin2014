from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UserDetails

class UserSerializer(ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'bank_name',
            'account_name',
            'account_number'
        ]

class UserDetailsSerializer(ModelSerializer):

    class Meta:
        model = UserDetails
        fields = '__all__'