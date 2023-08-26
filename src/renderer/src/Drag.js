class Drag{
  constructor(){
    this.body = null;
    this.pagex = 0;
    this.pagey = 0;
    this.w =  window.outerWidth;
    this.h = window.outerHeight;
  }

  run(){
    window.addEventListener('DOMContentLoaded',()=>{
      this.body = document.querySelector('body');
      this.body.addEventListener('mousedown',this.mouseDown.bind(this))
    })
  }
  mouseDown(e){
    this.pagex = e.pageX;
    this.pagey = e.pageY;
    this.w =  window.outerWidth;
    this.h = window.outerHeight;
    console.log(this.w, this.h )
    const mousemovecall = this.mouseMove.bind(this);
    this.body.addEventListener('mousemove',mousemovecall)
    this.body.addEventListener('mouseup',()=>{
      this.body.removeEventListener('mousemove',mousemovecall)
    })
    this.body.addEventListener('mouseout',()=>{
      this.body.removeEventListener('mousemove',mousemovecall)
    })
  }
  mouseMove(e){
    const x = window.screenX+e.pageX - this.pagex;
    const y = window.screenY+e.pageY - this.pagey;
    window.api.drag({x,y,width:this.w,height:this.h});
  }
}
const drag = new Drag();
export default drag;
