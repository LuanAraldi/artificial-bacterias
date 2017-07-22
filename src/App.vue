<template>
  <div id="app">
    <h1> Objetivo</h1>
    <div style="padding-left: 44%; padding-right: 44%;">
      <sketch-picker v-model="targetcolor"></sketch-picker>
    </div>
    <div>
      <h2>Geração {{geracao}}</h2>
    </div>
    <div>
      <input type="number" v-model="velocidade">
      <button @click="comecaloop">Começa</button>
    </div>
    <div>
      <span v-for="(asset, index) in population" :key="asset.id">
        <div v-if="index % 10 == 0"></div>
        <bacteria :red="asset.color.r" :green="asset.color.g" :blue="asset.color.b" :stroke="asset.stroke"></bacteria>
      </span>
    </div>
    <span v-for="(fitness, index) in globalfitness" :key="index">
      {{fitness}},
    </span>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'

export default {
  components: {
    'sketch-picker': Sketch
  },
  name: 'app',
  data () {
    return {
      geracao: 1,
      population: {},
      target: { color: { r: 12, g: 162, b: 88 }, stroke: 'black' },
      velocidade: 10,
      targetcolor: {},
      globalfitness: []
    }
  },
  created () {
    this.population = this.generateRandomPopulation()
  },
  methods: {
    espera: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    comecaloop: async function () {
      this.target.color.r = this.targetcolor.rgba.r
      this.target.color.g = this.targetcolor.rgba.g
      this.target.color.b = this.targetcolor.rgba.b
      this.geracao = 1
      this.population = this.generateRandomPopulation()
      while (!this.checkIfTargetIsLocated(this.population, this.target)) {
        for (let i = 0; i < this.population.length; i++) {
          this.population[i].fitness = this.calculateDistanceOfColor(this.target, this.population[i].color)
        }

        let selected = this.calculatePercentOfMating(this.population)
        this.population = this.mate(selected)
        this.geracao++
        await this.espera(this.velocidade)
      }
    },
    generateRandomPopulation: function () {
      let population = []
      for (let i = 0; i < 30; i++) {
        let asset = {
          id: Math.floor(Math.random() * 999999),
          stroke: 'black',
          color: {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
          },
          fitness: 0
        }
        population.push(asset)
      }
      return population
    },
    calculateDistanceOfColor: function (target, color) {
      let rDistance = Math.pow((parseInt(color.r) - parseInt(target.color.r)), 2)
      let gDistance = Math.pow((parseInt(color.g) - parseInt(target.color.g)), 2)
      let bDistance = Math.pow((parseInt(color.b) - parseInt(target.color.b)), 2)
      let totalDistance = rDistance + gDistance + bDistance
      totalDistance = Math.sqrt(totalDistance)
      return totalDistance
    },
    calculatePercentOfMating: function (population) {
      let selected = []
      for (let i = 0; i < population.length; i++) {
        let asset1 = population[i]
        i++
        let asset2 = population[i]

        if (asset1.fitness < asset2.fitness) {
          selected.push(asset1)
        } else {
          selected.push(asset2)
        }
      }

      for (let i = 0; i < 15; i++) {
        let asset1 = population[i]
        let asset2 = population[i + 10]

        if (asset1.fitness < asset2.fitness) {
          selected.push(asset1)
        } else {
          selected.push(asset2)
        }
      }

      return selected
    },
    mate: function (selected) {
      let nextGeneration = []

      for (let i = 0; i < selected.length; i++) {
        let child1 = {
          id: Math.floor(Math.random() * 999999),
          stroke: 'black',
          color: {
            r: selected[i].color.r,
            g: selected[i].color.g,
            b: selected[i + 1].color.b
          },
          fitness: 0
        }
        child1 = this.mutate(child1)

        let child2 = {
          id: Math.floor(Math.random() * 999999),
          stroke: 'black',
          color: {
            r: selected[i + 1].color.r,
            g: selected[i + 1].color.g,
            b: selected[i].color.b
          },
          fitness: 0
        }
        child2 = this.mutate(child2)

        nextGeneration.push(child1)
        nextGeneration.push(child2)
        i++
      }

      return nextGeneration
    },
    checkIfTargetIsLocated: function (population, target) {
      let global = 0
      for (let i = 0; i < population.length; i++) {
        let local = parseInt(this.calculateDistanceOfColor(target, population[i].color))
        if (local === 0) {
          this.population[i].stroke = 'yellow'
        } else {
          this.population[i].stroke = 'black'
        }
        global += local
      }
      this.globalfitness.push((7650 - global))
      if (global > 0) {
        return false
      }
      return true
      /*
      for (let i = 0; i < population.length; i++) {
        let fitness = this.calculateDistanceOfColor(target, population[i].color)
        if (fitness === 0 || fitness === '0') {
          this.population[i].stroke = 'yellow'
          return true
        }
      }
      */

      // return false
    },
    mutate: function (chromossome) {
      let random = Math.floor(Math.random() * 100)
      if (random <= 10) {
        let randomRGB = Math.floor(Math.random() * 3) + 1
        if (randomRGB === 1 || randomRGB === '1') {
          chromossome.color.r = Math.floor(Math.random() * 256)
        }
        if (randomRGB === 2 || randomRGB === '2') {
          chromossome.color.g = Math.floor(Math.random() * 256)
        }
        if (randomRGB === 3 || randomRGB === '3') {
          chromossome.color.b = Math.floor(Math.random() * 256)
        }
      }
      return chromossome
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
