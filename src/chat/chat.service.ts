import {ConflictException, NotFoundException} from '@nestjs/common';
import {MessageDto, toMessageDto} from "./chat.dto";
import {ChatWebsocketGateway} from "./chat.websocket.gateway";

export class ChatService {

    constructor() {
    }

    getMessages(roomId: string, fromIndex: number, toIndex: number): MessageDto[] {
        const room = ChatWebsocketGateway.get(roomId)
        if (!room) {
            throw new NotFoundException({code: 'room.not-fond', message: 'Room not found'})
        }
        return room.messages
            .filter((value, index) => index >= fromIndex - 1 && index < toIndex)
            .map(toMessageDto);
    }

}

export const chatService = new ChatService();
