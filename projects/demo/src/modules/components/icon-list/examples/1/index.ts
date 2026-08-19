import {NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiScrollbar} from '@taiga-ui/core';
import {TuiIcons} from '@taiga-ui/experimental';

import {type Emoji, EMOJI} from '../emoji';

@Component({
    standalone: true,
    imports: [NgForOf, TuiIcons, TuiScrollbar],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation,
    changeDetection,
})
export default class Example {
    /** The simplest case: one flat array, no groups at all. */
    protected readonly emoji = EMOJI.flatMap(({items}) => items);
    protected picked: Emoji | null = null;
}
