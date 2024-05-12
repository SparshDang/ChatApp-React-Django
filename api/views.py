from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed,NotAuthenticated

import time,jwt

from api.serializers import UserSerializer
from api.models import User

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"message" : "Registration complete",
             "id": user.id, 'status':200}
        )
    
class LoginView(APIView):
    def post(self, request):
        data = request.data

        user = User.objects.filter(Q(email=data['username']) | Q(username=data['username'])).first()
        if not (data.get("password", None) and data.get("username", None)):
            raise AuthenticationFailed(
                "Invalid Inputs"
            )

        if not user:
            raise AuthenticationFailed({"message":"user not found"})
        
        if not user.check_password(data['password']):
            raise AuthenticationFailed("Password is incorrect")
        

        payload = {
            'iat': time.time(),
            "id" : user.id
        }

        token = jwt.encode(payload, 'secret')

        response = Response()
        response.set_cookie('jwt', token)
        response.data = {
            'message' : 'Login Successful',
            'status':200
        }

        return response
    
class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {
            "message" : "Logout Successfully"
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
        return Response(serializer.data)