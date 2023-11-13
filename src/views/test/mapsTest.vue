<template>
  <div
    class="container-fluid flex-grow-1 container-p-y"
    style="margin-left: 100px; margin-right: 100px; z-index: 1"
  >
    <div class="row">
      <div class="col">
        <div class="card mb-3">
          <div class="card-header">
            <article>
              <h1>Leaflet Polygon Management</h1>
              <h3>
                An Open Source Leaflet Plugin for editing polygons, specifically made for Leaflet
                1.0
              </h3>
            </article>
            <article>
              <h2>Creating A Polygon</h2>

              <div class="map" id="example2"></div>
            </article>
            <article>
              <h2>Editing A Polygon</h2>

              <div class="map" id="example3"></div>
            </article>
            <article>
              <h2>Editing A Layer Group</h2>

              <div class="map" id="example4"></div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

/* eslint-disable no-console */
const tiles1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const tiles2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const tiles3 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const map2 = L.map('example2', { preferCanvas: true }).setView([51.505, -0.09], 13).addLayer(tiles1)
const map3 = L.map('example3', { preferCanvas: true }).setView([51.505, -0.09], 13).addLayer(tiles2)
const map4 = L.map('example4', { preferCanvas: true }).setView([51.505, -0.09], 13).addLayer(tiles3)
// map2.dragging.disable();

// map2.on('pm:create', function(e) {
//     // alert('pm:create event fired. See console for details');
//     console.log(e);

//     const layer = e.layer;
//     layer.on('pm:cut', function(ev) {
//         console.log('cut event on layer');
//         console.log(ev);
//     });
// });
// map2.on('pm:cut', function(e) {
//     console.log('cut event on map');
//     console.log(e);
// });
// map2.on('pm:remove', function(e) {
//     console.log('pm:remove event fired. See console for details');
//     // alert('pm:remove event fired. See console for details');
//     console.log(e);
// });
// map2.on('pm:drawstart', function(e) {
//     console.log(e);
//     console.log(e.workingLayer);
// });

const m1 = L.circleMarker([51.50313, -0.091223], { radius: 10 })
const m2 = L.marker([51.50614, -0.0989])
const m3 = L.marker([51.50915, -0.096112], { pmIgnore: true })

const mGroup = L.layerGroup([m1, m2, m3]).addTo(map2)
mGroup.pm.enable()

map2.pm.addControls({
  drawMarker: false,
  drawPolygon: true,
  editMode: false,
  drawPolyline: false,
  removalMode: true
})
// map2.pm.addControls({
//     drawMarker: false,
//     drawPolygon: true,
//     editMode: false,
//     drawPolyline: false,
//     removalMode: false,
// });
// map2.pm.addControls({
//     drawMarker: true,
//     drawPolygon: false,
//     editMode: false,
//     drawPolyline: false,
//     removalMode: true,
// });
map2.pm.addControls({
  drawMarker: true,
  drawPolygon: true,
  editMode: true,
  drawPolyline: true,
  removalMode: true
})

map2.pm.disableDraw('Polygon')
// map2.pm.enableDraw('Circle', {
//     snappable: true,
//     cursorMarker: true
// });

map2.pm.enableDraw('Line', { allowSelfIntersection: false })
map2.pm.enableDraw('Polygon', { allowSelfIntersection: false })

map2.on('pm:globaleditmodetoggled', (e) => {
  console.log(e)
})

// GEOSJON EXAMPLE

const geoJsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.15483856201171872, 51.527329038465936],
            [-0.16977310180664062, 51.51643437722083],
            [-0.15964508056640625, 51.50094238217541],
            [-0.13149261474609375, 51.5042549065934],
            [-0.11758804321289061, 51.518463972439385],
            [-0.13303756713867188, 51.53106680201548],
            [-0.15483856201171872, 51.527329038465936]
          ]
        ]
      }
    }
  ]
}

// const geoJsonButton = document.getElementById('test-geojson');
const geoJsonLayer = L.geoJson(null, { pmIgnore: false })
geoJsonLayer.addTo(map2)
geoJsonLayer.addData(geoJsonData)
// geoJsonLayer.pm.toggleEdit({
//     draggable: true,
//     snappable: true,
// });

map3.pm.addControls({
  drawMarker: true,
  drawPolygon: true,
  editMode: true,
  removalMode: true,
  drawPolyline: true
})

const markerStyle = {
  opacity: 0.5,
  draggable: false
}

