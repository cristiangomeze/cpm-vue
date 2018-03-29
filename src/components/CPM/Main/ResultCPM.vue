<template>
    <div class="col-md-12">
        <div class="card mb-4 box-shadow" v-show="status">
            <div class="card-body">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="resume-tab" data-toggle="tab" href="#resume" role="tab" aria-controls="resume" aria-selected="true">Resumen</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="detailInfo-tab" data-toggle="tab" href="#detailInfo" role="tab" aria-controls="detailInfo" aria-selected="false">Informacion detallada</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Proximamente</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="resume" role="tabpanel" aria-labelledby="resume-tab" style="text-align: center;">
                        <resume></resume>
                    </div>
                    <div class="tab-pane fade" id="detailInfo" role="tabpanel" aria-labelledby="detailInfo-tab">
                        <result-table></result-table>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Resume from './ResultComponents/Resume'
    import ResultTable from './ResultComponents/ResultTable'

    export default {
        name: "ResultCPM",
        components: {
            Resume,
            ResultTable
        },
        computed: {
            ...mapGetters([
                'status'
            ])
        }
    }
</script>