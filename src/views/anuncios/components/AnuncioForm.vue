<template>
    <FormComp :title="title" :post-url="postUrl" :put-url="putUrl" :on-send="onSend" :form-errors="formErrors"
        :is-data-form="false" :form="form" :form-types="formTypes" :wait-time="3000" :prev-success="prevSuccess"
        :is-edit="isUpdate">
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
                                            label="Tipo" :errors="formErrors['id_type']" :form-types="formTypes['id_type']"
                                            :on-set="onChangeTipo" class-name="w-52" />
                                    </div>
                                </div>
                                <div class="flex w-1/3">
                                    <InputForm name="title" v-model="form.title" type="text" placeholder="Titulo"
                                        label="Titulo" :required="true" :errors="formErrors['title']"
                                        :form-types="formTypes['title']" class-name="" />
                                </div>
                            </div>
                            <div class="flex">
                                <div class="flex w-full">
                                    <InputForm name="description" v-model="form.description" type="textarea"
                                        placeholder="Descripcion" label="Descripcion" :required="true"
                                        :errors="formErrors['description']" :form-types="formTypes['description']"
                                        class-name="w-full mb-20" /> 
                                        <!-- [&>p]:text-red-600 -->
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <FileForm name="documentPdf" label="Documento de Identidad.pdf"
                                        :files-allowed="filesAllowed" v-model="form.documentPdf"
                                        :errors="formErrors['documentPdf']"
                                        :form-types="formTypes['documentPdf']"
                                        :max-size-file="MAX_FILE_SIZE" >
                                    </FileForm>
                                </div>
                                <!-- <div v-if="form.documentPdf">
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
import PDFViewer from "@/components/pdf-visualizer/PdfViewer.vue";
import { validationInputField } from '@/components/forms/validationInput';
import { ref, reactive, onMounted, watch } from 'vue';
import { MAX_FILE_SIZE, filesAllowed } from '@/stores/constants/constantsRENCA';
import { MAX_LONG_LENGTH_INPUT, MAX_SHORT_LENGTH_INPUT, MAX_LENGTH_INPUT } from '@/stores/constants/pages';
import { APIS } from '@/stores/constants/urlsBackEnd';
import { getAnuncio } from '@/services/anuncios';
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
            documentPdf:'',
        });

        const formTypes = reactive({
            id_module: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
            id_type: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
            title: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
            description: validationInputField("text", true, MAX_LONG_LENGTH_INPUT),
        });
        const formErrors = ref({});
        const selectedModulo = ref({});
        const selectedTipo = ref({});
        const modulos = ref([{ name: 'Renca', id: 1 }, { name: 'Rentraa', id: 2 },]);
        const tipos = ref([{ name: 'Comunicado', id: 1 }, { name: 'Boletin', id: 2 }, { name: 'Manual', id: 3 },]);

        const loadAnuncio = async () => {
            console.log(id)
            if (id !== null) {
                const anuncio = await getAnuncio(id);
                console.log("ver aqui", anuncio)
                selectedModulo.value = modulos.value.find(m => m["name"].toUpperCase() == anuncio.module.toUpperCase())["name"].toUpperCase();

                selectedTipo.value = tipos.value.find(m => m["name"].toUpperCase() == anuncio.type.toUpperCase())["name"].toUpperCase();
                form.id = anuncio.id;
                form.id_type = anuncio.type;
                form.id_module = anuncio.module;
                form.title = anuncio.title;
                form.description = anuncio.description;
            }
        };

        onMounted(() => {
            loadAnuncio();
        });

        function changePDF(){
            if(form.documentPdf){
            const url = URL.createObjectURL(form.documentPdf)
            console.log(url, form.documentPdf);
            return url;
            }
        }
        function onChangeModulo(name) {
            console.log("change modulo");

            const modulo = modulos.value.find(s => s["name"].toUpperCase() === name);
            if (modulo) {
                form.id_module = modulo["name"];
            }
        }

        function onChangeTipo(name) {
            const tipo = tipos.value.find(s => s["name"].toUpperCase() === name);
            if (tipo) {
                form.id_type = tipo["name"];
            }
        }

        function onSend(form) {
            return {
                "title": form.title,
                "description": form.description,
                "type": form.id_type,
                "module": form.id_module,
                "group_id": 1,
                "menus_ids": [],
                "permissions_ids": []

            }
        }


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