import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    generateRandomPopulation, checkIfTargetIsLocated, calculateDistanceOfColor,
    calculatePercentOfMating, mate
} from './Genetic';

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default class Bacterium extends Component {
    constructor(props) {
        super(props);
        this.state = { r: 0, g: 0, b: 0 }
    }

    render() {

        let target = {
            r: 150,
            g: 125,
            b: 150
        }

        let generationIndex = 1;
        let population = generateRandomPopulation()

        while (!checkIfTargetIsLocated(population, target)) {
            for (let i = 0; i < population.length; i++) {
                population[i].fitness = calculateDistanceOfColor(target, population[i].color)
            }

            let selected = calculatePercentOfMating(population)
            population = mate(selected)
            generationIndex++

            let populationHex = []

            function transformaEmHex(populationHex, population) {
            
                for (var index = 0; index < population.length; index++) {
                    populationHex.push(rgbToHex(population[index].color.r, population[index].color.g, population[index].color.b))
                }
            }


            target = rgbToHex(target.r, target.g, target.b)
            transformaEmHex(populationHex, population)
            console.log(populationHex)

            const celulas = populationHex.map((cor, index) => 
                <div className = "bacterias" index = {index}>
                    <h2>{index}</h2>
                    <svg height="100" width="100" >
                        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={cor} />
                    </svg>
                </div>
                
            )

            return (
                <div>
                    <div>
                        <h1>Target</h1>
                        <svg height="100" width="100">
                            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={target} />
                        </svg>  
                    </div>
                    <div>
                        <h1>Gerações</h1>
                        {celulas}
                    </div>
                </div>
            )
        }
    }
}