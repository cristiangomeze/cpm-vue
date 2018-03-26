<template>
    <div class="card mb-4 box-shadow">
        <div class="card-body">
            <button v-on:click.prevent="rutaCritica" class="btn btn-primary btn-block">Calcular ruta critica</button>
            <div>
                <table class="table table-striped table-responsive" >
                    <thead>
                    <tr>
                        <th scope="col">Actividad</th>
                        <th scope="col">{{showDuration}}</th>
                        <th scope="col">Comienzo temprano (ES)</th>
                        <th scope="col">Fin temprano (EF)</th>
                        <th scope="col">Inicio tardío (LS)</th>
                        <th scope="col">Final tardío (LF)</th>
                        <th scope="col">Ruta Critica</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="activity in showActivities">
                        <th>{{ activity.id }}</th>
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
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "ActivityResult",
        methods: {
            rutaCritica(){
               this.getFirstTime()
                   .then(() => {
                       this.getLastTime();
                   }).catch(errors => {
                   console.log(errors);
               });
            },
            getFirstTime(){
                let self = this;
                return new Promise((resolve) => {
                    this.showActivities.forEach(actividad => {
                        if(!self.isPrerequisite(actividad)) {
                            self.$store.dispatch("getFirstTime", {
                                'id': actividad.id,
                                'early_start':  actividad.early_start = 0,
                                'early_finish': actividad.duracion
                            });
                            return;
                        }

                        if(self.isPrerequisite(actividad)){
                            let Prerequisite = null;
                            actividad.prerrequisito.forEach(function(prerequisito_id) {
                                if (Prerequisite === null){
                                    Prerequisite = self.findActivity(prerequisito_id);
                                }
                                if (Prerequisite.early_finish < self.findActivity(prerequisito_id).early_finish){
                                    Prerequisite = self.findActivity(prerequisito_id);
                                }
                            });

                            self.$store.dispatch("getFirstTime", {
                                'id': actividad.id,
                                'early_start':  Prerequisite.early_finish,
                                'early_finish': actividad.duracion + Prerequisite.early_finish
                            });
                        }

                    });
                    return resolve();
                });
            },
            getLastTime(){
                let self = this;
                this.showActivities.slice().reverse().forEach(function(actividad) {
                    if(!self.isLatefinish(actividad)){
                        self.$store.dispatch("getLastTime", {
                            'id': actividad.id,
                            'late_finish':  actividad.early_finish,
                            'late_start': actividad.early_finish - actividad.duracion
                        });
                    }
                    if(self.isLatefinish(actividad) && self.isPrerequisite(actividad)){
                        actividad.prerrequisito.forEach(function(prerequisito_id) {
                            let Prerequisito = self.findActivity(prerequisito_id);
                            if (!self.isLatefinish(self.findActivity(prerequisito_id))){
                                self.$store.dispatch("getLastTime", {
                                    'id': Prerequisito.id,
                                    'late_finish':  actividad.late_start,
                                    'late_start': actividad.late_start - Prerequisito.duracion,
                                });
                            }
                            if (self.isLatefinish(self.findActivity(prerequisito_id)) && Prerequisito.late_finish > actividad.late_start){
                                self.$store.dispatch("getLastTime", {
                                    'id': Prerequisito.id,
                                    'late_finish':  Prerequisito.late_start,
                                    'late_start': Prerequisito.late_finish - Prerequisito.duracion,
                                });
                            }
                        });
                    }
                });
            },

            isPrerequisite(activity){
                return  activity.prerrequisito !== null;
            },
            isLatefinish(activity){
                return  activity.late_finish !== null;
            },
            esCritica(actividad){
                let tiempoPrimero = actividad.early_finish - actividad.late_finish;
                let tiempoUltimo = actividad.late_start - actividad.early_start;
                if (tiempoPrimero === 0 && tiempoUltimo === 0){
                    return 'SI';
                }
                return 'NO';
            },
        },
        computed: {
            ...mapGetters([
                'showActivities',
                'findActivity',
                'totalQuantity',
                'totalDuration',
                'totalCost',
                'showDuration'
            ])
        }
    }
</script>