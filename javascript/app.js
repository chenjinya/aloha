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

    touchSensitive: true,
   
    //now scene num
    currentSceneNo: 0,
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
        setTimeout(function(){
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
        },1);
        
        
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
        this.currentSceneNo = 0;
        var self = this;
        $("body").css({
            height: this.window.height,
        });

        this.sceneDOMs.each(function(index,dom){
            $(dom).css({
                transform: "translateY(" + self.window.height + "px)",
                zIndex: index * SCENE_DEPTH,
            }).attr("scene-no", index);

            if(!self.sceneDatas[index]){
                self.sceneDatas[index] = {};
            }
            self.sceneDatas[index]["depth"] = index * SCENE_DEPTH;
        });

        for(var i in this.sceneActions){
            this.sceneDones[i] = false;
        }
        this.sceneDOMs.eq(0).show().css({
            translateY: 0,
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
        sceneNum = undefined !== sceneNum ? sceneNum : this.currentSceneNo;
        console.log('loop',sceneNum)
        
        this.currentSceneNo = sceneNum;
        this.currentSceneDepth = this.sceneDatas[sceneNum]["depth"];
        this.execAction = this.sceneActions[this.currentSceneNo];
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
        console.log("bindEvent")
        $(window)
        .off("swipeUp")
        .off("swipeDown")
        .off("touchstart")
        .off("touchend")
        .off("touchmove")
        .one("swipeUp", function(e){
            console.log('app swiptup');
            if(self.swipeable) self.next();
        })
        .one("swipeDown", function(e){
            console.log('app swiptdown');
            if(self.swipeable) self.prev();
        });
       
        

        var sensitiveDegree = 20;
        var scrollTop = 0;
        var scrollStep = 12;
        var touchStart = 0;
        var deltaStep = 30;
        var deltaStepLength = 0;
        var nextSceneNo = 0;
        var endOnce = false;

        $(window).on("touchstart", function(e){
            scrollTop = 0;
            touchStart = e.changedTouches[0].clientY;
        }).on("touchend", function(e){
            console.log("touchend")
            if(deltaStep >= 30){
                // endOnce = true;
                // if(self.swipeable) self.prev();
            } else if( deltaStep <= -30 ) {
                // endOnce = true;
                // if(self.swipeable) self.next();
            } else {
                if(self.touchSensitive && self.sceneDOMs.eq(self.currentSceneNo).attr("touch-sensitive") !== undefined ){
                    self.sceneDOMs.eq(self.currentSceneNo).animate({
                        translateY: 0,
                    });
                    console.log("next",nextSceneNo, self.window.height,deltaStep)
                    if(deltaStep < 0 ){
                         console.log("next",self.sceneDOMs.filter("[scene-no='" + nextSceneNo + "']"))
                        self.sceneDOMs.filter("[scene-no='" + nextSceneNo + "']").animate({
                            translateY: self.window.height + "px",
                        });
                    } else {
                        self.sceneDOMs.filter("[scene-no='" + nextSceneNo + "']").animate({
                            translateY: -self.window.height + "px",
                        });
                    }
                }
                
                
                
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
       }).on("touchmove", function(e){
            // if(endOnce === true){
            //     return false;
            // }
            deltaStep = e.changedTouches[0].clientY - touchStart;
            deltaStepLength = Math.abs(deltaStep);
            //this.sceneDOMs.filter("[touch-sensitive]")
            if(deltaStepLength < sensitiveDegree){
                return false;
            }
            var item = self.sceneDOMs.eq(self.currentSceneNo);
            //console.log(item)
            var sceneNo = parseInt(item.attr("scene-no"));
            if(self.touchSensitive && item.attr("touch-sensitive") !== undefined ){
                if(deltaStep < 0){
                    if(sceneNo == self.sceneCount -1){
                        return;
                    }
                    scrollTop -= scrollStep;
                    if(sceneNo < self.sceneCount - 1 ){
                        nextSceneNo = sceneNo +1;
                        self.sceneDOMs.filter("[scene-no='" + nextSceneNo + "']").css({
                            transform: "translateY(" + ( scrollTop + self.window.height) + "px" + ")",
                        });
                    }
                } else {
                    if(sceneNo == 0){
                        return;
                    }
                    scrollTop += scrollStep;
                    if(sceneNo >0){
                        nextSceneNo = sceneNo - 1;
                        self.sceneDOMs.filter("[scene-no='" + nextSceneNo + "']").css({
                            transform: "translateY(" + ( scrollTop - self.window.height) + "px" + ")",
                        });
                    }
                }
                item.css({
                    transform: "translateY(" + scrollTop + "px" + ")",
                });
            }
            
        });
        
        


    },
    next: function(sceneNum,force){
        var self = this;
        if(this.currentSceneNo > sceneNum) {
            return this.prev(sceneNum,force);
        }
        // this.sceneDOMs.eq(this.currentSceneNo).one(this.currentSceneNo, function(){
        //     $(this).hide();
        // });
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
        if(this.currentSceneNo < sceneNum) {
            return this.next(sceneNum,force);
        }
        // this.sceneDOMs.eq(this.currentSceneNo).one(this.currentSceneNo, function(){
        //     $(this).hide();
        // });

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
        sceneIndex = this.currentSceneNo;
        if(!$.os.iphone){
            speed = "linear";
        }
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNo +1;
        this.currentSceneNo = nextIndex;
        if(!this.touchSensitive){
            this.sceneDOMs.eq(nextIndex).css({
                visibility: "visible",
                transform: "translateY(" + app.window.height + "px" + ")",
            });
        }
        
       
        this.sceneDOMs.eq(sceneIndex).animate({
            translateY: - app.window.height + "px",
        }, speed ? speed : TURN_SPEED, 'ease-in-out', function(){
            $(this).css({
                //visibility: 'hidden',
            })
        });

        this.sceneDOMs.eq(nextIndex).animate({
            translateY: 0,
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');

        
    },
    scrollPrev: function(nextIndex, fn, speed){

        sceneIndex = this.currentSceneNo;
        if(!$.os.iphone){
            speed = "linear";
        }
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNo -1;
        this.currentSceneNo = nextIndex;

        if(!this.touchSensitive){
            this.sceneDOMs.eq(nextIndex).css({
                visibility: "visible",
                transform: "translateY(" + (- app.window.height) + "px" + ")",
            });
        }
        
        
        this.sceneDOMs.eq(sceneIndex).animate({
            translateY: app.window.height + "px",
        }, speed ? speed : TURN_SPEED, 'ease-in-out', function(){
            $(this).css({
                //visibility: 'hidden',
            })
        });
        this.sceneDOMs.eq(nextIndex).animate({
            translateY: 0,
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');
        

    },

    fadeInNext: function(nextIndex, fn, speed){
        sceneIndex = this.currentSceneNo;
        if(!$.os.iphone){
            speed = "linear";
        }
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNo +1;
       
        this.sceneDOMs.eq(nextIndex).css({
            transform: 'translateY(0)',
            opacity: 0,
            visibility: 'visible'
        }).animate({
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');

        this.currentSceneNo = nextIndex;
        this.sceneDOMs.eq(sceneIndex).animate({
            opacity: 0,
            translateY: 0,
        }, speed ? speed : TURN_SPEED, 'ease-in-out', function(){
            $(this).css({
               // visibility: 'hidden',
            })
        });

        
    },
    fadeInPrev: function(nextIndex, fn, speed){
        sceneIndex = this.currentSceneNo;
        if(!$.os.iphone){
            speed = "linear";
        }
        nextIndex = undefined !== nextIndex ? nextIndex : this.currentSceneNo -1;

        this.sceneDOMs.eq(nextIndex).css({
            transform: 'translateY(0)',
            opacity: 0,
            visibility: 'visible'
        }).animate({
            opacity: 1,
        }, speed ? speed : TURN_SPEED, 'ease-in-out');

        this.currentSceneNo = nextIndex;
   
        this.sceneDOMs.eq(sceneIndex).animate({
            opacity: 0,
            translateY: 0,
        }, speed ? speed : TURN_SPEED, 'ease-in-out', function(){
            $(this).css({
                //visibility: 'hidden',
            })
        });
        
    }

}


