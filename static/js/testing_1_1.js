am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("kt_timeline_widget_1_1");
    root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX", "openValueX"]
    });


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
        layout: root.verticalLayout
    }));


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    }))

    var colors = chart.get("colors");

    // Data
    var data = [{
        category: "Module #1",
        start: new Date(2016, 0, 1).getTime(),
        end: new Date(2016, 0, 14).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(0), 0)
        },
        task: "Gathering requirements"
    }, {
        category: "Module #1",
        start: new Date(2016, 0, 16).getTime(),
        end: new Date(2016, 0, 27).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(0), 0.4)
        },
        task: "Producing specifications"
    }, {
        category: "Module #1",
        start: new Date(2016, 1, 5).getTime(),
        end: new Date(2016, 3, 18).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(0), 0.8)
        },
        task: "Development"
    }, {
        category: "Module #1",
        start: new Date(2016, 3, 18).getTime(),
        end: new Date(2016, 5, 1).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(0), 1.2)
        },
        task: "Testing and QA"
    }, {
        category: "Module #2",
        start: new Date(2016, 0, 8).getTime(),
        end: new Date(2016, 0, 10).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(2), 0)
        },
        task: "Gathering requirements"
    }, {
        category: "Module #2",
        start: new Date(2016, 0, 12).getTime(),
        end: new Date(2016, 0, 15).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(2), 0.4)
        },
        task: "Producing specifications"
    }, {
        category: "Module #2",
        start: new Date(2016, 0, 16).getTime(),
        end: new Date(2016, 1, 5).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(2), 0.8)
        },
        task: "Development"
    }, {
        category: "Module #2",
        start: new Date(2016, 1, 10).getTime(),
        end: new Date(2016, 1, 18).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(2), 1.2)
        },
        task: "Testing and QA"
    }, {
        category: "Module #3",
        start: new Date(2016, 0, 2).getTime(),
        end: new Date(2016, 0, 8).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(4), 0)
        },
        task: "Gathering requirements"
    }, {
        category: "Module #3",
        start: new Date(2016, 0, 8).getTime(),
        end: new Date(2016, 0, 16).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(4), 0.4)
        },
        task: "Producing specifications"
    }, {
        category: "Module #3",
        start: new Date(2016, 0, 19).getTime(),
        end: new Date(2016, 2, 1).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(4), 0.8)
        },
        task: "Development"
    }, {
        category: "Module #3",
        start: new Date(2016, 2, 12).getTime(),
        end: new Date(2016, 3, 5).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(4), 1.2)
        },
        task: "Testing and QA"
    }, {
        category: "Module #4",
        start: new Date(2016, 0, 1).getTime(),
        end: new Date(2016, 0, 19).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(6), 0)
        },
        task: "Gathering requirements"
    }, {
        category: "Module #4",
        start: new Date(2016, 0, 19).getTime(),
        end: new Date(2016, 1, 3).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(6), 0.4)
        },
        task: "Producing specifications"
    }, {
        category: "Module #4",
        start: new Date(2016, 2, 20).getTime(),
        end: new Date(2016, 3, 25).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(6), 0.8)
        },
        task: "Development"
    }, {
        category: "Module #4",
        start: new Date(2016, 3, 27).getTime(),
        end: new Date(2016, 4, 15).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(6), 1.2)
        },
        task: "Testing and QA"
    }, {
        category: "Module #5",
        start: new Date(2016, 0, 1).getTime(),
        end: new Date(2016, 0, 12).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(8), 0)
        },
        task: "Gathering requirements"
    }, {
        category: "Module #5",
        start: new Date(2016, 0, 12).getTime(),
        end: new Date(2016, 0, 19).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(8), 0.4)
        },
        task: "Producing specifications"
    }, {
        category: "Module #5",
        start: new Date(2016, 0, 19).getTime(),
        end: new Date(2016, 2, 1).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(8), 0.8)
        },
        task: "Development"
    }, {
        category: "Module #5",
        start: new Date(2016, 2, 8).getTime(),
        end: new Date(2016, 2, 30).getTime(),
        columnSettings: {
            fill: am5.Color.brighten(colors.getIndex(8), 1.2)
        },
        task: "Testing and QA"
    }];


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    var yRenderer = am5xy.AxisRendererY.new(root, {
        minorGridEnabled: true
    });
    yRenderer.grid.template.set("location", 1);

    var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: yRenderer,
            tooltip: am5.Tooltip.new(root, {})
        })
    );

    yAxis.data.setAll([
        { category: "Module #1" },
        { category: "Module #2" },
        { category: "Module #3" },
        { category: "Module #4" },
        { category: "Module #5" }
    ]);

    var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: "minute", count: 1 },
            renderer: am5xy.AxisRendererX.new(root, {
                strokeOpacity: 0.1,
                minorGridEnabled: true,
                minGridDistance: 80
            })
        })
    );


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        openValueXField: "start",
        valueXField: "end",
        categoryYField: "category",
        sequencedInterpolation: true
    }));

    series.columns.template.setAll({
        templateField: "columnSettings",
        strokeOpacity: 0,
        tooltipText: "{task}:\n[bold]{openValueX}[/] - [bold]{valueX}[/]"
    });

    series.data.setAll(data);

    // Add scrollbars
    chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(1000, 100);

}); // end am5.ready()