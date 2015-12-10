/**
 * Created by Kenshin on 11/23/2015.
 */
var gameLayer;

var background;
var box_next_height = 60;
var st_Square = function () {
    this.m_arr = [
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.setValue = function (row, col) {
        this.m_arr[row][col] = 1;
    }

    this.getValue = function (row, col) {
        return this.m_arr[row][col];
    }
}

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
        baseSquare.addSquare();
        this.addChild(baseSquare);

    }
});
var BaseSquare = cc.Sprite.extend({
    ctor: function () {
        this._super();
        var m_o1 = cc.Sprite.create(res.Anh_1);
        m_o1.setPosition(200, 50);
        this.addChild(m_o1);
        Objs.Anchor_Square.push(m_o1);
        var m_o2 = cc.Sprite.create(res.Anh_2);
        m_o2.setPosition(260, 50);
        this.addChild(m_o2);
        Objs.Anchor_Square.push(m_o2);
        var m_o3 = cc.Sprite.create(res.Anh_3);
        m_o3.setPosition(320, 50);
        this.addChild(m_o3);
        Objs.Anchor_Square.push(m_o3);
        var m_o4 = cc.Sprite.create(res.Anh_4);
        m_o4.setPosition(380, 50);
        this.addChild(m_o4);
        Objs.Anchor_Square.push(m_o4);
        var m_o5 = cc.Sprite.create(res.Anh_5);
        m_o5.setPosition(440, 50);
        this.addChild(m_o5);
        Objs.Anchor_Square.push(m_o5);
        var m_o6 = cc.Sprite.create(res.Anh_1);
        m_o6.setPosition(500, 50);
        this.addChild(m_o6);
        Objs.Anchor_Square.push(m_o6);
        var m_o7 = cc.Sprite.create(res.Anh_2);
        m_o7.setPosition(560, 50);
        this.addChild(m_o7);
        Objs.Anchor_Square.push(m_o7);
        var m_o8 = cc.Sprite.create(res.Anh_3);
        m_o8.setPosition(620, 50);
        this.addChild(m_o8);
        Objs.Anchor_Square.push(m_o8);

        /* su kien click chuot*/
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        });
        cc.eventManager.addListener(listener, this);
        //this.update();
        //  this.scheduleUpdate();
    },
    addSquare: function (box_next_height) {
        Objs.Square = [];
        var o1 = cc.Sprite.create(res.Anh_1);
        o1.setPosition(200, 500);
        this.addChild(o1);
        Objs.Square.push(o1);

        var o2 = cc.Sprite.create(res.Anh_2);
        o2.setPosition(260, 500);
        this.addChild(o2);
        Objs.Square.push(o2);

        var o3 = cc.Sprite.create(res.Anh_3);
        o3.setPosition(320, 500);
        this.addChild(o3);
        Objs.Square.push(o3);

        var o4 = cc.Sprite.create(res.Anh_4);
        o4.setPosition(380, 500);
        this.addChild(o4);
        Objs.Square.push(o4);

        var o5 = cc.Sprite.create(res.Anh_5);
        o5.setPosition(440, 500);
        this.addChild(o5);
        Objs.Square.push(o5);

        var o6 = cc.Sprite.create(res.Anh_1);
        o6.setPosition(500, 500);
        this.addChild(o6);
        Objs.Square.push(o6);

        var o7 = cc.Sprite.create(res.Anh_2);
        o7.setPosition(560, 500);
        this.addChild(o7);
        Objs.Square.push(o7);

        var o8 = cc.Sprite.create(res.Anh_3);
        o8.setPosition(620, 500);
        this.addChild(o8);
        Objs.Square.push(o8);

        cc.log(Objs.Square);
    },
    update: function (dt) {
        this.checkCollision();
    },
    onTouchBegan: function (touch, event) {

        var target = event.getCurrentTarget();
        target.scheduleUpdate();
        target.addSquare();
    },
    checkCollision: function () {

        for (var i = 0; i < Objs.Square.length; i++){
                //cc.log(Objs.Square[i]
            /*var Y =  Objs.Square[i].getPositionY();
            cc.log(Y);*/
            var moveAction = cc.MoveBy.create(0.5, cc.p(0, -10));
            Objs.Square[i].runAction(moveAction);
            /* kiem tra va cham*/
            var rect_o1 = Objs.Square[i].getBoundingBox();
            var rect_m_o1 =  Objs.Anchor_Square[i].getBoundingBox();
            if(cc.rectIntersectsRect(rect_o1,rect_m_o1)){

              //  Objs.Anchor_Square[i].setPosition(Objs.Anchor_Square[i].getPositionX(), (Objs.Anchor_Square[i].getPositionY() - 60)) ;
               // Objs.Square[i].setPosition(Objs.Square[i].getPositionX(), (Objs.Square[i].getPositionY() - 60)) ;
                Objs.Anchor_Square[i] = Objs.Square[i];
                Objs.Square[i].stopAllActions();
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

var GameScene1 = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var startGame = new StartLayer();
        this.addChild(startGame);
    }
});
