import { mount } from '@/test/helper';
import RootPage from '@/pages/index.vue';

describe('/', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(RootPage);
    expect(wrapper.isVisible()).toBeTruthy();
  });
});
