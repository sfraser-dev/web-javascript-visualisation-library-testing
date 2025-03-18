// Function to abbreviate long station names (e.g., "Crowborough Fire Station" → "CFS")
function abbreviateStationName(name) {
    return name.split(' ')[0].substring(0, 3).toUpperCase();
}

// Class definition
var KTChartsWidget36 = function () {
    var chart = {
        self: null,
        rendered: false
    };

    // Initial Data Arrays
    var allStations = [];
    var abbreviatedStations = [];
    var initialUtilizationData = [];
    var finalUtilizationData = [];

    // Function to fetch station data from the hidden div
    function fetchStationData() {
        var stationDataElement = document.getElementById("station-data");
        if (stationDataElement) {
            try {
                var stationData = JSON.parse(stationDataElement.getAttribute("data-stations"));

                stationData.forEach(function (station) {
                    allStations.push(station.name);
                    abbreviatedStations.push(abbreviateStationName(station.name)); // Convert to initials
                    initialUtilizationData.push(station.initial);
                    finalUtilizationData.push(station.final);
                });

                console.log("Loaded Station Data:", allStations, abbreviatedStations, initialUtilizationData, finalUtilizationData);
            } catch (error) {
                console.error("Error parsing station data:", error);
            }
        }
    }

    // Fetch station data
    fetchStationData();

    // Private methods
    var initChart = function (chart) {
        var element = document.getElementById("kt_charts_widget_36");

        if (!element) {
            return;
        }

        var height = parseInt(KTUtil.css(element, 'height'));
        var labelColor = KTUtil.getCssVariableValue('--bs-gray-500');
        var borderColor = KTUtil.getCssVariableValue('--bs-border-dashed-color');
        var baseprimaryColor = KTUtil.getCssVariableValue('--bs-primary');
        var basesuccessColor = KTUtil.getCssVariableValue('--bs-success');

        var options = {
            series: [{
                name: 'Initial Utilisation',
                data: initialUtilizationData
            }, {
                name: 'Final Utilisation',
                data: finalUtilizationData
            }],
            chart: {
                fontFamily: 'inherit',
                type: 'area',  // Default to area chart
                height: height,
                toolbar: {
                    show: false
                }
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'center'
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.2,
                    stops: [15, 120, 100]
                }
            },
            stroke: {
                curve: 'smooth',
                show: true,
                width: 3,
                colors: ['#3699FF', '#20C997']
            },
            xaxis: {
                categories: abbreviatedStations, // Use abbreviated station names
                tooltip: {
                    enabled: true,
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        // Show full station name in tooltip
                        return '<div class="tooltip-custom">' +
                            '<span>' + allStations[dataPointIndex] + '</span>' +
                            '</div>';
                    }
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                    rotate: 45,
                    rotateAlways: true,
                    hideOverlappingLabels: true,
                    style: {
                        colors: labelColor,
                        fontSize: '11px'
                    },
                    formatter: function (value, index) {
                        // Ensure index is valid before accessing allStations
                        if (index >= 0 && index < allStations.length) {
                            return `${value} (${allStations[index]})`; // Show abbreviation + full name
                        } else {
                            return value; // Fallback to just abbreviation if index is out of bounds
                        }
                    }
                }
            },
            yaxis: {
                max: 100,
                min: 0,
                tickAmount: 10,
                labels: {
                    formatter: function (val) { return val.toFixed(0) + "%"; },
                    style: { colors: labelColor, fontSize: '12px' }
                }
            },
            tooltip: {
                enabled: true,
                shared: true,
                followCursor: true,
                theme: 'light',
                y: {
                    formatter: function (value) {
                        return value + '%';  // Simply return the value with % symbol
                    }
                },
                x: {
                    formatter: function (value, { dataPointIndex }) {
                        return allStations[dataPointIndex];  // Show full station name in tooltip
                    }
                }
            },
            colors: ['#3699FF', '#20C997'],
            grid: {
                borderColor: borderColor,
                strokeDashArray: 4,
                yaxis: { lines: { show: true } }
            },
            markers: {
                strokeColor: [baseprimaryColor, basesuccessColor],
                strokeWidth: 3
            }
        };

        chart.self = new ApexCharts(element, options);
        window.chartInstance = chart.self;

        // Render the chart initially
        setTimeout(function () {
            chart.self.render();
            chart.rendered = true;
        }, 200);
    }

    // Public methods
    return {
        init: function () {
            initChart(chart);

            // Update chart on theme mode change
            KTThemeMode.on("kt.thememode.change", function () {
                if (chart.rendered) {
                    chart.self.destroy();
                }
                initChart(chart);
            });
        }
    }
}();

