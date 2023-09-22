import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { emptyaction, showalert } from './app.action';

@Injectable()
export class AppEffects {
  constructor(private action$: Actions, private _snackbar: MatSnackBar) {}

  _showalert = createEffect(() =>
    this.action$.pipe(
      ofType(showalert),
      exhaustMap((action) => {
        return this.showSnackBarAlert(action.message)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyaction();
            })
          );
      })
    )
  );

  showSnackBarAlert(message: string) {
    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000
    });
  }

}
