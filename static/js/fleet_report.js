var createDateRangePickers = function() {
    // Check if jQuery included
    if (typeof jQuery == 'undefined') {
        return;
    }

    // Check if daterangepicker included
    if (typeof $.fn.daterangepicker === 'undefined') {
        return;
    }

    var elements = [].slice.call(document.querySelectorAll('[data-kt-daterangepicker="true"]'));
    
    // Get previously selected dates from URL parameters if available
    var urlParams = new URLSearchParams(window.location.search);
    var startDateParam = urlParams.get('start_date');
    var endDateParam = urlParams.get('end_date');
    var start = startDateParam ? moment(startDateParam) : moment().subtract(29, 'days');
    var end = endDateParam ? moment(endDateParam) : moment();

    elements.map(function (element) {
        if (element.getAttribute("data-kt-initialized") === "1") {
            return;
        }

        var display = element.querySelector('div');
        var attrOpens  = element.hasAttribute('data-kt-daterangepicker-opens') ? element.getAttribute('data-kt-daterangepicker-opens') : 'left';
        var range = element.getAttribute('data-kt-daterangepicker-range');
        var simulationNumber = element.getAttribute('data-simulation-number');

        var cb = function(start, end, apply = false) {
            var current = moment();

            if (display) {
                if ( current.isSame(start, "day") && current.isSame(end, "day") ) {
                    display.innerHTML = start.format('D MMM YYYY');
                } else {
                    display.innerHTML = start.format('D MMM YYYY') + ' - ' + end.format('D MMM YYYY');
                }
            }

            // Trigger URL with start_date and end_date only when dates are applied
            if (apply) {
                var url = `/fleet_report/${simulationNumber}?start_date=${start.format('YYYY-MM-DD')}&end_date=${end.format('YYYY-MM-DD')}`;
                window.location.href = url;
            }
        }

        if ( range === "today" ) {
            start = moment();
            end = moment();
        }

        $(element).daterangepicker({
            startDate: start,
            endDate: end,
            opens: attrOpens,
            ranges: {} // Remove predefined ranges
        }, function(start, end) {
            cb(start, end, true);
        });

        cb(start, end);

        element.setAttribute("data-kt-initialized", "1");
    });
}

createDateRangePickers();