// Function to update chart dynamically when a station is clicked
function updateChart(stationName, initialUtilization, finalUtilization) {
    if (!window.chartInstance) {
        return;
    }

    console.log("Updating chart for:", stationName, "Initial:", initialUtilization, "Final:", finalUtilization);

    var abbreviatedName = abbreviateStationName(stationName);

    var newOptions = {
        chart: {
            type: 'line'  // Ensure it stays as a line chart
        },
        series: [{
            name: 'Initial Utilisation',
            data: [initialUtilization]
        }, {
            name: 'Final Utilisation',
            data: [finalUtilization]
        }],
        xaxis: {
            categories: [abbreviatedName],
            tooltip: {
                enabled: true
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#3699FF', '#20C997']
        },
        markers: {
            size: 5
        }
    };

    window.chartInstance.updateOptions(newOptions);
}

/// Function to reset chart to show all stations
function resetChart() {
    if (!window.chartInstance) {
        console.error("Chart instance not found!");
        return;
    }

    console.log("Resetting chart to show all stations.");

    var newOptions = {
        chart: {
            type: 'area'
        },
        series: [{
            name: 'Initial Utilisation',
            data: initialUtilizationData
        }, {
            name: 'Final Utilisation',
            data: finalUtilizationData
        }],
        xaxis: {
            categories: abbreviatedStations
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#3699FF', '#20C997']
        },
        markers: {
            size: 5
        }
    };

    window.chartInstance.updateOptions(newOptions);
}


// Webpack support
if (typeof module !== 'undefined') {
    module.exports = KTChartsWidget36;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTChartsWidget36.init();
});


// Class definition
var KTChartsWidget22 = function () {
    // Private methods
    var initChart = function (tabSelector, chartSelector, initByDefault) {
        var element = document.querySelector(chartSelector);

        if (!element) {
            return;
        }

        var height = parseInt(KTUtil.css(element, 'height'));

        let data, options;

        if (chartSelector === '#kt_chart_widgets_22_chart_2') {
            // Vehicle dispatch comparison chart
            data = [
                parseInt(element.getAttribute('data-final-dispatch') || 0),
                parseInt(element.getAttribute('data-initial-dispatch') || 0)
            ];

            options = {
                series: data,
                chart: {
                    fontFamily: 'inherit',
                    type: 'donut',
                    width: 250,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '50%',
                            labels: {
                                value: {
                                    fontSize: '10px'
                                }
                            }
                        }
                    }
                },
                colors: [
                    KTUtil.getCssVariableValue('--bs-success'),
                    KTUtil.getCssVariableValue('--bs-primary')
                ],
                stroke: {
                    width: 0
                },
                labels: ['Final Utilisation', 'Initial Utilisation'],
                legend: {
                    show: false,
                }
            };
        } else {
            // First chart (existing configuration)
            data = [
                parseInt(element.getAttribute('data-response-car') || 0),
                parseInt(element.getAttribute('data-pumping-appliance') || 0),
                parseInt(element.getAttribute('data-small-van') || 0),
                parseInt(element.getAttribute('data-large-van') || 0),
                parseInt(element.getAttribute('data-other-appliance') || 0)
            ];

            options = {
                series: data,
                chart: {
                    fontFamily: 'inherit',
                    type: 'donut',
                    width: 250,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '50%',
                            labels: {
                                value: {
                                    fontSize: '10px'
                                }
                            }
                        }
                    }
                },
                colors: [
                    KTUtil.getCssVariableValue('--bs-primary'),
                    KTUtil.getCssVariableValue('--bs-info'),
                    KTUtil.getCssVariableValue('--bs-success'),
                    KTUtil.getCssVariableValue('--bs-warning'),
                    KTUtil.getCssVariableValue('--bs-danger')
                ],
                stroke: {
                    width: 0
                },
                labels: ['Response Cars', 'Pumping Appliances', 'Small Vans', 'Large Vans', 'Other Vehicles'],
                legend: {
                    show: false,
                },
                fill: {
                    type: 'false',
                }
            };
        }

        var chart = new ApexCharts(element, options);

        var init = false;

        var tab = document.querySelector(tabSelector);

        if (initByDefault === true) {
            chart.render();
            init = true;
        }

        tab.addEventListener('shown.bs.tab', function (event) {
            if (init == false) {
                chart.render();
                init = true;
            }
        })
    }

    // Public methods
    return {
        init: function () {
            initChart('#kt_chart_widgets_22_tab_1', '#kt_chart_widgets_22_chart_1', true);
            initChart('#kt_chart_widgets_22_tab_2', '#kt_chart_widgets_22_chart_2', false);
        }
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = KTChartsWidget22;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTChartsWidget22.init();
});


