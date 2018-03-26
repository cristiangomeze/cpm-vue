<template>
    <div class="col-md-8" id="resultados" v-if="showActivities.length > 0">
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <table class="table table-striped table-responsive">
                    <thead>
                    <tr>
                        <th scope="col">Actividad</th>
                        <th scope="col">Prerrequisito</th>
                        <th scope="col">Duraccion/Mes</th>
                        <th scope="col">Costo/Duraccion</th>
                        <th scope="col">Importe</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="activity in showActivities">
                        <th>{{ activity.actividad }}</th>
                        <td style="display: inline-flex;">
                            <main v-for="option in activity.prerrequisito">
                                <b style="color: red">{{ option }}</b>&nbsp
                            </main>
                        </td>
                        <td>{{ activity.duracion }}</td>
                        <td>{{ activity.costo | currency }}</td>
                        <td>{{ amountActivity(activity) | currency }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <div class="row" style="text-align: center;">
                    <div class="col-md-6">
                        <b>Gastos administrativos:</b>
                        <vue-numeric
                                class="form-control"
                                name="costo"
                                currency="RD $"
                                separator=","
                                v-bind:min="0"
                                v-bind:max="90000000"
                                v-bind:minus="false"
                                :empty-value="1"
                                v-validate="'decimal'"
                                v-model="expenses"></vue-numeric>
                    </div>
                    <div class="col-md-6">
                        <b>Importe total:</b> <br>
                        <h3>{{ totalQuantity | currency }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <button v-on:click.prevent="rutaCritica" class="btn btn-primary btn-block">Calcular ruta critica</button>
                <div v-if="showActivities.length > 0">
                    <table class="table table-striped table-responsive" >
                        <thead>
                        <tr>
                            <th scope="col">Actividad</th>
                            <th scope="col">Duraccion/Mes</th>
                            <th scope="col">Comienzo temprano (ES)</th>
                            <th scope="col">Fin temprano (EF)</th>
                            <th scope="col">Inicio tardío (LS)</th>
                            <th scope="col">Final tardío (LF)</th>
                            <th scope="col">Ruta Critica</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="activity in showActivities">
                            <th>{{ activity.actividad }}</th>
                            <th>{{ activity.duracion }}</th>
                            <td>{{ activity.early_start }}</td>
                            <td>{{ activity.early_finish }}</td>
                            <td>{{ activity.late_start }}</td>
                            <td>{{ activity.late_finish }}</td>
                            <td>{{ esCritica(activity) }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>
                        Duracion total: {{ totalDuration }}
                    </h3>
                    <h3>
                       Costo total: {{ totalCost | currency }}
                    </h3>
                </div>

            </div>
        </div>
    </div>
    <div v-else>
        <h1>No hay datos :)</h1>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "resultados",
        data() {
            return{
                expenses: 0,
            }
        },
        methods: {
            rutaCritica(){
                if(this.showActivities.length > 0){
                    this.getFirstTime();
                    this.getLastTime();
                }
            },
            getFirstTime(){
                let self = this;
                this.showActivities.forEach(function(actividadActual) {
                    if(!self.activityHasPrerequisite(actividadActual)){

                        let actividad = {
                            'actividad': actividadActual.actividad,
                            'early_start':  actividadActual.early_start = 0,
                            'early_finish': actividadActual.duracion
                        };

                        self.$store.commit("FIRST_TIME_ACTIVITY", actividad);
                    }
                    if(self.activityHasPrerequisite(actividadActual)){
                        let PrerequisiteMaxAactivity = null;
                        actividadActual.prerrequisito.forEach(function(prerequisito) {
                            if (PrerequisiteMaxAactivity === null){
                                PrerequisiteMaxAactivity = self.findActivty(prerequisito);
                            }
                            if (PrerequisiteMaxAactivity.early_finish < self.findActivty(prerequisito).early_finish){
                                PrerequisiteMaxAactivity = self.findActivty(prerequisito);
                            }
                        });
                        let actividad = {
                            'actividad': actividadActual.actividad,
                            'early_start':  PrerequisiteMaxAactivity.early_finish,
                            'early_finish': actividadActual.duracion + PrerequisiteMaxAactivity.early_finish,
                        };
                        self.$store.commit("FIRST_TIME_ACTIVITY", actividad);
                    }
                });
            },
            getLastTime(){
                let self = this;
                this.showActivities.reverse().forEach(function(actividadActual) {
                    if(!self.activityHasLatefinish(actividadActual)){
                        let actividad = {
                            'actividad': actividadActual.actividad,
                            'late_finish':  actividadActual.early_finish,
                            'late_start': actividadActual.early_finish - actividadActual.duracion,
                        };
                        self.$store.commit("LAST_TIME_ACTIVITY", actividad);
                    }
                    if(self.activityHasPrerequisite(actividadActual)){
                        actividadActual.prerrequisito.forEach(function(prerequisito) {
                            let actividadAnterior = self.findActivty(prerequisito);
                            if (!self.activityHasLatefinish(self.findActivty(prerequisito))){
                                let actividad = {
                                    'actividad': actividadAnterior.actividad,
                                    'late_finish':  actividadActual.late_start,
                                    'late_start': actividadActual.late_start - actividadAnterior.duracion,
                                };
                                self.$store.commit("LAST_TIME_ACTIVITY", actividad);
                            }
                            if (self.activityHasLatefinish(self.findActivty(prerequisito)) && actividadAnterior.late_finish > actividadActual.late_start){
                                let actividad = {
                                    'actividad': actividadAnterior.actividad,
                                    'late_finish':  actividadActual.late_start,
                                    'late_start': actividadAnterior.late_finish - actividadAnterior.duracion,
                                };
                                self.$store.commit("LAST_TIME_ACTIVITY", actividad);
                            }
                        });
                    }
                });
                this.showActivities.reverse();
            },
            activityHasPrerequisite(objecto){
                return objecto.hasOwnProperty('prerrequisito');
            },
            activityHasLatefinish(objecto){
                return objecto.hasOwnProperty('late_finish');
            },
            findActivty(actividad){
                return this.showActivities.find(function (obj) { return obj.actividad === actividad; });
            },
            esCritica(actividad){
                let tiempoPrimero = actividad.early_finish - actividad.late_finish;
                let tiempoUltimo = actividad.late_start - actividad.early_start;
                if (tiempoPrimero === 0 && tiempoUltimo === 0){
                    return 'SI';
                }
                return 'NO';
            },
            amountActivity(objeto){
                return objeto.costo * objeto.duracion;
            }
        },
        computed: {
            ...mapGetters([
                'showActivities',
                'totalQuantity',
                'totalDuration',
                'totalCost'
            ])
        }
    }
</script>