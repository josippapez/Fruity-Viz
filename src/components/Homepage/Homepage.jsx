import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ResponsiveAreaBump } from '@nivo/bump'

import { fetchAllFruit, fetchCertainFruit } from '../../store/actions/fruitsActions'

class Homepage extends Component {
    state = ({
        toggled: true,
        data: [],
        calories: true,
        carbs: true,
        fat: true,
        protein: true,
        sugar: true,
    });

    componentDidMount() {
        this.props.actions.fetchAllFruit();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.fruits !== prevProps.fruits) {
            this.setState({
                data: this.props.fruits && this.props.fruits.map(fruit => ({
                    id: fruit.name,
                    data: [
                        {
                            y: (fruit.nutritions.calories),
                            x: "Calories",
                        },
                        {
                            y: (fruit.nutritions.carbohydrates),
                            x: "Carbohydrates",
                        },
                        {
                            y: (fruit.nutritions.fat),
                            x: "Fat",
                        },
                        {
                            y: (fruit.nutritions.protein),
                            x: "Protein",
                        },
                        {
                            y: (fruit.nutritions.sugar),
                            x: "Sugar"
                        },
                    ]
                })),
            });
        }
        if (this.state.toggled !== prevState.toggled) {
            this.setState({
                data: this.props.fruits && this.props.fruits.map(fruit => ({
                    id: fruit.name,
                    data: [
                        {
                            y: (fruit.nutritions.calories),
                            x: "Calories",
                            toggle: this.state.calories,
                        },
                        {
                            y: (fruit.nutritions.carbohydrates),
                            x: "Carbohydrates",
                            toggle: this.state.carbs,
                        },
                        {
                            y: (fruit.nutritions.fat),
                            x: "Fat",
                            toggle: this.state.fat,
                        },
                        {
                            y: (fruit.nutritions.protein),
                            x: "Protein",
                            toggle: this.state.protein,
                        },
                        {
                            y: (fruit.nutritions.sugar),
                            x: "Sugar",
                            toggle: this.state.sugar,
                        },
                    ].filter(element => element.toggle === true)
                })),
            });
        }
    }

    hideNes = (type) => {
        this.setState({
            [type]: !this.state[type],
            toggled: !this.state.toggled
        })
    }

    render() {
        /* let caloriesMax = 0;
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
        }); */
        return (
            <div style={{height : "600px"}}>
                <button className={this.state.calories ? "btn-primary" : "btn-danger"} onClick={() => this.hideNes("calories")}>
                    Toggle Calories
                </button>
                <button className={this.state.carbs ? "btn-primary" : "btn-danger"} onClick={() => this.hideNes("carbs")}>
                    Toggle Carbohydrates
                </button>
                <button className={this.state.fat ? "btn-primary" : "btn-danger"} onClick={() => this.hideNes("fat")}>
                    Toggle Fat
                </button>
                <button className={this.state.protein ? "btn-primary" : "btn-danger"} onClick={() => this.hideNes("protein")}>
                    Toggle Protein
                </button>
                <button className={this.state.sugar ? "btn-primary" : "btn-danger"} onClick={() => this.hideNes("sugar")}>
                    Toggle Sugar
                </button>
                {this.state.data.length && this.state.data[0].data.length ? (
                    <ResponsiveAreaBump
                        data={this.state.data}
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
                        motionStiffness={300}
                        motionDamping={24}
                    />
                ) : null}
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