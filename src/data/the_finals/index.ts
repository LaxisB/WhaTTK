import type { Game } from '../../lib/domain';
import * as tags from './tags';
import * as weapons from './weapons';

export default {
    name: 'The Finals',

    targetTypes: [
        {
            name: 'Light',
            health: 150,
            tags: [tags.LIGHT],
        },
        {
            name: 'Medium',
            health: 250,
            tags: [tags.MEDIUM],
        },
        {
            name: 'Heavy',
            health: 350,
            tags: [tags.HEAVY],
        },
    ],
    weapons: Object.values(weapons),
} satisfies Game;
