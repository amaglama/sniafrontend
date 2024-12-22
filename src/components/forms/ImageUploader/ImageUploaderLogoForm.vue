<template>
    <div class="flex flex-col justify-start content-center cursor-pointer">
      <input
        type="file"
        accept="image/jpeg"
        @change="handleFileChange"
        ref="fileInput"
        class="hidden"
        :required="required"
      />
      <div
        :class="`flex justify-center items-center w-60 h-60 border-2 border-dashed rounded-md -lg:w-24 ${localErrors.length > 0 ? 'border-warning' : 'border-gray-500'} bg-cover bg-center`"
        :style="{ backgroundImage: `url(${imagePreview})` }"
        @click="triggerFileInput">
        <span v-if="!imagePreview && !errorMessage" class="text-gray-500 text-center">Seleccionar imagen formato .jpg{{ ` ${required ? '*' : ''}` }}</span>
        <span v-if="errorMessage" class="p-2 text-warning w-60 text-center">{{ errorMessage }}</span>
        
      </div>
      <p :class="`text-warning ${localErrors.length > 0 ? '' : 'hidden'}`">
        {{ localErrors.join(', ') }}
      </p>
    </div>
  </template>
  
  <script>
  import {ref, watch} from "vue";
  
  export default {
    name: "ImageUploader",
    props: {
      required: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: null,
      },
      modelValue: {
        type: File,
        default: null,
      },
      errors: {
        type: Array,
        default: []
      },
      formTypes: {
        type: Object,
        default: {}
      },
    },
    setup(props, { emit }){
      const firstTouch = ref(true);
      const localErrors = ref([]); 
      const imagePreview = ref(null);
      const errorMessage = ref(null);
      watch(() => props.errors, (newErrors) => {
        localErrors.value = newErrors || [];
      }, { immediate: true });
  
      const loadInitialPreview = () => {
        if (props.modelValue) {
          const reader = new FileReader();
          reader.onload = () => {
            imagePreview.value = reader.result; // Configura la imagen en base64
          };
          reader.onerror = () => {
            console.error("Error al leer el archivo");
          };
          reader.readAsDataURL(props.modelValue);
        }
      };
      watch(() => 
        props.modelValue,
        (newFile) => {
          if (newFile) {
            loadInitialPreview();
          } else {
            imagePreview.value = null;
          }
        },
        { immediate: true }
      );
  
      function handleFileChange(event) {
        const file = event.target.files[0];
        errorMessage.value = null;
        if (file) {
          if (file.type !== "image/jpeg") {
            errorMessage.value = "El archivo debe ser una imagen JPG.";
            imagePreview.value = null;
            emit("update:modelValue", null); // Limpia el valor en el padre
            return;
          }
          
          const reader = new FileReader();
          reader.onload = (e) => {
            
            const img = new Image();
            img.onload = () => {
              if (img.width < 250 || img.height < 250) {
                errorMessage.value = "La imagen debe tener más resolución. (Sugerido 800 x 800 píxeles o menor)";
                imagePreview.value = null;
                emit("update:modelValue", null); 
                return;
              }
              if (img.width > 800 || img.height > 800) {
                errorMessage.value = "(Sugerido 800 x 800 píxeles o menor)";
                imagePreview.value = null;
                emit("update:modelValue", null); 
                return;
              }
              this.imagePreview = e.target.result;
              emit("update:modelValue", file); 
            };
            img.onerror = () => {
              errorMessage.value = "El archivo no es una imagen válida.";
              emit("update:modelValue", null);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          imagePreview.value = null;
          emit("update:modelValue", null); // Limpia el valor en el padre
        }
      }
  
      const triggerFileInput = () => {
        document.querySelector('input[type="file"]').click();
      };
      return {
        firstTouch,
        localErrors,
        imagePreview,
        handleFileChange,
        triggerFileInput,
        errorMessage
      };
    },
    emits: ["update:modelValue"], // Emit para actualizar el modelValue
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
    },
  };
  </script>
  