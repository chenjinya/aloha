/*
 * @author jinyachen@gmail.com
 * H5 Slide Engine
 *
 */
document.addEventListener('touchmove', function (event) {
event.preventDefault();
}, false);

var TURN_SPEED = 1000;
var SCENE_DEPTH = 100;
var App = function(){};
App.prototype= {
    window: {
        height: 0,
        width: 0,
    },

    //auto slice
    auto: false,
    //page slice transion
    defaultTransition: 'top 1s, bottom 1s',

    //now scene num
    currentSceneNum: 0,
    //scene zindex base
    currentSceneDepth: 0,
    //can swipe (no use)
    swipeable: true,
    //scene data
    sceneDatas:[],
    //scene count
    sceneCount: 0,
    scenes: null,
    //scene DOMs
    sceneDOMs:null,

    //scene done
    sceneDones: {},

    //scene action list
    sceneActions: [],

    //now exec action 
    execAction: null,
    //animation str
    animationEnd: 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
    //demo
    action:{
        run: function(){},
        next: function(){},
        prev: function(){},
    },
    //load resource(image)
    /*
     * @resource {Array}
     * @procFn {Function} load one function
     * @fn      {Function} done function
     */
    loading: function(resource, procFn, fn){
        var map = {};
        var resourceIndex = 0;
        var resourceCount = 0;
        var needLoadResource = [];
        var noLoadResource = [];
        if(resource){
            needLoadResource = resource['preload'] ? resource['preload'] : [];
            noLoadResource = resource['noload'] ? resource['noload'] : [];
        }
        var resource = needLoadResource;
        var loadingResource = $("[pre-src]");
        loadingResource.each(function(index,that){
            var item = $(that);
            resource.push(item.attr("pre-src"));
        });
        console.log(resource);
        for(var i in noLoadResource){
            var url = noLoadResource[i];
            var it = needLoadResource.indexOf(url);
            console.log(url,it);
            if(-1 == it) {
                continue;
            } else {
                needLoadResource.splice(it, 1);
            }
        }

        for(var i in resource){
            var item = resource[i];
            map[i] = {
                status: 0,
            };
            resourceCount ++;

            var op = {
                type: 'image',
                src: '',
            }
            if(typeof item == "string"){
                op.src = item;
            } else {
                op = item;
            }

            op.type = op.type? op.type : 'image';
            if(op.type == 'image'){
                var img = new Image();
                img.src = op.src;
                img.onload= (function(_i, _img){
                   
                    return function(e){
                        //console.log(arguments)
                         resourceIndex ++;
                        //console.log(resourceIndex, resourceCount);
                        procFn && procFn(resourceIndex, resourceCount);
                        map[_i].status= 1;

                        var done = false;
                        for(var mpi in map){
                            if(map[mpi].status == 0) {
                                return true
                            }
                        }
                        loadingResource.each(function(index,that){
                            var item = $(that);
                            item.attr("src", item.attr("pre-src"))
                        });
                      
                        //load done
                        console.log('load done');
                        fn && fn();
                    }
                })(i,img)
            }
        }
        
    },
    /*
     * init window data
     */
    initWindow: function(){
        this.window.height = $(window).height();
        this.window.width = $(window).width();
    },
    /*
     * init
     */
    init: function(){
        //this.touchmove();
        var self = this;
        this.initWindow();
        this.sceneDOMs = $(".scene");
        this.sceneCount = this.sceneActions.length;
        this.currentSceneNum = 0;
        var self = this;
        $("body").css({
            height: this.window.height,
        });

        this.sceneDOMs.each(function(index,dom){
            $(dom).css({
                top: self.window.height,
                zIndex: index * SCENE_DEPTH,
            });
            if(!self.sceneDatas[index]){
                self.sceneDatas[index] = {};
            }
            self.sceneDatas[index]["depth"] = index * SCENE_DEPTH;
        });

        for(var i in this.sceneActions){
            this.sceneDones[i] = false;
        }
        this.sceneDOMs.eq(0).show().css({
            top: 0,
            opacity: 1,
        });
        this.loop();
        this.bindEvent();
    },
    loop: function(sceneNum){
        var self = this;
        if(sceneNum > this.sceneCount || sceneNum < 0 ){
            return;
        }
        sceneNum = undefined !== sceneNum ? sceneNum : this.currentSceneNum;
        console.log('loop',sceneNum)
        
        this.currentSceneNum = sceneNum;
        this.currentSceneDepth = this.sceneDatas[sceneNum]["depth"];
        this.execAction = this.sceneActions[this.currentSceneNum];
        this.execAction.init && this.execAction.init();
        this.execAction.run && this.execAction.run();
        this.sceneDones[sceneNum] = true;
        if(this.auto){
            setTimeout(function(){
                self.next();
            }, this.auto);
        }
    },
    addAction: function(action){
        //console.log(arguments);
        this.sceneActions.push( action);
           
    },
    enableSwipe: function(){
        this.swipeable = true;
        this.bindEvent();
    },
    disableSwipe: function(){
        this.swipeable = false;
        $(window)
        .off("swipeUp")
        .off("swipeDown");
    },
    bindEvent: function(){
        var self = this;

        $(window)
        .off("swipeUp")
        .off("swipeDown")
        .one("swipeUp", function(e){
            console.log('app swiptup');
            if(self.swipeable) self.next();
        })
        .one("swipeDown", function(e){
            console.log('app swiptdown');
            if(self.swipeable) self.prev();
        });
    },
    next: function(sceneNum,force){
        var self = this;
        if(this.currentSceneNum > sceneNum) {
            return this.prev(sceneNum,force);
        }
        if( true == force){
            this.scrollNext(sceneNum);
        } else if(this.execAction.next && typeof this.execAction.next == 'function'){
            this.execAction.next(function(){
                self.loop(sceneNum);
                self.bindEvent();
            });
            return ;
        } else {
            this.scrollNext(sceneNum);
        }
        this.loop(sceneNum);
        this.bindEvent();
    },
    prev: function(sceneNum,force){
        var self = this;
        if(this.currentSceneNum < sceneNum) {
            return this.next(sceneNum,force);
        }
        if( true == force){
            this.scrollPrev(sceneNum);
        } else if(this.execAction.prev && typeof this.execAction.prev == 'function'){
            this.execAction.prev(function(){
                self.loop(sceneNum);
                self.bindEvent();
            });
            return ;
        } else {
            this.scrollPrev(sceneNum);
        }
        this.loop(sceneNum);
        this.bindEvent();
    },
    //common
    scrollNext: function(nextIndex, fn, speed){
        sceneIndex = this.currentSceneNum;
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNum +1;

        this.currentSceneNum = nextIndex;
        this.sceneDOMs.eq(nextIndex).css({
            top: app.window.height,
            opacity: 1,
        });

        this.sceneDOMs.eq(sceneIndex).animate({
            top: - app.window.height,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');
        this.sceneDOMs.eq(nextIndex).animate({
            top: 0,
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');
        fn && this.sceneDOMs.eq(nextIndex).one(this.animationEnd, fn);
    },
    scrollPrev: function(nextIndex, fn, speed){

        sceneIndex = this.currentSceneNum;
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNum -1;
        this.currentSceneNum = nextIndex;
        this.sceneDOMs.eq(nextIndex).css({
            top: -app.window.height,
        });

        this.sceneDOMs.eq(sceneIndex).animate({
            top: app.window.height,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');
        this.sceneDOMs.eq(nextIndex).animate({
            top: 0,
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');
        

        fn && this.sceneDOMs.eq(nextIndex).one(this.animationEnd, fn);
    },

    fadeInNext: function(nextIndex, fn, speed){
        sceneIndex = this.currentSceneNum;
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNum +1;
        this.currentSceneNum = nextIndex;
        this.sceneDOMs.eq(sceneIndex).animate({
            opacity: 0,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');

        this.sceneDOMs.eq(nextIndex).css({
            top: 0,
            opacity: 0,
        }).animate({
            top: 0,
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');

        fn && this.sceneDOMs.eq(nextIndex).one(this.animationEnd, fn);
    },
    fadeInPrev: function(nextIndex, fn, speed){
        sceneIndex = this.currentSceneNum;
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNum -1;
        this.currentSceneNum = nextIndex;
   
        this.sceneDOMs.eq(sceneIndex).animate({
            opacity: 0,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');
        this.sceneDOMs.eq(nextIndex).css({
            top: 0,
            opacity: 0,
        }).animate({
            top: 0,
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');

        fn && this.sceneDOMs.eq(nextIndex).one(this.animationEnd, fn);
    }

}


