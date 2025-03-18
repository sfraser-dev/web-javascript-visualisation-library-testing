am5.ready(function() {

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
    series.slices.template.events.on("pointerover", function(ev) {
      var slice = ev.target;
      var dataItem = slice.dataItem;
      var otherSlice = getSlice(dataItem, series2);
    
      if (otherSlice) {
        otherSlice.hover();
      }
    });
    
    series.slices.template.events.on("pointerout", function(ev) {
      var slice = ev.target;
      var dataItem = slice.dataItem;
      var otherSlice = getSlice(dataItem, series2);
    
      if (otherSlice) {
        otherSlice.unhover();
      }
    });
    
    series.slices.template.on("active", function(active, target) {
      var slice = target;
      var dataItem = slice.dataItem;
      var otherSlice = getSlice(dataItem, series2);
    
      if (otherSlice) {
        otherSlice.set("active", active);
      }
    });
    
    // Same for the 2nd series
    series2.slices.template.events.on("pointerover", function(ev) {
      var slice = ev.target;
      var dataItem = slice.dataItem;
      var otherSlice = getSlice(dataItem, series);
    
      if (otherSlice) {
        otherSlice.hover();
      }
    });
    
    series2.slices.template.events.on("pointerout", function(ev) {
      var slice = ev.target;
      var dataItem = slice.dataItem;
      var otherSlice = getSlice(dataItem, series);
    
      if (otherSlice) {
        otherSlice.unhover();
      }
    });
    
    series2.slices.template.on("active", function(active, target) {
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
      am5.array.each(series.dataItems, function(di) {
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
    legend.itemContainers.template.events.on("pointerover", function(ev) {
      var dataItem = ev.target.dataItem.dataContext;
      var slice = getSlice(dataItem, series2);
      slice.hover();
    });
    
    legend.itemContainers.template.events.on("pointerout", function(ev) {
      var dataItem = ev.target.dataItem.dataContext;
      var slice = getSlice(dataItem, series2);
      slice.unhover();
    });
    
    legend.itemContainers.template.on("disabled", function(disabled, target) {
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
    KTThemeMode.on("kt.thememode.change", function() {
        var newLabelColor = KTThemeMode.getMode() === 'dark' ? am5.color(0xFFFFFF) : am5.color(0x000000);
        series.labels.template.setAll({ fill: newLabelColor });
        series2.labels.template.setAll({ fill: newLabelColor });
        legend.labels.template.setAll({ fill: newLabelColor });
    });

    series.appear(1000, 100);
    
    }); // end am5.ready()