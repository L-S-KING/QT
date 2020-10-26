// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      //背景
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
      },
      //金鱼
      fishNode : {
        default: null,
        type: cc.Node
      },
    },

    onLoad () {
      this.waterRippleTime = 0;
      //水波纹播放间隔时间
      this.intervalTime = 300 + Math.random() * 600;

     this.fishShowRandom();

     //金鱼起始位置
     this.posBegin = cc.v2(0,0);
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
      //金鱼每次结束移动的位置
      this.posEnd = this.fishNode.getPosition();
      var fishAngle = this.getTanAngle(this.posBegin,this.posEnd);
      // cc.log("角度" + fishAngle);
      this.fishNode.rotation = fishAngle;
      this.posBegin = this.posEnd;
    },

    /**金鱼随机生成 */
    fishShowRandom(){
      //金鱼生成位置的随机
      //金鱼颜色随机
      var fishRandom = Math.floor(Math.random() * 3);
      var children = this.fishNode.children;
      for(let i=0;i<children.length;i++){
        children[i].active = false;
      }
      children[fishRandom].active = true;

      // var fish = children[fishRandom].children;
      // for(let i=0;i<fish.length;i++){
      //   fish[i].rotation = this.getAngle(0,);
      //   cc.log(fish[i].rotation);
      // }

      //金鱼的移动
      var act = cc.moveTo(2,cc.v2(-400,0));
      this.fishNode.runAction(act);
    },

    getTanDeg(tan) {
      var result = Math.atan(tan) / (Math.PI / 180);
      result = Math.round(result);
      return result;
    },

    getTanAngle(start,end){
      var x = end.x - start.x;
      var y = end.y - start.y;

      var tan = y/x;
      //求出弧度
      var radian = Math.atan(tan);

      //用弧度算出角度
      var angle = 180/(Math.PI/radian);
      if(y > 0 && x == 0){}
      if(y > 0 ){
        angle = angle;
      }
      else{
        angle = angle + 180;
      }
      return angle;
    },


    /**水波纹动画播放 */
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

    /**背景装饰的显示 */
    bgBeautifyShow(num){
      for(let i=0;i<this.bgNodeArr.length;i++){
        this.bgNodeArr[i].active = false;
      }
      this.bgNodeArr[num].active = true;
    },

    /**按钮回调函数 */
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
