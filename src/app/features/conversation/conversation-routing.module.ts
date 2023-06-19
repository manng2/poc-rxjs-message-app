import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationComponent } from './components/conversation/conversation.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: ConversationComponent,
  },
  {
    path: ':id',
    component: MessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationRoutingModule { }
