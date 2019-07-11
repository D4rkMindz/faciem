import { mount } from '@/test/helper';
import Navbar from '@/components/layout/Navbar.vue';

describe('Navbar', () => {
  it('should ', function () {

  });

  it('is a Vue instance', () => {
    const wrapper = mount(Navbar);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
