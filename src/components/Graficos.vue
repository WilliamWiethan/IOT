<template>
  <div>
    <!-- <h1>{{ dados }}</h1> -->
    <div class="row">
      <div class="col-lg-4" v-for="i in teste" :key="i">
        <pure-vue-chart
          :points="dados[i]"
          :width="400"
          :height="200"
          :show-y-axis="true"
          :show-x-axis="false"
          :show-values="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PureVueChart from 'pure-vue-chart'
export default {
  components: {
    PureVueChart
  },
  name: 'Graficos',
  props: {
    msg: String
  },
  sensor: {
    nome: '',
    dados: []
  },
  data () {
    return {
      tag: '#',
      dados: [[], [], [], [], [], []],
      message: null,
      teste: [0, 1, 2, 3, 4, 5],
      aux: ''
    }
  },
  mqtt: {
    'c0/temp' (valor) {
      this.aux = valor
      if (this.dados[0].length >= 10) {
        this.dados[0].splice(0, 1)
      }
      this.dados[0].push(Number(this.aux))
    },
    'c0/ir' (valor) {
      this.aux = valor
      if (this.dados[1].length >= 10) {
        this.dados[1].splice(0, 1)
      }
      this.dados[1].push(Number(this.aux))
    },
    'c0/ultra' (valor) {
      this.aux = valor
      if (this.dados[2].length >= 10) {
        this.dados[2].splice(0, 1)
      }
      this.dados[2].push(Number(this.aux))
    },
    'c0/acel' (valor) {
      this.aux = valor
      if (this.dados[3].length >= 10) {
        this.dados[3].splice(0, 1)
      }
      this.dados[3].push(Number(this.aux))
    },
    'c0/eng' (valor) {
      this.aux = valor
      // if (this.dados[4].length >= 14) {
      //   this.dados[4].splice(0, 1)
      // }
      this.dados[4][0] = this.aux
    },
    'c0/servo' (valor) {
      this.aux = valor
      if (this.dados[5].length >= 10) {
        this.dados[5].splice(0, 1)
      }
      this.dados[5].push(Number(this.aux))
    }
  },
  mounted () {
    this.connect()
  },
  methods: {
    connect () {
      this.$mqtt.subscribe(this.tag)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pure-vue-bar-chart rect {
  fill: orangered !important;
}
.pure-vue-bar-chart text {
  font: 10px sans-serif;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
