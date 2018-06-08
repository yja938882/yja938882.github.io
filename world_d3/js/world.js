
var mapDiv = d3.select('#map');
var g = mapDiv.append('g');
var width  = mapDiv.node().getBoundingClientRect().width;
var height = 0.6 * width;
var plotCenter = [ width/2, height/1.5 ];

var initialLongitude = 80;            // Initial longitude to center
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

projection.scale(scaleExtent[0]);         // Set up projection to minimium zoom
        
var path = d3.geo.path()            // Map Geometry
    .projection(projection);


var mouseX;
var mouseY;
var svg = mapDiv.append('svg')      // Set up map SVG element
    .attr('width',width)
    .attr('height',height)
    .on('mousemove', function(ev) {

      // Get the (x, y) position of the mouse (relative to the SVG element)
      var pos = d3.mouse(svg.node()),
          px = pos[0],
          py = pos[1];
      // Compute the corresponding geographic coordinates using the inverse projection
      var coords = projection.invert([px, py]);

      // Format the coordinates to have at most 4 decimal places
      var lon = coords[0].toFixed(4),
          lat = coords[1].toFixed(4);
       //   mouseX = coords[0];
         // mouseY = coords[1];
         mouseX = lon;
         mouseY = lat;
       //  console.log(lon);
    });




var map = svg.append('g');          // Map Group




svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);

var zoom = d3.behavior.zoom()      // Set up zoom
    .size([width,height])
    .scaleExtent(scaleExtent)
    .scale(projection.scale())
    .on("zoom", handlePanZoom);

    svg.call(zoom);                     // Attach zoom event

    // Load map data
var points = svg.append("g");

function clickMarker(d){
    var popup = $('#'+d.id);
    if( popup.is(':visible')){
        popup.hide();
    }else{
        $('.popup_on_map').hide();
        popup.show();
    }
}

    // The following variables track the last processed event.
var translateLast = [0,0];
var scaleLast     = null;

function render() {
    map.selectAll('path')       // Redraw all map paths
        .attr('d', path);
}


