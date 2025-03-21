const fleetData = [
    { vehicle: "Fire Appliance #1", year: 2026, cost: 350000 },
    { vehicle: "Response Car #1", year: 2026, cost: 40000 },
    { vehicle: "Response Car #2", year: 2027, cost: 40000 },
    { vehicle: "Fire Appliance #2", year: 2027, cost: 350000 },
    { vehicle: "Response Car #3", year: 2028, cost: 40000 },
    { vehicle: "Fire Appliance #3", year: 2028, cost: 350000 },
    { vehicle: "Response Car #4", year: 2029, cost: 40000 },
    { vehicle: "Response Car #5", year: 2029, cost: 40000 },
    { vehicle: "Fire Appliance #4", year: 2029, cost: 350000 },
    { vehicle: "Response Car #6", year: 2030, cost: 40000 },
    { vehicle: "Response Car #7", year: 2030, cost: 40000 },
];

// Sort by transition year
fleetData.sort((a, b) => a.year - b.year);

// Create groups (1 per vehicle + 1 for cumulative cost)
const groups = new vis.DataSet(
    fleetData.map((item, index) => ({
        id: index + 1,
        content: item.vehicle
    })).concat([{ id: "cumulative", content: "Cumulative Cost" }])
);

// Create items (timeline bars)
let cumulative = 0;
const items = new vis.DataSet(
    fleetData.map((item, index) => {
        cumulative += item.cost;

        const start = `${item.year}-01-01`;
        const end = `${item.year + 1}-01-01`;
        const color = item.vehicle.includes("Fire") ? "danger" : "primary";

        return {
            id: index + 1,
            content: `£${item.cost.toLocaleString()}`,
            start,
            end,
            group: index + 1,
            title: `${item.vehicle}<br>£${item.cost.toLocaleString()}`,
            className: `bg-${color}`
        };
    }).concat(
        fleetData.map((item, index) => {
            const start = new Date(item.year, 0, 1);
            const end = new Date(item.year + 1, 0, 1);
            const cumulativeValue = fleetData
                .slice(0, index + 1)
                .reduce((acc, val) => acc + val.cost, 0);

            return {
                id: "cumulative-" + (index + 1),
                content: `£${cumulativeValue.toLocaleString()}`,
                start,
                end,
                group: "cumulative",
                title: `Cumulative: £${cumulativeValue.toLocaleString()}`,
                className: "bg-success"
            };
        })
    )
);

// Timeline options with Metronic-style template
const options = {
    stack: false,
    showCurrentTime: false,
    margin: { item: 10, axis: 5 },
    orientation: "bottom",
    template: function (item) {
        let color = "success";
        if (item.className.includes("danger")) color = "danger";
        else if (item.className.includes("primary")) color = "primary";

        return `
        <div class="rounded-pill bg-light-${color} d-flex align-items-center h-40px w-100 px-4 py-2 overflow-hidden position-relative shadow-sm gantt-bar">
            <div class="position-absolute bg-${color} start-0 top-0 h-100 z-index-1 opacity-25 rounded-pill" style="width: 100%;"></div>
            <div class="d-flex align-items-center position-relative z-index-2 w-100 justify-content-between">
                ${
                    item.title.includes("<br>")
                        ? `<span class="fw-semibold text-${color}">${item.title.split("<br>")[0]}</span>
                           <span class="badge badge-light-${color}">${item.title.split("<br>")[1]}</span>`
                        : `<span class="fw-semibold text-${color}">${item.title}</span>`
                }
            </div>
        </div>`;
    }
};

// Render the timeline
new vis.Timeline(
    document.getElementById("timeline"),
    items,
    groups,
    options
);