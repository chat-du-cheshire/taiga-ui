import {type TuiIconPickerGroup} from '@taiga-ui/experimental';

/**
 * A trimmed fixture, enough to demonstrate groups, search and variants.
 * The full pack generated from Unicode CLDR is a separate entry point.
 */
export const EMOJI: readonly TuiIconPickerGroup[] = [
    {
        label: 'Frequently used',
        icon: '@tui.clock',
        items: [
            {value: '🤗', name: 'hugging face', tags: ['hug', 'smile']},
            {value: '😐', name: 'neutral face', tags: ['deadpan', 'meh']},
            {
                value: '💪',
                name: 'flexed biceps',
                tags: ['muscle', 'strong'],
                variants: [
                    {value: '💪🏻', name: 'flexed biceps: light skin tone'},
                    {value: '💪🏼', name: 'flexed biceps: medium-light skin tone'},
                    {value: '💪🏽', name: 'flexed biceps: medium skin tone'},
                    {value: '💪🏾', name: 'flexed biceps: medium-dark skin tone'},
                    {value: '💪🏿', name: 'flexed biceps: dark skin tone'},
                ],
            },
            {value: '💥', name: 'collision', tags: ['boom', 'explode']},
        ],
    },
    {
        label: 'Smileys & People',
        icon: '@tui.smile',
        items: [
            {value: '😀', name: 'grinning face', tags: ['face', 'grin', 'smile']},
            {value: '😃', name: 'grinning face with big eyes', tags: ['face', 'mouth']},
            {value: '😄', name: 'grinning face with smiling eyes', tags: ['eye', 'face']},
            {value: '😁', name: 'beaming face with smiling eyes', tags: ['eye', 'grin']},
            {value: '😆', name: 'grinning squinting face', tags: ['laugh', 'satisfied']},
            {value: '😅', name: 'grinning face with sweat', tags: ['cold', 'open']},
            {value: '🤣', name: 'rolling on the floor laughing', tags: ['laugh', 'rofl']},
            {value: '😂', name: 'face with tears of joy', tags: ['cry', 'laugh', 'tear']},
            {value: '😢', name: 'crying face', tags: ['cry', 'sad', 'tear']},
            {value: '🥹', name: 'face holding back tears', tags: ['proud', 'resist']},
            {value: '😌', name: 'relieved face', tags: ['calm', 'relaxed']},
            {value: '😊', name: 'smiling face with smiling eyes', tags: ['blush', 'eye']},
            {value: '😇', name: 'smiling face with halo', tags: ['angel', 'innocent']},
            {value: '🙂', name: 'slightly smiling face', tags: ['face', 'smile']},
            {value: '🙃', name: 'upside-down face', tags: ['sarcasm', 'silly']},
            {value: '😉', name: 'winking face', tags: ['wink', 'flirt']},
            {
                value: '👋',
                name: 'waving hand',
                tags: ['hand', 'hello', 'wave'],
                variants: [
                    {value: '👋🏻', name: 'waving hand: light skin tone'},
                    {value: '👋🏼', name: 'waving hand: medium-light skin tone'},
                    {value: '👋🏽', name: 'waving hand: medium skin tone'},
                    {value: '👋🏾', name: 'waving hand: medium-dark skin tone'},
                    {value: '👋🏿', name: 'waving hand: dark skin tone'},
                ],
            },
            {
                value: '👍',
                name: 'thumbs up',
                tags: ['+1', 'hand', 'like', 'yes'],
                variants: [
                    {value: '👍🏻', name: 'thumbs up: light skin tone'},
                    {value: '👍🏼', name: 'thumbs up: medium-light skin tone'},
                    {value: '👍🏽', name: 'thumbs up: medium skin tone'},
                    {value: '👍🏾', name: 'thumbs up: medium-dark skin tone'},
                    {value: '👍🏿', name: 'thumbs up: dark skin tone'},
                ],
            },
        ],
    },
    {
        label: 'Animals & Nature',
        icon: '@tui.cat',
        items: [
            {value: '🐶', name: 'dog face', tags: ['dog', 'face', 'pet']},
            {value: '🐱', name: 'cat face', tags: ['cat', 'face', 'pet']},
            {value: '🐭', name: 'mouse face', tags: ['face', 'mouse']},
            {value: '🦊', name: 'fox', tags: ['face', 'fox']},
            {value: '🐻', name: 'bear', tags: ['bear', 'face']},
            {value: '🐼', name: 'panda', tags: ['face', 'panda']},
            {value: '🌳', name: 'deciduous tree', tags: ['tree', 'nature']},
            {value: '🌸', name: 'cherry blossom', tags: ['blossom', 'flower']},
        ],
    },
    {
        label: 'Food & Drink',
        icon: '@tui.hamburger',
        items: [
            {value: '🍎', name: 'red apple', tags: ['apple', 'fruit']},
            {value: '🍔', name: 'hamburger', tags: ['burger', 'fast food']},
            {value: '🍕', name: 'pizza', tags: ['cheese', 'slice']},
            {value: '🍣', name: 'sushi', tags: ['fish', 'rice']},
            {value: '☕', name: 'hot beverage', tags: ['coffee', 'tea']},
            {value: '🍰', name: 'shortcake', tags: ['cake', 'dessert']},
        ],
    },
    {
        label: 'Travel & Places',
        icon: '@tui.bus',
        items: [
            {value: '🚌', name: 'bus', tags: ['vehicle']},
            {value: '🚗', name: 'automobile', tags: ['car', 'vehicle']},
            {value: '✈️', name: 'airplane', tags: ['flight', 'plane']},
            {value: '🚀', name: 'rocket', tags: ['launch', 'space']},
            {value: '🏔️', name: 'snow-capped mountain', tags: ['cold', 'mountain']},
        ],
    },
    {
        label: 'Flags',
        icon: '@tui.flag',
        items: [
            {value: '🏁', name: 'chequered flag', tags: ['finish', 'race']},
            {value: '🚩', name: 'triangular flag', tags: ['post', 'mark']},
            {value: '🏳️‍🌈', name: 'rainbow flag', tags: ['pride', 'rainbow']},
        ],
    },
];
