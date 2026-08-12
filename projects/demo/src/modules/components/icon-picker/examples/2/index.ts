import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {
    type TuiIconPickerGroup,
    TuiIconPickerComponent,
    type TuiIconPickerItem,
} from '@taiga-ui/experimental';

@Component({
    standalone: true,
    imports: [FormsModule, TuiIcon, TuiIconPickerComponent, TuiTextfield],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation,
    changeDetection,
})
export default class Example {
    protected query = '';
    protected value: string | null = '@tui.heart';

    /**
     * `value` is a Taiga icon name rather than a glyph, so rendering goes
     * through a template — the component itself knows nothing about icons.
     */
    protected readonly groups: readonly TuiIconPickerGroup[] = [
        {
            label: 'Interface',
            icon: '@tui.lightbulb',
            items: [
                {value: '@tui.heart', name: 'heart', tags: ['like', 'favorite']},
                {value: '@tui.star', name: 'star', tags: ['favorite', 'rate']},
                {value: '@tui.bell', name: 'bell', tags: ['notification']},
                {value: '@tui.bookmark', name: 'bookmark', tags: ['save']},
                {value: '@tui.search', name: 'search', tags: ['find', 'magnifier']},
                {value: '@tui.settings', name: 'settings', tags: ['gear', 'config']},
                {value: '@tui.trash', name: 'trash', tags: ['delete', 'remove']},
                {value: '@tui.plus', name: 'plus', tags: ['add', 'new']},
            ],
        },
        {
            label: 'Files',
            icon: '@tui.file',
            items: [
                {value: '@tui.file', name: 'file', tags: ['document']},
                {value: '@tui.folder', name: 'folder', tags: ['directory']},
                {value: '@tui.download', name: 'download', tags: ['save']},
                {value: '@tui.upload', name: 'upload', tags: ['send']},
            ],
        },
    ];

    protected onPick({value}: TuiIconPickerItem): void {
        this.value = value;
    }
}
