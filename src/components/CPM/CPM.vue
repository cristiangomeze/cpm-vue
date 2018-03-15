<template>
    <main role="main" id="cpm">
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row">
                    <form-cpm></form-cpm>
                    <results></results>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import FormCpm from './FormCPM'
    import Results from './Results'
    export default {
        name: "cpm",
        components: {
            FormCpm,
            Results
        }
    }
</script>