import { COLUMN_WIDTH, GUTTER_SIZE } from '../src/constants';
import { moduleW2LocalWidth } from '../src/helpers';

describe('helpers', () => {
  test('moduleW2LocalWidth', () => {
    const w = 2;
    expect(moduleW2LocalWidth(w)).toEqual(w * COLUMN_WIDTH - GUTTER_SIZE);
  });
});
