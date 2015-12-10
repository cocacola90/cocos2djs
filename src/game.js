/**
 * Created by Kenshin on 11/23/2015.
 */
var gameLayer;

var background;
var box_next_height = 60;
var anchor_x = 150;
var anchor_y = 50;
var top = 400;
var Objs = { //global objects
    Square: [],
    Anchor_Square: []
}

var timePlayed = 0; //game time
var isAlive = false; //is the game is running

function gameStart() {//game start, hide texts
}
function gameOver() {//game over, check score
}
/*  layer start game*/
var StartLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;
        var item1 = new cc.MenuItemImage(res.s_playNormal, res.s_playSelect, this.playGame, this);
        //  var menuItem2 = new cc.MenuItemFont('Chuyen Scene A' , this.onGoBack,this);
        item1.setPosition(cc.p(size.width / 2, size.height / 2));
        var menu = new cc.Menu(item1);
        menu.alignItemsVertically();
        this.addChild(menu);


    },
    playGame: function () {
        var scene = new SceneToScene();
        gameLayer = new game();
        scene.addChild(gameLayer);
        cc.director.runScene(scene);
    }
});
/*     layer game    */
var game = cc.Layer.extend({
    ctor: function () {
        this._super();
        background = new Background();
        this.addChild(background, 0);
        // this.addSquare();
        var baseSquare = new BaseSquare();
       // baseSquare.addSquare();
        this.addChild(baseSquare);

    }
});
var BaseSquare = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var X = new Number(60);
        for(var i=1; i < 6 ; i++){
            X += 60;
            var sq = cc.Sprite.create("res/frog/anh_" + i+".png");
            sq.setPosition(anchor_x + X,anchor_y);
            //cc.log(sq);
            this.addChild(sq);
            Objs.Anchor_Square.push(sq);
        }

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        });
        cc.eventManager.addListener(listener, this);

    },
    addSquare: function (box_next_height) {
        var X = new Number(60);
        var Y = new Number(box_next_height)
        for(var i=1; i < 6 ; i++){
            X += 60;
            Y = box_next_height;
            var sq = cc.Sprite.create("res/frog/anh_" + i+".png");
           // cc.log(top);
            sq.setPosition(anchor_x + X,500);
           // cc.log(sq);
            this.addChild(sq);
            Objs.Square.push(sq);
        }
    },
    update: function (dt) {
        for (var i = 0; i < Objs.Square.length; i++){
            var moveAction = cc.MoveBy.create(0.5, cc.p(0, -10));
            Objs.Square[i].runAction(moveAction);
        }

        this.checkCollision();
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        target.scheduleUpdate();
        target.addSquare();

    },
    checkCollision: function () {
        for (var i = 0; i < Objs.Square.length; i++){
            var rect_o = Objs.Square[i].getBoundingBox();
            var rect_a_o =  Objs.Anchor_Square[i].getBoundingBox();
           // cc.log(rect_a_o);
            if(cc.rectIntersectsRect(rect_o,rect_a_o)){
               // this.addSquare(60);
                Objs.Square[i].attr({
                    x: Objs.Anchor_Square[i].getPositionX(),
                    y: Objs.Anchor_Square[i].getPositionY() - 60
                });
                Objs.Anchor_Square[i] = Objs.Square[i];
                Objs.Square[i].stopAllActions();
              //  var Y = Objs.Anchor_Square[i].getPositionY() + 60;
               // Objs.Square[i].setPosition(Objs.Anchor_Square[i].getPositionX(),Y);
                //cc.log(Objs.Anchor_Square);

               // this.addChild(Objs.Anchor_Square[i]);
                /*Objs.Anchor_Square = [];
                //  Objs.Anchor_Square[i].setPosition(Objs.Anchor_Square[i].getPositionX(), (Objs.Anchor_Square[i].getPositionY() - 60)) ;
                // Objs.Square[i].setPosition(Objs.Square[i].getPositionX(), (Objs.Square[i].getPositionY() - 60)) ;
                Objs.Anchor_Square[i] = Objs.Square[i];
                Objs.Square[i].stopAllActions();*/
            }
        }
    }
});


var Background = cc.Sprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(res.bg);
        var size = cc.winSize;
        this.setPosition(size.width / 2, size.height / 2);
    }
});

var SceneToScene = cc.Scene.extend({

    runThisTest: function () {
        var layer = new game();
        this.addChild(layer);
        director.runScene(this);
    }
});
var GameScenes = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var startGame = new StartLayer();
        this.addChild(startGame);
    }
});
