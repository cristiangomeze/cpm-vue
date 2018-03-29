<template>
  <div id="app">

    <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">Acerca del proyecto CPM</h4>
              <p class="text-muted">El método de la ruta crítica o del camino crítico es un algoritmo utilizado para el cálculo de tiempos y plazos en la planificación de proyectos.</p>
              <p class="text-muted">Se translado la logica de este algoritmo al FRAMEWORK VUE.JS, para ser presentado al profesor Edward Irizarry</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Estudiantes</h4>
              <ul class="list-unstyled">
                <li><a class="text-white">Ronny Ramirez 2001-0706</a></li>
                <li><a class="text-white">Cristian Gomez 2014-1135</a></li>
                <li><a class="text-white">Julio Delgado 2014-1146</a></li>
                <li><a class="text-white">Franly Peña 2015-0155</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <svg id="i-activity" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M4 16 L11 16 14 29 18 3 21 16 28 16" />
            </svg>
            <strong>CPM</strong>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>

    <router-view></router-view>

    <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <a href="#">Volver arriba</a>
        </p>
        <p>&copy; 2018 THEPany & Estudiantes del Proyecto</p>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
  :root {
    --jumbotron-padding-y: 3rem;
  }

  .jumbotron {
    padding-top: var(--jumbotron-padding-y);
    padding-bottom: var(--jumbotron-padding-y);
    margin-bottom: 0;
    background-color: #fff;
  }
  @media (min-width: 768px) {
    .jumbotron {
      padding-top: calc(var(--jumbotron-padding-y) * 2);
      padding-bottom: calc(var(--jumbotron-padding-y) * 2);
    }
  }

  .jumbotron p:last-child {
    margin-bottom: 0;
  }

  .jumbotron-heading {
    font-weight: 300;
  }

  .jumbotron .container {
    max-width: 40rem;
  }

  footer {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .is-danger {
    color: red;
  }

  footer p {
    margin-bottom: .25rem;
  }

  .box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }
</style>