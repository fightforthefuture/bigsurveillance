var HistogramView = function(collection, dom_id){

  console.log("making histogram");

  var values = collection;

  var margin = {top: 25, right: 25, bottom: 25, left: 25},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;



      // set scale from raw values to pixels and
      // generate a histogram from raw values
      var possible_grades = ["F", "D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
      var grade_map = {};
      for(var g = 0; g < possible_grades.length; g++){
          grade_map[possible_grades[g]] = g;
      }
      var grades = values.map(function(d){ return grade_map[d.get("grade")]; });
      var rep_grades = values.filter(function(d){return d.get("party") === 'R';}).map(function(d){return grade_map[d.get("grade")]});
      var dem_grades = values.filter(function(d){return d.get("party") === 'D';}).map(function(d){return grade_map[d.get("grade")]});

      console.log(grades);
      console.log(rep_grades);
      console.log(dem_grades);
      var x = d3.scale.linear()
          .domain([0, possible_grades.length])
          .range([0, width]);

      var data = d3.layout.histogram()
          .bins(x.ticks(possible_grades.length))
          (grades);

      var data_rep = d3.layout.histogram()
          .bins(x.ticks(possible_grades.length))
          (rep_grades);

      var data_dem = d3.layout.histogram()
          .bins(x.ticks(possible_grades.length))
          (dem_grades);

      var y = d3.scale.linear()
          .domain([0, d3.max(data, function(d) {return d.y; })])
          .range([height, 0]);

      // base svg element
      var svg = d3.select(dom_id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .attr("fill", "white")
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // format bars
      var bar = svg.selectAll(".bar")
          .data(data)
        .enter().append("g")
          .attr("class", "bar")
          .attr("transform", function(d) {
              return "translate(" + x(d.x) + "," + y(d.y) + ")";
          });

      bar.append("rect")
          .attr("x", 0)
          .attr("width", (x(data[0].dx) - 1)/3 )
          .attr("height", function(d) { return height - y(d.y); })
          .style("fill","#004489")
          .attr('fill-opacity', 0.7);

      // format bars
      var barRep = svg.selectAll(".barRep")
          .data(data_rep)
        .enter().append("g")
          .attr("class", "barRep")
          .attr("transform", function(d) {
              return "translate(" + (x(d.x) +12) + "," + y(d.y) + ")";
          });
      barRep.append("rect")
          .attr("x", 0)
          .attr("width", (x(data_rep[0].dx) - 1)/5 )
          .attr("height", function(d) { return height - y(d.y); })
          .style("fill", "#FF0000")
          .attr('fill-opacity', 0.4);


      // format bars
      var barDem = svg.selectAll(".barDem")
          .data(data_dem)
        .enter().append("g")
          .attr("class", "barDem")
          .attr("transform", function(d) {
              return "translate(" + (x(d.x) + 20) + "," + y(d.y) + ")";
          });

      barDem.append("rect")
          .attr("x", 0)
          .attr("width", (x(data_dem[0].dx) - 1)/5 )
          .attr("height", function(d) { return height - y(d.y); })
          .style("fill", "#0000FF")
          .attr('fill-opacity', 0.4);

      var legend = svg.selectAll(".legend")
      .data(["Democrats","Republicans","All"])
            .enter().append("g")
              .attr("class", "legend")
              .attr("fill", "white")
              .attr("transform", function(d, i) { return "translate(-100," + i * 20 + ")"; });

      legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", function(d){
                if (d==="Democrats")
                  return "#0000FF";
                if (d==="Republicans")
                  return "#FF0000";
                if (d==="All")
                  return "#004489";
              } )
              .attr('fill-opacity', function(d){
                if (d==="Democrats")
                  return 0.4;
                if (d==="Republicans")
                  return 0.4;
                if (d==="All")
                  return 1;
              });
;

      legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .attr("fill", "white")
              .style("text-anchor", "end")
              .style("color", "white")
              .text(function(d) { return d; });

      svg.append("text")
              .attr("x", (width / 2))
              .attr("y", 0 - (margin.top / 2))
              .attr("text-anchor", "middle")
              .attr("fill", "white")
              .style("font-size", "16px")
              .style("text-decoration", "underline")
              .text("Grade Distribution by Party Affiliation");

      //
      // // format bar text values
      // bar.append("text")
      //     .attr("dy", ".75em")
      //     .attr("y", -12)
      //     .attr("x", x(data[0].dx) / 2)
      //     .attr("text-anchor", "middle")
      //     .text(function(d) { return d.y ? d3.format(",.0f")(d.y) : ""; });

      // format axis
      var grade_ticks = [];
      for(var g = 0; g < possible_grades.length; g++){
          grade_ticks.push(g + 0.5);
      }
      var xAxis = d3.svg.axis()
          .scale(x)
          .tickValues(grade_ticks)
          .innerTickSize(0)
          .tickPadding(10)
          .tickFormat(function(t) { return possible_grades[t - 0.5]; })
          .orient("bottom");


      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);






};
