import {NgForOf} from '@angular/common';
import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {type TuiStringHandler} from '@taiga-ui/cdk';
import {TuiDropdown, TuiIcon, TuiScrollbar, TuiTextfield} from '@taiga-ui/core';
import {TuiIcons} from '@taiga-ui/experimental';
import {TuiSelect, TuiTabs} from '@taiga-ui/kit';

import {type Emoji, EMOJI, type EmojiGroup} from '../emoji';

@Component({
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        TuiDropdown,
        TuiIcon,
        TuiIcons,
        TuiScrollbar,
        TuiSelect,
        TuiTabs,
        TuiTextfield,
    ],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation,
    changeDetection,
})
export default class Example {
    protected value: Emoji | null = null;

    /**
     * Signals rather than plain fields: the panel lives in an `ng-template`
     * that the dropdown moves into its own view container, so it is change
     * detected there and not with this component. Reading a signal from that
     * template subscribes it directly, which an `OnPush` field cannot do across
     * a portal.
     */
    protected readonly query = signal('');

    protected readonly groups = computed<readonly EmojiGroup[]>(() => {
        const query = this.query().trim().toLowerCase();

        if (!query) {
            return EMOJI;
        }

        return EMOJI.map((group) => ({
            ...group,
            items: group.items.filter(
                ({name, tags}) =>
                    name.includes(query) || tags?.some((tag) => tag.includes(query)),
            ),
        })).filter(({items}) => items.length);
    });

    /**
     * What the closed field shows — the glyph itself, not the name.
     */
    protected readonly stringify: TuiStringHandler<Emoji> = ({value}) => value;
}
