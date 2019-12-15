<script>
export default {
  name: 'BaseInput',
  model: {
    event: 'modified',
  },
  props: {
    label: {
      default: 'FORM INPUT',
      type: String,
      required: true,
    },
    id: {
      default: 'input',
      type: String,
      required: false,
    },
    value: {
      default: '',
      type: [String, Number, Object],
      required: false,
    },
    validate: {
      default: () => [],
      type: Function,
      required: false,
    },
    errors: {
      default: () => [],
      type: Array,
      required: false,
    },
  },
  data: function () {
    return {
      touched: false,
      classes: '',
      inputValue: this.value,
    };
  },
  watch: {
    errors: function () {
      this.classes = this.errors.length === 0 ? 'ok' : 'error';
    },
  },
  methods: {
    onBlur() {
      this.touched = true;
      this.emit();
    },
    onInput(event) {
      event.preventDefault();
      this.$emit('modified', this.inputValue);

      if (!this.touched) {
        this.classes = '';
        return;
      }
      this.emit();
    },
    emit() {
      this.$emit('validate', this.inputValue);
    },
  },
};
</script>
