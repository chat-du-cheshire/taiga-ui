/**
 * A trimmed fixture, enough to demonstrate grouping, search and tabs. The full
 * pack generated from Unicode CLDR is a separate entry point.
 *
 * The shape is the demo's own: the list projects whatever you render, so it
 * never sees this type.
 */
export interface Emoji {
    readonly value: string;
    readonly name: string;
    readonly tags?: readonly string[];
}

export interface EmojiGroup {
    readonly label: string;
    readonly icon: string;
    readonly items: readonly Emoji[];
}

export const EMOJI: readonly EmojiGroup[] = [
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
            },
            {
                value: '👍',
                name: 'thumbs up',
                tags: ['+1', 'hand', 'like', 'yes'],
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
