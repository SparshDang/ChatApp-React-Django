from rest_framework.serializers import ModelSerializer

from api.models import User, Message

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'username', 'password']
        extra_kwargs = {
            "password" : {"write_only":True}
        }

    def create(self, validated_data):
        password = validated_data['password']
        user_instance = User(**validated_data)
        if password:
            user_instance.set_password(password)
        user_instance.save()
        return user_instance

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ['username', 'message']
        