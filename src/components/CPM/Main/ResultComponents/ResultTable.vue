<template>
    <div class="table-responsive">
        <h1 style="text-align: center">Información Detallada</h1>
        <br>
        <table class="table table-striped table-sm" style="text-align: center;">
            <thead class="thead-dark">
          <tr>
              <th>Actividad</th>
              <th>{{optionDuration}}</th>
              <th>Comienzo temprano (ES)</th>
              <th>Fin temprano (EF)</th>
              <th>Inicio tardío (LS)</th>
              <th>Final tardío (LF)</th>
              <th>Ruta Critica</th>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "ResultTable",
        methods: {
            esCritica(actividad) {
                let tiempoPrimero = actividad.early_finish - actividad.late_finish;
                let tiempoUltimo = actividad.late_start - actividad.early_start;
                if (tiempoPrimero === 0 && tiempoUltimo === 0) {
                    return 'SI';
                }
                return 'NO';
            },
        },
        computed: {
            ...mapGetters([
                'showActivities',
                'optionDuration'
            ])
        }
    }
</script>