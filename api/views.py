from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated, ValidationError

import time
import datetime
import jwt

from api.serializers import UserSerializer, MessageSerializer
from api.models import User, Friend, Message


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "Registration complete", "name": user.name,
                    "username": user.username, "email": user.email, 'status': 200}
            )
        errors = {}
        for field, errorDetail in serializer.errors.items():
            errors[field] = [str(error) for error in errorDetail]
        return Response(errors)


class LoginView(APIView):
    def post(self, request):
        data = request.data

        user = User.objects.filter(Q(email=data['username']) | Q(
            username=data['username'])).first()
        if not (data.get("password", None) and data.get("username", None)):
            raise AuthenticationFailed(
                "Invalid Inputs"
            )

        if not user:
            raise AuthenticationFailed("User not found")

        if not user.check_password(data['password']):
            raise AuthenticationFailed("Password is incorrect")

        payload = {
            'iat': time.time(),
            'exp': datetime.datetime.now() + datetime.timedelta(minutes=60),
            "id": user.id
        }

        token = jwt.encode(payload, 'secret')

        response = Response()
        response.set_cookie('jwt', token)
        response.data = {
            'message': 'Login Successful',
            'status': 200
        }

        return response


class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {
            "message": "Logout Successfully"
        }

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt", None)
        if not token:
            raise NotAuthenticated("You are not autenticated")
        id = jwt.decode(token, key='secret', algorithms=["HS256"])['id']
        user = User.objects.get(pk=id)
        serializer = UserSerializer(user)
        return Response({**serializer.data, "status": 200})


class AddFriendView(APIView):
    def post(self, request):
        data = request.data
        token = request.COOKIES.get("jwt", None)
        id = jwt.decode(token, key='secret', algorithms=["HS256"])['id']
        user = User.objects.get(pk=id)
        friend_username = data['friend']
        try:
            friend = User.objects.get(username=friend_username)
        except Exception:
            raise ValidationError("Wrong Username")

        is_already_friend = Friend.objects.filter(
            (Q(person1=user) & Q(person2=friend)) | (Q(person1=friend) & Q(person2=user)))

        if len(is_already_friend):
            raise ValidationError("Already Friends")

        friends_instance = Friend.objects.create(person1=user, person2=friend)

        return Response(
            {
                "friend": str(friends_instance),
                "status":200
            }
        )


class GetFriendView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt", None)
        if token:
            id = jwt.decode(token, key='secret', algorithms=["HS256"])['id']
            user = User.objects.get(pk=id)

            friend_objects = Friend.objects.filter(
                Q(person1=user) | Q(person2=user))
            friends = []
            for friend in friend_objects:
                if friend.person1 == user:
                    friends.append(friend.person2.username)
                else:
                    friends.append(friend.person1.username)

            return Response(
                friends
            )
        raise AuthenticationFailed("Not authenticated")
    
class  GetMessagesView(APIView):
    def post(self, request):
        token = request.COOKIES.get("jwt", None)
        if not token:
            raise AuthenticationFailed("Not authenticated")
        
        data = request.data
        socket = data['socket']

        messages = Message.objects.filter(socket=socket).order_by("-time_stamp")[:10]
        messageSerializer = MessageSerializer(messages, many=True)
        return Response(
            messageSerializer.data
        )





