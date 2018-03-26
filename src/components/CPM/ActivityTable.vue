<template>
    <div class="card mb-4 box-shadow">
        <div class="card-body">
            <table class="table table-striped table-responsive">
                <thead>
                <tr>
                    <th>Actividad</th>
                    <th>Prerrequisito</th>
                    <th>{{showDuration}}</th>
                    <th>Costo/Duraccion</th>
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
                    <td><button>Eliminar</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "ActivityTable",
        methods: {
            amountActivity(activity){
                return activity.costo * activity.duracion;
            }
        },
        computed: {
            ...mapGetters([
                'showActivities',
                'showDuration'
            ])
        }
    }
</script>
