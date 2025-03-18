
"use strict";

// Class definition
var KTMapsWidget1 = (function () {
    // Private methods
    var initMap = function () {
        // Check if amchart library is included
        if (typeof am5 === 'undefined') {
            return;
        }

        var element = document.getElementById("kt_maps_widget_1_map");

        if (!element) {
            return;
        }

        var root;

        var init = function() {
            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            root = am5.Root.new(element);

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);

            // Create the map chart
            // https://www.amcharts.com/docs/v5/charts/map-chart/
            var chart = root.container.children.push(
                am5map.MapChart.new(root, {
                    panX: "translateX",
                    panY: "translateY",
                    projection: am5map.geoMercator(),
					paddingLeft: 0,
					paddingrIGHT: 0,
					paddingBottom: 0
                })
            );

            // Create main polygon series for countries
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
            var polygonSeries = chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    geoJSON: am5geodata_worldLow,
                    exclude: ["AQ"],
                })
            );

            polygonSeries.mapPolygons.template.setAll({
                tooltipText: "{name}",
                toggleKey: "active",
                interactive: true,
				fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-300')),
            });

            polygonSeries.mapPolygons.template.states.create("hover", {
                fill: am5.color(KTUtil.getCssVariableValue('--bs-success')),
            });

            polygonSeries.mapPolygons.template.states.create("active", {
                fill: am5.color(KTUtil.getCssVariableValue('--bs-success')),
            });

            // Highlighted Series
            // Create main polygon series for countries
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
            var polygonSeriesHighlighted = chart.series.push(
                am5map.MapPolygonSeries.new(root, {
                    //geoJSON: am5geodata_usaLow,
					geoJSON: am5geodata_worldLow,
					include: ['US', 'BR', 'DE', 'AU', 'JP']
                })
            );

            polygonSeriesHighlighted.mapPolygons.template.setAll({
                tooltipText: "{name}",
                toggleKey: "active",
                interactive: true,
            });

            var colors = am5.ColorSet.new(root, {});

            polygonSeriesHighlighted.mapPolygons.template.set(
                "fill",
				am5.color(KTUtil.getCssVariableValue('--bs-primary')),
            );

            polygonSeriesHighlighted.mapPolygons.template.states.create("hover", {
                fill: root.interfaceColors.get("primaryButtonHover"),
            });

            polygonSeriesHighlighted.mapPolygons.template.states.create("active", {
                fill: root.interfaceColors.get("primaryButtonHover"),
            });

            // Add zoom control
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
            //chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

            // Set clicking on "water" to zoom out
            chart.chartContainer
                .get("background")
                .events.on("click", function () {
                    chart.goHome();
                });

            // Make stuff animate on load
            chart.appear(1000, 100);
        }

        // On amchart ready
        am5.ready(function () {
            init();
        }); // end am5.ready()

        // Update chart on theme mode change
		KTThemeMode.on("kt.thememode.change", function() {     
			// Destroy chart
			root.dispose();

			// Reinit chart
			init();
		});
    };

    // Public methods
    return {
        init: function () {
            initMap();
        },
    };
})();

// Webpack support
if (typeof module !== "undefined") {
    module.exports = KTMapsWidget1;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTMapsWidget1.init();
});


"use strict";