map3.pm.enableDraw('Polygon', {
  snappable: true,
  templineStyle: {
    color: 'blue'
  },
  hintlineStyle: {
    color: 'blue',
    dashArray: '5,5'
  },
  pathOptions: {
    color: 'red',
    fillColor: 'orange',
    fillOpacity: 0.7
  },
  markerStyle,
  cursorMarker: false,
  // finishOn: 'contextmenu',
  finishOnDoubleClick: true
})

const scotland = L.polygon([
  [
    [60, -13],
    [60, 0],
    [50, 4],
    [50, -13]
  ],
  [
    [55.7, -4.5],
    [56, -4.5],
    [56, -4],
    [55.7, -4]
  ]
])
scotland.addTo(map3)

const bounds = scotland.getBounds()

map3.fitBounds(bounds)

geoJsonLayer.addEventListener('click', () => {
  geoJsonLayer.pm.toggleEdit()
})

geoJsonLayer.on('pm:edit', (e) => {
  console.log(e)
})

geoJsonLayer.on('pm:dragstart', (e) => {
  console.log(e)
})
// geoJsonLayer.on('pm:drag', function(e) {
//     console.log(e);
// });
geoJsonLayer.on('pm:dragend', (e) => {
  console.log(e)
})

map2.on('pm:drawstart', (e) => {
  const layer = e.workingLayer
  // console.log(layer);
  layer.on('pm:centerplaced', (x) => {
    console.log(x)
  })
})
map2.on('pm:create', (e) => {
  const { layer } = e
  // console.log(layer);
  layer.on('pm:centerplaced', (x) => {
    console.log(x)
  })
})

// Polygon Example

const polygonLayer = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
])
  .addTo(map3)
  .addTo(map2)
polygonLayer.pm.toggleEdit({
  allowSelfIntersection: false
})

polygonLayer.on('pm:update', (e) => {
  console.log(e)
})

polygonLayer.on('pm:intersect', (e) => {
  console.log(e)
})

map2.pm.toggleGlobalEditMode({
  allowSelfIntersection: false
})
map2.pm.disableGlobalEditMode()

map2.on('pm:create', (e) => {
  e.layer.pm.enable({ allowSelfIntersection: false })
  // e.layer.pm.disable();
  // console.log(e.layer.pm.hasSelfIntersection());

  e.layer.on('pm:markerdragend', (x) => {
    console.log(x)
  })

  e.layer.on('pm:update', (x) => {
    console.log(x)
  })

  e.layer.on('pm:cut', (x) => {
    console.log(x)
  })
})

map2.on('pm:drawstart', (e) => {
  const layer = e.workingLayer
  layer.on('pm:vertexadded', (x) => {
    console.log(x)
    console.log(x.workingLayer.pm.hasSelfIntersection())
  })
})

polygonLayer.on('pm:vertexadded', (x) => {
  console.log(x)
})
polygonLayer.on('pm:vertexremoved', (x) => {
  console.log(x)
})

polygonLayer.on('pm:markerdragstart', (x) => {
  console.log(x)
})

// Layer Group Example

const layerGroupItem1 = L.polyline([
  [51.51, -0.09],
  [51.513, -0.08],
  [51.514, -0.11]
])
const layerGroupItem2 = L.polygon([
  [51.52, -0.06],
  [51.51, -0.07],
  [51.52, -0.05]
])

const layerGroupItem3 = L.polygon([
  [51.51549835365031, -0.06450164634969281],
  [51.51944818307178, -0.08425079345703125],
  [51.51868369995795, -0.06131630004205801],
  [51.51549835365031, -0.06450164634969281]
])

const feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [72.839012, 19.058873],
        [72.92038, 19.066985],
        [72.856178, 19.019928],
        [72.839012, 19.058873]
      ]
    ]
  }
}

const layerGroup = L.featureGroup([layerGroupItem1]).addTo(map4)
layerGroup.pm.toggleEdit({
  draggable: true,
  snappable: true,
  snapDistance: 30
})
const someLayer = L.geoJSON(feature)

layerGroup.addLayer(someLayer)

someLayer.addData(feature)
console.log(layerGroup)

layerGroup.on('pm:snap', (e) => {
  console.log('snap')
  console.log(e)
})
layerGroup.on('pm:unsnap', (e) => {
  console.log('unsnap')
  console.log(e)
})

map4.pm.addControls({
  position: 'topright'
})

map4.pm.enableDraw('Polygon', {
  finishOn: 'mouseout'
})
map4.pm.disableDraw('Polygon')

map4.pm.enableDraw('Marker', {
  snappable: false
})
map4.pm.disableDraw('Marker')

// map4.pm.setPathOptions({
//     color: 'orange',
//     fillColor: 'green',
//     fillOpacity: 0.4,
// });

