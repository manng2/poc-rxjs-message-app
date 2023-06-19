import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, bufferTime, combineLatest, debounceTime, distinctUntilChanged, interval, map, Observable, Subject, switchMap, take, tap } from 'rxjs';

import { SAMPLE_MESSAGES, SAMPLE_CONVERSATIONS, SAMPLE_THEMES } from './constants/sample-data.constant';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly innerMessages$ = new BehaviorSubject<MessageModel[]>(SAMPLE_MESSAGES);

  public readonly messages$ = this.innerMessages$.asObservable();
  public readonly isUserLoggedIn$!: Observable<boolean>;
  public readonly inputControl = new FormControl();
  public readonly themeControl = new FormControl();
  public readonly theme$ = this.appService.getTheme();
  public readonly themeOptions = SAMPLE_THEMES;

  public constructor(private appService: AppService) {
    this.isUserLoggedIn$ = combineLatest(
      this.appService.getOnlineStatus(),
      this.appService.getUserLoggedIn()
    ).pipe(map(([isOnline, isLoggedIn]) => isOnline && isLoggedIn));
  }

  public ngOnInit(): void {
    this.listenUserLoggedIn();
    this.listenInputChange();
    this.loadTheme();
    this.listenThemeChange();
  }

  private listenUserLoggedIn(): void {
    this.isUserLoggedIn$.subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          console.log('User is online and logged in');
        } else {
          console.log('User is offline and logged out');
        }
      },
    });
  }

  private listenInputChange(): void {
    this.inputControl.valueChanges.pipe(
      debounceTime(400),
      switchMap(this.appService.searchMessages)
    ).subscribe({
      next: (messages) => {
        this.innerMessages$.next(messages);
      }
    })
  }

  private getListNumbers(): Observable<number[]> {
    return this.appService.getNumber().pipe(
      distinctUntilChanged(),
      bufferTime(2000)
    )
  }

  private loadTheme(): void {
    this.appService.getTheme().pipe(take(1)).subscribe({
      next: (theme) => {
        this.themeControl.setValue(theme)
      }
    })
  }

  private listenThemeChange(): void {
    this.themeControl.valueChanges.subscribe({
      next: (value) => {
        this.appService.updateTheme(value);
      }
    })
  }
}
