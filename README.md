## Chat server with nestJs and websocket

![home](img/home.jpg)

Chat server using WebSockets with [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev
```

## Required packages

```shell
npm i --save @nestjs/websockets @nestjs/platform-socket.io ngx-socket-io
npm i --save-dev @types/socket.io
```

## Web Socket Gateway

- ### Init:
  We add `@WebSocketServer() server;` inside of our [ChatWebsocketGateway](/src/chat/chat.websocket.gateway.ts) to 
  attaches a native Web Socket Server to our property `server` and then we use the decorator
  `@WebSocketGateway(port?: number)`to mark our **WebsocketGateway** class as a **Nest gateway** that enables
  **real-time**, **bidirectional** and **event-based communication** between the browser and the server

- ### Handlers:
  In order de hand the connection and disconnection at our websocket server we need to implement interfaces 
  `OnGatewayConnection` and `OnGatewayDisconnect`.

- ### Subscribers:
  We use decorator `@SubscribeMessage('exmple-channel')` on the method that handles our business rules on `exmple-channel` events,
  for example we use `@SubscribeMessage('chat')` to cap and handle the chat events. You can implement a custom subscriber as: 
  `@SubscribeMessage({channel: 'messages', type: 'group'})` in order to hand messages event of groups only.

## APIs

[RoomsController](/src/chat/rooms.controller.ts)

- ### Create room:

  #### Resource:
        /api/v1/rooms

  #### Body:
        roomId: the room id (room name)
        creatorUsername: the username with creats the room

  #### Example:
    ```shell
    curl -X POST 'http://localhost:3000/api/v1/rooms' \
    --data-raw '{
        "roomId": "3XX",
        "creatorUsername": "idirnaitali"
    }'
    ```
  #### Error cases:

    - Invalid body:
    ````json
    {
      "statusCode": 400,
      "message": [
        "roomId should not be empty",
        "creatorUsername should not be empty"
      ],
      "error": "Bad Request"
    }
    ````

    - Existing room id:
    ````json
    {
      "code": "room.conflict",
      "message": "Room with 'exmple-room' already exists"
    }
    ````

- ### Get room messages:

  #### Resource:
        /api/v1/rooms/{roomId}/messages?fromIndex={fromIndex}&toIndex={fromIndex}

  #### Params:
        roomId: the room id
        fromIndex: the index of the first message to get
        fromIndex: the index of the last message to get

  #### Example:
    ```shell
    curl -X GET 'http://localhost:3000/api/v1/rooms/3XX/messages?fromIndex=1&toIndex=20'
    ```

  #### Error cases:

    - Invalid room id (ex: not found or closed):
    ````json
    {
      "code": "access-forbidden",
      "message": "The access is forbidden"
    }
    ````

    - Missing `fromIndex` / `toIndex`:
    ````json
    {
      "statusCode": 400,
      "message": "Validation failed (numeric string is expected)",
      "error": "Bad Request"
    }
    ````

    - Invalid `fromIndex` / `toIndex`:
    ````json
    {
      "code": "req-params.validation",
      "message": "Invalid parameters, 'fromIndex' and 'toIndex' must be positive"
    }
    ````

    - Invalid `fromIndex` / `toIndex`:
    ````json
    {
      "code": "req-params.validation",
      "message": "Invalid parameters, 'toIndex' must no not be less than 'fromIndex'"
    }
    ````

- ### Close room (Delete room):

  ### Resource:
        /api/v1/rooms/{roomId}

  ### Params:
        roomId: the room id

  ### Example:

    ```shell
    curl -X DELETE http://localhost:3000/api/v1/rooms/3XX 
    ```

  #### Error cases:
    - Invalid room id (ex: not found or closed):
    ````json
    {
      "code": "room.not-fond",
      "message": "Room with '3XX' not found"
    }
    ````
