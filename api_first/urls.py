from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import get_item_list, HandleToken, register

app_name = 'api_first'

urlpatterns = [
    path('login/', HandleToken.as_view()), # get token
    path('register/', register),
    path('get_items/', get_item_list)
]
