
FIELD_OFFSET_X = 150;
FIELD_OFFSET_Y = 0;

function Tetris() {
    var border = null;
    var background = null;
    var game = null;
    var timeOffset = 0;

    var lastEscapeState = false;
    var lastMouseLeftState = false;
    var statePauseTime = 0;
    var paused = false;

    var mouseClick = null;

    var self = this;

    var continueButton = null;
    var restartButton = null;

    this.setup = function () {
	Tetris.currentInstance = self;
	game = new Game();

	continueButton = new Button({image: 'media/buttons/continue.png', x: 250, y: 150});
	restartButton = new Button({image: 'media/buttons/restart.png', x: 250, y: 200});
    
	background = new Background();
	jaws.preventDefaultKeys(['up', 'down', 'left', 'right', 'space', 'z', 'x', 'esc']);

	timeOffset = (new Date()).getTime();
    }

    this.update = function() {
	var realTime = (new Date()).getTime(),
	escapePressed = jaws.pressed('esc');
	
	if (!paused) {
	    // see if the game should be pased
	    if (escapePressed && (!lastEscapeState)) {
		// go into pause mode
		startPauseTime = realTime;
		paused = true;
	    } else {
		game.update(realTime - timeOffset);
	    }
	} else 
	{
	    // see if any buttons were pressed
	    if (mouseClick) {
		if (continueButton.isClicked(mouseClick.x, mouseClick.y)) {
		    // change the time offset
		    timeOffset += realTime - startPauseTime;
		    paused = false;
		}
		if (restartButton.isClicked(mouseClick.x, mouseClick.y)) {
		    // restart the game
		    jaws.gameloop.stop();
		    jaws.start(Tetris);
		}
	    }
	}
	
	lastEscapeState = escapePressed;
	mouseClick = null;
    }
    
    this.draw = function() {
	// clear the screen
	jaws.context.clearRect(0, 0, jaws.width, jaws.height);

	if (!paused) {
	    // draw the game
	    background.draw();
	    game.draw();
	} else {
	    //draw the pause menu
	    continueButton.draw();
	    restartButton.draw();
	}
    }
    
    this.mouseClicked = function(x, y) {
	mouseClick = {x: x, y: y};
    }
}



window.onload = function () {
    jaws.assets.add('media/blueblock.png');
    jaws.assets.add('media/cyanblock.png');
    jaws.assets.add('media/greenblock.png');
    jaws.assets.add('media/orangeblock.png');
    jaws.assets.add('media/purpleblock.png');
    jaws.assets.add('media/redblock.png');
    jaws.assets.add('media/yellowblock.png');

    jaws.assets.add('media/greyblock.png');
    jaws.assets.add('media/emptyblock.png');

    jaws.assets.add('media/numbers/0.png');
    jaws.assets.add('media/numbers/1.png');
    jaws.assets.add('media/numbers/2.png');
    jaws.assets.add('media/numbers/3.png');
    jaws.assets.add('media/numbers/4.png');
    jaws.assets.add('media/numbers/5.png');
    jaws.assets.add('media/numbers/6.png');
    jaws.assets.add('media/numbers/7.png');
    jaws.assets.add('media/numbers/8.png');
    jaws.assets.add('media/numbers/9.png');

    jaws.assets.add('media/buttons/continue.png');
    jaws.assets.add('media/buttons/restart.png');

    jaws.start(Tetris);
};