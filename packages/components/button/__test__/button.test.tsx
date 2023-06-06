import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import Button from '../src/button.vue';
// The component to test
describe('test button', () => {
  it('create', () => {
    const wrapper = mount(() => <Button type="primary" />);
    expect(wrapper.classes()).toContain('sy-button--primary');
  });
});
