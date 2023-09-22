import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../master.service';
import { exhaustMap, map, catchError, EMPTY, of, switchMap } from 'rxjs';
import {
  LOAD_BLOG,
  addblog,
  addblogsuccess,
  deleteblog,
  deleteblogsuccess,
  loadblogfail,
  loadblogsuccess,
  updateblog,
  updateblogsuccess,
} from './blog.actions';
import { BlogModel } from './blog.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emptyaction, loadspinner, showalert } from '../Global/app.action';

@Injectable()
export class BlogEffects {
  constructor(
    private action$: Actions,
    private serv: MasterService,
    private _snackbar: MatSnackBar
  ) {}

  _loadblog = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_BLOG),
      exhaustMap((action) => {
        return this.serv.getAllBlogs().pipe(
          map((data) => {
            return loadblogsuccess({ bloglist: data });
          }),
          catchError((_error) => of(loadblogfail({ errortext: _error }), loadspinner({ isloaded: false })))
        );
      })
    )
  );

  _addblog = createEffect(() =>
    this.action$.pipe(
      ofType(addblog),
      switchMap((action) => 
        this.serv.createBlog(action.bloginput).pipe(
          switchMap(data => of(
            addblogsuccess({ bloginput: data as BlogModel }),
            showalert({ message: 'Created Successfully.' })
          )),
          catchError((_error) => of(showalert({ message: 'Failed to create Blog.' }), loadspinner({ isloaded: false })))
        )
      )
    )
  );

  _updateblog = createEffect(() =>
    this.action$.pipe(
      ofType(updateblog),
      switchMap((action) => {
        return this.serv.updateBlog(action.bloginput).pipe(
          switchMap(res => of(
            updateblogsuccess({ bloginput: action.bloginput }),
            showalert({ message: 'Updated Successfully.' })
          )),
          catchError((_error) => of(showalert({ message: 'Failed to update Blog.'}), loadspinner({ isloaded: false })))
        );
      })
    )
  );

  _deleteblog = createEffect(() =>
    this.action$.pipe(
      ofType(deleteblog),
      switchMap((action) => 
        this.serv.deleteBlog(action.id).pipe(
          switchMap(res => of(
            deleteblogsuccess({ id: action.id }),
            showalert({ message: 'Deleted Successfully.' })
          )),
          catchError((_error) => of(showalert({ message: 'Failed to delete Blog.' }), loadspinner({ isloaded: false })))
        )
      )
    )
  );

}
