import moment from 'moment';
import { mount } from '@/test/helper';
import EmailTokenPage from '@/pages/signup/_emailtoken.vue';
import store from '@/test/registration-store';

describe('/signup/_emailtoken', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(EmailTokenPage, store);
    expect(wrapper.isVisible()).toBeTruthy();
  });

  describe('has a validateLength method that', () => {
    it('returns an empty array per default', () => {
      const wrapper = mount(EmailTokenPage, store);
      expect(wrapper.vm.validateLength('test', 'field', 0).length).toBe(0);
    });
    it('returns an array with one error if the string is too short', () => {
      const wrapper = mount(EmailTokenPage, store);
      expect(wrapper.vm.validateLength('test', 'field', 10)).toEqual(['field is not long enough. Minimum 10 letters']);
    });
    it('returns an array with one error if the string is too long', () => {
      const wrapper = mount(EmailTokenPage, store);
      expect(wrapper.vm.validateLength('test', 'field', 0, 2)).toEqual(['field exceeds the maximum length. Please keep it shorter than 2 characters']);
    });
  });

  describe('has a validateBirthday method that', () => {
    it('returns an empty array per default on a valid birthdate (today - 18 years in dd.mm.yyyy is valid)', () => {
      const wrapper = mount(EmailTokenPage, store);
      wrapper.setData({
        birthdate: moment().subtract(18, 'years').format('DD.MM.YYYY'),
      });
      wrapper.vm.validateBirthdate();
      expect(wrapper.vm.errors.birthdate.length).toBe(0);
    });
    it('returns an array with one error if the date is not properly formatted', () => {
      const wrapper = mount(EmailTokenPage, store);
      wrapper.setData({
        birthdate: moment().subtract(18, 'years').format('DD.MM.YY'),
      });
      wrapper.vm.validateBirthdate();
      expect(wrapper.vm.errors.birthdate.length).toBe(1);
      expect(wrapper.vm.errors.birthdate[0]).toBe('The date must match dd.mm.yyyy format');
    });
    it('returns an array with one error if the date is within 18 years', () => {
      const wrapper = mount(EmailTokenPage, store);
      wrapper.setData({
        birthdate: moment().subtract(18, 'years').add(1, 'day').format('DD.MM.YYYY'),
      });
      wrapper.vm.validateBirthdate();
      expect(wrapper.vm.errors.birthdate.length).toBe(1);
      expect(wrapper.vm.errors.birthdate[0]).toBe('You need to be at least 18 years old to use venovum');
    });
  });

  describe('has a finish method that', () => {
    it('does nothing per default (because signup is disabled)', () => {
      const wrapper = mount(EmailTokenPage, store);
      wrapper.vm.finish();
      expect(store.modules.registration.actions.register).toBeCalledTimes(0);
    });
    it('registers you if all data is valid', () => {
      const wrapper = mount(EmailTokenPage, store);
      wrapper.setData({
        firstname: 'John',
        middlename: '',
        lastname: 'Doe',
        birthdate: moment().subtract(18, 'years'),
        username: 'john.doe',
        password: 'Secret1!',
      });
      wrapper.vm.finish();
      expect(store.modules.registration.actions.register).toBeCalled();
      expect(wrapper.vm.$store.getters.hasError).toBeFalsy();
      // TODO enable this line below again if you know how it works
      // expect(wrapper.vm.$router.push).toBeCalledWith('/signup/thank-you');
    });
  });
});
