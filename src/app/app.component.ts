import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { bufferTime, combineLatest, distinctUntilChanged, map, Observable, take } from 'rxjs';

import { SAMPLE_THEMES } from './constants/sample-data.constant';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public readonly isUserLoggedIn$!: Observable<boolean>;
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
    this.loadTheme();
    this.listenThemeChange();

    // List of numbers
    this.getListNumbers().subscribe({
      next: (numbers) => {
        // Do something with your numbers
      }
    })
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
