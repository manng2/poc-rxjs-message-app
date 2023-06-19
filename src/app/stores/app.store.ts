import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  private readonly innerTheme$ = new BehaviorSubject<AppThemeModel>('light');

  public readonly theme$ = this.innerTheme$.asObservable();

  public updateTheme(theme: AppThemeModel): void {
    this.innerTheme$.next(theme);
  }
}
