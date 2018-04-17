<template>
    <main>
        <button v-on:click.prevent="rutaCritica" class="btn btn-secondary btn-block" :disabled="!isNotEmptyActivities">Calcular CPM</button>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
      name: "CriticalRoute",
      methods: {
        rutaCritica() {
          this.$store.dispatch("clearActivity").then(() => {
            this.$store.dispatch("status").then(() => {
              this.getFirstTime()
                .then(() => {
                  this.getLastTime();
                }).catch(errors => {
                console.log(errors);
              });
            });
          });
        },
        getFirstTime() {
          let self = this;
          return new Promise((resolve) => {
            this.showActivities.forEach(actividad => {
              if (!self.isPrerequisite(actividad)) {
                self.$store.dispatch("getFirstTime", {
                  'id': actividad.id,
                  'early_start': actividad.early_start = 0,
                  'early_finish': actividad.duracion
                });
                return;
              }

              if (self.isPrerequisite(actividad)) {
                let Prerequisite = null;
                actividad.prerrequisito.forEach(function (prerequisito_id) {
                  if (Prerequisite === null) {
                    Prerequisite = self.findActivity(prerequisito_id);
                  }
                  if (Prerequisite.early_finish < self.findActivity(prerequisito_id).early_finish) {
                    Prerequisite = self.findActivity(prerequisito_id);
                  }
                });

                self.$store.dispatch("getFirstTime", {
                    'id': actividad.id,
                    'early_start': Prerequisite.early_finish,
                    'early_finish': actividad.duracion + Prerequisite.early_finish
                });
              }
            });
            return resolve();
          });
        },
        getLastTime() {
          let self = this;
          this.showActivities.slice().reverse().forEach((actividad, index) => {
            if (index === 0) {
              self.$store.dispatch("getLastTime", {
                'id': actividad.id,
                'late_finish': actividad.early_finish,
                'late_start': actividad.early_finish - actividad.duracion
              });
            }

            if (!self.isPrerequisite(actividad) && !self.isLatefinish(actividad)) {
              self.$store.dispatch("getLastTime", {
                'id': actividad.id,
                'late_finish': 99999,
                'late_start': 99999
              });
              return;
            }

            if(self.isPrerequisite(actividad)){
              actividad.prerrequisito.forEach(prerequisito_id => {
                  if (!self.isLatefinish(self.findActivity(prerequisito_id))) {
                    let Prerequisito = self.findActivity(prerequisito_id);
                    self.$store.dispatch("getLastTime", {
                      'id': Prerequisito.id,
                      'late_finish': actividad.late_start,
                      'late_start': actividad.late_start - Prerequisito.duracion,
                    });
                  }
                  if (self.isLatefinish(self.findActivity(prerequisito_id)) && self.findActivity(prerequisito_id).late_finish > actividad.late_start) {
                    let Prerequisito = self.findActivity(prerequisito_id);
                    self.$store.dispatch("getLastTime", {
                      'id': Prerequisito.id,
                      'late_finish': actividad.late_start,
                      'late_start': actividad.late_start - Prerequisito.duracion,
                    });
                  }
              });
            }
          });
          },

        isPrerequisite(activity) {
            return Boolean(activity.prerrequisito);
        },

        isLatefinish(activity) {
            return Boolean(activity.late_finish);
        },
      },
      computed: {
        ...mapGetters([
          'showActivities',
          'findActivity',
          'isNotEmptyActivities'
        ])
      }
    }
</script>
