<template>
    <main role="main" id="cpm">
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row">
                    <main-cpm></main-cpm>
                    <result-cpm></result-cpm>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import MainCpm from './Main/MainCPM'
    import ResultCpm from './Main/ResultCPM'

    export default {
        name: "cpm",
        components: {
            MainCpm,
            ResultCpm,
        }
    }
</script>