<template>
    <form v-on:submit.prevent="createActivity">
        <div class="modal" id="addActivity" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Crear Actividad</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click.prevent="limpiarActividad">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <div class="form-group">
                                <label>
                                    Actividad
                                    <span class="is-danger">*</span>
                                </label>
                                <input type="text" class="form-control"
                                       placeholder="Actividad"
                                       name="actividad"
                                       v-model="actividad.actividad"
                                       v-validate="'required|min:1|max:1|alpha'">
                                <span v-show="errors.has('actividad')" class="help is-danger">{{ errors.first('actividad') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Prerrequisito <span>(Opcional)</span></label>
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
                                <label>Duracion <span class="is-danger">*</span></label>
                                <vue-numeric
                                        name="duracion"
                                        class="form-control"
                                        v-bind:placeholder="optionDuration"
                                        v-bind:currency="optionDuration"
                                        separator=","
                                        v-validate="'required|numeric|min_value:1|max_value:10000000'"
                                        v-bind:minus="false"
                                        v-model="actividad.duracion"></vue-numeric>
                                <span v-show="errors.has('duracion')" class="help is-danger">{{ errors.first('duracion') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Costo <span class="is-danger">*</span></label>
                                <vue-numeric
                                        name="coste"
                                        class="form-control"
                                        placeholder="Cost./Dur."
                                        currency="$"
                                        separator=","
                                        v-validate="'required|numeric|min_value:1|max_value:10000000'"
                                        v-bind:minus="false"
                                        v-model="actividad.costo"></vue-numeric>
                                <span v-show="errors.has('coste')" class="help is-danger">{{ errors.first('coste') }}</span>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Agregar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click.prevent="limpiarActividad">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-dark btn-block" data-toggle="modal" data-target="#addActivity">
            Agregar actividad
        </button>
    </form>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Multiselect from 'vue-multiselect'

    export default {
        name: "CreateActivity",
        components: { Multiselect },
        data(){
            return {
                actividad: {
                    prerrequisito: null,
                },
            }
        },
        methods: {
            createActivity(){
                this.$validator.validateAll().then((valid) => {
                    if(valid){
                        this.$store.dispatch("createActivity", this.actividad)
                            .then(response => {
                                this.limpiarActividad();
                            })
                            .catch(error => {
                                alert(error);
                            });
                    }
                });
            },
            limpiarActividad(){
                this.actividad = {
                    prerrequisito: null,
                };
                this.$validator.reset();
            },

        },
        computed: {
            ...mapGetters([
                'selectOptions',
                'optionDuration'
            ])
        },
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
