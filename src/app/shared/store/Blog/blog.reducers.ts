import { createReducer, on } from "@ngrx/store";
import { BlogState } from "./blog.state";
import { addblog, addblogsuccess, deleteblog, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./blog.actions";
import { BlogModel } from "./blog.model";
import { loadspinner } from "../Global/app.action";


const _blogReducer = createReducer( BlogState, 
    on(loadblog, (state) => {
        return {
            ...state,
            isLoaded: false
        }
    }),

    on(loadblogsuccess, (state, action) => {
        return {
            ...state,
            bloglist : [ ...action.bloglist],
            errormessage: '',
            isLoaded: false
        }
    }),

    on(loadblogfail, (state, action) => {
        return {
            ...state,
            bloglist : [],
            errormessage: action.errortext.message,
            isLoaded: false
        }
    }),

    // on(addblog, (state, action) => {
    //     const _blog = { ...action.bloginput };
    //     // _blog.id = state.bloglist.length + 1;
    //     if(!state.bloglist.length){
    //         _blog.id = 1;
    //     } else {
    //         _blog.id = state.bloglist[state.bloglist.length - 1].id + 1
    //     }
    //     return {
    //         ...state,
    //         bloglist : [ ...state.bloglist, _blog]
    //     }
    // }),

    on(addblogsuccess, (state, action) => {
        const _blog = { ...action.bloginput };
        return {
            ...state,
            bloglist : [ ...state.bloglist, _blog],
            isLoaded: false
        }
    }),

    on(updateblogsuccess, (state, action) => {
        const _blog = { ...action.bloginput };
        const updatedblog = state.bloglist.map( blog => {
            return _blog.id === blog.id ? _blog : blog;
        })
        return {
            ...state,
            bloglist : updatedblog,
            isLoaded: false
        }
    }),

    on(deleteblog, (state, action) => {
        const updatedblog = state.bloglist.filter( ( data: BlogModel ) => {
            return data.id != action.id;
        })
        return {
            ...state,
            bloglist : updatedblog,
            isLoaded: false
        }
    }),

    on(loadspinner, (state, action) => {
        return {
            ...state,
            isLoaded: action.isloaded
        }
    })
);

export function blogReducer(state: any, action: any){
    return _blogReducer(state, action);
}