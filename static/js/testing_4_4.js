// Updated amCharts Gantt Chart using ApexCharts-style fleet data
am5.ready(function () {
    var root = am5.Root.new("kt_timeline_widget_1_1");
    root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX", "openValueX"]
    });

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout
    }));

    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
    }));

    var colors = chart.get("colors");

    var data = [
        { category: "Fire Appliance #1", start: new Date(2026, 0, 1).getTime(), end: new Date(2027, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(0) }, task: "Fire Appliance #1 - £350,000" },
        { category: "Response Car #1", start: new Date(2026, 0, 1).getTime(), end: new Date(2027, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(1) }, task: "Response Car #1 - £40,000" },
        { category: "Response Car #2", start: new Date(2027, 0, 1).getTime(), end: new Date(2028, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(2) }, task: "Response Car #2 - £40,000" },
        { category: "Fire Appliance #2", start: new Date(2027, 0, 1).getTime(), end: new Date(2029, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(3) }, task: "Fire Appliance #2 - £350,000" },
        { category: "Response Car #3", start: new Date(2028, 0, 1).getTime(), end: new Date(2029, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(4) }, task: "Response Car #3 - £40,000" },
        { category: "Fire Appliance #3", start: new Date(2028, 0, 1).getTime(), end: new Date(2030, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(5) }, task: "Fire Appliance #3 - £350,000" },
        { category: "Response Car #4", start: new Date(2029, 0, 1).getTime(), end: new Date(2030, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(6) }, task: "Response Car #4 - £40,000" },
        { category: "Response Car #5", start: new Date(2029, 0, 1).getTime(), end: new Date(2030, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(7) }, task: "Response Car #5 - £40,000" },
        { category: "Fire Appliance #4", start: new Date(2029, 0, 1).getTime(), end: new Date(2031, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(8) }, task: "Fire Appliance #4 - £350,000" },
        { category: "Response Car #6", start: new Date(2030, 0, 1).getTime(), end: new Date(2031, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(9) }, task: "Response Car #6 - £40,000" },
        { category: "Response Car #7", start: new Date(2030, 0, 1).getTime(), end: new Date(2031, 0, 1).getTime(), columnSettings: { fill: colors.getIndex(10) }, task: "Response Car #7 - £40,000" }
    ];

    // var yRenderer = am5xy.AxisRendererY.new(root, { minorGridEnabled: true });
    var yRenderer = am5xy.AxisRendererY.new(root, {
        minorGridEnabled: true,
        inversed: true
    });
    yRenderer.grid.template.set("location", 1);

    var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: yRenderer,
            tooltip: am5.Tooltip.new(root, {})
        })
    );
    yAxis.data.setAll(data);

    var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: "day", count: 1 },
            renderer: am5xy.AxisRendererX.new(root, {
                strokeOpacity: 0.1,
                minorGridEnabled: true,
                minGridDistance: 80
            })
        })
    );

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
        tooltipText: "{task}:[\nbold]{openValueX}[/] - [bold]{valueX}[/]"
    });

    series.data.setAll(data);
    chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
    series.appear();
    chart.appear(1000, 100);
});
