/**
 * jest-runners-groups
 * @group a11y
 */

import { a11yBasicTest } from '../../testing/a11y';
import { Div } from './Div';

describe('Div', () => {
  a11yBasicTest(Div);
});
