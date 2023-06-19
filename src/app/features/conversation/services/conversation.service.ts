import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import {
  SAMPLE_CONVERSATIONS,
  SAMPLE_MESSAGES,
} from 'src/app/constants/sample-data.constant';
import { ConversationStore } from '../store/conversation.store';

@Injectable()
export class ConversationService {
  public constructor(private store: ConversationStore) {}

  public loadConversations(): Observable<ConversationModel[]> {
    return of(SAMPLE_CONVERSATIONS).pipe(
      tap((conversations) => {
        this.store.updateConversations(conversations);
      })
    );
  }

  public loadMessages(conversationId: string): Observable<MessageModel[]> {
    return of(SAMPLE_MESSAGES).pipe(
      map((messages) =>
        messages.filter((it) => it.conversationId === conversationId)
      )
    );
  }

  public searchMessages(keyword: string): Observable<MessageModel[]> {
    return of(SAMPLE_MESSAGES).pipe(
      map(messages => messages.filter(it => it.content.toLowerCase().includes(keyword.toLowerCase())))
    )
  }
}
