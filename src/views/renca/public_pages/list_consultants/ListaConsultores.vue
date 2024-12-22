<template>
    <div>
        TABLE {{ filterType }}
    </div>
</template>
<script>
    export default {
        name: "ListaConsultores",
        components: {

        },
        props:{
            filterType: {
                type: String,
                default: "personales"
            },
            setup(){
                return { 
                    filterType: props.filterType
                }
            }
        }
    }
</script>