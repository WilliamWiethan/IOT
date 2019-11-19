<template>
  <div class="row">
    <div class="col">
      <h1>Motor Esquerdo</h1>
      <vue-speedometer
      :minValue="-10"
      :maxValue="10"
      :needleHeightRatio="0.7"
      :maxSegmentLabels="11"
      :customSegmentStops="[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]"
      :segmentColors='["firebrick", "tomato", "gold", "limegreen", "limegreen", "limegreen", "limegreen", "gold", "tomato", "firebrick"]'
      :value="velocidade[0]"
      />
    </div>
    <div class="col">
      <h1>Motor Direito</h1>
      <vue-speedometer
      :minValue="-10"
      :maxValue="10"
      :needleHeightRatio="0.7"
      :maxSegmentLabels="11"
      :customSegmentStops="[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]"
      :segmentColors='["firebrick", "tomato", "gold", "limegreen", "limegreen", "limegreen", "limegreen", "gold", "tomato", "firebrick"]'
      :value="velocidade[1]"
      />
    </div>
    <div class="col">
      <h1>Temperatura</h1>
      <vue-speedometer
      :minValue="-100"
      :maxValue="100"
      :needleHeightRatio="0.7"
      :maxSegmentLabels="11"
      :customSegmentStops="[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]"
      :segmentColors='["blue", "blue", "lightblue", "lightblue", "grey", "grey", "limegreen", "gold", "orange", "firebrick"]'
      :value="temperatura"
      />
    </div>
  </div>
</template>

<script>
import VueSpeedometer from 'vue-speedometer'
export default {
  components: { VueSpeedometer },
  name: 'Medidores',
  props: {
    msg: String
  },
  data () {
    return {
      tag: '#',
      velocidade: [],
      temperatura: null,
      ultrassom: null,
      buffer: ''
    }
  },
  mqtt: {
    '#' (valor, tag) {
      // console.log(tag, valor)
    },
    '#/c0/temp' (valor) {
      console.log(valor)
      this.temperatura = Number(valor)
      // console.log('temperatura', this.temperatura)
    },
    '#/c0/ir' (valor) {
    },
    '#/c0/ultra' (valor) {
      this.ultrassom = Number(valor)
    },
    '#/c0/acel' (valor) {
    },
    '#/c0/eng' (dados, topico) {
      let buffer = new TextDecoder().decode(dados)
      this.velocidade = buffer.split(',')
      this.velocidade[0] = (Number(this.velocidade[0] - 128) / 12.8)
      this.velocidade[1] = (Number(this.velocidade[1] - 128) / 12.8)
      // console.log('velocidade: ', this.velocidade)
    },
    '#/c0/servo' (valor) {
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
