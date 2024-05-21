from django.urls import re_path

from api.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path("api/[A-Za-z0-9]*", ChatConsumer.as_asgi())
]