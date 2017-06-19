import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Bacterium extends Component{
    render(){
        const styles = {
            fill: 'rgb('+ this.props.r + ',' + this.props.g + ',' + this.props.b + ')',
        }
        
        return(
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" style={styles} />
            </svg>
        )
    }
}

Bacterium.PropTypes = {
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
}