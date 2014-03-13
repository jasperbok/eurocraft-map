function calculateDimensions(locations) {
    var minX, maxX, minY, maxY, width, height;

    _(locations).forEach(function(location) {
        if (!minX) {
            minX = location[0];
            maxX = location[0];
            minY = location[1];
            maxY = location[1];
        }

        if (location[0] < minX) minX = location[0];
        if (location[0] > maxX) maxX = location[0];
        if (location[1] < minY) minY = location[1];
        if (location[1] > maxY) maxY = location[1];
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

    console.log(label);
}

$(document).ready(function initPage() {
    // Default locations:
    var locations = [
        [-320, 1131, 'Spawn'],
        [540, 1156, 'Buildzone 1'],
        [446, -647, 'Buildzone 2'],
        [4001, 1384, 'Buildzone 3'],
        [-69, 9908, 'Buildzone 4'],
        [216, 14683, 'Buildzone 5'],
        [5033, 9899, 'Buildzone 6'],
        [7396, 10131, 'Buildzone 7'],
        [4832, 14265, 'Buildzone 8'],
        [-907, 13774, 'Buildzone 9'],
        [-9858, -15051, 'Buildzone 10'],
        [13089, -11226, 'Buildzone 11'],
        [12576, -21484, 'Clayton'],
        [2993, 13945, 'Prime Empire'],
        [7530, 10881, 'Lustarvia'],
        [-227, -711, 'Dawnfall'],
        [4724, 8500, 'Coldwood'],
        [3992, -808, 'Flappy Ville'],
        [123, 563, 'Treasure Town'],
        [3871, -812, 'Waffle Ville'],
        [8538, 9367, 'Ninja Ville'],
        [-10182, -15032, 'Betopia'],
        [-470, 74, 'Baby Girl Town'],
        [-152, 1033, '/warp forest']
    ];

    var dimensions = calculateDimensions(locations),
        scale = calculateScale(dimensions);

    console.log(dimensions);
    console.log(scale);

    $('#map').height($(window).height());
    $('#map').width($(window).width());

    _(locations).forEach(function(location) {
        var posX = (location[0] - dimensions.minX) * scale,
            posY = (location[1] - dimensions.minY) * scale,
            label = location[2],
            el = '<div class="marker" style="top:'+posY+'px;left:'+posX+'px" data-label="'+label+'"></div>';

        $('#map').append(el);
    });

    $('.marker').on('mouseenter', showTooltip);
});