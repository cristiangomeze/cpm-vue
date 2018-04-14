<template>
    <div class="table-responsive" v-show="isNotEmptyActivities">
        <table class="table table-striped table-sm" style="text-align: center;">
            <thead class="thead-dark">
            <tr>
                <th>Actividad</th>
                <th>Prerrequisito</th>
                <th>{{optionDuration}}</th>
                <th>Costo/Dur.</th>
                <th>Importe</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="activity in showActivities">
                <th>{{ activity.id }}</th>
                <td style="display: inline-flex;">
                    <main v-for="option in activity.prerrequisito">
                        <b style="color: red">{{ option }}</b>&nbsp
                    </main>
                </td>
                <td>{{ activity.duracion }}</td>
                <td>{{ activity.costo | currency }}</td>
                <td>{{ amountActivity(activity) | currency }}</td>
                <td>
                  <div class="dropdown show">
                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Acciones
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" v-on:click.prevent="editActivity(activity.id)">Editar</a>
                      <a class="dropdown-item" v-on:click.prevent="deleteActivity(activity.id)">Eliminar</a>
                    </div>
                  </div>
                </td>
            </tr>
            </tbody>
        </table>
        <edit-activity></edit-activity>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import  EditActivity from './EditActivity';
    export default {
        name: "MainTable",
        components: {
            EditActivity,
        },
        methods: {
          amountActivity(activity) {
            return activity.costo * activity.duracion;
          },
          editActivity(id){
            this.$store.dispatch("editActivityId", { id }).
            then(response => {
              $("#EditActivity").modal({backdrop: "static"});
            });
          },
          deleteActivity(id){
            this.$store.dispatch("deleteActivity", { id });
          }
        },
        computed: {
            ...mapGetters([
                'showActivities',
                'optionDuration',
                'isNotEmptyActivities'
            ])
        }
    }
</script>
