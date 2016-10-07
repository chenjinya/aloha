var app = new App();
var soundStatus = false;
var soundFn = function(e,status){
    if(soundStatus == true || status == 1){
        $(".app-sound")[0].pause();
        $(".app-sound-icon").attr("style",'');
        soundStatus = false;
    } else if(soundStatus == false  || status == 2){
        $(".app-sound")[0].play();
        $(".app-sound-icon").css({
            backgroundImage: 'url(./image/sound-on.png)',
            animation:  'app-sound-icon-frames linear 5s infinite',
        });
        soundStatus = true;
    }
}
//ls image/ | awk {'print "\"./image/"$1"\","'}

app.loading([
   "./image/9-0.png",
    "./image/9-1.png",
    "./image/9-bg.png",
    "./image/banner-1.png",
    "./image/banner-2.png",
    //"./image/images",
    "./image/loading-logo.png",
    "./image/location-info.png",
    "./image/location-title.png",
    "./image/pics/btn-left.png",
    "./image/pics/btn-right.png",
    "./image/pics/more-btn.png",
    "./image/pics/pic1.png",
    "./image/pics/pic2.png",
    "./image/pics/pic3.png",
    "./image/pics/pic4.png",
    "./image/pics/ret-btn.png",
    "./image/pics/text1.png",
    "./image/pics/text2.png",
    "./image/pics/text3.png",
    "./image/point.png",
    "./image/scene-2-0.png",
    "./image/scene-2-1.png",
    "./image/scene-2-2.png",
    "./image/scene-2-background.png",
    // "./image/scene-2-shade.png",
    // "./image/scene-2-shade2.png",
    "./image/scene-3-2.png",
    "./image/scene-3-background.png",
    "./image/scene-3-light.png",
    "./image/scene-3-light2.png",
    "./image/gogo-1.png",
    "./image/gogo-2.png",
    "./image/scene-5-dj.png",
    "./image/scene-6-map.png",
    "./image/support-banner2.png",
    "./image/ticket/ticket-1.jpg",
    "./image/ticket/ticket-2.jpg",
    "./image/ticket/ticket-3.jpg",
    "./image/ticket/ticket-4.jpg",
    "./image/ticket/ticket-5.jpg",
    "./image/ticket/ticket-6.jpg",
    "./image/ticket.png",
], function(i,c){
   if(i == c) {
    $(".app-loading").remove();
   }
    $(".app-loading").find(".app-loading-bar").html("loading...(" + Math.ceil(i / c * 100 )+ "%)");
},

function(){ 
   app.init();
   
   
  
   $(".app-sound-icon").show().on("click", soundFn );
   $(window).one("touchend", function(){
        soundFn();
   });

});

app.addAction( {
    run: function(){
        //scene 0
        
        if(app.sceneDones[0]){
            return false;
        } 
        //app.disableSwipe();
        var sceneIndex = 0;
        console.log('scene 0');
        
        $(".loading-center").css({
            animation: 'loading-center 6s linear forwards ',
        });
        $(".loading-center-bg").css({
            animation: 'loading-center-bg 6s linear forwards ',
        });
        $(".loading-center-circle-inner").css({
            animation: 'loading-inner 5s linear forwards ',
        });
        $(".loading-center-circle-outer").css({
            animation: 'loading-outer 5s linear forwards ',
        });

        var $bannerSecion = $(".banner-section");
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(".loading-center").one(animationEnd, function(){
            $bannerSecion.show();
            //app.enableSwipe();
            $bannerSecion.find(".banner-1").css({ opacity: 1 });
            setTimeout(function(){ 

                $bannerSecion.find(".banner-2").animate({
                    opacity: 1,
                }, function(){
                    $bannerSecion.find(".banner-2").css({ 
                        animation: "banner-shining 4s ease-in-out infinite",
                    });
                })
               
                $("body").css({
                    background: "#0f090a",
                });
                $(".scene-1").find(".banner-2").on("click", function(){
                    app.next(7,true);
                });
                $(".page-horn-4").on("click", function(){
                    if(app.currentSceneNum != 7){
                        app.next(7,true);
                    }
                })
                $(".page-horn-2").on("click", function(){
                    if(app.currentSceneNum != 0){
                        app.next(0,true);
                    }
                })
                
                app.sceneDOMs.eq(sceneIndex).css({
                    transition: app.defaultTransition,
                });
                $(".page-wrap").css({
                    opacity: 1,
                })

                
            },500);
        });

       
    },
    init: function(){
        // $(".scene-1").find(".banner-2").off("click");
        // $(".page-horn-4").off("click");
        $("body").attr("style", '');
        // $("body").css({
        //     background: '#110a0c',
        // })
    },
    prev: function(){},
});


