export class MockKeyboardEvent {
    type: string;
    key: string;

    constructor(type: string, key: string) {
        this.type = type;
        this.key = key;
    }

    preventDefault() {}
}
