<template>
    <main role="main" id="cpm">
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row">
                    <form-cpm></form-cpm>
                    <result-cpm></result-cpm>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import FormCpm from './FormCPM'
    import ResultCpm from './ResultCPM'
    export default {
        name: "cpm",
        components: {
            FormCpm,
            ResultCpm
        }
    }
</script>