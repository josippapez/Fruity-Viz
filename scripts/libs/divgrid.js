// http://bl.ocks.org/3687826
d3.divgrid = function (config) {
  var columns = [];

  var dg = function (selection) {
    if (columns.length == 0) columns = d3.keys(selection.data()[0][0]);

    // header
    selection
      .selectAll(".header")
      .data([true])
      .enter()
      .append("div")
      .attr("class", "header");

    var header = selection.select(".header").selectAll(".cell").data(columns);

    header
      .enter()
      .append("div")
      .attr("class", function (d, i) {
        return "col-" + i;
      })
      .classed("cell", true);

    var desc = true;

    selection
      .selectAll(".header .cell")
      .text(function (d) {
        return d;
      })
      .on("click", function (d) {
        if (d == "name") {
          if (desc) {
            rows.sort(function (a, b) {
              return d3.descending(a[d], b[d]);
            });
            desc = !desc;
          } else {
            rows.sort(function (a, b) {
              return d3.ascending(a[d], b[d]);
            });
            desc = !desc;
          }
        } else {
          if (desc) {
            rows.sort(function (a, b) {
              return b[d] - a[d];
            });
            desc = !desc;
          } else {
            rows.sort(function (a, b) {
              return a[d] - b[d];
            });
            desc = !desc;
          }
        }
      });

    header.exit().remove();

    // rows
    var rows = selection.selectAll(".row").data(function (d) {
      return d;
    });

    rows.enter().append("div").attr("class", "row");
    rows.exit().remove();

    var cells = selection
      .selectAll(".row")
      .selectAll(".cell")
      .data(function (d) {
        return columns.map(function (col) {
          return d[col];
        });
      });

    // cells
    cells
      .enter()
      .append("div")
      .attr("class", function (d, i) {
        return "col-" + i;
      })
      .classed("cell", true);

    cells.exit().remove();

    selection.selectAll(".cell").text(function (d) {
      return d;
    });

    return dg;
  };

  dg.columns = function (_) {
    if (!arguments.length) return columns;
    columns = _;
    return this;
  };

  return dg;
};
