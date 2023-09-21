import { blogReducer } from "../Blog/blog.reducers";
import { counterReducer } from "../counter.reducer";


export const appState = {
    counter: counterReducer,
    blog: blogReducer
}