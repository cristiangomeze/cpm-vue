<template>
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
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "AdministrativeExpenses",
        data() {
            return{
                expenses: 0,
            }
        },
        computed: {
            ...mapGetters([
                'totalQuantity',
            ])
        },
        watch: {
            expenses: function (val) {
                this.$store.dispatch("addAdministrativeExpenses", {'expenses': val});
            },
        }
    }
</script>