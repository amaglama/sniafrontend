<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/ComponentsOne/BaseButton.vue'
import BaseButtons from '@/components/ComponentsOne/BaseButtons.vue'
import CardBox from '@/components/ComponentsOne/CardBox.vue'
import OverlayLayer from '@/components/ComponentsOne/OverlayLayer.vue'
import CardBoxComponentTitle from '@/components/ComponentsOne/CardBoxComponentTitle.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button: {
    type: String,
    default: 'secondary'
  },
  buttonLabel: {
    type: String,
    default: 'Done'
  },
  cancelLabel: {
    type: String,
    default: "CANCELAR"
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  onConfirm: {
    type: Function,
    default: () => {}
  },
  onCancel: {
    type: Function,
    default: () => {}
  },
  className: {
    type: String,
    default: "w-full h-fit md:w-3/5 lg:w-2/5 xl:w-4/12"
  },
  onDisabledConfirm: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

const confirm = () => {
  props.onConfirm();
  confirmCancel('cancel');
}

const cancel = () => {
  props.onCancel();
  confirmCancel('cancel');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      :class="`shadow-lg max-h-modal z-50 ${className} overflow-y-auto`"
      is-modal
    >
      <CardBoxComponentTitle :title="title" >
        <BaseButton
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />
      </CardBoxComponentTitle>

      <div class="space-y-">
        <slot />
      </div>

      <template #footer>
        <BaseButtons class="flex justify-center items-center">
          <BaseButton :label="buttonLabel" :color="button" @click="confirm" :disabled="onDisabledConfirm" />
          <BaseButton v-if="hasCancel" :label="cancelLabel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
