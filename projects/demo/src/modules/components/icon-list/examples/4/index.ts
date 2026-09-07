import {NgForOf} from '@angular/common';
import {Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {type TuiStringHandler} from '@taiga-ui/cdk';
import {TuiDropdown, TuiIcon, TuiScrollbar, TuiTextfield} from '@taiga-ui/core';
import {TuiIcons} from '@taiga-ui/experimental';
import {TuiChevron, TuiSelect, TuiTabs} from '@taiga-ui/kit';
import twemoji from '@twemoji/api';

import {type Emoji, EMOJI, type EmojiGroup} from '../emoji';

interface Twemoji extends Emoji {
    readonly url: string;
}

interface TwemojiGroup extends EmojiGroup {
    readonly items: readonly Twemoji[];
}

/**
 * The package also ships `parse`, but it either returns a string of HTML or
 * rewrites the DOM in place — under Angular that means `innerHTML` and a
 * sanitizer, or a fight with change detection. An `<img src>` is all a cell
 * needs, and the two pieces the URL is built from are public API.
 *
 * The `\uFE0F` rule is twemoji's own: the variation selector belongs in the
 * file name only inside a `\u200D` sequence, so an airplane is `2708` while a
 * rainbow flag keeps every code point it has.
 */
function toUrl(value: string): string {
    const sequence = value.includes('\u200D') ? value : value.replaceAll('\uFE0F', '');

    return `${twemoji.base}svg/${twemoji.convert.toCodePoint(sequence)}.svg`;
}

/** Resolved once — the glyphs are static, only the filtering below is not. */
const TWEMOJI: readonly TwemojiGroup[] = EMOJI.map((group) => ({
    ...group,
    items: group.items.map((item) => ({...item, url: toUrl(item.value)})),
}));

@Component({
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        TuiChevron,
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
    protected value: Twemoji | null = null;

    /**
     * Signals rather than plain fields: the panel lives in an `ng-template`
     * that the dropdown moves into its own view container, so it is change
     * detected there and not with this component.
     */
    protected readonly query = signal('');

    protected readonly groups = computed<readonly TwemojiGroup[]>(() => {
        const query = this.query().trim().toLowerCase();

        if (!query) {
            return TWEMOJI;
        }

        return TWEMOJI.map((group) => ({
            ...group,
            items: group.items.filter(
                ({name, tags}) =>
                    name.includes(query) || tags?.some((tag) => tag.includes(query)),
            ),
        })).filter(({items}) => items.length);
    });

    /**
     * The field renders an image through `[content]`, so this is only what the
     * input itself carries — for assistive technology and for the filler.
     */
    protected readonly stringify: TuiStringHandler<Twemoji> = ({name}) => name;
}
