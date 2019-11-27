<template>
  <div class="container">
    <div class="row">
    <div class="col">
      <h2>Motor Esquerdo</h2>
      <vue-speedometer
      :width="200"
      :height="200"
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
      <h2>Motor Direito</h2>
      <vue-speedometer
      :width="200"
      :height="200"
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
      <h2>Temperatura</h2>
      <vue-speedometer
      :width="200"
      :height="200"
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
  <div class="row">
      <div class="col">
        <h3>Ultrassom:</h3>
        <br>
        <h3>{{ultrassom}}</h3>
      </div>
      <div class="col">
        <h3>Acelerometro:</h3>
        <br>
        <h3>{{acelerometro}}</h3>
      </div>
      <div class="col" style="display:block">
        <h3>Colisão:</h3>
        <br>
        <h4 v-if="ir[0]==0" style="color:red"> equerda 0 </h4>
        <h4 v-else style="color:green"> esquerda 1 </h4>
        <h4 v-if="ir[1]==0" style="color:red"> direita 0 </h4>
        <h4 v-else style="color:green"> direita 1 </h4>
        <h4 v-if="ir[2]==0" style="color:red"> traseiro 0 </h4>
        <h4 v-else style="color:green"> traseiro 1 </h4>
        <!-- <h2>{{ir}}</h2> -->
      </div>
      <div class="col">
        <h3>Posição câmera:</h3>
        <br>
        <h3>{{servo}}</h3>
      </div>
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
      velocidade: [0, 0],
      temperatura: null,
      ultrassom: null,
      acelerometro: [],
      ir: [],
      servo: [],
      buffer: ''
    }
  },
  mqtt: {
    '#' (dados, tag) {
      // console.log(tag, valor)
    },
    '#/c0/temp' (dados) {
      // console.log(dados)
      this.temperatura = Number(dados)
      // console.log('temperatura', this.temperatura)
    },
    '#/c0/ir' (dados) {
      let buffer = new TextDecoder().decode(dados)
      this.ir = buffer.split(',')
    },
    '#/c0/ultra' (dados) {
      this.ultrassom = Number(dados)
    },
    '#/c0/acel' (dados) {
      let buffer = new TextDecoder().decode(dados)
      buffer = buffer.replace(/[^\d\\,]/g, '')
      this.acelerometro = buffer.split(',')
    },
    '#/c0/eng' (dados) {
      let buffer = new TextDecoder().decode(dados)
      buffer = buffer.split(',')
      var scale = (num, inMin, inMax, outMin, outMax) => {
        return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
      }
      this.velocidade[0] = scale(buffer[1], 0, 255, 10, -10)
      this.velocidade[1] = scale(buffer[2], 0, 255, 10, -10)
      // console.log('velocidade: ', this.velocidade)
    },
    '#/c0/servo' (dados) {
      let buffer = new TextDecoder().decode(dados)
      this.servo = buffer.split(',')
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