function handlePanZoom() {
  //  return;
   // console.log("zomm");
    var scale = zoom.scale();

   // console.log(scale);
    var translate = zoom.translate();
  
    // If the scaling changes, ignore translation (otherwise touch zooms are weird).
    var delta = [ translate[0] - translateLast[0], translate[1] - translateLast[1] ];
   
    if (scale != scaleLast) {
        projection.scale(scale);
        

       // var long ;//= projection.rotate()[0];
        //longitude += 360 * (delta[0] / width) * (scaleExtent[0] / scale);
     //   long =  360 * (126 / width) * (scaleExtent[0] / scale)
        var long = projection.rotate()[0];
       // var to = (-mouseX);
        //if(long - to >0){
         //   long +=(long-to)/100.0;
        //}else{
         //   long +=(long-to)/100.0;
       // } 즉 스크롤 in 일때 자연스럽게  -mouseX 로 줌이 되야 한다는건데..
          console.log("scale:"+scale);
         console.log("lon : "+long);
       console.log("m x : "+mouseX);
        
        //var to = 360 * (/ width) * (scaleExtent[0] / scale);



        projection.rotate ([to, 0, 0]);// -- 이것은 x 축이동.
      //  console.log(mouseX);


    } else {
        var longitude = projection.rotate()[0];
        var latitude = projection[1];
        var tp = projection.translate();
        // Use the X translation to rotate, based on the current scale.
        longitude += 360 * (delta[0] / width) * (scaleExtent[0] / scale);
        console.log(delta[0] +","+longitude);
        projection.rotate ([longitude, 0, 0]);// -- 이것은 x 축이동.
       

        // Use the Y translation to translate projection, clamped by min/max
        updateProjectionBounds();
        if (viewMin[1] + delta[1] > 0)
            delta[1] = -viewMin[1];
        else if (viewMax[1] + delta[1] < height)
            delta[1] = height - viewMax[1];
        
        projection.translate ([ tp[0], tp[1] + delta[1] ]); //-- 이것은 y 축 이동.
    }
    // Store the last transform values. NOTE: Resetting zoom.translate() and zoom.scale()
    // would seem equivalent, but it doesn't seem to work reliably.
    scaleLast = scale;
    translateLast = translate;

    svg.selectAll(".mark").
        attr("transform", function(d) {
            $('#'+d.id).css("left",projection([d.lng, d.lat])[0]+ "px");
            $('#'+d.id).css("top",projection([d.lng, d.lat])[1]-100+"px")
            var to = [ projection([d.lng,d.lat])[0]-20 , projection([d.lng,d.lat])[1]-40 ];
            return "translate("+ to+")";});
    render();
}

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
        "background" , "radial-gradient("+$('#gr_inner').val()+", "+$('#gr_outer').val()+")");
}
function oc_chblur(){

    
var filter = svg.append("defs")
  .append("filter")
  .attr("id", "drop-shadow")
  .attr("height", "110%");




 filter.append("feOffset")
    .attr("in", "SourceGraphic")
    .attr("dx", $('#bl_dx').val())
    .attr("dy", $('#bl_dy').val())
    .attr("result", "offOut");

    filter.append("feColorMatrix")
    .attr('in','offOut')
    .attr('type','matrix')
    .attr('values', $('#bl_r').val()+" 0 0 0 0 0 "+$('#bl_g').val()+" 0 0 0 0 0 "+$('#bl_b').val()+" 0 0 0 0 0 "+$('#bl_a').val()+" 0")
    .attr('result','matrixOut');


var blur = filter.append("feGaussianBlur")
.attr("in", "matrixOut")
.attr("stdDeviation", $('#bl_dv').val())
.attr("result", "blurOut");

var feBlend = filter.append('feBlend')
    .attr("in","SourceGraphic")
    .attr("in2","blueOut");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

//나라 그래디언트50
var gradient = svg.append("svg:defs")
  .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#000000")
    .attr("stop-opacity", 100);

gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#175BA8")
    .attr("stop-opacity", 100);



var marks = [{long: -45, lat: 43, id: "m0"},{long: -78, lat: 41, id:"m1"},{long: -70, lat: 53, id:"m2"}];



d3.json("./json/custom.json", function (error, world) {
    d3.json("./json/compcus.json", function(error, data){
     //   console.log(data.length);

        svg.selectAll(".mark")
        .data(data)
        .enter()
        .append("image")
        .attr('class','mark')
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href","./images/marker-icon-un.png")
        .attr("transform", function(d) {
             $('#map').append(
                "<div class='popup_on_map' "+"id='"+d.id+"' style='display:none; top:"+(projection([d.lng, d.lat])[1]-100)+"px;left:"+(projection([d.lng, d.lat])[0]-20)+"px;'>"+
                "<div class='popup_on_map_region'>"+d.country+" "+d.region+"</div><div class='popup_on_map_details'>"+d.compname+"</div></div>");
             $('#'+d.id).hide(); 
             var to = [ projection([d.lng,d.lat])[0]-20 , projection([d.lng,d.lat])[1]-40 ];
                return "translate(" + to + ")";})
        .on('mouseover',mouseoverMark)
        .on('mouseout',mouseoutMark)
        .on('click',mouseclickMark);
    });

    map.selectAll('path')
        .data(topojson.object(world,world.objects.countries).geometries)
        .enter()
        .append('path')
        .attr("d",path);

    map.insert("path")
        .datum(topojson.object(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path)
        .attr("pointer-events","none")
        .style("filter", "url(#drop-shadow)")
        .style("fill", "url(#gradient)");
      
    map.insert("path")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path)
        .style("fill","none")
        .attr("pointer-events","none");
    
    render();
    });
}
var onoff = true;
function onclickOnOff(){
    if(onoff){
        onoff = false;
        $('.custom').hide();
    }else{
        onoff = true;
        $('.custom').show();
    }
}


 function mouseoverMark(d){
    //console.log(scaleExtent[0]);
   // console.log(comp_data.length);
    d3.select(this).attr("xlink:href","./images/marker-icon.png");
    var popup = $('#'+d.id);
    if(popup.is(":visible") ){
        return;
    }
    popup.show();
   }

   function mouseoutMark(d){
    d3.select(this).attr("xlink:href","./images/marker-icon-un.png");
    //console.log(scaleExtent[0]);
    var popup = $('#'+d.id);
    popup.hide();
   }
   var a=[0,2];
   function mouseclickMark(d){
       // console.log(items[0]);
       var st="";
       for(var i=0;i<d.data.length;i++){
            st+=d.data[i].name +" ";
            st+=d.data[i].year +" ";
            st+=d.data[i].birth +" ";
            st+=d.data[i].instrument +" ";
            st+=d.data[i].video +" ";
            st+="\n";
       }
       alert(st);

   }



