import {AsyncPipe, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    type OnChanges,
    type OnDestroy,
    Output,
    type QueryList,
    type TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import {EMPTY_QUERY} from '@taiga-ui/cdk/constants';
import {type TuiContext} from '@taiga-ui/cdk/types';
import {tuiGetElementOffset, tuiInjectElement} from '@taiga-ui/cdk/utils/dom';
import {tuiMoveFocus} from '@taiga-ui/cdk/utils/focus';
import {TuiIcon} from '@taiga-ui/core/components/icon';
import {TuiScrollbar} from '@taiga-ui/core/components/scrollbar';
import {
    TuiDropdownDirective,
    TuiDropdownManual,
} from '@taiga-ui/core/directives/dropdown';
import {TUI_NOTHING_FOUND_MESSAGE} from '@taiga-ui/core/tokens';
import {TuiTabs} from '@taiga-ui/kit/components/tabs';

import {tuiIconPickerFilter} from './icon-picker.filter';
import {TUI_ICON_PICKER_OPTIONS} from './icon-picker.options';
import {
    type TuiIconPickerFilter,
    type TuiIconPickerGroup,
    type TuiIconPickerItem,
} from './icon-picker.types';

const OPTION = '[role="option"]';

@Component({
    standalone: true,
    selector: 'tui-icon-picker',
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        NgTemplateOutlet,
        TuiDropdownDirective,
        TuiDropdownManual,
        TuiIcon,
        TuiScrollbar,
        TuiTabs,
    ],
    templateUrl: './icon-picker.template.html',
    styleUrls: ['./icon-picker.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.--t-columns]': 'columns',
        '(keydown.arrowRight.prevent)': 'onArrow($event.target, 1)',
        '(keydown.arrowLeft.prevent)': 'onArrow($event.target, -1)',
        '(keydown.arrowDown.prevent)': 'onArrow($event.target, columns)',
        '(keydown.arrowUp.prevent)': 'onArrow($event.target, -columns)',
        '(keydown.home.prevent)': 'onEdge($event.target, false)',
        '(keydown.end.prevent)': 'onEdge($event.target, true)',
        '(keydown.alt.enter.prevent)': 'onVariants($event.target)',
        '(keydown.esc)': 'onEsc($event)',
    },
})
export class TuiIconPickerComponent<T extends TuiIconPickerItem = TuiIconPickerItem>
    implements OnChanges, OnDestroy
{
    @ViewChildren('group')
    private readonly groupElements: QueryList<ElementRef<HTMLElement>> = EMPTY_QUERY;

    @ViewChild(TuiScrollbar, {read: ElementRef})
    private readonly scrollbar?: ElementRef<HTMLElement>;

    private readonly el = tuiInjectElement();
    private readonly cdr = inject(ChangeDetectorRef);
    private readonly options = inject(TUI_ICON_PICKER_OPTIONS);

    private hold?: ReturnType<typeof setTimeout>;

    protected readonly columns = this.options.columns;
    protected readonly nothingFound$ = inject(TUI_NOTHING_FOUND_MESSAGE);

    /**
     * Result of {@link filter}, and the flat list of its items in DOM order —
     * keyboard navigation maps focused elements back to items through it.
     */
    protected filtered: ReadonlyArray<TuiIconPickerGroup<T>> = [];
    protected flat: readonly T[] = [];
    protected active = 0;

    /**
     * The item whose variants are currently popped up, and where to anchor them.
     */
    protected expanded: T | null = null;
    protected anchor = {top: 0, left: 0, width: 0, height: 0};

    /**
     * Item that owns tabindex="0" — the single tab stop of the grid.
     */
    protected tabbable: string | null = null;

    @Input()
    public groups: ReadonlyArray<TuiIconPickerGroup<T>> = [];

    @Input()
    public value: string | null = null;

    @Input()
    public query = '';

    /**
     * Filters and orders groups. `null` disables filtering entirely, for when
     * groups already arrive filtered from a server.
     */
    @Input()
    public filter: TuiIconPickerFilter<T> | null = tuiIconPickerFilter;

    @Input()
    public itemTemplate: TemplateRef<TuiContext<T>> | null = null;

    @Input()
    public emptyTemplate: TemplateRef<void> | null = null;

    @Output()
    public readonly valueChange = new EventEmitter<T>();

    public ngOnChanges(): void {
        this.filtered = this.filter ? this.filter(this.groups, this.query) : this.groups;
        this.flat = this.filtered.flatMap(({items}) => items);
        this.active = 0;
        this.expanded = null;
        this.tabbable =
            this.flat.find(({value}) => value === this.value)?.value ??
            this.flat[0]?.value ??
            null;
    }

    public ngOnDestroy(): void {
        clearTimeout(this.hold);
    }

    protected onPick(item: T): void {
        this.expanded = null;
        this.tabbable = item.value;
        this.valueChange.emit(item);
    }

    /**
     * Clicking a tab scrolls to the group rather than filtering to it —
     * adjacent groups stay visible, as on the design.
     */
    protected onTab(index: number): void {
        const root = this.scrollbar?.nativeElement;
        const group = this.groupElements.get(index)?.nativeElement;

        this.active = index;

        if (root && group) {
            root.scrollTo({
                top: tuiGetElementOffset(root, group).offsetTop,
                behavior: 'smooth',
            });
        }
    }

    /**
     * Scroll-spy: without it the tabs keep pointing at whatever was clicked
     * last, and lie the moment the user touches the wheel.
     *
     * Measured on scroll rather than through an `IntersectionObserver` because
     * the group elements are re-created on every filter change, and keeping an
     * observer subscribed to a moving `QueryList` costs more than these few
     * rect reads over a handful of groups.
     */
    protected onScroll(): void {
        // Variants are anchored to a cell that just moved out from under them
        this.expanded = null;
        this.active = this.current;
    }

    protected onHoldStart(item: T, element: HTMLElement): void {
        if (!item.variants?.length) {
            return;
        }

        this.hold = setTimeout(() => this.open(item, element), this.options.hold);
    }

    protected onHoldEnd(): void {
        clearTimeout(this.hold);
    }

    /**
     * Keyboard equivalent of holding an item — without it the variants are
     * unreachable for anyone not using a pointer.
     */
    protected onVariants(target: EventTarget | null): void {
        const elements = this.elements;
        const index = elements.indexOf(target as HTMLElement);
        const item = this.flat[index];
        const element = elements[index];

        if (item?.variants?.length && element) {
            this.open(item, element);
        }
    }

    protected onArrow(target: EventTarget | null, step: number): void {
        const elements = this.elements;
        const index = elements.indexOf(target as HTMLElement);

        if (index < 0) {
            // Focus came from the projected search field
            elements[0]?.focus();
        } else {
            tuiMoveFocus(index, elements, step);
        }
    }

    protected onEdge(target: EventTarget | null, last: boolean): void {
        const grid = (target as Element | null)?.closest?.('[role="listbox"]');
        const elements = Array.from(grid?.querySelectorAll<HTMLElement>(OPTION) ?? []);

        (last ? elements[elements.length - 1] : elements[0])?.focus();
    }

    protected onEsc(event: Event): void {
        if (!this.expanded) {
            // Let it bubble up to whatever hosts the picker
            return;
        }

        event.stopPropagation();
        this.expanded = null;
    }

    protected onFocus(item: T): void {
        this.tabbable = item.value;
    }

    /**
     * Index of the group whose heading has passed the top of the scroll area.
     */
    private get current(): number {
        const root = this.scrollbar?.nativeElement;

        if (!root) {
            return this.active;
        }

        // The last group is usually too short to ever reach the top edge, so at
        // the very bottom it would never light up its own tab
        if (root.scrollTop + root.clientHeight >= root.scrollHeight - 1) {
            return Math.max(this.groupElements.length - 1, 0);
        }

        const {top} = root.getBoundingClientRect();
        const offsets = this.groupElements.map(
            ({nativeElement}) => nativeElement.getBoundingClientRect().top - top,
        );
        const next = offsets.findIndex((offset) => offset > 1);

        return Math.max((next < 0 ? offsets.length : next) - 1, 0);
    }

    private get elements(): readonly HTMLElement[] {
        return Array.from(this.el.querySelectorAll<HTMLElement>(OPTION));
    }

    private open(item: T, element: HTMLElement): void {
        // Rects rather than offsets: the cell sits inside a scrolled container,
        // and offsetTop would ignore how far that container has been scrolled
        const host = this.el.getBoundingClientRect();
        const {top, left, width, height} = element.getBoundingClientRect();

        this.anchor = {top: top - host.top, left: left - host.left, width, height};
        this.expanded = item;
        this.cdr.markForCheck();
    }
}
