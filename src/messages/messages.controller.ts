import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}

    @Get()
    getMessages(){
        const data = this.messageService.getMessages()
        return data;
    }

    @Get(":id")
    getMessage(@Param("id") id: string){
        const data = this.messageService.getMessage(id)
        return data;
    }
    
}
