import { RegistrationState } from '../../../domain/registration/registration-state';
import { mount } from '@/test/helper';
import SignUpPage from '@/pages/signup/index.vue';
import store from '@/test/registration-store';

describe('/signup', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(SignUpPage, store);
    expect(wrapper.isVisible()).toBeTruthy();
  });

  describe('has a isValidEmail method that', () => {
    it('is false per default', () => {
      const wrapper = mount(SignUpPage, store);
      expect(wrapper.vm.isValidEmail()).toBeFalsy();
    });
    it('is true on a valid email', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.setData({ email: 'test@example.com' });
      expect(wrapper.vm.isValidEmail()).toBeTruthy();
    });
    it('is false on an invalid email', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.setData({ email: 'test@example.c' });
      expect(wrapper.vm.isValidEmail()).toBeFalsy();
    });
    it('is false on an empty email', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.setData({ email: '' });
      expect(wrapper.vm.isValidEmail()).toBeFalsy();
    });
  });

  describe('has a signUpWithEmail method that', () => {
    it('does nothing per default (because signup is disabled)', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.vm.signUpWithEmail();
      expect(store.modules.registration.actions.signUp).toBeCalledTimes(0);
    });
    it('signs up with a valid email', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.setData({ email: 'test@example.com' });
      wrapper.vm.signUpWithEmail();
      expect(store.modules.registration.actions.signUp).toBeCalled();
      expect(wrapper.vm.$store.getters.hasError).toBeFalsy();
      // TODO enable this line below again if you know how it works
      // expect(wrapper.vm.$router.push).toBeCalledWith('/signup/thank-you');
    });
  });

  describe('has a onEmailSignupInput method that', () => {
    it('does nothing per default (because signup is disabled)', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.vm.onEmailSignupInput();
      expect(store.modules.registration.actions.reset).toBeCalledTimes(0);
    });
    it('resets if an error exists', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.commit('registration/SET', { key: 'status', value: RegistrationState.ERROR });
      wrapper.vm.onEmailSignupInput();
      expect(store.modules.registration.actions.reset).toBeCalled();
    });
  });

  describe('has a computed emailClass property that', () => {
    it('exists and is per default an empty string', () => {
      const wrapper = mount(SignUpPage, store);
      expect(wrapper.vm.emailClass).toEqual('');
    });
    it('changes to "ok" if a valid email is given', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.setData({ email: 'test@example.com' });
      expect(wrapper.vm.emailClass).toEqual('ok');
    });
    it('changes to "error" if an invalid email is given', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.setData({ email: 'test@example.c' });
      expect(wrapper.vm.emailClass).toEqual('error');
    });
  });

  describe('has a computed isSignUpDisabled property', () => {
    it('exists and is per default an empty string', () => {
      const wrapper = mount(SignUpPage, store);
      expect(wrapper.vm.isSignUpDisabled).toBeTruthy();
    });
    it('changes to false emailClass is "ok"', () => {
      const wrapper = mount(SignUpPage, store);
      // make the email class change to 'ok'
      wrapper.setData({ email: 'test@example.com' });

      expect(wrapper.vm.isSignUpDisabled).toBeFalsy();
    });
    it('changes to true if the user is signing up', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.commit('registration/SET', { key: 'status', value: RegistrationState.SIGNING_UP });
      expect(wrapper.vm.isSignUpDisabled).toBeTruthy();
    });
    it('changes to false if the user is signed up', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.commit('registration/SET', { key: 'status', value: RegistrationState.SIGNED_UP });
      expect(wrapper.vm.isSignUpDisabled).toBeTruthy();
    });
    it('changes to true if an error exists', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.commit('registration/SET', { key: 'status', value: RegistrationState.ERROR });
      expect(wrapper.vm.isSignUpDisabled).toBeTruthy();
    });
  });

  describe('has a computed signUpClass property', () => {
    it('exists and is per default "disabled"', () => {
      const wrapper = mount(SignUpPage, store);
      expect(wrapper.vm.signUpClass).toEqual('disabled');
    });
    it('changes to "" emailClass is "ok"', () => {
      const wrapper = mount(SignUpPage, store);
      // make the email class change to 'ok'
      wrapper.setData({ email: 'test@example.com' });
      expect(wrapper.vm.signUpClass).toEqual('');
    });
    it('changes to "disabled" if the user is signing up', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.commit('registration/SET', { key: 'status', value: RegistrationState.SIGNING_UP });
      expect(wrapper.vm.signUpClass).toEqual('disabled');
    });
    it('changes to "disabled" if an error exists', () => {
      const wrapper = mount(SignUpPage, store);
      wrapper.commit('registration/SET', { key: 'status', value: RegistrationState.ERROR });
      expect(wrapper.vm.signUpClass).toEqual('disabled');
    });
  });
});
