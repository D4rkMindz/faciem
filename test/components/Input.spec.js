import { shallowMount } from '@vue/test-utils';
import Input from '@/components/form/Input';

describe('Input', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Input, {
      propsData: {
        value: 'value',
        id: 'some-id',
        label: 'some-label',
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
})
;
