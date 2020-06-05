import React, { Component } from "react";
import { ResponsiveRadar } from "@nivo/radar";
var _ = require('lodash');

class RadarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submited: false,
      data: [],
    };
  }

  prepareDataToDisplay(leftButtonData, rightButtonData) {
    let tempArray = [];
    this.props.toggleButtons.map(name => tempArray.push(Object.assign({},{key: name})));
    let array = [];
    let temp = {};
    tempArray.map(arr => this.props.data.forEach((obj) => {
      (obj.id === leftButtonData || obj.id === rightButtonData) &&
        // eslint-disable-next-line array-callback-return
        obj.data.map((element) => {
          if(element.x === arr.key) temp[`${obj.id}`] = element.y;
        }) && array.push(Object.assign(arr, temp))
    }));
    array = _.uniq(array);
    this.setState({
      data: array
    });
  }

  handleSubmit = () => {
    this.setState({
      submited: true,
    });
    this.prepareDataToDisplay(
      this.state.leftButtonData,
      this.state.rightButtonData
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-2 left-button">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {this.props.data.map((element) => {
                return (
                  <button
                    key={element.id}
                    className="dropdown-item"
                    onClick={() => {
                      this.setState({ submited: false, leftButtonData: element.id });
                    }}
                  >
                    {element.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={"col-8"} style={{ height: "800px" }}>
          {this.state.submited && (
            <ResponsiveRadar
              data={this.state.data}
              keys={[this.state.leftButtonData, this.state.rightButtonData]}
              indexBy="key"
              maxValue="auto"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              curve="linearClosed"
              borderWidth={2}
              borderColor={{ from: "color" }}
              gridLevels={5}
              gridShape="circular"
              gridLabelOffset={36}
              enableDots={true}
              dotSize={20}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              dotBorderColor={{ from: "color" }}
              enableDotLabel={true}
              dotLabel="value"
              dotLabelYOffset={-12}
              colors={{ scheme: "nivo" }}
              fillOpacity={0.25}
              blendMode="multiply"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              isInteractive={true}
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          )}
          <button
          className="btn-dark submitButton"
            onClick={() => this.state.leftButtonData
              && this.state.rightButtonData
              && this.handleSubmit()
            }
            >
              Submit
          </button>
        </div>
        <div className="col-2 right-button">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.props.data.map((element) => {
              return (
                <button
                  key={element.id}
                  className="dropdown-item"
                  onClick={() => {
                    this.setState({ submited: false, rightButtonData: element.id });
                  }}
                >
                  {element.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default RadarGraph;
