from django.shortcuts import render

import requests
from bs4 import BeautifulSoup
import json

from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


def get_page(url: str):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, features="html.parser")
    return soup

link = "https://kz.e-katalog.com"

page = get_page(link)

def parse_e_katalog(item="Ноутбуки"):
    item_list = []
    for page_link in page.find_all("a",{"class": "mainmenu-subitem"}):
        if item == page_link.find('span',{'class': "text"}).getText():
            page2 = get_page(link + page_link.get('href'))
            for page_link2 in page2.find_all("div",{"class": 'touchcarousel-item'}):
                item_name = page_link2.find('a').get('title')
                item_decription = page_link2.find('div',{"class": "ctg-slider__descr"}).getText()
                item_image = link + page_link2.find('div',{'class',"ctg-slider__img-item"}).get('data-src')
                item_link = link + page_link2.find('a').get('href')
                print(item_link)
                item_list.append({
                    'item_name': item_name,
                    'item_description': item_decription,
                    'item_image': item_image,
                    'item_link': item_link
                })
                item_page = get_page(item_link)
                for shop_link in item_page.find_all("td",{"class": "conf-td conf-price-link-close"}):
                    link_to_shop = shop_link.find('a').get('onmouseover').split(';')[0].split("this.href=")[1][1:-1]
    return item_list

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def get_item_list(request):
    item_name = request.data['item']
    return parse_e_katalog(item_name)

