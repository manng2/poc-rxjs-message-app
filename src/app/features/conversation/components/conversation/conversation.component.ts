import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit {
  private readonly innerConversations$ = new BehaviorSubject<ConversationModel[]>([]);

  public readonly conversations$ = this.innerConversations$.asObservable();

  public constructor(private conversationService: ConversationService) {}

  public ngOnInit(): void {
    this.conversationService.loadConversations().subscribe({
      next: (conversations) => {
        this.innerConversations$.next(conversations);
      }
    })
  }
}
