import { useState } from "react";

export interface Filter<T> {
    name: string;
    value: string;
    condition: (item: T, value: string) => boolean;
}

// The conditions come from the filters argument and the values come from
// state, and the two are paired by position below. Callers must keep
// filterValues the same length and the same order as the filters passed in.
// Update a value in place, never add, remove or reorder entries.
const useFiltering = <T,>(filters: Filter<T>[]) => {
    const [filterValues, setFilterValues] = useState(() => {
        const filterInitialValues = filters.map((f) => ({
            name: f.name,
            value: f.value,
        }));
        return filterInitialValues;
    });

    const filteringConditions = filters.map((f) => f.condition);
    const filterFunction = (collection: T[]) =>
        filteringConditions.reduce((data, conditionFn, index) => {
            return data.filter((item) => {
                return conditionFn(item, filterValues[index].value);
            });
        }, collection);

    return {
        filterValues,
        setFilterValues,
        filterFunction,
    };
};

export default useFiltering;
