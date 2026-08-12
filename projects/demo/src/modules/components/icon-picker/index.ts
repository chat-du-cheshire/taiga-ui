import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDemo} from '@demo/utils';
import {TuiDocAPI, TuiDocAPIItem} from '@taiga-ui/addon-doc';

@Component({
    standalone: true,
    imports: [TuiDemo, TuiDocAPI, TuiDocAPIItem],
    templateUrl: './index.html',
    changeDetection,
})
export default class Page {}