// Class definition
var KTChartsWidget17 = (function () {
    // Private methods
    var initChart = function () {
        // Check if amchart library is included
        if (typeof am5 === "undefined") {
            return;
        }

        var element = document.getElementById("kt_dashboard_charts_widget_17_chart");

        if (!element) {
            return;
        }

        var root;

        var init = function() {
            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            root = am5.Root.new(element);

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
            // start and end angle must be set both for chart and series
            var chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    startAngle: 180,
                    endAngle: 360,
                    layout: root.verticalLayout,
                    innerRadius: am5.percent(50),
                })
            );

            // Create series
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
            // start and end angle must be set both for chart and series
            var series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    startAngle: 180,
                    endAngle: 360,
                    valueField: "value",      // Match this with data structure
                    categoryField: "category", // Match this with data structure
                    alignLabels: false,
                })
            );

            // Add tooltip configuration
            series.slices.template.setAll({
                cornerRadius: 5,
                tooltipText: "{category}: £{value}"
            });

            series.labels.template.setAll({
                fontWeight: "400",
                fontSize: 13,
                fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500'))
            });

            series.states.create("hidden", {
                startAngle: 180,
                endAngle: 180,
            });

            series.slices.template.setAll({
                cornerRadius: 5,
            });

            series.ticks.template.setAll({
                forceHidden: true,
            });

            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            series.data.setAll([
              {
                category: "Fuel Cost",
                value: 5263
              }, {
                category: "Maintenance",
                value: 1526
              }, {
                category: "Insurance",
                value: 2569
              }, {
                category: "Staff Cost",   
                value: 1598
              }, {
                category: "Electricity",
                value: 4256
              }
            ]);

            series.appear(1000, 100);
        }

        am5.ready(function () {
            init();
        });

        // Update chart on theme mode change
		KTThemeMode.on("kt.thememode.change", function() {     
			// Destroy chart
			root.dispose();

			// Reinit chart
			init();
		});
    };

    // Public methods
    return {
        init: function () {
            initChart();
        },
    };
})();

// Webpack support
if (typeof module !== "undefined") {
    module.exports = KTChartsWidget17;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTChartsWidget17.init();
});


"use strict";

