
    var mapDiv = d3.select('#map');
    var g = mapDiv.append('g');
    var width  = mapDiv.node().getBoundingClientRect().width;
    var height = 0.6 * width;
    var plotCenter = [ width/2, height/1.5 ];

    var initialLongitude = -95;            // Initial longitude to center
    var latitudeBounds = [ -70, 84 ];      // Maximum latitude to display
        
    var projection = d3.geo.mercator()
        .rotate([-initialLongitude, 0])    // Rotate the initial longitude to center
        .scale(1)                          // We'll scale up to match the viewport shortly
        .translate(plotCenter);

    var viewMin = [ 0, 0 ];
    var viewMax = [ 0, 0 ];

    function updateProjectionBounds () {
        // Updates the view top left and bottom right with the current projection.
        var yaw = projection.rotate()[0];
        var longitudeHalfRotation = 180.0 - 1e-6;

        viewMin = projection([-yaw - longitudeHalfRotation, latitudeBounds[1]]);
        viewMax = projection([-yaw + longitudeHalfRotation, latitudeBounds[0]]);
    }

    updateProjectionBounds();

    // Set up the scale extent and initial scale for the projection.
    var s = width / (viewMax[0] - viewMin[0]);
    var scaleExtent = [s, 50*s];        // The minimum and maximum zoom scales

    projection
        .scale(scaleExtent[0]);         // Set up projection to minimium zoom
        
    var path = d3.geo.path()            // Map Geometry
        .projection(projection);

    var svg = mapDiv.append('svg')      // Set up map SVG element
        .attr('width',width)
        .attr('height',height)

    var map = svg.append('g');          // Map Group

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height);





    var zoom = d3.behavior.zoom()       // Set up zoom
        .size([width,height])
        .scaleExtent(scaleExtent)
        .scale(projection.scale())
        .on("zoom", handlePanZoom);

    svg.call(zoom);                     // Attach zoom event

    
var filter = svg.append("defs")
  .append("filter")
  .attr("id", "drop-shadow")
  .attr("height", "110%");
filter.append("feGaussianBlur")
.attr("in", "SourceAlpha")
.attr("stdDeviation", 1)
.attr("result", "blur");

 filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 1)
    .attr("dy", 1)
    .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

var gradient = svg.append("svg:defs")
  .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#0F3871")
    .attr("stop-opacity", 1);

gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#175BA8")
    .attr("stop-opacity", 1);

    // Load map data
    var points = svg.append("g");
   // var marks=[{long : 100, lat: 100}];

   var marks = [{long: -45, lat: 43, id: "m0"},{long: -78, lat: 41, id:"m1"},{long: -70, lat: 53, id:"m2"}];

   function clickMarker(d){
    var popup = $('#'+d.id);
        if( popup.is(':visible')){
            popup.hide();
        }else{
            $('.popup_on_map').hide();
            popup.show();
        }
   }

    d3.json("./json/custom.json", function (error, world) {

    /*    map.selectAll('path')
            .data(world.features)
            .enter()
            .append('path')
            .attr("d",path);
        -geo*/ 
    
 map.selectAll('path')
            .data(topojson.object(world,world.objects.countries).geometries)
            .enter()
            .append('path')
            .attr("d",path);

    

        svg.selectAll(".mark")
        .data(marks)
        .enter()
        .append("image")
        .attr('class','mark')
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href","./images/marker-icon.png")
        .attr("transform", function(d) {
        $('#map').append("<div class='popup_on_map'"+"id='"+d.id+"' style='top:"+(projection([d.long, d.lat])[1]-100)+"px;left:"+projection([d.long, d.lat])[0]+"px;'>"+d.id+"</div>")
        $('#'+d.id).hide(); 
            return "translate(" + projection([d.long,d.lat]) + ")";})
        .on("click",clickMarker);


         map.insert("path")
      .datum(topojson.object(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path)
      .attr("pointer-events","none")
      .style("filter", "url(#drop-shadow)")
      .style("fill", "url(#gradient)")
      ;
      
    map.insert("path")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path)
      .style("fill","none")
      .attr("pointer-events","none")
      ;
      
     
/*
        points.selectAll(".mark")
            .data(marks)
            .enter()
            .append("image")
            .attr('class','mark')
            .attr('width', 10)
            .attr('height', 10)
            .attr("xlink:href","./images/marker-icon.png")
            .attr("transform", function(d) {return "translate(" + projection([d.long, d.lat]) + ")";});
*/

        render();
    });

    // The following variables track the last processed event.
    var translateLast = [0,0];
    var scaleLast     = null;

    function render() {
        map.selectAll('path')       // Redraw all map paths
            .attr('d', path);
    }

    function handlePanZoom() {
        
        // Handle pan and zoom events

        var scale = zoom.scale();
        var translate = zoom.translate();
        
        // If the scaling changes, ignore translation (otherwise touch zooms are weird).
        var delta = [ translate[0] - translateLast[0], translate[1] - translateLast[1] ];
        if (scale != scaleLast) {
            projection.scale(scale);
        } else {
            var longitude = projection.rotate()[0];
            var latitude = projection[1];
            var tp = projection.translate();
        
            // Use the X translation to rotate, based on the current scale.
            longitude += 360 * (delta[0] / width) * (scaleExtent[0] / scale);
            projection.rotate ([longitude, 0, 0]);

            // Use the Y translation to translate projection, clamped by min/max
            updateProjectionBounds();

            if (viewMin[1] + delta[1] > 0)
                delta[1] = -viewMin[1];
            else if (viewMax[1] + delta[1] < height)
                delta[1] = height - viewMax[1];

            projection.translate ([ tp[0], tp[1] + delta[1] ]);

        }



        // Store the last transform values. NOTE: Resetting zoom.translate() and zoom.scale()
        // would seem equivalent, but it doesn't seem to work reliably.
        scaleLast = scale;
        translateLast = translate;

        svg.selectAll(".mark").
        attr("transform", function(d) {
            $('#'+d.id).css("left",projection([d.long, d.lat])[0] + "px");
            $('#'+d.id).css("top",projection([d.long, d.lat])[1] -100+"px")
            return "translate("+ projection([d.long,d.lat])+")";});



       // console.log(projection.translate(translateLast)[0]);

        render();

    }
/*

var marks = [{long: -75, lat: 43},{long: -78, lat: 41},{long: -70, lat: 53}];

svg.selectAll(".mark")
    .data(marks)
    .enter()
    .append("image")
    .attr('class','mark')
    .attr('width', 20)
    .attr('height', 20)
    .attr("xlink:href",'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/24x24/DrawingPin1_Blue.png')
    .attr("transform", function(d) {return "translate(" + projection([d.long,d.lat]) + ")";});
*/




function oc_chbgColor(){
    $('svg').css("background-color", $('#bg_color_input').val());
}
function oc_chctColor(){
    $('path').css("fill", $('#ct_color_input').val());
}
function oc_chlnColor(){
    $('path').css("stroke", $('#ln_color_input').val());
}
function oc_chlnWidth(){
    $('path').css("stroke-width", $('#ln_width_input').val()+"px");
}
function oc_chbgGradient(){
    $('svg').css(
        "background" , "linear-gradient(to right, "+$('#gr_left').val()+", "+$('#gr_center').val()+","+$('#gr_right').val()+")");
}
function oc_chbgRGradient(){
      $('svg').css(
        "background" , "radial-gradient("+$('#gr_inner').val()+", "+$('#gr_middle').val()+","+$('#gr_outer').val()+")");
}