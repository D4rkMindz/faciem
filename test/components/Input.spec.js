import { shallowMount } from '@vue/test-utils';
import VInput from '@/components/form/VInput';

describe('VInput', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(VInput, {
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
