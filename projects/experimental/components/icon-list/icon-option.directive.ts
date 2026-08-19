import {Directive} from '@angular/core';
import {TUI_VERSION} from '@taiga-ui/cdk/constants';

/**
 * A single cell of {@link TuiIconList}. Carries no data and no behaviour of its
 * own — what it renders and what a click does are entirely yours.
 */
@Directive({
    standalone: true,
    selector: '[tuiIconOption]',
    host: {
        tuiIconOptionV: TUI_VERSION,
        type: 'button',
        role: 'option',
        tabIndex: '-1',
    },
})
export class TuiIconOption {}
