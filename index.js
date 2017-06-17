let target = { 
    r: 150,
    g: 125,
    b: 150
}

function generateRandomPopulation() {
    let population = []
    for (let i = 0; i < 20; i++) {
        let asset = {
            color: {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255)
            },
            fitness: 0,
        }
        population.push(asset)
    }
    return population
}

function calculateDistanceOfColor(target, color) {
    let rDistance = Math.pow((color.r - target.r), 2)
    let gDistance = Math.pow((color.g - target.g), 2)
    let bDistance = Math.pow((color.b - target.b), 2)
    let totalDistance = rDistance + gDistance + bDistance
    totalDistance = Math.sqrt(totalDistance)
    return totalDistance
}

function calculatePercentOfMating(population) {
    let selected = []
    for (let i = 0; i < population.length; i++) {
        let asset1 = population[i]
        i++
        let asset2 = population[i]

        if (asset1.fitness < asset2.fitness) {
            selected.push(asset1)
        }else{
            selected.push(asset2)
        }
    }

    for (let i = 0; i < 10; i++) {
        let asset1 = population[i]
        let asset2 = population[i + 10]

        if (asset1.fitness < asset2.fitness) {
            selected.push(asset1)
        }else{
            selected.push(asset2)
        }
    }

    return selected
}

function mate(selected) {
    let nextGeneration = []

    for (let i = 0; i < selected.length; i++) {
        let child1 = {
            color: {
                r: selected[i].color.r,
                g: selected[i].color.g,
                b: selected[i + 1].color.b
            },
            fitness: 0
        }

        let child2 = {
            color: {
                r: selected[i+1].color.r,
                g: selected[i+1].color.g,
                b: selected[i].color.b
            },
            fitness: 0
        }
        nextGeneration.push(child1)
        nextGeneration.push(child2)
        i++
    }

    return nextGeneration
}

function checkIfTargetIsLocated(population, target) {
    for (let i = 0; i < population.length; i++) {
        let fitness = calculateDistanceOfColor(target, population[i].color)
        console.log(fitness)
        if (fitness == 0) {
            return true
        }
    }

    return false
}

let generationIndex = 1;
let population = generateRandomPopulation()

while (!checkIfTargetIsLocated(population, target)) {
    console.log("Geração " + generationIndex)
    for (let i = 0; i < population.length; i++) {
        population[i].fitness = calculateDistanceOfColor(target, population[i].color)
    }

    let selected = calculatePercentOfMating(population)
    population = mate(selected)
    generationIndex++
}