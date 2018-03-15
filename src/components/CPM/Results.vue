<template>
    <div class="col-md-8" id="resultados">
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
                        <td>{{ activity.costo }}</td>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "resultados",
        data() {
            return{
                expenses: 0
            }
        },
        methods: {
            amountActivity(objeto){
                return objeto.costo * objeto.duracion;
            },
            rutaCritica(){
                let resultado = [];
                let lastActivity =  this.getLastActivity();
                if(this.activityHasPrerequisite(lastActivity)){
                    lastActivity.prerrequisito.forEach(function(objecto) {
                        resultado.push({
                         'rutas': [lastActivity.actividad,objecto]
                        });
                    });
                }

                return resultado;
            },
            getLastActivity(){
                return this.showActivities.slice().reverse()[0];
            },
            activityHasPrerequisite(objecto){
                return objecto.hasOwnProperty('prerrequisito')
            }
        },
        computed: {
            prueba(){
              return this.rutaCritica();
            },
            ...mapGetters([
                'showActivities',
                'totalQuantity',
            ])
        }
    }
</script>