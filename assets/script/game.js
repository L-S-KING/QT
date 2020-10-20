// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      bg : {
        default: null,
        type: cc.Sprite
      },
      //背景图片数组
      bgImg : {
        default: [],
        type: [cc.SpriteFrame]
      },
      //背景装饰图片数组
      bgNodeArr : {
        default: [],
        type: [cc.Node]
      },
      //水波纹
      waterRippleNode : {
        default: null,
        type: cc.Node
      }
    },

    onLoad () {
      this.waterRippleTime = 0;
      //水波纹播放间隔时间
      this.intervalTime = 300 + Math.random() * 600;
    },

    start () {
     
    },

    update (dt) {
      this.waterRippleTime ++;
      if(this.waterRippleTime >= this.intervalTime){
        this.playWaterRipple();
        this.waterRippleTime = 0;
        this.intervalTime = 300 + Math.random() * 600;
      }
    },

    //水波纹动画播放
    playWaterRipple(){
      this.waterRippleNode.active = true;
      var x_random = Math.random() * 720 - 360;
      var y_random = Math.random() * 1280 - 640;
      this.waterRippleNode.setPosition(cc.v2(x_random,y_random));
      // this.waterRippleNode.x = x_random;
      // this.waterRippleNode.y = y_random;
      cc.log(x_random,y_random);

      this.waterRippleNode.getComponent(cc.Animation).play("waterRipple");
    },

    //背景装饰的显示
    bgBeautifyShow(num){
      for(let i=0;i<this.bgNodeArr.length;i++){
        this.bgNodeArr[i].active = false;
      }
      this.bgNodeArr[num].active = true;
    },

    //按钮回调函数
    btnCallBack(sender,str){
      switch(str){
        case "start":
          cc.log(str)
          var bgNum = Math.floor(Math.random() * 10);
          this.bg.spriteFrame = this.bgImg[bgNum];
          this.bgBeautifyShow(bgNum);
          cc.log(bgNum)
          break;
        case "skin":
          cc.log(str)
          break;
        case "set":
          cc.log(str)
          break;
      }
    }
});
