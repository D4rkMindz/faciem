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
};
</script>
