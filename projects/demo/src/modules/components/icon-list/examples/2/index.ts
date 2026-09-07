import {NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiIcon, TuiScrollbar, TuiTextfield} from '@taiga-ui/core';
import {TuiIcons} from '@taiga-ui/experimental';
import {TuiTabs} from '@taiga-ui/kit';

import {type Emoji, EMOJI, type EmojiGroup} from '../emoji';

@Component({
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        TuiIcon,
        TuiIcons,
        TuiScrollbar,
        TuiTabs,
        TuiTextfield,
    ],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation,
    changeDetection,
})
export default class Example {
    protected query = '';
    protected picked: Emoji | null = null;

    /**
     * Searching is yours: the list never sees the data, so filtering is a plain
     * expression over your own array. Empty groups drop out here, which keeps
     * the tabs and the sections in step for free.
     */
    protected get groups(): readonly EmojiGroup[] {
        const query = this.query.trim().toLowerCase();

        if (!query) {
            return EMOJI;
        }

        return EMOJI.map((group) => ({
            ...group,
            items: group.items.filter(
                ({name, tags}) =>
                    name.toLowerCase().includes(query) ||
                    tags?.some((tag) => tag.includes(query)),
            ),
        })).filter(({items}) => items.length);
    }
}
