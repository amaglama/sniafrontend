<template>
    <CardBoxModal v-model="isLoginActive" title="LOGEAR USUARIO RENCA" button="danger" button-label="CERRAR" class-name="h-[65vh]">
        <LoginRENCAUser></LoginRENCAUser>
    </CardBoxModal>
    <div class="flex flex-col items-center mt-8 h-fit gap-y-2">
        <div class="flex w-5/6">
            <CardDropDown
                title="VISTOS Y CONSIDERADOS:">
                <div class="flex flex-col gap-y-4 p-4 text-justify">
                    <p v-for="item in seenAndConsidered">
                        {{ item }}
                    </p>           
                </div>
            </CardDropDown>
        </div>
        <div class="flex w-5/6">
            <CardDropDown
                title="POR TANTO:">
                <div class="flex flex-col gap-y-4 p-4 text-justify">
                    <p v-for="item in therefore">
                        {{ item }}
                    </p>           
                </div>
            </CardDropDown>
        </div>
        <div class="flex w-5/6">
            <CardDropDown
                title="RESUELVE:">
                <div class="flex flex-col gap-y-4 p-4 text-justify">
                    <p v-for="item in resolved">
                        {{ item }}
                    </p>           
                </div>
            </CardDropDown>
        </div>
    </div>
</template>
<script>
import CardDropDown from '@/components/Cards/CardDropDown.vue';
import CardBoxModal from '@/components/ComponentsOne/CardBoxModal.vue';
import LoginRENCAUser from '../../components/user/LoginRENCAUser.vue';
import { 
    SEEN_AND_CONSIDERED, 
    THEREFORE, 
    RESOLVED
} from '@/stores/constants/constantsRENCApage';
import { ref } from 'vue';

export default{
    components: {
        CardDropDown,
        CardBoxModal,
        LoginRENCAUser
    },
    setup(){
        const isLoginActive = ref(true);
        return {
            seenAndConsidered: SEEN_AND_CONSIDERED,
            therefore: THEREFORE,
            resolved: RESOLVED,
            isLoginActive,
        }
    }
}
</script>