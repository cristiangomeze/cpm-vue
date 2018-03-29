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
                    <button class="btn btn-primary" v-on:click.prevent="editActivity(activity.id)">Editar</button>
                    <button class="btn btn-danger" onclick="alert('Eliminar, Proximamente')">Eliminar</button>
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
