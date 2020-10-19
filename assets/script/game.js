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
      bgImg : {
        default: [],
        type: [cc.SpriteFrame]
      },
      bgNodeArr : {
        default: [],
        type: [cc.Node]
      }
    },

    onLoad () {
       
        
    },

    start () {

    },

    update (dt) {

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
