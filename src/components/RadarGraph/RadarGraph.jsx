import React, { Component } from "react";
import { ResponsiveRadar } from "@nivo/radar";

class RadarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  prepareDataToDisplay(leftButtonData, rightButtonData) {
    let array = [];
    let temp = {};
    this.props.data.forEach((obj) => {
      (obj.id === leftButtonData || obj.id === rightButtonData) &&
        obj.data.map((element) => {
          temp[`${element.x}`] = element.y;
        }) &&
        array.push(Object.assign({}, temp));
    });
    this.setState({
      data: array,
    });
  }
  handleSubmit = () => {
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
                      this.setState({ leftButtonData: element.id });
                    }}
                  >
                    {element.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={"col-8"} style={{ height: "600px" }}>
          {this.state.data && (
            <ResponsiveRadar
              data={this.state.data}
              keys={[this.state.leftButtonData, this.state.rightButtonData]}
              indexBy="Calories"
              maxValue="auto"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              curve="linearClosed"
              borderWidth={2}
              borderColor={{ from: "color" }}
              gridLevels={5}
              gridShape="circular"
              gridLabelOffset={36}
              enableDots={true}
              dotSize={10}
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
          <button onClick={this.handleSubmit}>Submit</button>
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
                    this.setState({ rightButtonData: element.id });
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
