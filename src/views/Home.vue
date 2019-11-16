<template>
  <div class="home">
    <h1>KONTRA-TESLA</h1>
    <medidores/>
    <graficos/>
  </div>
</template>

<script>
// @ is an alias to /src
import Graficos from '@/components/Graficos.vue'
import Medidores from '@/components/Medidores.vue'

export default {
  name: 'home',
  components: {
    Graficos,
    Medidores
  }
}
</script>
