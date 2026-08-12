import {type TuiIconPickerGroup, type TuiIconPickerItem} from './icon-picker.types';

/**
 * Default filter: case-insensitive substring over `name` and `tags`, original
 * order preserved, groups left without matches dropped.
 *
 * It deliberately does not descend into `variants`: a variant carries its own
 * name ("thumbs up: light skin tone"), so searching them would return hundreds
 * of items whose visible glyph does not match the query at all. A base item is
 * found by its own name, and its variants stay one hold away.
 */
export function tuiIconPickerFilter<T extends TuiIconPickerItem>(
    groups: ReadonlyArray<TuiIconPickerGroup<T>>,
    query: string,
): ReadonlyArray<TuiIconPickerGroup<T>> {
    const search = query.trim().toLowerCase();

    if (!search) {
        return groups;
    }

    return groups
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => matches(item, search)),
        }))
        .filter(({items}) => items.length);
}

function matches({name, tags}: TuiIconPickerItem, query: string): boolean {
    return (
        name.toLowerCase().includes(query) ||
        !!tags?.some((tag) => tag.toLowerCase().includes(query))
    );
}