// Class definition
var KTChartsWidget13 = (function () {
    // Private methods
    var initChart = function () {
        // Check if amchart library is included
        if (typeof am5 === "undefined") {
            return;
        }

        var element = document.getElementById("kt_charts_widget_13_chart");

        if (!element) {
            return;
        }

        var root;

        var init = function() {
            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            root = am5.Root.new(element);

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                })
            );

            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            var cursor = chart.set(
                "cursor",
                am5xy.XYCursor.new(root, {
                    behavior: "none"
                })
            );

            cursor.lineY.set("visible", false);

            // The data
            var data = [
                {
                    month: "Jan 2022",
                    responseCars: 120,
                    pumpingVehicle: 220,
                    otherVehicle: 80,
                    largeVans: 170,
                    smallVans: 90
                },
                {
                    month: "Feb 2022",
                    responseCars: 128,
                    pumpingVehicle: 215,
                    otherVehicle: 83,
                    largeVans: 172,
                    smallVans: 93
                },
                {
                    month: "Mar 2022",
                    responseCars: 122,
                    pumpingVehicle: 225,
                    otherVehicle: 79,
                    largeVans: 175,
                    smallVans: 89
                },
                {
                    month: "Apr 2022",
                    responseCars: 130,
                    pumpingVehicle: 218,
                    otherVehicle: 85,
                    largeVans: 168,
                    smallVans: 92
                },
                {
                    month: "May 2022",
                    responseCars: 135,
                    pumpingVehicle: 228,
                    otherVehicle: 82,
                    largeVans: 177,
                    smallVans: 94
                },
                {
                    month: "Jun 2022",
                    responseCars: 133,
                    pumpingVehicle: 232,
                    otherVehicle: 86,
                    largeVans: 183,
                    smallVans: 92
                },
                {
                    month: "Jul 2022",
                    responseCars: 138,
                    pumpingVehicle: 226,
                    otherVehicle: 81,
                    largeVans: 187,
                    smallVans: 96
                },
                {
                    month: "Aug 2022",
                    responseCars: 142,
                    pumpingVehicle: 231,
                    otherVehicle: 84,
                    largeVans: 181,
                    smallVans: 98
                },
                {
                    month: "Sep 2022",
                    responseCars: 136,
                    pumpingVehicle: 228,
                    otherVehicle: 83,
                    largeVans: 185,
                    smallVans: 95
                },
                {
                    month: "Oct 2022",
                    responseCars: 138,
                    pumpingVehicle: 230,
                    otherVehicle: 86,
                    largeVans: 184,
                    smallVans: 97
                },
                {
                    month: "Nov 2022",
                    responseCars: 135,
                    pumpingVehicle: 233,
                    otherVehicle: 85,
                    largeVans: 188,
                    smallVans: 99
                },
                {
                    month: "Dec 2022",
                    responseCars: 140,
                    pumpingVehicle: 235,
                    otherVehicle: 87,
                    largeVans: 190,
                    smallVans: 100
                },
                {
                    month: "Jan 2023",
                    responseCars: 125,
                    pumpingVehicle: 230,
                    otherVehicle: 85,
                    largeVans: 180,
                    smallVans: 95
                },
                {
                    month: "Feb 2023",
                    responseCars: 132,
                    pumpingVehicle: 225,
                    otherVehicle: 88,
                    largeVans: 175,
                    smallVans: 98
                },
                {
                    month: "Mar 2023",
                    responseCars: 128,
                    pumpingVehicle: 235,
                    otherVehicle: 82,
                    largeVans: 185,
                    smallVans: 92
                },
                {
                    month: "Apr 2023",
                    responseCars: 135,
                    pumpingVehicle: 228,
                    otherVehicle: 90,
                    largeVans: 178,
                    smallVans: 96
                },
                {
                    month: "May 2023",
                    responseCars: 142,
                    pumpingVehicle: 238,
                    otherVehicle: 87,
                    largeVans: 182,
                    smallVans: 99
                },
                {
                    month: "Jun 2023",
                    responseCars: 138,
                    pumpingVehicle: 242,
                    otherVehicle: 91,
                    largeVans: 188,
                    smallVans: 97
                },
                {
                    month: "Jul 2023",
                    responseCars: 144,
                    pumpingVehicle: 236,
                    otherVehicle: 86,
                    largeVans: 192,
                    smallVans: 101
                },
                {
                    month: "Aug 2023",
                    responseCars: 147,
                    pumpingVehicle: 241,
                    otherVehicle: 89,
                    largeVans: 186,
                    smallVans: 103
                },
                {
                    month: "Sep 2023",
                    responseCars: 141,
                    pumpingVehicle: 238,
                    otherVehicle: 88,
                    largeVans: 190,
                    smallVans: 100
                },
                {
                    month: "Oct 2023",
                    responseCars: 143,
                    pumpingVehicle: 240,
                    otherVehicle: 91,
                    largeVans: 189,
                    smallVans: 102
                },
                {
                    month: "Nov 2023",
                    responseCars: 140,
                    pumpingVehicle: 243,
                    otherVehicle: 90,
                    largeVans: 193,
                    smallVans: 104
                },
                {
                    month: "Dec 2023",
                    responseCars: 145,
                    pumpingVehicle: 245,
                    otherVehicle: 92,
                    largeVans: 195,
                    smallVans: 105
                }
            ];

            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            var xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "month",  // Changed from "year" to "month"
                    startLocation: 0.5,
                    endLocation: 0.5,
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    tooltip: am5.Tooltip.new(root, {}),
                })
            );

            xAxis.get("renderer").grid.template.setAll({
                disabled: true,
                strokeOpacity: 0
            });

            xAxis.get("renderer").labels.template.setAll({
                fontWeight: "400",
                fontSize: 13,
                fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500'))
            });

            xAxis.data.setAll(data);

            var yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {}),
                })
            );

            yAxis.get("renderer").grid.template.setAll({
                stroke: am5.color(KTUtil.getCssVariableValue('--bs-gray-300')),
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeDasharray: [3]
            });

            yAxis.get("renderer").labels.template.setAll({
                fontWeight: "400",
                fontSize: 13,
                fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500'))
            });

            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

            function createSeries(name, field, color) {
                var series = chart.series.push(
                    am5xy.LineSeries.new(root, {
                        name: name,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        stacked: true,
                        valueYField: field,
                        categoryXField: "month",
                        fill: am5.color(color),
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText: "[bold]{name}[/]\n{categoryX}: {valueY} CO₂e"  // Added CO₂e unit
                        }),
                    })
                );

                

                series.fills.template.setAll({
                    fillOpacity: 0.5,
                    visible: true,
                });

                series.data.setAll(data);
                series.appear(1000);
            }

            // Create series with new vehicle types
            createSeries("Response Cars", "responseCars", KTUtil.getCssVariableValue('--bs-primary'));
            createSeries("Pumping Vehicle", "pumpingVehicle", KTUtil.getCssVariableValue('--bs-success'));
            createSeries("Other Vehicle", "otherVehicle", KTUtil.getCssVariableValue('--bs-warning'));
            createSeries("Large Vans", "largeVans", KTUtil.getCssVariableValue('--bs-danger'));
            createSeries("Small Vans", "smallVans", KTUtil.getCssVariableValue('--bs-info'));

            // Add scrollbar
            // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
            var scrollbarX = chart.set(
                "scrollbarX",
                am5.Scrollbar.new(root, {
                    orientation: "horizontal",
                    marginBottom: 25,
                    height: 8
                })
            );

            // Create axis ranges
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/
            var rangeDataItem = xAxis.makeDataItem({
                category: "Dec 2022",
                endCategory: "Jan 2023",
            });

            var range = xAxis.createAxisRange(rangeDataItem);

            rangeDataItem.get("grid").setAll({
                stroke: am5.color(KTUtil.getCssVariableValue('--bs-gray-200')),
                strokeOpacity: 0.5,
                strokeDasharray: [3],
            });

            rangeDataItem.get("axisFill").setAll({
                fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-200')),
                fillOpacity: 0.1,
            });

            rangeDataItem.get("label").setAll({
                inside: true,
                text: "Fines increased",
                rotation: 90,
                centerX: am5.p100,
                centerY: am5.p100,
                location: 0,
                paddingBottom: 10,
                paddingRight: 15,
            });

            var rangeDataItem2 = xAxis.makeDataItem({
                category: "Dec 2023",  // Update to end of 2023
            });

            var range2 = xAxis.createAxisRange(rangeDataItem2);

            rangeDataItem2.get("grid").setAll({
                stroke: am5.color(KTUtil.getCssVariableValue('--bs-danger')),
                strokeOpacity: 1,
                strokeDasharray: [3],
            });

            rangeDataItem2.get("label").setAll({
                inside: true,
                text: "Fee introduced",
                rotation: 90,
                centerX: am5.p100,
                centerY: am5.p100,
                location: 0,
                paddingBottom: 10,
                paddingRight: 15,
            });

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            chart.appear(1000, 100);
        }

        am5.ready(function () {
            init();
        }); // end am5.ready()

        // Update chart on theme mode change
		KTThemeMode.on("kt.thememode.change", function() {     
			// Destroy chart
			root.dispose();

			// Reinit chart
			init();
		});
    };

    // Public methods
    return {
        init: function () {
            initChart();
        },
    };
})();

