import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MasterService } from '../../master.service'
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { LOAD_BLOG, loadblogsuccess } from './blog.actions';

@Injectable()

export class BlogEffects {
    
    constructor(private action$: Actions, private serv: MasterService){

    }

    _blog = createEffect(() => 
        this.action$.pipe(
            ofType(LOAD_BLOG),
            exhaustMap((action) => {
                return this.serv.getAllBlogs().pipe(
                    map((data) => {
                        return loadblogsuccess({ bloglist: data });
                    }),
                    catchError(() => EMPTY)   
                )
            })
        )
    );
}