app.addAction({
    run: function(){
        //scene 1
        console.log('scene 1');
        var sceneIndex = 1;

        //$("body").attr("style",'');
        $(".scene-2-smoke").animate({
            bottom: '0',
        },1000);
        $(".scene-2-people").animate({
            bottom: '0',
        },1000);
        $(".scene-2-banner").animate({
            top: '0'
        },1000);

      
    }, 
    next: function(nx){
        // app.sceneDOMs.eq(1).animate({
        //     opacity: 0,
        //     top: '-10em',
        //     opacity: 0,
        // },500);
        $(".scene-2-smoke").animate({
            bottom: '-20em',
            opacity: 0,
        },1000);
        $(".scene-2-people").animate({
            bottom: '-40em',
            opacity: 0,
        },1000);
        $(".scene-2-banner").animate({
            top: '-60em',
            opacity: 0,
        },1000);

        // $(".scene-2-shade-1").animate({
        //     width: "100%",
        // },1000);
        // $(".scene-2-shade-2").animate({
        //     width: "100%",
        // },1000);
        app.fadeInNext();
        nx();
        //app.sceneDOMs.eq(2).fadeOut();
        
        
    },
    init: function(){
        $(".scene-2-shade-1").attr("style",'');
        $(".scene-2-shade-2").attr("style",'');
        $(".scene-2-smoke").attr("style",'');
        $(".scene-2-people").attr("style",'');
        $(".scene-2-banner").attr("style",'');

    }
});

app.addAction({
    run: function(){


        // recover

        


        //scene 2
        console.log('scene 2');
        var sceneIndex = 2;
        $(".scene-3-poster").css({
            opacity: 0,
        })
       
        $(".scene-3-light-1").animate({
            rotate: '80deg',
            // opacity: 0,
        },1000,'linear', function(){
            
        });

        $(".scene-3-light-2").animate({
            rotate: '-80deg',
            // opacity: 0,
        },1000,'linear', function(){
            
        });
       
       setTimeout(function(){
            $(".scene-3-poster").animate({
                opacity: 1,
            });
            setTimeout(function(){
                $(".scene-3-bg").animate({
                    opacity: 1,
                });
            },100);
           
        },500);

    }, 
    init: function(){
        $(".scene-3-light-1").attr("style",'');
        $(".scene-3-light-2").attr("style",'');
    },
    next: function(nx){
        $(".scene-3-poster").animate({
            top: '-30em,'
        });
        app.scrollNext();
        nx();
    }
 
   
});

app.addAction({
    run: function(){
        //scene 3

        setTimeout(function(){
            $(".scene-9-left").animate({
                left: '0%',
            }, 200)
            $(".scene-9-right").animate({
                right: '0%',
            }, 200)
        },500);
       
        console.log('scene 9');
        var sceneIndex = 9;

    }, 
    init: function(){
        $(".scene-9-right").attr("style",'');
        $(".scene-9-left").attr("style",'');
    }

});

app.addAction({
    run: function(){
        //scene 3
        console.log('scene 3');
        var sceneIndex = 3;

    }, 

});

app.addAction({
    run: function(){
        //scene 4
        console.log('scene 4');
        var sceneIndex = 4;

    }, 

});

app.addAction({
    run: function(){
        //scene 4
        console.log('scene 5');
        
        var sceneIndex = 5;

        setTimeout(function(){
            $(".scene-6-map").css({
                animation: 'scene-6-map-animate 2s ease-in-out forwards',
            }).one(app.animationEnd, function(){

            });
            setTimeout(function(){
                $(".scene-6-point").css({
                    opacity: 1,
                    animation: 'scene-6-point-animate 2s ease-in-out forwards',
                })
            },400);
        },100);
        setTimeout(function(){
            $(".scene-6-location-info").css({
                opacity:  1,
                animation: 'scene-6-location-info-frames .3s ease-in-out forwards',

            });
            $(".scene-6-location-more").css({
                opacity:  1,
                animation: 'scene-6-location-info-frames .3s ease-in-out forwards',

            });
        },1000);
        
        //轮播图
        var picsIndex = 0;
        var showIndex =0 ;
        var baseLength = 31;
        var baseStep = 65;
        $(".pics-wrap-btn-left").on("click", function(){
            picsIndex ++;
            if(picsIndex >= $(".pics-item").length ){
                picsIndex = $(".pics-item").length - 1;
                return false;
            }
            $(".pics-list").animate({
                left: (baseLength - picsIndex * baseStep) + "%", 
            });
            showPicItem(picsIndex);
        })
        $(".pics-wrap-btn-right").on("click", function(){
            picsIndex --;
            if(picsIndex < 0){
                picsIndex = 0;
                return false;
            }
            $(".pics-list").animate({
                left: (baseLength - picsIndex * baseStep) + "%", 
            });
            showPicItem(picsIndex);
        });

        $(".scene-6-location-more").on("click", function(){
            $(this).animate({
                opacity: 0,
                zIndex:0,
            });
            $(".scene-6-pics-wrap").animate({
                opacity: 1,
            });

            $(".scene-6-location"). animate({
                 marginTop: '-10%',
                 opacity: .2,
            },100)
      

            $(".scene-6-location-info").animate({
                top: '10%',
            },100);
            $(".scene-6-location-ret").animate({
                opacity: 1,
                zIndex:1,
            })
        });

        $(".scene-6-location-ret").on("click", function(){
            $(this).animate({
                opacity: 0,
                zIndex:0,
            });

            $(".scene-6-location"). animate({
                 marginTop: '0%',
                 opacity: 1,
            })

            $(".scene-6-pics-wrap").animate({
                opacity: 0,
            });
            $(".scene-6-location-more").animate({
                opacity: 1,
                zIndex:1,
            })
            $(".scene-6-location-info").animate({
                top: null,
            });
        });

        function showPicItem(index){
            $(".pics-item").eq(showIndex).css({
                zIndex: 0,
            }).animate({
                width: '65%',
                margin: '0 auto',
                opacity: .7,
            });
            $(".pics-item").eq(index).css({
                zIndex: 1,
            }).animate({
                width: '75%',
                margin: '-5% -20%',
                
                opacity: 1,
            });
            $(".pics-list-text").find(".pics-item-text").each(function(index,item){
                $(item).attr("style", "");
            }).eq(index).show().animate({
                opacity:  1,
            });
            showIndex = index;
        }
        $(".pics-wrap-btn-left").trigger("click");

    }, 
    init: function(){

        $(".scene-6-map").attr("style", '');
        $(".scene-6-point").attr("style", '');
        $(".pics-wrap-btn-left").off("click")
        $(".pics-wrap-btn-right").off("click")
        $(".scene-6-pics-wrap").attr("style", '');
        $(".scene-6-location-info").attr("style", '');
        $(".scene-6-location-more").attr("style", '');
        $(".scene-6-location-ret").attr("style", '');
        $(".scene-6-location").attr("style", '');
    }

});

