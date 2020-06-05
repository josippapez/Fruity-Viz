import React, { Component } from "react";
import { Treemap } from "react-vis";

export default class BubbleGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNode: false,
      treemapData: [],
      useCirclePacking: true,
      bubleDataPoints: ["Calories", "Carbohydrates", "Fat", "Protein", "Sugar"],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.fruits !== prevProps.fruits) {
      let array = [];
      this.setData(this.props.fruits, array);
      console.log(array);
      this.setState({
        treemapData: array,
      });
    }
  }

  setData(fruits, array) {
    const totalLeaves = fruits && fruits.length;
    let temp = {};
    console.log(totalLeaves);
    // eslint-disable-next-line array-callback-return
    this.state.bubleDataPoints.map((data) => {
      let leaves = [];
      // eslint-disable-next-line array-callback-return
      fruits.map((fruit) => {
        temp["name"] = fruit.name;
        temp["size"] = fruit.nutritions[data.toLocaleLowerCase()];
        temp["color"] = Math.random();
        temp["style"] = { border: "thin solid red" };
        leaves.push(Object.assign({}, temp));
      }) &&
        array.push({
          title: data,
          color: Math.random(),
          children: leaves,
        });
    });
  }

  render() {
    const { hoveredNode } = this.state;
    return (
      <div>
        {this.state.treemapData &&
          this.state.treemapData.map((data) => {
            return (
              <div className="dynamic-treemap">
                <div className="position-absolute">
                    {data.title}
                </div>
                <Treemap
                  data={data}
                  onLeafMouseOver={(x) =>
                    this.setState({ hoveredNode: x.data })
                  }
                  onLeafMouseOut={() => this.setState({ hoveredNode: false })}
                  height={350}
                  mode="circlePack"
                  getLabel={(x) => x.name}
                  width={350}
                  hideRootNode
                />
              </div>
            );
          })}
        <div className="node">
            {hoveredNode ? hoveredNode.name + " " + hoveredNode.size : null}
        </div>
      </div>
    );
  }
}
