from django.urls import path
# from rest_framework.authtoken import views
from .views import home_view, message_us, UserView, LoginView, RegistrationView, ChangePasswordView, ChangeAccountDetailsView

urlpatterns = [
    path("", home_view),
    path("signin", home_view),
    path("signup", home_view),
    path("contact_us", home_view),
    path("faq", home_view),
    path("investments", home_view),
    path("about", home_view),
    path("dashboard", home_view),
    path("message_us/", message_us),

    path("login/", LoginView.as_view()),
    path("register/", RegistrationView.as_view()),
    path("user/", UserView.as_view()),
    path("change_password/", ChangePasswordView.as_view()),
    path("change_account_details/", ChangeAccountDetailsView.as_view()),
    # path("api-token-auth/", views.obtain_auth_token)
]