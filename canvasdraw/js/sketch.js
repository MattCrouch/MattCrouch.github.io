var Sketch = (function(canvas, color, width) {
    var _canvas = canvas;
    canvas.width = _canvas.clientWidth;
    canvas.height = _canvas.clientHeight;
    var _context = _canvas.getContext("2d");
    
    if(typeof color === "undefined") {
        color = "#000000";
    }
    
    if(typeof width === "undefined") {
        width = 1;
    }
    
    _context.strokeStyle = color;
    _context.lineWidth = width;
    
    _canvas.addEventListener("mousedown", _mouseDown);
    
    function getMousePosition(event, element) {
        var x, y;
        if (event.pageX != undefined && event.pageY != undefined) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        
        return {
            x: x - element.offsetLeft,
            y: y - element.offsetTop
        };
    };
    
    function _mouseDown(event) {
        var position = getMousePosition(event, _canvas);
        _context.moveTo(position.x, position.y);
        _context.beginPath();
        
        _canvas.addEventListener("mousemove", _draw);
        _canvas.addEventListener("mouseup", _stopDrawing);
        _canvas.addEventListener("mouseout", _stopDrawing);
    };
    
    function _draw(event) {
        var position = getMousePosition(event, _canvas);
        _context.lineTo(position.x, position.y);
        _context.stroke();
    };
    
    function _stopDrawing(event) {
        _canvas.removeEventListener("mousemove", _draw);
        _canvas.removeEventListener("mouseup", _stopDrawing);
        _canvas.removeEventListener("mouseout", _stopDrawing);
    };
   
    function getDrawing() {
        return _canvas.toDataURL();
    };
    
    function clear() {
        _canvas.width = _canvas.width;
        return true;
    }
    
    function setColor(color) {
        _context.strokeStyle = color;
    }
    
    function setWidth(width) {
        _context.lineWidth = width;   
    }
    
    return {
        getDrawing: getDrawing,
        clear: clear,
        setColor: setColor,
        setWidth: setWidth
    }
});