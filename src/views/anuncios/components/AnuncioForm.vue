<template>
    <FormComp :title="title" :post-url="postUrl" :put-url="putUrl" :on-send="onSend" :on-send-data-form="onSend"
        :on-send-files="onSendFiles" :form-errors="formErrors" :is-data-form="true" :form="form" :form-types="formTypes"
        :wait-time="3000" :prev-success="prevSuccess" :is-edit="isUpdate">
        <FormField label="FORMULARIO DE REGISTRO DE COMUNICADOS:">
            <div class="gap-y-4">
                <div class="flex flex-wrap gap-y-4">
                    <div class="flex w-full flex-nowrap">
                        <div class="flex flex-col w-full justify-around p-1 lg:gap-y-4">
                            <div class="flex w-full justify-between flex-wrap">
                                <div class="w-1/3">
                                    <div class="flex">
                                        <SelectForm name="modulo" v-model="selectedModulo"
                                            :options="modulos.map(m => m['name'].toUpperCase())" :required="true"
                                            label="Modulo" :errors="formErrors['id_module']"
                                            :form-types="formTypes['id_module']" :on-set="onChangeModulo"
                                            class-name="w-52" />
                                    </div>
                                </div>
                                <div class="w-1/3">
                                    <div class="flex">
                                        <SelectForm name="id_type" v-model="selectedTipo"
                                            :options="tipos.map(t => t['name'].toUpperCase())" :required="true"
                                            label="Tipo" :errors="formErrors['id_type']"
                                            :form-types="formTypes['id_type']" :on-set="onChangeTipo"
                                            class-name="w-52" />
                                    </div>
                                </div>
                                <div class="flex w-1/3">
                                    <InputForm name="title" v-model="form.title" type="text" placeholder="Titulo"
                                        label="Titulo" :required="true" :errors="formErrors['title']"
                                        :form-types="formTypes['title']" class-name="" :is-to-upper-case="false" />
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex w-full">
                                    <InputForm name="description" v-model="form.description" type="textarea"
                                        placeholder="Descripcion" label="Descripcion" :required="true"
                                        :errors="formErrors['description']" :form-types="formTypes['description']"
                                        class-name="w-full mb-20" :is-to-upper-case="false" />
                                    <!-- [&>p]:text-red-600 -->
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <FileForm name="file" label="Cargar archivo PDF"
                                        :files-allowed="filesAllowed" v-model="form.file" :errors="formErrors['file']"
                                        :form-types="formTypes['file']" :max-size-file="MAX_FILE_SIZE">
                                    </FileForm>
                                </div>
                                <!-- <div v-if="form.file">
                                    <PdfViewer :pdf-url="changePDF"></PdfViewer>
                                </div>
                                <div>AAAA: {{ changePDF() }}</div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormField>
    </FormComp>
</template>
<script>
import FormField from '@/components/ComponentsOne/FormField.vue';
import InputForm from '@/components/forms/input/InputForm.vue';
import SelectForm from '@/components/forms/select/SelectForm.vue';
import FormComp from '@/components/forms/FormComp.vue';
import FileForm from "@/components/forms/file/FileForm.vue";
import { validationInputField } from '@/components/forms/validationInput';
import { ref, reactive, onBeforeMount ,onMounted, watch } from 'vue';
import { MAX_FILE_SIZE } from '@/stores/constants/constantsRENCA';
import { MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT, MAX_LENGTH_INPUT, MAX_DESCRIPTION_INPUT, MAX_LONG_DESCRIPTION_INPUT } from '@/stores/constants/pages';
import { APIS } from '@/stores/constants/urlsBackEnd';
import { getAnuncio } from '@/services/anuncios';
import { getModulos } from "@/services/modulesAnuncios";
import { getTipos } from "@/services/tiposAnuncios";
import { useRoute } from 'vue-router';
import { decryptMe } from '@/stores/utils/encryption';
import PdfPreview from '@/views/cgo/components/PdfPreview.vue';
import PdfViewer from '@/components/pdf-visualizer/PdfViewer.vue';

export default {
    components: {
        FormField,
        SelectForm,
        InputForm,
        FileForm,
        PdfViewer,
        FormComp
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        user: {
            type: String,
            default: "renca"
        },
        prevSuccess: {
            type: Function,
            default: () => { }
        }
    },
    setup(props) {
        const route = useRoute();
        const filesAllowed = [".pdf"];
        const id = route.params.item ? Number(route.params.item) : null;
        const isUpdate = ref(props.isUpdate);
        if (id !== null) {
            isUpdate.value = true;
        }
        const form = reactive({
            id_module: '',
            id_type: '',
            title: '',
            description: '',
            file: '',
        });

        const formTypes = reactive({
            id_module: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
            id_type: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
            title: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
            description: validationInputField("text", true, MAX_LONG_DESCRIPTION_INPUT),
        });
        const formErrors = ref({});
        const selectedModulo = ref({});
        const selectedTipo = ref({});
        const modulos = ref([]);
        const tipos = ref([]);

        const loadAnuncio = async () => {
            console.log(id)
            if (id !== null) {
                const anuncio = await getAnuncio(id);
                selectedModulo.value = modulos.value.find(m => m["id"] == anuncio.id_module)["name"];

                selectedTipo.value = tipos.value.find(m => m["id"] == anuncio.id_type)["name"];
                form.id = anuncio.id;
                form.id_type = anuncio.id_type;
                form.id_module = anuncio.id_module;
                form.title = anuncio.title;
                form.description = anuncio.description;
            }
        };

        const loadModulos = async () => {
            modulos.value = await getModulos();
        };

        const loadTipos = async () => {
            tipos.value = await getTipos();
        };

        onBeforeMount(() => {
            loadModulos();
            loadTipos();
        })
        onMounted(() => {
            loadAnuncio();
            
        });

        function changePDF() {
            if (form.file) {
                const url = URL.createObjectURL(form.file)
                console.log(url, form.file);
                return url;
            }
        }
        function onChangeModulo(name) {
            
            const modulo = modulos.value.find(s => s["name"].toUpperCase() === name);
            if (modulo) {
                form.id_module = modulo["id"];
            }
        }

        function onChangeTipo(name) {
            const tipo = tipos.value.find(s => s["name"].toUpperCase() === name);
            if (tipo) {
                form.id_type = tipo["id"];
            }
        }

        function onSend(form) {
            return {
                "title": form.title,
                "description": form.description,
                "id_type": form.id_type,
                "id_module": form.id_module,
                "group_id": 1,
                "menus_ids": [],
                "permissions_ids": []

            }
        }
        function onSendFiles(form) {
            return {
                "file": form.file,
                "filename": form.filename,
            }
        }

        watch(() => form.file,
            (newValue) => {
                form.filename = newValue.name;
            }
        );


        return {
            title: props.title,
            form,
            formTypes,
            formErrors,
            tipos,
            modulos,
            onChangeModulo,
            onChangeTipo,
            postUrl: APIS.ANUNCIOS.POST,
            putUrl: APIS.ANUNCIOS.PUT,
            onSend,
            onSendFiles,
            prevSuccess: props.prevSuccess,
            selectedModulo,
            selectedTipo,
            changePDF,
            isUpdate,
            filesAllowed,
            MAX_FILE_SIZE,
        };
    }
}
</script>