// Webpack support
if (typeof module !== "undefined") {
    module.exports = KTChartsWidget13;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTChartsWidget13.init();
});

"use strict";

// Class definition
var KTChartsWidget15 = (function () {
    // Private methods
    var initChart = function () {
        // Check if amchart library is included
        if (typeof am5 === "undefined") {
            return;
        }

        var element = document.getElementById("kt_charts_widget_15_chart");

        if (!element) {
            return;
        }

        var root;

        var init = function() {
            root = am5.Root.new(element);

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([am5themes_Animated.new(root)]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    layout: root.verticalLayout,
                })
            );

            // Data
            var colors = chart.get("colors");

            // Parse data from HTML attribute
            var data = JSON.parse(element.getAttribute('data-aggregated'));

            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            var xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField: "Station_Name",
                    renderer: am5xy.AxisRendererX.new(root, {
                        minGridDistance: 30,
                    }),
                    bullet: function (root, axis, dataItem) {
                        return am5xy.AxisBullet.new(root, {
                            location: 0.5,
                            sprite: am5.Picture.new(root, {
                                width: 24,
                                height: 24,
                                centerY: am5.p50,
                                centerX: am5.p50,
                                src: dataItem.dataContext.icon,
                            }),
                        });
                    },
                })
            );

            xAxis.get("renderer").labels.template.setAll({
                visible: false
            });
            
            xAxis.get("renderer").grid.template.setAll({
                disabled: true,
                strokeOpacity: 0
            });

            xAxis.data.setAll(data);

            var yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {}),
                    min: 0,
                    max: 100,
                    strictMinMax: true,
                    numberFormat: "#'%'",
                    calculateTicks: function() {
                        return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                    }
                })
            );

            yAxis.get("renderer").grid.template.setAll({
                stroke: am5.color(KTUtil.getCssVariableValue('--bs-gray-300')),
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeDasharray: [3]
            });

            yAxis.get("renderer").labels.template.setAll({
                fontWeight: "400",
                fontSize: 10,
                fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500'))
            });

            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "utilization",
                    categoryXField: "Station_Name"
                })
            );

            series.columns.template.setAll({
                tooltipText: "{Station_Name}: {valueY}%",
                tooltipY: 0,
                strokeOpacity: 0,
                fill: am5.color("#006ae6"), // Set bar color to blue
                cornerRadiusBR: 0,
                cornerRadiusTR: 6,
                cornerRadiusBL: 0,
                cornerRadiusTL: 6,
            });

            series.data.setAll(data);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();
            chart.appear(1000, 100);
        }

        am5.ready(function () {
            init();
        });

        // Update chart on theme mode change
		KTThemeMode.on("kt.thememode.change", function() {     
			// Destroy chart
			root.dispose();

			// Reinit chart
			init();
		});
    };

    // Public methods
    return {
        init: function () {
            initChart();
        },
    };
})();

