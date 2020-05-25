import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { fetchAllFruit, fetchCertainFruit } from '../../store/actions/fruitsActions'
import { ResponsiveAreaBump } from '@nivo/bump'

class Homepage extends Component {
    componentDidMount() {
        this.props.actions.fetchAllFruit();
    }
    render() {
        let caloriesMax = 0;
        let carbohydratesMax = 0;
        let fatMax = 0;
        let proteinMax = 0;
        let sugarMax = 0;
        this.props.fruits.map(fruit => {
            if (fruit.nutritions.calories > caloriesMax) caloriesMax = fruit.nutritions.calories;
            if (fruit.nutritions.carbohydrates > carbohydratesMax) carbohydratesMax = fruit.nutritions.carbohydrates;
            if (fruit.nutritions.fat > fatMax) fatMax = fruit.nutritions.fat;
            if (fruit.nutritions.protein > proteinMax) proteinMax = fruit.nutritions.protein;
            if (fruit.nutritions.sugar > sugarMax) sugarMax = fruit.nutritions.sugar;
        });
        const data = this.props.fruits.map(fruit => ({
            id: fruit.name,
            data: [
                {
                    y: (fruit.nutritions.calories/caloriesMax),
                    x: "Calories",
                },
                {
                    y: (fruit.nutritions.carbohydrates/carbohydratesMax),
                    x: "Carbohydrates",
                },
                {
                    y: (fruit.nutritions.fat/fatMax),
                    x: "Fat",
                },
                {
                    y: (fruit.nutritions.protein/proteinMax),
                    x: "Protein",
                },
                {
                    y: (fruit.nutritions.sugar/sugarMax),
                    x: "Sugar"
                },
            ]
        }));
        return (
            <div style={{height : "600px"}}>
                {this.props.fruits.length && (
                    <ResponsiveAreaBump
                        data={data}
                        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                        spacing={8}
                        colors={{ scheme: 'nivo' }}
                        blendMode="multiply"
                        startLabel="id"
                        axisTop={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -36
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      fruits: state.fruits.fruits,
      fruit: state.fruits.fruit,
    };
  };

const mapStateToDispatch = (dispatch) => ({
    actions: bindActionCreators(
        {
            fetchAllFruit,
            fetchCertainFruit,
        },
        dispatch
    ),
});

export default connect(mapStateToProps, mapStateToDispatch)(Homepage);