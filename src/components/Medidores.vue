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
      temperatura: '',
      ultrassom: '',
      buffer: ''
    }
  },
  mqtt: {
    'c0/temp' (valor) {
      this.temperatura = valor
      // console.log(this.temperatura)
    },
    'c0/ir' (valor) {
    },
    'c0/ultra' (valor) {
      this.ultrassom = valor
    },
    'c0/acel' (valor) {
    },
    'c0/eng' (dados, topico) {
      let buffer = new TextDecoder().decode(dados)
      this.velocidade = buffer.split(',')
      this.velocidade[0] = ((this.velocidade[0] - 128) / 12.8)
      this.velocidade[1] = ((this.velocidade[1] - 128) / 12.8)
      // console.log('velocidade: ', this.velocidade)
    },
    'c0/servo' (valor) {
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
