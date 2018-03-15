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
                                :options="optionsPre"
                                :hide-selected="true"
                                :preserve-search="true"
                                v-model="actividad.prerrequisito"></Multiselect>
                    </div>
                    <div class="form-group">
                        <label>Duracion <span class="is-danger">*</span></label>
                        <vue-numeric
                                class="form-control"
                                placeholder="Dur./Mes"
                                currency="Mes"
                                separator=","
                                v-bind:min="1"
                                v-bind:max="48"
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
                                v-bind:max="90000000"
                                v-bind:minus="false"
                                v-model="actividad.costo"></vue-numeric>
                    </div>
                    <button v-on:click.prevent="validateErrors" class="btn btn-primary btn-block">Agregar</button>
                </form>
            </div>
        </div>
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
                actividad: {}
            }
        },
        methods: {
            validateErrors(){
                this.$validator.validateAll().then((valid) => {

                    if(this.notHasPropertyActividad()){
                        return false;
                    }

                    if(this.esActividadRepetida(this.actividad)){
                        return this.addActivity(valid);
                    }

                    return alert('actividad repetida elije otra por favor...');
                });
            },
            addActivity(valid){
                if (valid) {
                    this.actividadUpperCase();
                    this.issetDuracion();
                    this.issetCoste();
                    this.$store.commit('ADD_ACTIVITY', this.actividad);
                    this.limpiarActividad();
                    return true;
                }
                return true;
            },
            notHasPropertyActividad(){
              return ! this.actividad.hasOwnProperty('actividad');
            },
            esActividadRepetida(actividad){
                return this.showActivities.findIndex(obj => obj.actividad === actividad.actividad.toUpperCase()) === -1;
            },
            limpiarActividad(){
                this.actividad = {};
                this.$validator.reset();
            },
            actividadUpperCase(){
                this.actividad.actividad = this.actividad.actividad.toUpperCase();
            },
            issetDuracion(){
                if(!this.actividad.hasOwnProperty('duracion')){
                    this.actividad.duracion = 1;
                }
            },
            issetCoste(){
                if(!this.actividad.hasOwnProperty('costo')){
                    this.actividad.costo = 1;
                }
            }
        },
        computed: {
            optionsPre(){
                let options = [];

                this.showActivities.forEach(function(element) {
                    options.push(element.actividad);
                });
                return options;
            },
            ...mapGetters([
                'showActivities'
            ])
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    .center-text {
        text-align: center;
    }
</style>