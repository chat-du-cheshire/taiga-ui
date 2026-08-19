import {tuiCreateOptions} from '@taiga-ui/cdk/utils/di';

export const [TUI_ICON_LIST_OPTIONS, tuiIconListOptionsProvider] = tuiCreateOptions({
    /**
     * Two-dimensional keyboard navigation needs the column count in TS, so it
     * cannot live in CSS alone.
     */
    columns: 8,
});
