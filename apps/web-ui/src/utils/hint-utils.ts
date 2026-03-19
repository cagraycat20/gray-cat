import { hints, HintType } from '../core';
import { Hint } from '../types';

export function isHintHidden(type: HintType, hiddenHints: Array<Hint['id']>): boolean {
    const hint = hints.get(type);

    if (!hint) {
        return false;
    }

    return Boolean(hiddenHints.find((iter) => iter === hint.id));
}
