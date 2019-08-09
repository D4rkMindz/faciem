import { mount } from '@/test/helper';
import Navbar from '@/components/layout/Navbar.vue';
import store from '@/test/auth-store';

describe('Navbar', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Navbar, store);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
