import Vue from 'vue';

import Stars from '@/components/form/Stars';
import VSelect from '@/components/form/VSelect';
import VInput from '@/components/form/VInput';
import FileInput from '@/components/form/FileInput';
import AddeableInput from '@/components/form/AddeableInput';
import Player from '@/components/Player';

Vue.component('player', Player);
Vue.component('stars', Stars);
Vue.component('v-select', VSelect);
Vue.component('v-input', VInput);
Vue.component('file-input', FileInput);
Vue.component('addeable-input', AddeableInput);
