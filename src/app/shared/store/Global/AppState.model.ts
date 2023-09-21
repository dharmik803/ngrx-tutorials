import { BlogModel, Blogs } from "../Blog/blog.model";
import { counterModel } from "../counter.model";


export interface AppStateModel {
    counter: counterModel,
    blog: Blogs
}