am5.ready(function () {


    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("kt_charts_bar");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        paddingRight: 20,  // Add right padding
        layout: root.verticalLayout
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    // Get data from the div
    var stationDataElement = document.getElementById("station-data");
    var stationData = JSON.parse(stationDataElement.getAttribute("data-stations"));

    // Transform data for the chart
    var chartData = stationData.map(function (station) {
        return {
            station: station.name.substring(0, 3).toUpperCase(),  // First three letters in uppercase
            fullName: station.name,  // Store full name for tooltip
            initial: station.initial,
            final: Math.max(0, station.final - station.initial)  // Show only the increase
        };
    });


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
        minGridDistance: 30  // Reduce minimum distance between labels
    });

    // Set rotation for x-axis labels
    xRenderer.labels.template.setAll({
        rotation: 45,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 5,  // Reduce padding
        paddingTop: 0,
        fontSize: "0.8em",  // Reduce font size
        fill: am5.color("#777777"),
        fontWeight: "bold",
        maxWidth: 80,  // Limit label width
        oversizedBehavior: "truncate"  // Truncate if too long
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "station",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    xRenderer.grid.template.setAll({
        location: 1
    })

    xAxis.data.setAll(chartData);

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: fieldName,
            categoryXField: "station"
        }));

        // Set different colors for initial and final utilization
        if (fieldName === "initial") {
            series.set("fill", am5.color("#0158E7")); // Blue
            series.set("stroke", am5.color("#0158E7"));
        } else {
            series.set("fill", am5.color("#2ACB81")); // Green
            series.set("stroke", am5.color("#2ACB81"));
        }

        // Updated tooltip to show both values
        series.columns.template.setAll({
            tooltipText: "[bold]{fullName}[/]\nInitial: {initial}%\nFinal: {calc}%",
            tooltipY: am5.percent(10)
        });

        series.data.setAll(chartData.map(item => ({
            ...item,
            calc: item.initial + item.final // Calculate total for final value
        })));

        series.appear();

        // Remove the bullet labels
        // series.bullets.push(function () { ... }); // Remove this section

        legend.data.push(series);
    }

    makeSeries("Initial Utilization", "initial");
    makeSeries("Increased Utilization", "final");


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    // Update axis labels color to gray
    xAxis.get("renderer").labels.template.setAll({
        fill: am5.color("#777777")
    });

    yAxis.get("renderer").labels.template.setAll({
        fill: am5.color("#777777")
    });

    // Update legend labels color to gray
    legend.labels.template.setAll({
        fill: am5.color("#777777")
    });

});
// end am5.ready()


