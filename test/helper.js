import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

/**
 * Mount a vue instance for testing
 * @param {StoreOptions} storeModule
 * @param Instance
 * @return {Wrapper}
 */
export function mount(Instance, storeModule) {
  storeModule = storeModule || {};
  const localVue = createLocalVue();

  localVue.use(Vuex);
  const store = new Vuex.Store(storeModule);

  return shallowMount(Instance, {
    localVue,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    mocks: {
      $router: {
        push: jest.fn(),
      },
    },
    store: store,
  });
}
