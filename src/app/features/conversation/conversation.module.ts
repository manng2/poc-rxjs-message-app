import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ConversationService } from './services/conversation.service';
import { ConversationStore } from './store/conversation.store';
import { MessagesComponent } from './components/messages/messages.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConversationComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ConversationService,
    ConversationStore
  ]
})
export class ConversationModule { }