am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("kt_charts_widget_17_chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Determine text color based on theme
    var labelColor = KTThemeMode.getMode() === 'dark' ? am5.color(0xFFFFFF) : am5.color(0x000000);

    root.container.set("layout", root.verticalLayout);

    // Create container to hold charts
    var chartContainer = root.container.children.push(am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: am5.p100,
        height: am5.p100
    }));

    // Create the 1st chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = chartContainer.children.push(
        am5percent.PieChart.new(root, {
            endAngle: 270,
            innerRadius: am5.percent(60)
        })
    );


    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270,
            alignLabels: false,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{category}: {valuePercentTotal.formatNumber('#.0')}%\nVehicles: {value}"
            })
        })
    );

    series.children.push(am5.Label.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        text: "Before: {valueSum}",
        populateText: true,
        fontSize: "1.5em",
        fill: labelColor
    }));

    series.slices.template.setAll({
        cornerRadius: 8
    })

    series.states.create("hidden", {
        endAngle: -90
    });

    series.labels.template.setAll({
        text: "{category}",
        textType: "circular",
        fill: labelColor
    });


    // Create the 2nd chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart2 = chartContainer.children.push(
        am5percent.PieChart.new(root, {
            endAngle: 270,
            innerRadius: am5.percent(60)
        })
    );

    var series2 = chart2.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270,
            alignLabels: false,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{category}: {valuePercentTotal.formatNumber('#.0')}%\nVehicles: {value}"
            })
        })
    );

    series2.children.push(am5.Label.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        text: "After: {valueSum}",
        populateText: true,
        fontSize: "1.5em",
        fill: labelColor
    }));

    series2.slices.template.setAll({
        cornerRadius: 8
    })

    series2.states.create("hidden", {
        endAngle: -90
    });

    series2.labels.template.setAll({
        text: "{category}",
        textType: "circular",
        fill: labelColor
    });


    // Duplicate interaction
    // Must be added before setting data
    series.slices.template.events.on("pointerover", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series2);

        if (otherSlice) {
            otherSlice.hover();
        }
    });

    series.slices.template.events.on("pointerout", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series2);

        if (otherSlice) {
            otherSlice.unhover();
        }
    });

    series.slices.template.on("active", function (active, target) {
        var slice = target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series2);

        if (otherSlice) {
            otherSlice.set("active", active);
        }
    });

    // Same for the 2nd series
    series2.slices.template.events.on("pointerover", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series);

        if (otherSlice) {
            otherSlice.hover();
        }
    });

    series2.slices.template.events.on("pointerout", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series);

        if (otherSlice) {
            otherSlice.unhover();
        }
    });

    series2.slices.template.on("active", function (active, target) {
        var slice = target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series);

        if (otherSlice) {
            otherSlice.set("active", active);
        }
    });


    // Set data for the 1st chart (Before Reduction)
    series.data.setAll([{
        category: "Response Cars",
        value: 150
    }, {
        category: "Small Vans",
        value: 120
    }, {
        category: "Pumping Appliances",
        value: 80
    }, {
        category: "Large Vans",
        value: 60
    }, {
        category: "Other Vehicles",
        value: 40
    }]);

    // Set data for the 2nd chart (After Reduction)
    series2.data.setAll([{
        category: "Response Cars",
        value: 100
    }, {
        category: "Small Vans",
        value: 90
    }, {
        category: "Pumping Appliances",
        value: 50
    }, {
        category: "Large Vans",
        value: 40
    }, {
        category: "Other Vehicles",
        value: 20
    }]);



    function getSlice(dataItem, series) {
        var otherSlice;
        am5.array.each(series.dataItems, function (di) {
            if (di.get("category") === dataItem.get("category")) {
                otherSlice = di.get("slice");
            }
        });

        return otherSlice;
    }

    // Create legend
    var legend = root.container.children.push(am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        labels: {
            fill: labelColor
        }
    }));


    // Trigger all the same for the 2nd series
    legend.itemContainers.template.events.on("pointerover", function (ev) {
        var dataItem = ev.target.dataItem.dataContext;
        var slice = getSlice(dataItem, series2);
        slice.hover();
    });

    legend.itemContainers.template.events.on("pointerout", function (ev) {
        var dataItem = ev.target.dataItem.dataContext;
        var slice = getSlice(dataItem, series2);
        slice.unhover();
    });

    legend.itemContainers.template.on("disabled", function (disabled, target) {
        var dataItem = target.dataItem.dataContext;
        var slice = getSlice(dataItem, series2);
        if (disabled) {
            series2.hideDataItem(slice.dataItem);
        }
        else {
            series2.showDataItem(slice.dataItem);
        }
    });

    legend.data.setAll(series.dataItems);

    // Update text color on theme change
    KTThemeMode.on("kt.thememode.change", function () {
        var newLabelColor = KTThemeMode.getMode() === 'dark' ? am5.color(0xFFFFFF) : am5.color(0x000000);
        series.labels.template.setAll({ fill: newLabelColor });
        series2.labels.template.setAll({ fill: newLabelColor });
        legend.labels.template.setAll({ fill: newLabelColor });
    });

    series.appear(1000, 100);

}); // end am5.ready()

