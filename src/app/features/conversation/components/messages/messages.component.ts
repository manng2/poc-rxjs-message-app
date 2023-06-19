import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, debounceTime, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit, OnDestroy {
  private readonly complete$ = new Subject<void>();
  private readonly innerMessages$ = new BehaviorSubject<MessageModel[]>([]);

  public readonly messages$ = this.innerMessages$.asObservable();
  public readonly inputControl = new FormControl();

  public constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService
  ) {}

  public ngOnInit(): void {
    this.listenInputChange();

    this.route.paramMap.pipe(
      takeUntil(this.complete$),
      map(it => it.get('id')!),
      switchMap(it => this.conversationService.loadMessages(it))
    ).subscribe({
      next: (messages) => {
        this.innerMessages$.next(messages);
      }
    })
  }

  public ngOnDestroy(): void {
    this.complete$.next();
    this.complete$.complete();
  }

  private listenInputChange(): void {
    this.inputControl.valueChanges.pipe(
      debounceTime(400),
      switchMap(this.conversationService.searchMessages)
    ).subscribe({
      next: (messages) => {
        this.innerMessages$.next(messages);
      }
    })
  }
}
