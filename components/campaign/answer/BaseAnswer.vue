<script>
import { Question } from '@/domain/campaign/question';

export default {
  name: 'BaseAnswer',
  props: {
    value: {
      type: Question,
      required: true,
    },
  },
};
</script>
