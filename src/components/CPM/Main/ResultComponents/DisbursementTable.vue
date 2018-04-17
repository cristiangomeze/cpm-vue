<template>
  <div class="table-responsive">
    <h1 style="text-align: center">Presupuesto o Plan de Desembolso</h1>
    <br>
    <table class="table table-bordered table-sm" style="text-align: center;">
      <thead class="thead-dark">
      <tr>
        <th>{{optionDuration}}</th>
        <th>Presupuesto De Desembolso</th>
        <th>% Acumulado</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(presupuesto, index) in combinarResultados">
          <th>{{ index + 1 }}</th>
          <th>{{ presupuesto.disbursement | currency}}</th>
          <th>{{ presupuesto.accumulatedd }}</th>
        </tr>
        <tr class="table-success">
          <th> - </th>
          <th>Costo Total: {{ totalCost | currency}} <br>  Gastos Adm:{{ getExpenses | currency}}</th>
          <th> {{ totalAcum }} </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "DisbursementTable",
    methods: {
      disbursement(){
        let disbursement = new Array(this.totalDuration);

        for (let index = 0; index < disbursement.length; index++) {
          disbursement[index] = this.getExpenses;
          this.showActivities.forEach(actividad => {
            if( (index + 1) > actividad.early_start && (index + 1) <= actividad.early_finish ){
              disbursement[index] += actividad.costo;
            }
          });

        }
        return disbursement;
      },
      accumulated() {
        let acumulated = new Array(this.totalDuration);

        for (let index = 0; index < acumulated.length; index++){
            acumulated[index] = (this.disbursements[index] / this.totalCost) * 100;
        }
        return acumulated;
      },
    },
    computed: {
      disbursements() {
        return this.disbursement();
      },
      accumulatedds() {
        return this.accumulated();
      },
      combinarResultados() {
        let resultado = [];

        for (let index = 0; index < this.totalDuration; index++){
          resultado.push({
            'disbursement': this.disbursements[index],
            'accumulatedd': this.accumulatedds[index],
          });
        }
        return resultado;
      },
      totalAcum() {
        return this.accumulatedds.reduce((total,acumulado) =>  total + acumulado, 0 );
      },
      ...mapGetters([
        'totalDuration',
        'showActivities',
        'getExpenses',
        'optionDuration',
        'totalCost'
      ])
    }
  }
</script>

<style scoped>

</style>
