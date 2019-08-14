<template>
  <div class="container mx-auto emailtoken flex flex-wrap">
    <div class="block lg:inline-block w-3/4 p-6 lg:w-3/12 mx-auto lg:mr-auto">
      <img src="/img/almost-done.svg"
           alt="Thank you for signing up at venovum. Please finish your registration, you're almost done" />
    </div>

    <div class="block lg:inline-block bg-white shadow w-11/12 lg:w-8/12 mx-auto p-6 mx-auto lg:ml-auto">
      <h1 class="text-center lg:text-left title">
        Almost done
      </h1>
      <p class="text">
        Please fill out the missing fields to complete your registration
      </p>

      <div class="form">
        <transition name="fade"
                    mode="out-in"
                    :duration="500">
          <div v-if="step === 1"
               key="step-1"
               class="step step-1">
            <Input id="first-name"
                   v-model="firstname"
                   label="First name *" />

            <Input id="middle-name"
                   v-model="middlename"
                   label="Middle name" />

            <Input id="last-name"
                   v-model="lastname"
                   label="Last name *" />

            <div class="text-right">
              <button class="button w-full lg:w-auto"
                      @click="save">
                Save
              </button>
            </div>
          </div>

          <div v-else-if="step === 2"
               key="step-2"
               class="step step-2">
            <Input id="username"
                   v-model="username"
                   label="Username *" />

            <Input id="password"
                   v-model="password"
                   type="password"
                   label="Password" />

            <div class="flex flex-wrap">
              <button class="button outline w-full lg:w-1/3 mr-auto"
                      @click="back">
                Back
              </button>

              <button class="button w-full lg:w-1/3"
                      @click="finish">
                Finish
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Input from '@/components/form/Input';

const { mapActions, mapGetters } = createNamespacedHelpers('registration');
export default {
  name: 'EmailTokenPage',
  components: {
    Input,
  },
  data: () => {
    return {
      step: 1,
      emailtoken: null,
      username: '',
      firstname: '',
      middlename: '',
      lastname: '',
      birthdate: '',
      password: '',
    };
  },
  created() {
    this.emailtoken = this.$router.currentRoute.params.emailtoken;
  },
  methods: {
    ...mapActions([
      'register',
    ]),
    ...mapGetters([
      'isRegistering',
      'isRegistered',
      'hasError',
      'emailToken',
      'getMostCurrentError',
    ]),
    finish() {
      this.register({
        emailToken: this.emailToken,
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        password: this.password,
      });
    },
    save() {
      this.step = 2;
    },
    back() {
      this.step--;
    },
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to, .fade-leave-active {
    opacity: 0;
  }
</style>