app.addAction({
    run: function(){

       
        console.log('scene 7');  
        // app.sceneDOMs.eq(6).css({
        //     top: 0,
        // })      
        $(".page-horn-4").hide();
                
        var sceneIndex = 7;
        var rx = 0,ry = 0;
        var rt = 0;
        var reachTop = 0;
        var reachBottom = 0;
        var moveDegree = 2;
        $(".ticket-href-section").css({
                top: rt,
            });
        $(".ticket-href-section")
        .on("touchstart", function(e){
            console.log(e);
        })
        .on("touchend", function(e){
            console.log(e);
            if(rt > moveDegree && 0 == reachTop){
                app.prev();
                reachTop = 1;

            } else if(0 == reachBottom && rt <  - Math.floor(100 * ($(".ticket-href-section").height() - $(window).height()) / $(window).height())){
                
                app.next();
                reachBottom = 1;
            }
        })
        $(".ticket-href-section").on("touchmove", function(e){
            //console.log(e.changedTouches[0].clientX)
            if(e.changedTouches[0].clientY - ry < 0){
                console.log('swipeup')
                rt -=moveDegree;
               
            } else {
                console.log('swipedown')
                rt +=moveDegree;
                ///return true;
            }
            //console.log(rt);
            // if(rt > moveDegree){
            //     return false;

            // } else if(rt <  - Math.floor(100 * ($(".ticket-href-section").height() - $(window).height()) / $(window).height())){
            //     return false;
            // }
            console.log("rt:",rt);
            $(".ticket-href-section").css({
                top: rt + "%",
            });
            ry = e.changedTouches[0].clientY
            return false;
            
        });

        // $(".scene-7-wrap").on("touchend", function(){
            
        // });
        
    }, 
    init: function(){
        $(".page-horn-4").hide();
    },
    next: function(){
        $(".page-horn-4").show();
        app.scrollNext();
        app.loop();
    },
    prev: function(){
        $(".page-horn-4").show();
        app.scrollPrev();
        app.loop();
    }
});
app.addAction({
    run: function(){
        //video
        var audioStatus = !!soundStatus;
        $(".play-video-btn").on("click", function(){
            $(this).hide();
            audioStatus = !!soundStatus;
            $(".scene-10").find("video")[0].play();
            if(audioStatus == true){
                soundFn(null,1);
            } 

        })

        $(".scene-10").find("video").on("playing", function(){
            $(".play-video-btn").hide();
        }).on("pause", function(){
            $(".play-video-btn").show();
            
            if(audioStatus == true){
                soundFn(null,2);
            }
        }).on("stop", function(){
            $(".play-video-btn").show();
        }).on("ended", function(){

        });
        
    },
    next: function(next){
        $(".scene-10").find("video")[0].pause();
        app.scrollNext();
        next();
    },
    prev: function(next){
        $(".scene-10").find("video")[0].pause();
        app.scrollPrev();
        next();
    }
});

app.addAction({
    run: function(){
        
        
    }, 
    next: function(){
       app.next(0);
    }
});
app.auto = false;
