<div class="container-fluid flex-grow-1 container-p-y">
    <!-- Layout Demo -->
    <div class="layout-demo-wrapper" style="">
        <!-- <h4>MAP + ANALYTICS + SEARCH KAPAL</h4>
            <code>100% width</code> -->
        <div class="leaflet-map" id="basicMap" style="width: 2045px; height: 1050px; margin-top:-35px;">
        </div>
    </div>
    <!--/ Layout Demo -->
</div>

<script>
    const shapeMapVar = document.getElementById('shapeMap');
    if (shapeMapVar) {
        const markerMap = L.map('shapeMap').setView([51.5, -0.09], 12);
        const marker = L.marker([51.5, -0.09]).addTo(markerMap);
        const circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(markerMap);
        const polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(markerMap);
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(markerMap);
    }
</script>