from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, UserManager
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
import requests

from datetime import datetime

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import UserDetails, Withdrawal, Deposit
from .serializer import *

def home_view(request):
    return render(request, "index.html", {})

def referral_view(request, username):
    return render(request, "index.html")

@csrf_exempt
@api_view(['POST'])
def message_us(request):

    if request.method == "POST":
        subject = f"Bitcoin2014 Message From { request.data['name'] } with email { request.data['email'] }"
        message = request.data['message']

        try:
            send_mail(subject, message, settings.EMAIL_HOST_USER, ['samuelemeh200@gmail.com'], fail_silently=False)
        except Exception as e:
            return Response({"error_message": "Error sending message"})

        return Response({"success_message": "message sent"})


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
            check = user.check_password(password)

            if check and user.is_active:
                token = Token.objects.get(user=user).key
                return Response({"token": token}, status=201)

            else:
                return Response(status=404)

        except Exception as e:
            return Response(status=401)

class RegistrationView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        user_values = {
            "username": request.data.get('username'),
            "first_name": request.data.get('first_name'),
            "last_name": request.data.get('last_name'),
            "email": request.data.get('email'),
            "password": request.data.get('password')
        }
        user_serializer = UserSerializer(data=user_values)
        if user_serializer.is_valid():
            user = User(username=user_values['username'],
                        email=user_values["email"],
                        first_name=user_values.get('first_name'),
                        last_name=user_values.get('last_name'))
            user.set_password(user_values["password"])
            user.save()

            user_details = UserDetails(country= request.data.get("country"),
                                        phone_number= request.data.get("phone_number"),
                                        home_address= request.data.get("home_address"),
                                        user= user)
            user_details.save()
            return Response({"success_message": "Registration successful."}, status=201)

        else:
            return Response({"error_message": user_serializer.errors}, status=200)

class ReferralRegistrationView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, username):
        user_values = {
            "username": request.data.get('username'),
            "first_name": request.data.get('first_name'),
            "last_name": request.data.get('last_name'),
            "email": request.data.get('email'),
            "password": request.data.get('password')
        }
        user_serializer = UserSerializer(data=user_values)
        if user_serializer.is_valid():
            user = User(username=user_values['username'],
                        email=user_values["email"],
                        first_name=user_values.get('first_name'),
                        last_name=user_values.get('last_name'))
            user.set_password(user_values["password"])
            user.save()

            referral = User.objects.get(username=username)
            user_details = UserDetails(country= request.data.get("country"),
                                        phone_number= request.data.get("phone_number"),
                                        home_address= request.data.get("home_address"),
                                        referree= referral,
                                        user= user)
            user_details.save()
            return Response({"success_message": "Registration successful."}, status=201)

        else:
            return Response({"error_message": user_serializer.errors}, status=200)

class UserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            serializers = UserSerializer(user)
            user_details = UserDetails.objects.get(user=user)
            details_serializers = UserDetailsSerializer(user_details)
            withdrawals = Withdrawal.objects.filter(user=user)
            withdrawals_serializer = WithdrawalSerializer(withdrawals, many=True)
            deposits = Deposit.objects.filter(user=user)
            deposits_serializer = DepositSerializer(deposits, many=True)

            transactions = {"deposits": deposits_serializer.data, "withdrawals": withdrawals_serializer.data}

            # return Response(serializers.data, status=200)
            return Response({ **serializers.data, **details_serializers.data, **transactions }, status=200)

        except:
            return Response(status=401)


class WithdrawRequestView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            withdrawal = Withdrawal(
                method=request.data["method"],
                ammount=request.data["ammount"],
                user=request.user,
                date=datetime.now(),
                active=False
            )

            user = User.objects.get(id=request.user.id)
            serializers = UserSerializer(user)
            user_details = UserDetails.objects.get(user=user)
            details_serializers = UserDetailsSerializer(user_details)
            withdrawals = Withdrawal.objects.filter(user=user)
            withdrawals_serializer = WithdrawalSerializer(withdrawals, many=True)
            deposits = Deposit.objects.filter(user=user)
            deposits_serializer = DepositSerializer(deposits, many=True)

            transactions = {"deposits": deposits_serializer.data, "withdrawals": withdrawals_serializer.data}

            # return Response(serializers.data, status=200)
            withdrawal.save()
            return Response({ **serializers.data, **details_serializers.data, **transactions }, status=200)

        except:
            return Response(status=401)


class DepositRequestView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            deposit = Deposit(
                method=request.data["method"],
                ammount=request.data["ammount"],
                user=request.user,
                date=datetime.now(),
                active=False
            )

            user = User.objects.get(id=request.user.id)
            serializers = UserSerializer(user)
            user_details = UserDetails.objects.get(user=user)
            details_serializers = UserDetailsSerializer(user_details)
            withdrawals = Withdrawal.objects.filter(user=user)
            withdrawals_serializer = WithdrawalSerializer(withdrawals, many=True)
            deposits = Deposit.objects.filter(user=user)
            deposits_serializer = DepositSerializer(deposits, many=True)

            transactions = {"deposits": deposits_serializer.data, "withdrawals": withdrawals_serializer.data}

            # return Response(serializers.data, status=200)
            deposit.save()
            return Response({ **serializers.data, **details_serializers.data, **transactions }, status=200)

        except:
            return Response(status=401)

class ChangePasswordView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            check = user.check_password(request.data.get("password"))
            if check:
                user.set_password(request.data.get("new_password"))
                user.save()
                return Response(status=200)

            else:
                return Response({"error_message": "password given does not match the existing password"}, status=200)

        except:
            return Response(status=400)


class ChangeAccountDetailsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = {}
        for key in request.data:
            if request.data[key] != "" and request.data[key] != None:
                data[key] = request.data[key]

        try:
            user = User.objects.get(id=request.user.id)
            user_details = UserDetails.objects.get(user=user)

            user_serializer = UserSerializer(user)
            serializer = UserDetailsSerializer(user_details, data=data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response({ **user_serializer.data, **serializer.data }, status=201)
            else:
                return Response(status=400)

        except:
            return Response(status=401)