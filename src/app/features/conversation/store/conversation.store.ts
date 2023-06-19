import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ConversationStore {
  private readonly innerConversations$ = new BehaviorSubject<ConversationModel[]>([]);

  public readonly conversations$ = this.innerConversations$.asObservable();

  public updateConversations(conversations: ConversationModel[]): void {
    this.innerConversations$.next(conversations);
  }
}
