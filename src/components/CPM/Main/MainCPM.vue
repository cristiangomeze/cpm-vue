<template>
    <div class="col-md-12" id="resultados">
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <create-activity-cpm></create-activity-cpm>
                    </div>
                    <div class="col-md-3">
                        <critical-route></critical-route>
                    </div>
                    <div class="col-md-3">
                        <main-option></main-option>
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-outline-danger btn-block"  onclick="location.reload()">
                            Borrar Todo
                        </button>
                    </div>

                </div>
                <br>
                <main-table></main-table>
            </div>
        </div>

    </div>
</template>

<script>
    import CreateActivityCpm from './MainComponents/CreateActivityCPM'
    import MainTable from './MainComponents/MainTable'
    import CriticalRoute from './MainComponents/CriticalRoute'
    import MainOption from './MainComponents/MainOption'

    export default {
        name: "MainCPM",
        components: {
            CreateActivityCpm,
            MainTable,
            CriticalRoute,
            MainOption
        }
    }
</script>
