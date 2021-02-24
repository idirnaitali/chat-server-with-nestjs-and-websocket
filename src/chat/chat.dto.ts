import {IsNotEmpty} from 'class-validator';

export interface MessageEventDto extends MessageDto {
    socketId?: string;
    roomId: string;
    avatar: string;
}

export interface MessageDto {
    order: number
    username: string;
    content: string;
    createdAt: Date;
}

export interface ChatDto extends MessageDto {
    socketId?: string;
    roomId: string;
    avatar: string;
}

export interface Participant {
    roomId: string;
    username: string;
    avatar: string;
    connected: boolean;
}

export class RoomData {
    createdBy: string;
    createdDate: Date;
    messages: Array<MessageDto>;
    participants: Map<string, Participant>; // sockedId => Participant

    constructor(createdBy: string) {
        this.createdBy = createdBy;
        this.createdDate = new Date();
        this.messages = new Array<MessageDto>();
        this.participants = new Map();
    }
}

export class RoomDto {
    @IsNotEmpty()
    roomId: string;
    @IsNotEmpty()
    creatorUsername: string;
}

export function toMessageDto(value: MessageEventDto) {
    const {order, username, content, createdAt} = value;
    return {order, username, content, createdAt}
}