// Webpack support
if (typeof module !== "undefined") {
    module.exports = KTChartsWidget15;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTChartsWidget15.init();
});

"use strict";

// Class definition
var KTChartsWidget6 = function () {
    var chart = {
        self: null,
        rendered: false
    };

    // Private methods
    var initChart = function(chart) {
        var element = document.getElementById("kt_charts_widget_6"); 

        if (!element) {
            return;
        }

        var vehicleData = JSON.parse(element.getAttribute('data-vehicle-type-aggregation'));
        vehicleData.sort(function(a, b) { return b.Total_Carbon_Emission_kg - a.Total_Carbon_Emission_kg; });
        var categories = vehicleData.map(function(item) { return item.Vehicle_Type; });
        var data = vehicleData.map(function(item) { return Math.round(item.Total_Carbon_Emission_kg); });

        var labelColor = KTUtil.getCssVariableValue('--bs-gray-800');    
        var borderColor = KTUtil.getCssVariableValue('--bs-border-dashed-color');
        var maxValue = Math.max(...data);
        
        var options = {
            series: [{
                name: 'Carbon Emission (kg)',
                data: data                                                                                                             
            }],           
            chart: {
                fontFamily: 'inherit',
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }                             
            },                    
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    horizontal: true,
                    distributed: true,
                    barHeight: 50,
                    dataLabels: {
				        position: 'bottom' // use 'bottom' for left and 'top' for right align(textAnchor)
			        }                                                       
                }
            },
            dataLabels: {  // Docs: https://apexcharts.com/docs/options/datalabels/
                enabled: true,              
                textAnchor: 'start',  
                offsetX: 0,                 
                formatter: function (val, opts) {
                    var Format = wNumb({
                        thousand: ','
                    });

                    return Format.to(val);
                },
                style: {
                    fontSize: '14px',
                    fontWeight: '600',
                    align: 'left',                                                            
                }                                       
            },             
            legend: {
                show: false
            },                               
            colors: ['#3E97FF', '#F1416C', '#50CD89', '#FFC700', '#7239EA'],                                                                      
            xaxis: {
                categories: categories,
                labels: {
                    show: false
                },
                axisBorder: {
					show: false
				}                         
            },
            yaxis: {
                labels: {       
                    formatter: function (val, opt) {
                        if (Number.isInteger(val)) {
                            var percentage = parseInt(val * 100 / maxValue).toString(); 
                            return val + ' - ' + percentage + '%';
                        } else {
                            return val;
                        }
                    },            
                    style: {
                        colors: labelColor,
                        fontSize: '14px',
                        fontWeight: '600'                                                                 
                    },
                    offsetY: 2,
                    align: 'left' 
                }           
            },
            grid: {                
                borderColor: borderColor,                
                xaxis: {
                    lines: {
                        show: true
                    }
                },   
                yaxis: {
                    lines: {
                        show: false  
                    }
                },
                strokeDashArray: 4              
            },
            tooltip: {
                style: {
                    fontSize: '12px'
                },
                y: {
                    formatter: function (val) {
                        var Format = wNumb({
                            thousand: ','
                        });
                        return Format.to(val) + ' kg';
                    }
                }
            }                                 
        };  
          
        chart.self = new ApexCharts(element, options);

        // Set timeout to properly get the parent elements width
        setTimeout(function() {
            chart.self.render();
            chart.rendered = true;
        }, 200);         
    }

    // Public methods
    return {
        init: function () {
            initChart(chart);

            // Update chart on theme mode change
            KTThemeMode.on("kt.thememode.change", function() {                
                if (chart.rendered) {
                    chart.self.destroy();
                }

                initChart(chart);
            });
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = KTChartsWidget6;
}

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTChartsWidget6.init();
});

   
"use strict";

