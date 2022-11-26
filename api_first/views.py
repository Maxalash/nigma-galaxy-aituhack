import requests
from bs4 import BeautifulSoup
import json
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserRegisterSerializer

def get_page(url: str):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, features="html.parser")
    return soup

link = "https://kz.e-katalog.com"

page = get_page(link)

def parse_e_katalog(item="Ноутбуки"):
    """
        Парсинг e-Katalog
        используя библиотеки requests, beautifulsoup мы парсили сами html-ки, потому что API к ним
        был в формате html, так же были веб сервисы как shop.kz, megatrade.kz которых использовал
        e-Katalog
    """
    item_list = []
    for page_link in page.find_all("a",{"class": "mainmenu-subitem"}):
        category_link = "https://kz.e-katalog.com/ek-list.php?katalog_="

        if item in page_link.find('span',{'class': "text"}).getText():
            for page_num in range(10):
                page2 = get_page(category_link + page_link.get('href').split('.')[0][2:] +
                                 "&page_=" + str(page_num) + "=&maxPrice_=10000000")
                if not page2.find_all("td",{"class": 'model-short-info'}):
                    break
                page_links = page2.find_all("td", {"class": 'model-short-info'})
                image_links = page2.find_all("table", {"class": "model-short-photo"})
                prices = page2.find_all("td", {"class": "model-hot-prices-td"})
                print(prices)
                for page_link2, image_link2 in zip(page_links, image_links):
                    item_description = []
                    if page_link2.find('a').get('href') != '#':
                        # print(price2)
                        item_name = page_link2.find('span',{'class': 'u'}).getText()
                        item_link = link + page_link2.find('a').get('href')
                        item_description.append(page_link2.find('div', {'class': 'model-short-description'}).get('data-descr'))
                        if image_link2.find('img').get('src') is None:
                            item_image = link + str(image_link2.find('img').get('data-default-src'))
                        else:
                            item_image = link + str(image_link2.find('img').get('src'))
                        for i in page_link2.find_all('div',{'class': 'm-s-f2'}):
                            if i.find_all('div') is not None:
                                for j in i.find_all('div'):
                                    if j.get('title') is not None:
                                        item_description.append(j.get('title'))
                                    else:
                                        item_description.append(page_link2.find('div',{'class': 'model-short-description'}).get('data-descr'))

                    else:
                        item_name = page_link2.find('a').get('title')
                        item_link = page_link2.find('a').get('onmouseover').split(';')[0].split("this.href=")[1][1:-1]
                        item_description.append(page_link2.find('a').get('title'))
                    item_list.append({
                        'item_name': item_name,
                        'item_description': item_description,
                        'item_image': item_image,
                        'item_link': item_link
                    })
    return item_list

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def get_item_list(request):
    item_name = request.data['item']
    return Response(parse_e_katalog(item_name))

class HandleToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        if not created:
            token.delete()
            token = Token.objects.create(user=user)
        return Response({'token': token.key})

@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(serializer.validated_data['username'],None,serializer.validated_data['password'])
        Token.objects.get_or_create(user=user)
        return Response(status=201)
    else:
        return Response(serializer.errors)
