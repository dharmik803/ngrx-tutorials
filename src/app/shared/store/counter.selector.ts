import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterModel } from "./counter.model";


const getCounterState = createFeatureSelector<counterModel>('counter');

export const getCounter = createSelector(getCounterState, (state) => {
    return state.counter;
});

export const getName = createSelector(getCounterState, (state) => {
    return state.name;
});