am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("kt_charts_widget_17_chart");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Determine text color based on theme
    var labelColor = KTThemeMode.getMode() === 'dark' ? am5.color(0xFFFFFF) : am5.color(0x000000);

    root.container.set("layout", root.verticalLayout);

    // Create container to hold charts
    var chartContainer = root.container.children.push(am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: am5.p100,
        height: am5.p100
    }));

    // Create the 1st chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = chartContainer.children.push(
        am5percent.PieChart.new(root, {
            endAngle: 270,
            innerRadius: am5.percent(60)
        })
    );


    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270,
            alignLabels: false,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{category}: {valuePercentTotal.formatNumber('#.0')}%\nVehicles: {value}"
            })
        })
    );

    series.children.push(am5.Label.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        text: "Before: {valueSum}",
        populateText: true,
        fontSize: "1.5em",
        fill: labelColor
    }));

    series.slices.template.setAll({
        cornerRadius: 8
    })

    series.states.create("hidden", {
        endAngle: -90
    });

    series.labels.template.setAll({
        text: "{category}",
        textType: "circular",
        fill: labelColor
    });


    // Create the 2nd chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart2 = chartContainer.children.push(
        am5percent.PieChart.new(root, {
            endAngle: 270,
            innerRadius: am5.percent(60)
        })
    );

    var series2 = chart2.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270,
            alignLabels: false,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{category}: {valuePercentTotal.formatNumber('#.0')}%\nVehicles: {value}"
            })
        })
    );

    series2.children.push(am5.Label.new(root, {
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        text: "After: {valueSum}",
        populateText: true,
        fontSize: "1.5em",
        fill: labelColor
    }));

    series2.slices.template.setAll({
        cornerRadius: 8
    })

    series2.states.create("hidden", {
        endAngle: -90
    });

    series2.labels.template.setAll({
        text: "{category}",
        textType: "circular",
        fill: labelColor
    });


    // Duplicate interaction
    // Must be added before setting data
    series.slices.template.events.on("pointerover", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series2);

        if (otherSlice) {
            otherSlice.hover();
        }
    });

    series.slices.template.events.on("pointerout", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series2);

        if (otherSlice) {
            otherSlice.unhover();
        }
    });

    series.slices.template.on("active", function (active, target) {
        var slice = target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series2);

        if (otherSlice) {
            otherSlice.set("active", active);
        }
    });

    // Same for the 2nd series
    series2.slices.template.events.on("pointerover", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series);

        if (otherSlice) {
            otherSlice.hover();
        }
    });

    series2.slices.template.events.on("pointerout", function (ev) {
        var slice = ev.target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series);

        if (otherSlice) {
            otherSlice.unhover();
        }
    });

    series2.slices.template.on("active", function (active, target) {
        var slice = target;
        var dataItem = slice.dataItem;
        var otherSlice = getSlice(dataItem, series);

        if (otherSlice) {
            otherSlice.set("active", active);
        }
    });


    // Set data for the 1st chart (Before Reduction)
    series.data.setAll([{
        category: "Response Cars",
        value: 150
    }, {
        category: "Small Vans",
        value: 120
    }, {
        category: "Pumping Appliances",
        value: 80
    }, {
        category: "Large Vans",
        value: 60
    }, {
        category: "Other Vehicles",
        value: 40
    }]);

    // Set data for the 2nd chart (After Reduction)
    series2.data.setAll([{
        category: "Response Cars",
        value: 100
    }, {
        category: "Small Vans",
        value: 90
    }, {
        category: "Pumping Appliances",
        value: 50
    }, {
        category: "Large Vans",
        value: 40
    }, {
        category: "Other Vehicles",
        value: 20
    }]);



    function getSlice(dataItem, series) {
        var otherSlice;
        am5.array.each(series.dataItems, function (di) {
            if (di.get("category") === dataItem.get("category")) {
                otherSlice = di.get("slice");
            }
        });

        return otherSlice;
    }

    // Create legend
    var legend = root.container.children.push(am5.Legend.new(root, {
        x: am5.percent(50),
        centerX: am5.percent(50),
        labels: {
            fill: labelColor
        }
    }));


    // Trigger all the same for the 2nd series
    legend.itemContainers.template.events.on("pointerover", function (ev) {
        var dataItem = ev.target.dataItem.dataContext;
        var slice = getSlice(dataItem, series2);
        slice.hover();
    });

    legend.itemContainers.template.events.on("pointerout", function (ev) {
        var dataItem = ev.target.dataItem.dataContext;
        var slice = getSlice(dataItem, series2);
        slice.unhover();
    });

    legend.itemContainers.template.on("disabled", function (disabled, target) {
        var dataItem = target.dataItem.dataContext;
        var slice = getSlice(dataItem, series2);
        if (disabled) {
            series2.hideDataItem(slice.dataItem);
        }
        else {
            series2.showDataItem(slice.dataItem);
        }
    });

    legend.data.setAll(series.dataItems);

    // Update text color on theme change
    KTThemeMode.on("kt.thememode.change", function () {
        var newLabelColor = KTThemeMode.getMode() === 'dark' ? am5.color(0xFFFFFF) : am5.color(0x000000);
        series.labels.template.setAll({ fill: newLabelColor });
        series2.labels.template.setAll({ fill: newLabelColor });
        legend.labels.template.setAll({ fill: newLabelColor });
    });

    series.appear(1000, 100);

}); // end am5.ready()