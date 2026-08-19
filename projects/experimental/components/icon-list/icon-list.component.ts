import {
    type AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    inject,
    type QueryList,
    ViewEncapsulation,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EMPTY_QUERY, TUI_VERSION} from '@taiga-ui/cdk/constants';
import {tuiTypedFromEvent} from '@taiga-ui/cdk/observables';
import {tuiInjectElement} from '@taiga-ui/cdk/utils/dom';
import {tuiMoveFocus} from '@taiga-ui/cdk/utils/focus';
import {TUI_SCROLL_REF} from '@taiga-ui/core/tokens';

import {TuiIconGroup} from './icon-group.component';
import {TUI_ICON_LIST_OPTIONS} from './icon-list.options';

const OPTION = '[role="option"]';

/**
 * Lays projected options out in a grid and owns nothing else — no data, no
 * selection, no search. Group them with {@link TuiIconGroup} or don't; filter
 * and pick in your own code.
 *
 * Deliberately not virtualized: windowing projected content would mean owning
 * the data, which is the whole point of not doing so here.
 */
@Component({
    standalone: true,
    selector: 'tui-icon-list',
    template: '<ng-content />',
    styleUrls: ['./icon-list.style.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'tuiIconList',
    host: {
        tuiIconListV: TUI_VERSION,
        role: 'listbox',
        '[style.--t-columns]': 'columns',
        '(keydown.arrowRight.prevent)': 'onArrow($event.target, 1)',
        '(keydown.arrowLeft.prevent)': 'onArrow($event.target, -1)',
        '(keydown.arrowDown.prevent)': 'onArrow($event.target, columns)',
        '(keydown.arrowUp.prevent)': 'onArrow($event.target, -columns)',
        '(keydown.home.prevent)': 'onEdge($event.target, false)',
        '(keydown.end.prevent)': 'onEdge($event.target, true)',
        '(focusin)': 'onFocusIn($event.target)',
    },
})
export class TuiIconList implements AfterContentInit {
    private readonly el = tuiInjectElement();
    private readonly scroll = inject(TUI_SCROLL_REF);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly columns = inject(TUI_ICON_LIST_OPTIONS).columns;

    @ContentChildren(TuiIconGroup)
    public readonly groups: QueryList<TuiIconGroup> = EMPTY_QUERY;

    public ngAfterContentInit(): void {
        this.update();
        tuiTypedFromEvent(this.scroll.nativeElement, 'scroll')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.update());
    }

    /**
     * Roving tabindex: exactly one option is tabbable, and it follows focus.
     */
    protected onFocusIn(target: HTMLElement): void {
        if (target.matches(OPTION)) {
            this.options.forEach((option) => {
                option.tabIndex = option === target ? 0 : -1;
            });
        }
    }

    protected onArrow(target: EventTarget | null, step: number): void {
        const options = this.options;
        const index = options.indexOf(target as HTMLElement);

        if (index < 0) {
            // Arrived from outside the grid, e.g. a search field
            options[0]?.focus();
        } else {
            tuiMoveFocus(index, options, step);
        }
    }

    protected onEdge(target: EventTarget | null, last: boolean): void {
        const group = (target as Element | null)?.closest?.('tui-icon-group') ?? this.el;
        const options = Array.from(group.querySelectorAll<HTMLElement>(OPTION));

        (last ? options[options.length - 1] : options[0])?.focus();
    }

    private get options(): readonly HTMLElement[] {
        return Array.from(this.el.querySelectorAll<HTMLElement>(OPTION));
    }

    /**
     * Marks the group currently under the top edge, so tabs can follow a manual
     * scroll instead of pointing at whatever was clicked last.
     */
    private update(): void {
        const groups = this.groups.toArray();
        const root = this.scroll.nativeElement;
        // The last group is usually too short to ever reach the top edge
        const bottom = root.scrollTop + root.clientHeight >= root.scrollHeight - 1;
        const next = groups.findIndex(({offset}) => offset > 1);
        const active = bottom
            ? groups.length - 1
            : Math.max((next < 0 ? groups.length : next) - 1, 0);

        groups.forEach((group, index) => group.active.set(index === active));
    }
}
