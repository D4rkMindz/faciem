import { mount } from '@/test/helper';
import WatchPage from '@/pages/watch/index.vue';
import store from '@/test/auth-store';

describe('/watch', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(WatchPage, store);
    expect(wrapper.isVisible()).toBeTruthy();
  });
});
