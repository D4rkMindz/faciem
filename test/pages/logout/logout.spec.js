import { mount } from '@/test/helper';
import LogoutPage from '@/pages/logout/index.vue';
import store from '@/test/auth-store';

describe('/logout', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(LogoutPage, store);
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it('redirects to home mount', () => {
    const wrapper = mount(LogoutPage, store);
    expect(wrapper.vm.$router.push).toBeCalledWith('/');
  });
});
