<template>
        <div class="modal fade" id="EditActivity" tabindex="-1" role="dialog"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar actividad</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                                   readonly
                                   placeholder="Actividad"
                                   name="actividad_edit"
                                   v-model="actividad.id"
                                   v-validate="'required|min:1|max:1|alpha'">
                            <span v-show="errors.has('actividad')" class="help is-danger">{{ errors.first('actividad') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Prerrequisito <span>(Opcional)</span></label>
                            <Multiselect
                                    :disabled="true"
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
                                    name="duracion_edit"
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
                                    name="coste_edit"
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Multiselect from 'vue-multiselect'

    export default {
        name: "EditActivity",
        components: { Multiselect },
        data(){
            return {
                actividad: {},
            }
        },
        methods: {

        },
        watch: {
            editActivity (data){
                this.actividad = data;
            }
        },
        computed: {
            ...mapGetters([
                'selectOptions',
                'optionDuration',
                'editActivity'
            ])
        },

    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>