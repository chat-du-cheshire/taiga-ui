import {TuiOptionNew, TuiOptionWithValue} from '@taiga-ui/core/components/data-list';

import {TuiIconGroup} from './icon-group.component';
import {TuiIconList} from './icon-list.component';
import {TuiIconOption} from './icon-option.directive';
import {TuiIconTabs} from './icon-tabs.directive';

/**
 * `TuiOptionNew` and `TuiOptionWithValue` ride along so that stacking
 * `tuiOption [value]` onto a cell works from a single import — without them in
 * scope the directive silently never instantiates and the list reports no
 * options at all.
 */
export const TuiIcons = [
    TuiIconList,
    TuiIconGroup,
    TuiIconOption,
    TuiIconTabs,
    TuiOptionNew,
    TuiOptionWithValue,
] as const;
