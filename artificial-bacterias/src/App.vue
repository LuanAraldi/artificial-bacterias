<template>
  <div id="app">
    <h1> Objetivo</h1>
    <bacteria :red="target.color.r" :green="target.color.g" :blue="target.color.b" :stroke="target.stroke"></bacteria>
    {{geracao}}
    <button @click="comecaloop">Começa</button>
    <span v-for="(asset, index) in population" :key="asset.id">
      <div v-if="index % 10 == 0"></div>
      <bacteria :red="asset.color.r" :green="asset.color.g" :blue="asset.color.b" :stroke="asset.stroke"></bacteria>
    </span>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      geracao: 1,
      population: {},
      target: {color: { r: 150, g: 125, b: 150 }, stroke: 'black'}
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
      while (!this.checkIfTargetIsLocated(this.population, this.target)) {
        for (let i = 0; i < this.population.length; i++) {
          this.population[i].fitness = this.calculateDistanceOfColor(this.target, this.population[i].color)
        }

        let selected = this.calculatePercentOfMating(this.population)
        this.population = this.mate(selected)
        this.geracao++
        await this.espera(1)
      }
    },
    generateRandomPopulation: function () {
      let population = []
      for (let i = 0; i < 20; i++) {
        let asset = {
          id: Math.floor(Math.random() * 999999),
          stroke: 'black',
          color: {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
          },
          fitness: 0
        }
        population.push(asset)
      }
      return population
    },
    calculateDistanceOfColor: function (target, color) {
      let rDistance = Math.pow((color.r - target.r), 2)
      let gDistance = Math.pow((color.g - target.g), 2)
      let bDistance = Math.pow((color.b - target.b), 2)
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

      for (let i = 0; i < 10; i++) {
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
      for (let i = 0; i < population.length; i++) {
        let fitness = this.calculateDistanceOfColor(target, population[i].color)
        if (fitness === 0) {
          this.population[i].stroke = 'yellow'
          return true
        }
      }

      return false
    },
    mutate: function (chromossome) {
      let random = Math.floor(Math.random() * 100)
      if (random <= 10) {
        let randomRGB = Math.floor(Math.random() * 3) + 1
        if (randomRGB === 1) {
          chromossome.color.r = Math.floor(Math.random() * 255)
        }
        if (randomRGB === 2) {
          chromossome.color.g = Math.floor(Math.random() * 255)
        }
        if (randomRGB === 3) {
          chromossome.color.b = Math.floor(Math.random() * 255)
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
