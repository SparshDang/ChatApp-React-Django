from django.urls import  path

from api.views import *

urlpatterns = [
    path("register", RegisterView.as_view()),
    path("login", LoginView.as_view()),
    path("logout", LogoutView.as_view()),
    path('user', UserView.as_view()),
    path('add-friend', AddFriendView.as_view()),
    path('friends', GetFriendView.as_view()),
    path('messages', GetMessagesView.as_view()),
]
