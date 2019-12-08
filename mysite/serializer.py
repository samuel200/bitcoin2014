from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UserDetails

class UserSerializer(ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
        ]

class UserDetailsSerializer(ModelSerializer):

    class Meta:
        model = UserDetails
        fields = '__all__'