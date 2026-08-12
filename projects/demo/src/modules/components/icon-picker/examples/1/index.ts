import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiDropdown, TuiTextfield} from '@taiga-ui/core';
import {TuiIconPickerComponent, type TuiIconPickerItem} from '@taiga-ui/experimental';

import {EMOJI} from '../emoji';

@Component({
    standalone: true,
    imports: [FormsModule, TuiDropdown, TuiIconPickerComponent, TuiTextfield],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation,
    changeDetection,
})
export default class Example {
    protected readonly groups = EMOJI;
    protected open = false;
    protected query = '';
    protected value: TuiIconPickerItem | null = null;

    protected onPick(item: TuiIconPickerItem): void {
        this.value = item;
        this.open = false;
    }
}