// Class definition
var KTCardsWidget10 = function () {
    // Private methods
    var initChart = function() {
        var el = document.getElementById('kt_card_widget_10_chart'); 

        if (!el) {
            return;
        }

        var options = {
            size: el.getAttribute('data-kt-size') ? parseInt(el.getAttribute('data-kt-size')) : 70,
            lineWidth: el.getAttribute('data-kt-line') ? parseInt(el.getAttribute('data-kt-line')) : 11,
            rotate: el.getAttribute('data-kt-rotate') ? parseInt(el.getAttribute('data-kt-rotate')) : 145,            
            //percent:  el.getAttribute('data-kt-percent') ,
        }

        var canvas = document.createElement('canvas');
        var span = document.createElement('span'); 
            
        if (typeof(G_vmlCanvasManager) !== 'undefined') {
            G_vmlCanvasManager.initElement(canvas);
        }

        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;

        el.appendChild(span);
        el.appendChild(canvas);

        ctx.translate(options.size / 2, options.size / 2); // change center
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

        //imd = ctx.getImageData(0, 0, 240, 240);
        var radius = (options.size - options.lineWidth) / 2;

        var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round'; // butt, round or square
            ctx.lineWidth = lineWidth
            ctx.stroke();
        };

        // Init 
        drawCircle('#E4E6EF', options.lineWidth, 100 / 100); 
        drawCircle(KTUtil.getCssVariableValue('--bs-primary'), options.lineWidth, 100 / 150);
        drawCircle(KTUtil.getCssVariableValue('--bs-success'), options.lineWidth, 100 / 250);   
    }

    // Public methods
    return {
        init: function () {
            initChart();
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = KTCardsWidget10;
}

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTCardsWidget10.init();
});