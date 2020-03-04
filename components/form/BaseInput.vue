<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      default: 'FORM INPUT',
      type: String,
      required: false,
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
    errors() { this.setClasses(); },
    touched() { this.$emit('touched', this.touched); },
  },
  mounted() { this.setClasses(); },
  methods: {
    onBlur() {
      this.touched = true;
      this.emitValidation();
    },
    onInput() {
      this.$emit('input', this.inputValue);

      if (this.inputValue.length >= 2) {
        this.touched = true;
      }

      if (!this.touched) {
        this.classes = '';
        return;
      }

      this.emitValidation();
    },
    emitValidation() {
      this.$emit('validate', this.inputValue);
    },
    setClasses() {
      this.classes = this.errors.length === 0 ? !!this.inputValue && this.inputValue.length > 0 ? 'ok' : '' : 'error';
    },
  },
};
</script>
