import { mount } from '@/test/helper';
import LoginPage from '@/pages/login/index.vue';
import store from '@/test/auth-store';

describe('/login', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(LoginPage, store);
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it('redirects to watch after successful authentication', () => {
    const wrapper = mount(LoginPage, store);
    wrapper.vm.authenticate().then(() => {
      expect(wrapper.vm.$router.push).toBeCalledWith('/watch');
    });
  });

  it('does not redirect after unsuccessful authentication', () => {
    const wrapper = mount(LoginPage, store);
    wrapper.vm.authenticate().then(() => {
      expect(wrapper.vm.$router.push).toBeCalledTimes(0);
    });
  });
});
