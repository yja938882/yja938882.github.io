var cusdiv_visible = true;
function customonoff(){
 if(cusdiv_visible){
  $('#customdiv').hide();
    cusdiv_visible = false;
  }else{
    $('#customdiv').show();
    cusdiv_visible = true;
 }
}

var myGeoJSONPath = './custom.geo.json';
var map;
var layer;

 var pre_markers = [
   {
     "name": "캐나다",
     "lat": 56.130366,
     "lng": -106.346771
   },
   {
     "name": "앵귈라",
     "lat": 18.220554,
     "lng": -63.068615
   },
   {
     "name": "일본",
     "lat": 36.204824,
     "lng": 138.252924
   }
]; 
//function initStyle :  처음 Style 초기화 
var defaultStyle = { stroke: true, color: '#E8B71A', weight: 2,fill: true,fillColor: '#1FDA9A',fillOpacity: 1};
var exclusiveStyle ={ stroke:true, color: '#eef', weight: 1, fill:true, fillColor: '#eef', fillOpacity: 1};
function initStyle(feature){
  switch(feature.properties.name){
    case "Russia":
    case "China":
      return exclusiveStyle;
    default :
      return defaultStyle;
    break;
  }
}
function customClickable(feature){
          if(feature.properties.name=="Russia"){
            return false;
        }else{
            return true;
        }

    }

$(function(){
  $.getJSON(myGeoJSONPath,function(data){
    map = L.map('map').setView([45.74739, 0], 1.5);
    layer = L.geoJson(data, {
      clickable: customClickable,
      style: initStyle,
      onEachFeature: onEachFeature
  }).addTo(map);

for ( var i=0; i < pre_markers.length; ++i ) {
     L.marker( [pre_markers[i].lat, pre_markers[i].lng] )
      .bindPopup( '<a href="' + pre_markers[i].name + '" target="_blank">' + pre_markers[i].name + '를 클릭하셨습니다'+ '</a>' )
      .addTo( map );
  }


        });



        });

        function onClickChLineColor(){
            layer.setStyle({color:$('#line_color_input').val()});
        }

        function onClickChBgColor(){
            $('.leaflet-container').css('background-color' , $('#bg_color_input').val());
        }

        function onClickChLineWidth(){
            layer.setStyle({weight:$('#line_width_input').val()});
        }
        function onClickChCtColor(){
            layer.setStyle({fillColor:$('#ct_color_input').val()});
        }

        function onEachFeature(feature, layer) {
            if(feature.properties.name =="Russia"||
              feature.properties.name=="China"){
                return;
              }
    
 
             layer.on({
                mouseover : mouseOverM,
                mouseout :mouseOutM,
                 click: zoomToFeature
            });
        }



        function mouseOverM(e){
            var t = e.target;
            if(t.feature.properties.name=="Russia"){
                return;
            }
            t.setStyle({
                color:$('#mo_line_color_input').val(),
                fillColor:$('#mo_ct_color_input').val()
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                t.bringToFront();
            }
        }
        function mouseOutM(e){
            var t = e.target;
            t.setStyle({
                color:$('#line_color_input').val(),
                fillColor:$('#ct_color_input').val()});
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                t.bringToFront();
            }
        }

        var isZoom = false;
        function zoomToFeature(e) {
          console.log(e.target.feature.properties.name);
            if(!isZoom){
                 map.fitBounds(e.target.getBounds());
                 isZoom=true;
            }else if( isZoom ==true){
             //   map.fitBounds(layer.getBounds());
                map.setView([45.74739, 0], 1.5);
                isZoom=false;
            }
        }
        function AddMarker(){
            L.marker([$('#l1').val(), $('#l2').val()]).addTo(map);
        }


   

