import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {

    getMessages(): string{
        return "Tous les messages";
    }

    // async getMessages(): Promise<string>{
    //     return "Tous les messages";
    // }

    getMessage(id: string): string{
        return `message avec l'id: ${id}`;
    }
}
