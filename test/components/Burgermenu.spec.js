import { mount } from '@/test/helper';
import BurgerMenu from '@/components/layout/BurgerMenu';
import store from '@/test/auth-store';

describe('BurgerMenu', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(BurgerMenu, store);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
})
;
