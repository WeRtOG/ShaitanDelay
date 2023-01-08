import { CommonTools } from './CommonTools';

test('check base64', () => {
    expect(CommonTools.base64('test')).toBe('dGVzdA==');
});