layerGroup.addLayer(layerGroupItem2)
layerGroup.addLayer(layerGroupItem3)
// layerGroup.addLayer(layerGroupItem4);
// layerGroup.addLayer(layerGroupItem5);

layerGroup.on('pm:dragstart', (e) => {
  console.log(e)
})
layerGroup.on('pm:drag', (e) => {
  console.log(e)
})
layerGroup.on('pm:dragend', (e) => {
  console.log(e)
})
layerGroup.on('pm:markerdragstart', (e) => {
  console.log(e)
})
layerGroup.on('pm:markerdragend', (e) => {
  console.log(e)
})

// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);

// var latlng = [-6.846599, 109.128841]
// var tile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// var lmap = L.map('map', {}).setView(latlng, 17)

// lmap.pm.setLang('id')

// lmap.flyTo(latlng, 16, {
//   duration: 2
// })

// L.tileLayer(tile, {
//   maxNativeZoom: 19,
//   maxZoom: 30
// }).addTo(lmap)

// L.polygon(this.fixGeofence, {
//   color: 'red',
//   fillColor: '#A1B4FF',
//   fillOpacity: 0.5
// }).addTo(lmap)

// L.marker(latlng, {
//   textMarker: true,
//   text: 'Pelabuhan Tegalsari'
// }).addTo(lmap)

// LEAFLET DRAW
// var drawnFeatures = new L.FeatureGroup()
// lmap.addLayer(drawnFeatures)

// var drawControl = new L.Control.Draw({
//   edit: {
//     featureGroup: drawnFeatures,
//     remove: false
//   },
//   draw: {
//     polygon: {
//       shapeOptions: {
//         color: 'purple'
//       },
//       // allowIntersection: false,
//       // drawError: {
//       //   color: 'orange',
//       //   timeout: 1000
//       // },
//       showArea: true,
//       showLength: true
//     },
//     polyline: {
//       shapeOptions: {
//         color: 'red'
//       }
//     },
//     rect: {
//       shapeOptions: {
//         color: 'green'
//       }
//     },
//     circle: {
//       shapeOptions: {
//         color: 'steelblue'
//       }
//     }
//   }
// })

// lmap.addControl(drawControl)

// lmap.on(L.Draw.Event.CREATED, function (e) {
//   var layer = e.layer
//   var type = e.layerType

//   // console.log(e)
//   console.log(layer.toGeoJSON())
//   layer.bindPopup(`<p>${JSON.stringify(layer.toGeoJSON())}</p>`)
//   // Do whatever else you need to. (save to db; add to map etc)
//   drawnFeatures.addLayer(layer)
// })

// lmap.on('draw:edited', function (e) {
//   var layers = e.layers
//   var type = e.layerType

//   layers.eachLayer(function (layer) {
//     console.log(layer)
//   })
// })

// GEOMAN DRAW
// MENU

// lmap.pm.addControls()
// lmap.pm.Toolbar.changeControlOrder([
//   'drawPolygon',
//   'drawCircle',
//   'drawPolyline',
//   'editLayers'
// ])
// lmap.pm.Toolbar.setBlockPosition('edit', 'topright')

// lmap.on('pm:drawstart', ({ workingLayer }) => {
//   var coordinates = workingLayer.editing.latlngs[0]

//   console.log('Coordinates =', coordinates)

//   // workingLayer.on('pm:vertexadded', (e) => {
//   //   console.log('event', e)
//   //   console.log('vertexadded', e.latlng)
//   // })

//   // workingLayer.on('pm:vertexremoved', (e) => {
//   //   console.log('vertexremoved', e)
//   // })

//   // workingLayer.on('pm:snapdrag', (e) => {
//   //   console.log('snapdrag', e.distance)
//   // })

//   // workingLayer.on('pm:snap', (e) => {
//   //   console.log('snap', e.distance)
//   // })

//   // workingLayer.on('pm:unsnap', (e) => {
//   //   console.log('unsnap', e.distance)
//   // })

//   workingLayer.on('pm:edit', (e) => {
//     console.log('edit layer', e)
//   })
// })

// lmap.on('pm:remove', (e) => {
//   //layerremove
//   console.log('remove layer', e.layer.editing.latlngs[0][0])
// })

// lmap.on('pm:cut', (e) => {
//   console.log('original layer', e.originalLayer.editing.latlngs[0][0])
//   console.log('cutted layer', e.layer.editing.latlngs[0])
// })

// lmap.on('pm:globaldragmodetoggled', (e) => {
//   console.log(e)
// })

// lmap.on('pm:globaleditmodetoggled', (e) => {
//   console.log('globaledit', e.map)
// })
</script>
