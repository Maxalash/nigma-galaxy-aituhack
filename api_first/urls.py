from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import get_item_list

app_name = 'api_first'

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'), # get token
    path('get_items/', get_item_list)
]
