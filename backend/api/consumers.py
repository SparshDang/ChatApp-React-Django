import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import  sync_to_async

from api.models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.roomGroupName = self.scope["path_remaining"][1:]

        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json['username']
        await self.createMessageObject(username, message)
        await self.channel_layer.group_send(
            self.roomGroupName, {
                "type": "sendMessage",
                "message": message,
                "username": username
            })

    async def sendMessage(self, event):
        username = event['username']
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message, "username": username}))

    @sync_to_async
    def createMessageObject(self, username,message):
        Message.objects.create(
            username=username,
            message=message,
            socket=self.roomGroupName
        )

