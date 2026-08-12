import {tuiCreateOptions} from '@taiga-ui/cdk/utils/di';

export const [TUI_ICON_PICKER_OPTIONS, tuiIconPickerOptionsProvider] = tuiCreateOptions({
    /**
     * Two-dimensional keyboard navigation needs the column count in TS, so it
     * cannot live in CSS alone. Fixed rather than an input for now.
     */
    columns: 8,
    /**
     * How long a pointer is held on an item before its variants pop up, ms.
     */
    hold: 500,
});
