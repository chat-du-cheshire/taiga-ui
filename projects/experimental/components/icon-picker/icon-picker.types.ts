/**
 * A single selectable entry.
 *
 * `value` is both the unique key and what gets emitted, `name` is what search
 * and screen readers use. Nothing here knows about icons or emoji: rendering is
 * decided by the template, see {@link TuiIconPickerComponent#itemTemplate}.
 */
export interface TuiIconPickerItem {
    readonly value: string;
    readonly name: string;
    readonly tags?: readonly string[];
    /**
     * Alternative forms of the same entry — skin tones for emoji, weights for an
     * icon set. Reachable by holding the item, never rendered inline.
     */
    readonly variants?: readonly this[];
}

export interface TuiIconPickerGroup<T extends TuiIconPickerItem = TuiIconPickerItem> {
    readonly label: string;
    /**
     * Icon of the group tab in the top row.
     */
    readonly icon?: string;
    readonly items: readonly T[];
}

/**
 * Both filters and orders the result. Pass `null` to
 * {@link TuiIconPickerComponent#filter} to opt out entirely — for server-side
 * search, where groups already arrive filtered.
 */
export type TuiIconPickerFilter<T extends TuiIconPickerItem = TuiIconPickerItem> = (
    groups: ReadonlyArray<TuiIconPickerGroup<T>>,
    query: string,
) => ReadonlyArray<TuiIconPickerGroup<T>>;
