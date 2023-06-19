import { Injectable } from '@angular/core';
import {
  combineLatest,
  filter,
  fromEvent,
  interval,
  map,
  Observable,
  of,
  startWith,
  Subject,
} from 'rxjs';
import { SAMPLE_MESSAGES } from '../constants/sample-data.constant';
import { AppStore } from '../stores/app.store';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public constructor(
    private appStore: AppStore
  ) {}

  public getOnlineStatus(): Observable<boolean> {
    return combineLatest(
      fromEvent(window, 'online').pipe(startWith(navigator.onLine)),
      fromEvent(window, 'offline').pipe(startWith(!navigator.onLine))
    ).pipe(map(() => navigator.onLine));
  }

  public getUserLoggedIn(): Observable<boolean> {
    return of(true);
  }

  public getNumber(): Observable<number> {
    const myNumber$ = new Subject<number>();

    interval(500)
      .pipe(map(() => Math.round(Math.random() * 100)))
      .subscribe({
        next: (randomNumber) => {
          myNumber$.next(randomNumber);
        },
      });

    return myNumber$.asObservable();
  }

  public searchMessages(keyword: string): Observable<MessageModel[]> {
    return of(SAMPLE_MESSAGES).pipe(
      map(messages => messages.filter(it => it.content.toLowerCase().includes(keyword.toLowerCase())))
    )
  }

  public getTheme(): Observable<AppThemeModel> {
    return this.appStore.theme$
  }

  public updateTheme(theme: AppThemeModel): void {
    this.appStore.updateTheme(theme);
  }
}
