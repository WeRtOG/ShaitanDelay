import { MockKeyboardEvent } from '../../events/MockKeyboardEvent';
import { handleKeyDown } from './RoveFocus';

let keyboardArrowUpEvent = new MockKeyboardEvent('keydown', 'ArrowUp');
let keyboardArrowDownEvent = new MockKeyboardEvent('keydown', 'ArrowDown');
let keyboardArrowLeftEvent = new MockKeyboardEvent('keydown', 'ArrowLeft');
let keyboardArrowRightEvent = new MockKeyboardEvent('keydown', 'ArrowRight');

describe('Rove focus in vertical mode', () => {
    let size = 3;
    let focus = 0;
    let vertical = true;

    function setFocus(newFocus: number) {
        focus = newFocus;
    }

    function triggerRoveKeydown(e: MockKeyboardEvent) {
        handleKeyDown({
            e: e,
            vertical: vertical,
            multidimensional: false,
            col: 1,
            size: size,
            currentFocus: focus,
            setCurrentFocus: setFocus,
        });
    }

    test('keyboard control working correctly', () => {
        triggerRoveKeydown(keyboardArrowUpEvent);
        expect(focus).toBe(0);

        triggerRoveKeydown(keyboardArrowDownEvent);
        expect(focus).toBe(1);

        triggerRoveKeydown(keyboardArrowDownEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowUpEvent);
        expect(focus).toBe(1);

        triggerRoveKeydown(keyboardArrowDownEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowLeftEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowRightEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowDownEvent);
        expect(focus).toBe(2);
    });
});

describe('Rove focus in horizontal mode', () => {
    let size = 3;
    let focus = 0;
    let vertical = false;

    function setFocus(newFocus: number) {
        focus = newFocus;
    }

    function triggerRoveKeydown(e: MockKeyboardEvent) {
        handleKeyDown({
            e: e,
            vertical: vertical,
            multidimensional: false,
            col: 1,
            size: size,
            currentFocus: focus,
            setCurrentFocus: setFocus,
        });
    }

    test('keyboard control working correctly', () => {
        triggerRoveKeydown(keyboardArrowLeftEvent);
        expect(focus).toBe(0);

        triggerRoveKeydown(keyboardArrowRightEvent);
        expect(focus).toBe(1);

        triggerRoveKeydown(keyboardArrowRightEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowLeftEvent);
        expect(focus).toBe(1);

        triggerRoveKeydown(keyboardArrowRightEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowDownEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowUpEvent);
        expect(focus).toBe(2);

        triggerRoveKeydown(keyboardArrowRightEvent);
        expect(focus).toBe(2);
    });
});
