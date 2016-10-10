var app = new App();
var soundStatus = false;
var soundFn = function(e,status){
    //console.log("click");
    if(soundStatus == true || status == 1){
        $(".app-sound")[0].pause();
        $(".app-sound-icon").css({
            animation:null,
            backgroundImage: null,
        });
        soundStatus = false;
    } else if(soundStatus == false  || status == 2){
        $(".app-sound")[0].play();
        if(!$.os.iphone){
            $(".app-sound-icon").css({
                backgroundImage: 'url(./image/sound-on.png)',
            });
        } else {
            $(".app-sound-icon").css({
                backgroundImage: 'url(./image/sound-on.png)',
                animation:  'app-sound-icon-frames linear 5s infinite',
            });
        }
        
        soundStatus = true;
    }
}

app.loading({
    loading: [],
    noload: [
        "./image/pics/pic1.png",
        "./image/pics/pic2.png",
        "./image/pics/pic3.png",
        "./image/pics/pic4.png",
        "./image/ticket-1-body.png",
        "./image/ticket-2-body.png",
    ],
},function(i,c){
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
    $(".page-horn-4").on("click", function(){
        if(app.currentSceneNo != 7){
            app.next(7,true);
        }
    })
    $(".page-horn-2").on("click", function(){
        if(app.currentSceneNo != 0){
          //  app.next(0,true);
        }
    });

    //video bug
    $(".scene-10").show();
 

});

app.addAction( {
    run: function(){
        //scene 0
        
        if(app.sceneDones[0]){
            return false;
        } 
       
        //app.disableSwipe();
        var sceneIndex = 0;
        //console.log('scene 0');
        
        $(".loading-center").css({
            animation: 'loading-center 6s linear forwards ',
        });
        if(!$.os.iphone){
            $(".loading-center-bg").remove();
        } else {
            $(".loading-center-bg").css({
                animation: 'loading-center-bg 6s linear forwards ',
            });
        }
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
                if(!$.os.iphone){
                    $bannerSecion.find(".banner-2").css({
                        opacity: 1,
                    });
                    app.sceneDOMs.eq(0).css({
                        background: '#120c0e',
                    })
                    $(".touch-tip").show();
                } else {
                    $bannerSecion.find(".banner-2").animate({
                        opacity: 1,
                    }, function(){
                        $bannerSecion.find(".banner-2").css({ 
                            animation: "banner-shining 4s ease-in-out infinite",
                        });
                        $(".touch-tip").show();
                    });
                    app.sceneDOMs.eq(0).css({ 
                        animation: "banner-shining-bg 4s ease-in-out infinite",
                    });
                }
                
                $(".scene-1").find(".banner-2").on("click", function(){
                    app.next(7,true);
                });
                $(".page-wrap").css({
                    opacity: 1,
                })
            },500);
        });

       
    },
    init: function(){
        
     
    },
    prev: function(){},
});


app.addAction({
    run: function(){
        //scene 1
        //console.log('scene 1');
        var sceneIndex = 1;
        $(".page-wrap").css({
            opacity: 1,
        })

        //$("body").attr("style",'');
        if(!$.os.iphone){
            $(".scene-2-people").css({
                translateY: '0',
            });
            $(".scene-2-banner").css({
                translateY: '0'
            });
            
        } else {
            $(".scene-2-people").animate({
                translateY: '0',
            },1000);
            $(".scene-2-banner").animate({
                translateY: '0'
            },1000);
        }
        

      
    }, 
    next: function(nx){
        // app.sceneDOMs.eq(1).animate({
        //     opacity: 0,
        //     top: '-10em',
        //     opacity: 0,
        // },500);
        if(!$.os.iphone){ 

        } 
        else 
        {

            $(".scene-2-people").animate({
                translateY: '100px',
            },1000);
            $(".scene-2-banner").animate({
                translateY: '-100px',
            },1000);
        }
        

        // $(".scene-2-shade-1").animate({
        //     width: "100%",
        // },1000);
        // $(".scene-2-shade-2").animate({
        //     width: "100%",
        // },1000);
        if($.os.iphone){
            app.fadeInNext();
        } else {
            app.scrollNext();
        }
        
        nx();
        //app.sceneDOMs.eq(2).fadeOut();
        
        
    },
    init: function(){
        if(!$.os.iphone){ 
            return true; 
        }
        
        $(".scene-2-people").css({
            transform: "translateY(100px)",
        });
        $(".scene-2-banner").css({
            transform: "translateY(-100px)",
        });

    }
});

