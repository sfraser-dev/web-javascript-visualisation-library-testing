"use strict";

// Class definition
var KTTimelineWidget1 = function () {
    // Private methods
    // Day timeline
    const initTimelineDay = () => {
        // Detect element
        const element = document.querySelector('#kt_timeline_widget_1_1');
        if (!element) {
            return;
        }

        if(element.innerHTML){
            return;
        }

        // Set variables
        var now = Date.now();

        // Build vis-timeline datasets
        var groups = new vis.DataSet([
            {
                id: "Response Cars",
                content: "Response Cars",
                order: 1
            },
            {
                id: "Pumping Appliance",
                content: "Pumping Appliance",
                order: 2
            },
            {
                id: "Small Vans",
                content: "Small Vans",
                order: 3
            },
            {
                id: "Large Appliance",
                content: "Large Appliance",
                order: 4
            },
            {
                id: "Other Appliance",
                content: "Other Appliance",
                order: 5
            }
        ]);

        var items = new vis.DataSet([
            {
                id: 1,
                group: 'Response Cars',
                start: '2025-01-01',
                end: '2026-01-01',
                content: 'Vehicles',
                progress: 3,
                color: 'primary'
            },
            {
                id: 2,
                group: 'Pumping Appliance',
                start: '2026-01-01',
                end: '2027-01-01',
                content: 'Vehicles',
                progress: 1,
                color: 'success'
            },
            {
                id: 3,
                group: 'Small Vans',
                start: '2027-01-01',
                end: '2028-01-01',
                content: 'Vehicles',
                progress: 2,
                color: 'danger'
            },
            {
                id: 4,
                group: 'Large Appliance',
                start: '2028-01-01',
                end: '2029-01-01',
                content: 'Vehicles',
                progress: 0,
                color: 'info'
            },
            {
                id: 5,
                group: 'Other Appliance',
                start: '2029-01-01',
                end: '2030-01-01',
                content: 'Vehicles',
                progress: 5,
                color: 'warning'
            }
        ]);

        // Set vis-timeline options
        var options = {
            zoomable: false,
            moveable: false,
            selectable: false,
            // More options https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options
            margin: {
                item: {
                    horizontal: 10,
                    vertical: 35
                }
            },

            // Remove current time line --- more info: https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options
            showCurrentTime: false,

            // Whitelist specified tags and attributes from template --- more info: https://visjs.github.io/vis-timeline/docs/timeline/#Configuration_Options
            xss: {
                disabled: false,
                filterOptions: {
                    whiteList: {
                        div: ['class', 'style'],
                        a: ['href', 'class']
                    },
                },
            },
            // specify a template for the items
            template: function (item) {
                return `<div class="rounded-pill bg-light-${item.color} d-flex align-items-center position-relative h-40px w-100 p-2 overflow-hidden">
                    <div class="position-absolute rounded-pill d-block bg-${item.color} start-0 top-0 h-100 z-index-1" style="width: ${item.progress * 20}%;"></div>
        
                    <div class="d-flex align-items-center position-relative z-index-2">
                        <a href="#" class="fw-bold text-white text-hover-dark">${item.content}</a>
                    </div>
        
                    <div class="d-flex flex-center bg-body rounded-pill fs-7 fw-bolder ms-auto h-100 px-3 position-relative z-index-2">
                        ${item.progress}
                    </div>
                </div>`;
            },

            // Remove block ui on initial draw
            onInitialDrawComplete: function () {
                const target = element.closest('[data-kt-timeline-widget-1-blockui="true"]');
                const blockUI = KTBlockUI.getInstance(target);

                if (blockUI.isBlocked()) {
                    setTimeout(() => {
                        blockUI.release();
                    }, 1000);      
                }
            },
            editable: {
                updateTime: true, // Enable dragging
                updateGroup: true, // Allow dragging between groups
            },
        };

        // Init vis-timeline
        const timeline = new vis.Timeline(element, items, groups, options);

        // Prevent infinite loop draws
        timeline.on("currentTimeTick", () => {            
            // After fired the first time we un-subscribed
            timeline.off("currentTimeTick");
        });

        // Handle item drag events
        timeline.on('change', function (properties) {
            console.log('Changed items:', properties.items);
        });

        // Prevent default action on item click
        timeline.on('click', function (properties) {
            properties.event.preventDefault();
        });
    }

    // Handle BlockUI
    const handleBlockUI = () => {
        // Select block ui elements
        const elements = document.querySelectorAll('[data-kt-timeline-widget-1-blockui="true"]');

        // Init block ui
        elements.forEach(element => {
            const blockUI = new KTBlockUI(element, {
                overlayClass: "bg-body",
            });

            blockUI.block();
        });
    }

    // Handle tabs visibility
    const tabsVisibility = () => {
        const tabs = document.querySelectorAll('[data-kt-timeline-widget-1="tab"]');

        tabs.forEach(tab => {
            tab.addEventListener('shown.bs.tab', e => {
                // Week tab
                if(tab.getAttribute('href') === '#kt_timeline_widget_1_tab_week'){
                    initTimelineWeek();
                }

                // Month tab
                if(tab.getAttribute('href') === '#kt_timeline_widget_1_tab_month'){
                    initTimelineMonth();
                }
            });
        });
    }

    // Public methods
    return {
        init: function () {
            initTimelineDay();
            handleBlockUI();
            tabsVisibility();
        }
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = KTTimelineWidget1;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTTimelineWidget1.init();
});
