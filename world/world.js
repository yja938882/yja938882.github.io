      var myGeoJSONPath = './custom.geo.json';
        var myCustomStyle = {
            stroke: true,
            color: '#E8B71A',
            weight: 2,
            fill: true,
            fillColor: '#1FDA9A',
            fillOpacity: 1
        }
        var map;
        var layer;
        $(function(){getJSON(myGeoJSONPath,function(data){
            map = L.map('map').setView([45.74739, -50], 1);

            layer = L.geoJson(data, {
                clickable: true,
                style: myCustomStyle,
                onEachFeature: onEachFeature
            }).addTo(map);

     


        });});

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
             layer.on({
                mouseover : mouseOverM,
                mouseout :mouseOutM,
                 click: zoomToFeature
            });
        }



        function mouseOverM(e){
            var t = e.target;
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


            if(!isZoom){
                 map.fitBounds(e.target.getBounds());
                 isZoom=true;
            }else if( isZoom ==true){
                map.fitBounds(layer.getBounds());
                isZoom=false;
            }
        }
        function AddMarker(){
            L.marker([$('#l1').val(), $('#l2').val()]).addTo(map);
        }
