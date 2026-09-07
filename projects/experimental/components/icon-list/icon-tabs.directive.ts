import {
    type AfterContentInit,
    DestroyRef,
    Directive,
    effect,
    inject,
    INJECTOR,
    Input,
    untracked,
} from '@angular/core';
import {tuiInjectElement} from '@taiga-ui/cdk/utils/dom';
import {TUI_TAB_ACTIVATE} from '@taiga-ui/kit/components/tabs';

import {type TuiIconList} from './icon-list.component';

/**
 * Wires a `tuiTabs` bar to the groups of a {@link TuiIconList}, pairing them by
 * index: clicking the nth tab scrolls to the nth group, and scrolling to the
 * nth group lights up the nth tab.
 *
 * It sits on the nav rather than on each tab because tabs and groups normally
 * both come out of `*ngFor`, and a per-tab binding to a group instance would
 * evaluate before `@ViewChildren` resolve and stay null.
 *
 * Activation goes through the same `TUI_TAB_ACTIVATE` event a real click
 * dispatches, so the underline follows a scroll without stealing focus.
 */
@Directive({
    standalone: true,
    selector: '[tuiIconTabs]',
    host: {
        '(click)': 'onClick($event.target)',
    },
})
export class TuiIconTabs implements AfterContentInit {
    private readonly el = tuiInjectElement();
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(INJECTOR);

    @Input()
    public tuiIconTabs: TuiIconList | null = null;

    public ngAfterContentInit(): void {
        const groups = this.tuiIconTabs?.groups.toArray() ?? [];

        groups.forEach((group, index) => {
            const ref = effect(
                () => {
                    if (group.active()) {
                        untracked(() => this.activate(index));
                    }
                },
                {injector: this.injector},
            );

            this.destroyRef.onDestroy(() => ref.destroy());
        });
    }

    protected onClick(target: HTMLElement): void {
        const tab = target.closest<HTMLElement>('[tuiTab]');
        const index = tab ? this.tabs.indexOf(tab) : -1;

        this.tuiIconTabs?.groups.get(index)?.scrollIntoView();
    }

    private get tabs(): readonly HTMLElement[] {
        return Array.from(this.el.querySelectorAll<HTMLElement>('[tuiTab]'));
    }

    private activate(index: number): void {
        this.tabs[index]?.dispatchEvent(
            new CustomEvent(TUI_TAB_ACTIVATE, {bubbles: true}),
        );
    }
}
