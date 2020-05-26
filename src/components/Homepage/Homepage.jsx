import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ResponsiveAreaBump } from '@nivo/bump'

import "./Homepage.scss"
import { fetchAllFruit, fetchCertainFruit } from '../../store/actions/fruitsActions'

class Homepage extends Component {
    state = ({
        toggled: true,
        notStandardized: true,
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
            let caloriesMax = 0;
            let carbohydratesMax = 0;
            let fatMax = 0;
            let proteinMax = 0;
            let sugarMax = 0;
            // eslint-disable-next-line array-callback-return
            this.props.fruits.map(fruit => {
                if (fruit.nutritions.calories > caloriesMax) caloriesMax = fruit.nutritions.calories;
                if (fruit.nutritions.carbohydrates > carbohydratesMax) carbohydratesMax = fruit.nutritions.carbohydrates;
                if (fruit.nutritions.fat > fatMax) fatMax = fruit.nutritions.fat;
                if (fruit.nutritions.protein > proteinMax) proteinMax = fruit.nutritions.protein;
                if (fruit.nutritions.sugar > sugarMax) sugarMax = fruit.nutritions.sugar;
            });
            this.setState({
                caloriesMax,
                carbohydratesMax,
                fatMax,
                proteinMax,
                sugarMax,
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
                            y: (fruit.nutritions.sugar) ,
                            x: "Sugar",
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
                            y: this.state.notStandardized ? (fruit.nutritions.calories) : (fruit.nutritions.calories/this.state.caloriesMax),
                            x: "Calories",
                            toggle: this.state.calories,
                        },
                        {
                            y: this.state.notStandardized ? (fruit.nutritions.carbohydrates) : (fruit.nutritions.carbohydrates/this.state.carbohydratesMax),
                            x: "Carbohydrates",
                            toggle: this.state.carbs,
                        },
                        {
                            y: this.state.notStandardized ? (fruit.nutritions.fat) : (fruit.nutritions.fat/this.state.fatMax),
                            x: "Fat",
                            toggle: this.state.fat,
                        },
                        {
                            y: this.state.notStandardized ? (fruit.nutritions.protein) : (fruit.nutritions.protein/this.state.proteinMax),
                            x: "Protein",
                            toggle: this.state.protein,
                        },
                        {
                            y: this.state.notStandardized ? (fruit.nutritions.sugar) : (fruit.nutritions.sugar/this.state.sugarMax),
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
        const toggleButtons = ["calories", "carbs", "fat", "protein", "sugar"];
        console.log(this.state);
        return (
            <div style={{height : "600px"}}>
                <div className="container text-center">
                    {toggleButtons.map(data => {return (
                        <button
                            className={`toggleButton p-3 m-3 text-capitalize border-0 ${this.state[data] ? "btn-success" : "btn-danger"}`}
                            onClick={() => this.hideNes(data)}
                            key={data}
                        >
                            {`Toggle ${data}`}
                        </button>
                    )})}
                    <div className="buttonBorder"></div>
                    <button
                        className={`toggleButton border-0 ml-5 p-3 ${this.state.notStandardized ? "btn-danger" : "btn-primary"}`}
                        onClick={() => this.hideNes("notStandardized")}
                    >
                        Standardize
                    </button>
                </div>
                {this.state.data.length && this.state.data[0].data.length ? (
                    <ResponsiveAreaBump
                        data={this.state.data}
                        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                        spacing={8}
                        colors={{ scheme: 'nivo' }}
                        blendMode="normal"
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