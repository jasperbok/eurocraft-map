function calculateDimensions(locations) {
    var minX, maxX, minY, maxY, width, height;

    _(locations).forEach(function(location) {
        if (!minX) {
            minX = location.x;
            maxX = location.x;
            minY = location.y;
            maxY = location.y;
        }

        if (location.x < minX) minX = location.x;
        if (location.x > maxX) maxX = location.x;
        if (location.y < minY) minY = location.y;
        if (location.y > maxY) maxY = location.y;
    });

    width = maxX - minX;
    height = maxY - minY;

    // Add a 5% margin to the map size to keep it readable.
    minX = minX - (width / 100 * 5);
    maxX = maxX + (width / 100 * 5);
    minY = minY - (height / 100 * 5);
    maxY = maxY + (height / 100 * 5);

    width = maxX - minX;
    height = maxY - minY;

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        width: width,
        height: height,
    };
};

function calculateScale(dimensions) {
    var screenWidth = $(window).width(),
        screenHeight = $(window).height(),
        scaleX = screenWidth / dimensions.width,
        scaleY = screenHeight / dimensions.height;

    return scaleX > scaleY ? scaleY : scaleX;
};

function showTooltip(e) {
    var label = $(e.currentTarget).attr('data-label');
    var targetLocation = $(e.currentTarget).offset();

    $('#label').text(label).show().css({left: targetLocation.left, top: targetLocation.top - 50});
};

function hideTooltip(e) {
    $('#label').hide();
};

$(document).ready(function initPage() {
    // Default locations:
    var locations = [
        {name: 'Spawn', type: 'special', x: -320, y: 1131},

        // Buildzones
        {name: 'Buildzone 1', type: 'buildzone', x: 540, y: 1156},
        {name: 'Buildzone 2', type: 'buildzone', x: 446, y: -647},
        {name: 'Buildzone 3', type: 'buildzone', x: 4001, y: 1384},
        {name: 'Buildzone 4', type: 'buildzone', x: -69, y: 9908},
        {name: 'Buildzone 5', type: 'buildzone', x: 216, y: 14683},
        {name: 'Buildzone 6', type: 'buildzone', x: 5033, y: 9899},
        {name: 'Buildzone 7', type: 'buildzone', x: 7396, y: 10131},
        {name: 'Buildzone 8', type: 'buildzone', x: 4832, y: 14265},
        {name: 'Buildzone 9', type: 'buildzone', x: -907, y: 13774},
        {name: 'Buildzone 10', type: 'buildzone', x: -9858, y: -15051},
        {name: 'Buildzone 11', type: 'buildzone', x: 13089, y: -11226},

        // Cities
        {name: 'Clayton', type: 'city', x: 12576, y: -21484},
        {name: 'Prime Empire', type: 'city', x: 2993, y: 13945},
        {name: 'Lustarvia', type: 'city', x: 7530, y: 10881},
        {name: 'Dawnfall', type: 'city', x: -227, y: -711},
        {name: 'Coldwood', type: 'city', x: 4724, y: 8500}

        // [3992, -808, 'Flappy Ville'],
        // [123, 563, 'Treasure Town'],
        // [3871, -812, 'Waffle Ville'],
        // [8538, 9367, 'Ninja Ville'],
        // [-10182, -15032, 'Betopia'],
        // [-470, 74, 'Baby Girl Town'],
        // [-152, 1033, '/warp forest']
    ];

    var dimensions = calculateDimensions(locations),
        scale = calculateScale(dimensions);

    console.log(dimensions);
    console.log(scale);

    $('#map').height($(window).height());
    $('#map').width($(window).width());

    _(locations).forEach(function(location) {
        var posX = (location.x - dimensions.minX) * scale,
            posY = (location.y - dimensions.minY) * scale,
            label = location.name,
            el = '<div class="marker '+location.type+'" style="top:'+posY+'px;left:'+posX+'px" data-label="'+label+'"></div>';

        $('#map').append(el);
    });

    $('.marker').on('mouseenter', showTooltip);
    $('.marker').on('mouseleave', hideTooltip);
});