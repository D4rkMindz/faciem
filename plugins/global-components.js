import Vue from 'vue';

import StarsAnswer from '@/components/campaign/answer/StarsAnswer';
import MultipleChoiceAnswer from '@/components/campaign/answer/MultipleChoiceAnswer';
import TextAnswer from '@/components/campaign/answer/TextAnswer';
import Stars from '@/components/form/Stars';
import VSelect from '@/components/form/VSelect';
import VInput from '@/components/form/VInput';
import VRadioInput from '@/components/form/VRadioInput';
import FileInput from '@/components/form/FileInput';
import AddeableInput from '@/components/form/AddeableInput';
import Player from '@/components/Player';

Vue.component(StarsAnswer.name, StarsAnswer);
Vue.component(MultipleChoiceAnswer.name, MultipleChoiceAnswer);
Vue.component(TextAnswer.name, TextAnswer);
Vue.component('player', Player);
Vue.component('v-stars', Stars);
Vue.component('v-select', VSelect);
Vue.component('v-input', VInput);
Vue.component('v-radio-input', VRadioInput);
Vue.component('file-input', FileInput);
Vue.component('addeable-input', AddeableInput);
