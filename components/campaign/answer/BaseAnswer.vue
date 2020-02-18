<script>
import { Question } from '@/domain/campaign/question';

export default {
  name: 'BaseAnswer',
  props: {
    value: {
      type: [Object, Question],
      required: true,
    },
  },
  methods: {
    /**
     * Emit
     * @param value
     */
    emit(value = null) {
      this.$emit('input', this.value);
    },
  },
};
</script>
