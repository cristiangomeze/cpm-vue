<template>
    <div class="col-md-4" id="formulario">
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <h5 class="card-title center-text">Agregar Actividades</h5>
                <form>
                    <div class="form-group">
                        <label>Actividad <span class="is-danger">*</span></label>
                        <input type="text" class="form-control"
                               placeholder="Actividad"
                               name="actividad"
                               v-model="actividad.actividad"
                               v-validate="'required|min:1|max:1|alpha'">
                        <span v-show="errors.has('actividad')" class="help is-danger">{{ errors.first('actividad') }}</span>
                    </div>
                    <div class="form-group">
                        <label>Prerrequisito</label>
                        <Multiselect
                                placeholder="Prerrequisito"
                                name="prerrequisito"
                                :multiple="true"
                                :options="selectOptions"
                                :hide-selected="true"
                                :preserve-search="true"
                                v-model="actividad.prerrequisito"></Multiselect>
                    </div>
                    <div class="form-group">
                        <label>Duración <span class="is-danger">*</span></label>
                        <multiselect
                                v-model="value"
                                :options="options"
                                :searchable="false"
                                :close-on-select="false"
                                :show-labels="false"
                                placeholder="Selecionar duración">
                        </multiselect>
                        <br>
                        <vue-numeric
                                class="form-control"
                                v-bind:placeholder="showDuration"
                                v-bind:currency="showDuration"
                                separator=","
                                v-bind:min="1"
                                v-bind:minus="false"
                                v-model="actividad.duracion"></vue-numeric>
                    </div>
                    <div class="form-group">
                        <label>Costo <span class="is-danger">*</span></label>
                        <vue-numeric
                                class="form-control"
                                placeholder="Cost./Dur."
                                currency="RD $"
                                separator=","
                                v-bind:min="1"
                                v-bind:max="999999999"
                                v-bind:minus="false"
                                v-model="actividad.costo"></vue-numeric>
                    </div>
                    <button v-on:click.prevent="validateErrors" class="btn btn-primary btn-block">Agregar</button>
                </form>
            </div>
        </div>
        <button v-on:click="reiniciar" class="btn btn-info btn-block">Reiniciar</button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Multiselect from 'vue-multiselect'
    export default {
        name: "formulario",
        components: { Multiselect },
        data(){
            return {
                actividad: {
                    prerrequisito: null,
                    costo: 1,
                    duracion: 1,
                },
                value: '',
                options: ['Segundos', 'Minutos', 'Horas', 'Dias', 'Semanas', 'Meses', 'Trimestres', 'Años']
            }
        },
        methods: {
            reiniciar(){
                location.reload()
            },
            validateErrors(){
                this.$validator.validateAll().then((valid) => {
                    if(valid){
                        return this.createActivity();
                    }
                });
            },
            createActivity(){
                this.$store.dispatch("createActivity", this.actividad).catch(error => {
                    alert(error);
                });
                this.limpiarActividad();
            },
            limpiarActividad(){
                this.actividad = {
                    costo: 1,
                    duracion: 1,
                    prerrequisito: null,
                };
                this.$validator.reset();
            },
        },
        computed: {
            ...mapGetters([
                'showActivities',
                'selectOptions',
                'showDuration'
            ])
        },
        watch: {
            value: function (val) {
                this.$store.dispatch("selectDuration", {'duracion': val});
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