(function(){
    var width = 800,
        height = 800;

    var svg = d3.select("#chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", "translate("+width/2+","+height/4+")")

    d3.queue()
      .defer(d3.csv, "conference.csv")
      .await(ready)
//
//
//  
    var forceCollide = d3.forceCollide(function(d){
      return radiusScale(d.authornum)
    })

    var forceY = d3.forceY(function(d){
      if (d.Conference==="Vis") {
        return 20
      }else{
        return 200
      }
    })
     var simulation = d3.forceSimulation()
      .force("x",d3.forceX(function(d){
        return width/2;
      }).strength(0.005))
      .force("y",forceY)
     // .force("y",d3.forceY(height/2).strength(0.005))
    //  .force("collied",d3.forceCollide(10))
      .force("collied",forceCollide)
        //d3.forceCollide(function(d){
       // return radiusScale(d.authornum);
     // }))
    //     .force("x", d3.forceX(width/2).strength(0.005))

    var radiusScale = d3.scaleSqrt().domain([1,10]).range([10,80])
    function colorFill(t){
      if (t=="Vis") {
        return "lightblue";
      }
      if (t=="Vis2"){
        return "lightgreen";
      }if (t=="Vis3"){
        return "orange";
      }else{
        return "grey"
      }
    }

    d3.select("#split").on('click',function(){
       simulation
        .force("y", forceY)
        .strength(0.5)
      console.log("hello, split")
    })
    d3.select("#combine").on('click',function(){
      simulation
        .force("y", d3.forceY(height /4).strength(0.5))
      console.log("hello, combine")
    })
    function ready (error, datapoints) {

        var circles = svg.selectAll(".artist")
          .data(datapoints)
          .enter().append("circle")
          .attr("class", "artist")
         // .attr("r", 10)
          .attr("r", function(d){
            return radiusScale(d.authornum)
          })
          .attr("fill",  function(d){
            return colorFill(d.Conference)
          })
          //.attr("fill", "lightgreen")
         // .attr("cx", 100)
         // .attr("cy", 300)

         simulation.nodes(datapoints)
          .on('tick',ticked)

        function ticked() {
            circles
                .attr("cx", function(d){
                    return d.x
                })
                .attr("cy", function(d){
                    return d.y
                })
        }
    }

})();