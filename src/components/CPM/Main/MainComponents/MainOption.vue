<template>
    <main>
        <div class="modal" id="Options" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cuadro de opciones</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                        <label>Mostrar duración en: </label>
                        <multiselect
                                v-model="duracion"
                                :options="optionsDuracion"
                                :searchable="false"
                                :close-on-select="false"
                                :show-labels="false"
                                placeholder="Selecionar valor">
                        </multiselect>
                        </div>
                        <div class="form-group">
                            <label>Gastos Administrativos: </label>
                            <vue-numeric
                                    class="form-control"
                                    name="costo"
                                    currency="$"
                                    separator=","
                                    v-bind:min="0"
                                    v-bind:max="10000000"
                                    v-bind:minus="false"
                                    :empty-value="0"
                                    v-model="expenses"></vue-numeric>
                        </div>
                        <div class="form-group">
                            <label>Convertir Moneda: </label>
                            <multiselect
                                    v-model="conversion"
                                    :options="optionsConversion"
                                    :searchable="false"
                                    :close-on-select="false"
                                    :show-labels="false"
                                    placeholder="Selecionar valor">
                            </multiselect>
                        </div>
                        <div class="form-group">
                            <label>Tasa de cambio: </label>
                            <vue-numeric
                                    class="form-control"
                                    name="costo"
                                    currency="$"
                                    decimalSeparator="."
                                    v-bind:precision="precision"
                                    separator=","
                                    v-bind:min="0"
                                    v-bind:max="10000000"
                                    v-bind:minus="false"
                                    v-model="tasa"></vue-numeric>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-outline-info btn-block" data-toggle="modal" data-target="#Options">
            Opciones
        </button>
    </main>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Multiselect from 'vue-multiselect'
    export default {
        name: "MainOption",
        components: { Multiselect },
        data(){
            return {
                precision: 2,
                duracion: '',
                expenses: 0,
                conversion: '',
                tasa: 49.53,
                optionsDuracion: ['Segundos', 'Minutos', 'Horas', 'Dias', 'Semanas', 'Meses', 'Trimestres', 'Años'],
                optionsConversion: ['DOP - Peso dominicano', 'USD - Dólar americano']
            }
        },
        computed: {
            ...mapGetters([
                'selectOptions',
                'optionDuration'
            ])
        },
        watch: {
            expenses: function (val) {
                this.$store.dispatch("addAdministrativeExpenses", {'expenses': val});
            },
            duracion: function (val) {
                this.$store.dispatch("selectDuration", {'duracion': val});
            },
            conversion: function (val) {
                this.$store.dispatch("selectConversion", {'conversion': val});
            },
            tasa: function (val) {
                this.$store.dispatch("tasa", {'tasa': val});
            },
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    .center-text {
        text-align: center;
    }
</style>
