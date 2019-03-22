var map = L.map("map-canvas",{center:[32.3873506, -117.0765251],zoom:15,maxZoom:25});
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
Esri_WorldTopoMap.addTo(map);
var cities = [];
var citiesOverlay = L.d3SvgOverlay(function(sel,proj){
    
  var minLogPop = Math.log2(d3.min(cities,function(d){return d.population;}));
  var citiesUpd = sel.selectAll('line').data(cities);
    
    size = 1.5 / proj.scale;
   // console.log(size)
  citiesUpd.enter()
    .append('line')
    //.attr('width',100)
    //.attr('height',100)
    .attr('stroke','red')
    .attr('stroke-width', function(d){console.log(size); return size})
    //.attr('pathLength',2)
    .attr('x1',function(d){return proj.latLngToLayerPoint(d.startlatLng).x;})
    .attr('y1',function(d){return proj.latLngToLayerPoint(d.startlatLng).y;})
    .attr('x2',function(d){return proj.latLngToLayerPoint(d.endlatLng).x;})
    .attr('y2',function(d){return proj.latLngToLayerPoint(d.endlatLng).y;});
    
    citiesUpd.attr('stroke-width', size);
    
});
d3.csv("milestone3.csv",function(data){
  
    startlat = 323873506 / 10000000
    startlon = -1170765251 / 10000000
    
    cities = data.map(function(d){
        
    endlat = d.lat/10000000  
    endlon =  d.lon/10000000 
       
    d.startlatLng = [+startlat,+startlon];    
    d.endlatLng = [+endlat,+endlon];
        
    console.log("start",startlat,startlon)
    console.log("end",endlat,endlon)
   
    
    startlat = endlat
    startlon = endlon
    return d;
    
  });
 citiesOverlay.addTo(map);

  
});