app.addAction({
    run: function(){


        // recover

        


        //scene 2
        //console.log('scene 2');
        var sceneIndex = 2;
        $(".scene-3-poster").css({
            opacity: 0,
        })
       
        if(!$.os.iphone){ 
            $(".scene-3-light-1").hide();
            $(".scene-3-light-2").hide();
            $(".scene-3-poster").css({
                opacity: 1,
            });
            $(".scene-3-bg").css({
                opacity: 1,
            });
            return true; 
        }

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
        if(!$.os.iphone){ 
            return true;
        }
        $(".scene-3-poster").attr("style",'');
        $(".scene-3-light-1").attr("style",'');
        $(".scene-3-light-2").attr("style",'');
    },
    next: function(nx){
        if(!$.os.iphone){ 

        } else {
            $(".scene-3-poster").animate({
                translateY: '-100px'
            });
        }
        app.scrollNext();
        nx();
    }
 
});

app.addAction({
    run: function(){
        //scene 3
        if(!$.os.iphone){ 
            $(".scene-9-left").css({
                left: '0',
            })
            $(".scene-9-right").css({
                right: '0',
            })
        } else {
            setTimeout(function(){
                $(".scene-9-left").animate({
                    translateX: '0',
                }, 200)
                $(".scene-9-right").animate({
                    translateX: '0',
                }, 200)
            },500);
        }
        
        //console.log('scene 9');
        var sceneIndex = 9;

    }, 
    init: function(){
        if(!$.os.iphone){ 
            return true;
        }
        $(".scene-9-left").css({
            transform: 'translateX(-200px)',
        })
        $(".scene-9-right").css({
             transform: 'translateX(200px)',
        })
    }

});

app.addAction({
    run: function(){
        //scene 3
        //console.log('scene 3');
        var sceneIndex = 3;

    }, 
    init: function(){
        
        
    }
});

app.addAction({
    run: function(){
        //scene 4
        //console.log('scene 4');
        var sceneIndex = 4;

    }

});

app.addAction({
    run: function(){
        //scene 4
        //console.log('scene 5');
        
        var sceneIndex = 5;
        if(!$.os.iphone){ 
            //return true;
            $(".scene-6-map").css({
                transform: 'translate3d(0, 0em, -10em)',
            });
            $(".scene-6-point").css({
                opacity: 1,
                transform: 'translateY(0em)',
            });
            $(".scene-6-location-info").css({
                opacity:  1,
                transform: 'translateY(0em)',

            });
            $(".scene-6-location-more").css({
                 opacity:  1,
                transform: 'translateY(0em)',

            });
        } else {
            setTimeout(function(){
                $(".scene-6-map").css({
                    animation: 'scene-6-map-animate 2s ease-in-out forwards',
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
        }
        
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
        if(!$.os.iphone){ 
            return true; 
        }
        $(".scene-6-map").attr("style", '');
        $(".scene-6-point").attr("style", '');

        $(".pics-wrap-btn-left").off("click")
        $(".pics-wrap-btn-right").off("click")
        $(".scene-6-location-more").off("click");
        $(".scene-6-location-ret").off("click");

        $(".scene-6-pics-wrap").attr("style", '');
        $(".scene-6-location-info").attr("style", '');
        $(".scene-6-location-more").attr("style", '');
        $(".scene-6-location-ret").attr("style", '');
        $(".scene-6-location").attr("style", '');
    }

});

app.addAction({
    run: function(){
        $(".page-horn-4").hide();
        
    }, 
});
app.addAction({
    run: function(){
        $(".page-horn-4").hide();
        
    }, 
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

        }).css({
            display: 'block',
            visibility: 'visible',
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
      // app.next(0);
    }
});
app.auto = false;
