<template>
    <main>
        <h1>Resumen del proyecto</h1>
        <hr>
        <h5> <b>Ruta Critica:</b> {{ getCriticalRoute }}</h5>
        <hr>
        <h5> <b> {{ optionDuration }} Total:</b> {{ totalDuration }}</h5>
        <hr>
        <h5> <b>Costo Total:</b> {{ totalCost | currency }}</h5>
        <hr>
        <h5> <b>Costo Total Convertido {{ showConversion }} :</b> {{ totalCostConvert | currency }} </h5>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Resume",
        methods: {
            criticalRoute() {
                let rutaCritica = '';
                let tiempoPrimero = null;
                let tiempoUltimo = null;

                if (this.isNotEmptyActivities) {

                    this.showActivities.slice().forEach(actividad => {
                        tiempoPrimero = actividad.early_finish - actividad.late_finish;
                        tiempoUltimo = actividad.late_start - actividad.early_start;
                        if (tiempoPrimero === 0 && tiempoUltimo === 0) {
                            rutaCritica += actividad.id + ' ';
                        }
                    });

                    return rutaCritica;
                }

                return 'No hay ruta critica'

            },
        },
        computed: {
            getCriticalRoute() {
                return this.criticalRoute();
            },
            ...mapGetters([
                'optionDuration',
                'isNotEmptyActivities',
                'showActivities',
                'totalDuration',
                'totalCost',
                'totalCostConvert',
                'showConversion'
            ])
        }
    }
</script>

<style scoped>

</style>