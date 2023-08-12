!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";const t=["#00f0f0","#0000f5","#f0a000","#f0f000","#00f000","#a000f0","#f00000"],e=[[[1,1,1,1]],[[2,0,0],[2,2,2]],[[0,0,3],[3,3,3]],[[4,4],[4,4]],[[0,5,5],[5,5,0]],[[0,6,0],[6,6,6]],[[7,7,0],[0,7,7]]];class s{constructor(t,e,s=null){this.board=t,this.shape=e,this.position=s,this.downTick=0,this.position||(this.position={x:Math.floor(this.board.getWidth()/2-this.shape[0].length/2),y:-this.shape.length})}static randomShape(t){const i=e[Math.floor(Math.random()*e.length)];return new s(t,i)}rotate(){const t=this.shape,e=t.length,s=t[0].length,i=[];for(let h=0;h<s;h++){const s=[];for(let i=e-1;i>=0;i--)s.push(t[i][h]);i.push(s)}const h=this.position.y+Math.floor(this.shape.length/2)-Math.floor(i.length/2),a=this.position.x+Math.floor(this.shape[0].length/2)-Math.floor(i[0].length/2),o=a+i[0].length<=this.board.getWidth()&&a>=0,r=h+i.length<=this.board.getHeight();if(o&&r){const t=structuredClone(this.board.getBoard());for(let e=0;e<this.shape.length;++e)for(let s=0;s<this.shape[e].length;++s)this.position.y+e>=0&&(t[e+this.position.y][s+this.position.x]=0);for(let e=0;e<i.length;++e)for(let s=0;s<i[e].length;++s)if(h+e>=0&&0!==t[e+h][s+a])return;this.position.y=h,this.position.x=a,this.shape=i}this.board.update(!1)}canGoLeft(){var t;const e=this.shape,s=this.position,i=this.board.getBoard();for(let h=0;h<e.length;++h)for(let a=0;a<e[h].length;++a){if(s.y+h>=0&&(0===e[h][a-1]||void 0===e[h][a-1])&&0!==(null===(t=i[h+s.y])||void 0===t?void 0:t[a+s.x-1])&&0!==s.x&&0!==e[h][a])return!1}return!0}canGoRiht(){var t;const e=this.shape,s=this.position,i=this.board.getBoard();for(let h=0;h<e.length;++h)for(let a=0;a<e[h].length;++a){if(s.y+h>=0&&(0===e[h][a+1]||void 0===e[h][a+1])&&0!==(null===(t=i[h+s.y])||void 0===t?void 0:t[a+s.x+1])&&s.x!==this.board.getWidth()-e[0].length&&0!==e[h][a])return!1}return!0}canGoDown(){var t,e,s;if(this.haveReachedBottom())return++this.downTick,this.downTick<=1;const i=this.shape,h=this.position,a=this.board.getBoard();for(let o=0;o<i.length;++o)for(let r=0;r<i[o].length;++r){if(h.y+o+1>=0&&(0===(null===(t=i[o+1])||void 0===t?void 0:t[r])||void 0===(null===(e=i[o+1])||void 0===e?void 0:e[r]))&&0!==(null===(s=a[o+h.y+1])||void 0===s?void 0:s[r+h.x])&&0!==i[o][r])return++this.downTick,this.downTick<=1}return this.downTick=0,!0}goDown(){this.position.y!==this.board.getHeight()-this.shape.length&&0===this.downTick&&++this.position.y,this.board.update(!1)}goRight(){this.canGoRiht()&&(this.position.x!==this.board.getWidth()-this.shape[0].length&&++this.position.x,this.board.update(!1))}goLeft(){this.canGoLeft()&&(0!==this.position.x&&this.position.x--,this.board.update(!1))}haveReachedBottom(){return this.position.y===this.board.getHeight()-this.shape.length}getShape(){return this.shape}getPosition(){return this.position}copy(){return new s(this.board,this.shape,structuredClone(this.position))}}class i{constructor(t=12,e=24){this.width=t,this.height=e,this.board=[],this.score=0,this.actualShape=s.randomShape(this),this.nextShape=s.randomShape(this),this.buildBoard()}buildBoard(){for(let t=0;t<this.width*this.height;++t)t%this.width==0&&this.board.push([]),this.board[this.board.length-1].push(0)}removeLastShapeDraw(){if(!this.backShape)return;const t=this.backShape.getShape(),e=this.backShape.getPosition();for(let s=0;s<t.length;++s)for(let i=0;i<t[s].length;++i)e.y+s<0||0!==t[s][i]&&(this.board[s+e.y][i+e.x]=0)}displayShape(){const t=this.actualShape.getShape(),e=this.actualShape.getPosition();for(let s=0;s<t.length;++s)for(let i=0;i<t[s].length;++i)e.y+s<0||0!==t[s][i]&&(this.board[s+e.y][i+e.x]=t[s][i])}haveLoose(){return this.board[0].some((t=>0!==t))&&!this.actualShape.canGoDown()}getScoreFromCompletedLine(t){switch(t){case 0:return 0;case 1:return 40;case 2:return 100;case 3:return 300;default:return 1200}}removeCompletedLines(){let t=0;for(let e=0;e<this.board.length;++e){this.board[e].every((t=>0!==t))&&(++t,this.board.splice(e,1),this.board.unshift(Array(this.width).fill(0)))}this.score+=this.getScoreFromCompletedLine(t)}update(t=!0){this.removeLastShapeDraw(),this.actualShape.canGoDown()||(this.score+=this.actualShape.getShape().length+1,this.displayShape(),this.removeCompletedLines(),this.actualShape=this.nextShape,this.nextShape=s.randomShape(this)),this.backShape=this.actualShape.copy(),t&&this.actualShape.goDown(),this.displayShape()}getScore(){return this.score}getBoard(){return this.board}getWidth(){return this.width}getHeight(){return this.height}getActualShape(){return this.actualShape}getNextShape(){return this.nextShape}getBackShape(){return this.backShape}setActualShape(t){this.actualShape=t}setNextShape(t){this.nextShape=t}setBackShape(t){this.backShape=t}setBoard(t){this.board=t}setScore(t){this.score=t}reset(){this.board=[],this.actualShape=s.randomShape(this),this.nextShape=s.randomShape(this),this.backShape=null,this.score=0,this.buildBoard()}copy(){const t=new i(this.width,this.height);return t.setActualShape(this.actualShape.copy()),t.setNextShape(this.nextShape.copy()),t.setBackShape(this.backShape.copy()),t.setBoard(structuredClone(this.board)),t.setScore(this.score),t}}class h{constructor(t,e){this.gameHandler=t,this.keys=e,this.initListener()}initListener(){const t=this.gameHandler.getBoard();document.addEventListener("keydown",(e=>{if(!this.gameHandler.isRunning())return;const s=e.key,i=Object.entries(this.keys).find((t=>t[1].toLocaleLowerCase()===s.toLocaleLowerCase()));if(i){const e=t.getActualShape();switch(i[0]){case"RIGHT":e.goRight();break;case"LEFT":e.goLeft();break;case"DOWN":e.goDown();break;case"ROTATE":e.rotate()}this.gameHandler.drawGame(),t.haveLoose()&&this.gameHandler.loose()}}))}}var a;!function(t){t.LOOSE="You loose",t.NOT_PLAYING="Not playing",t.PLAYING="Playing"}(a||(a={}));const o=400,r={RIGHT:"ArrowRight",DOWN:"ArrowDown",LEFT:"ArrowLeft",ROTATE:"ArrowUp"};const n=document.querySelector("canvas"),c=document.querySelector("#play"),l=document.querySelector("#pause"),d=document.querySelector("#reset"),p=new class{constructor(t){this.canvas=t,this.board=new i,this.gameStatus=a.NOT_PLAYING,this.ctx=this.canvas.getContext("2d"),this.canvasWidth=t.width,this.canvasHeight=t.height,this.keyHandler=new h(this,r),this.drawGame()}drawPolygon(t,e){this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.moveTo(t[0].x,t[0].y);for(let e=1;e<t.length;++e)this.ctx.lineTo(t[e].x,t[e].y);this.ctx.closePath(),this.ctx.fill()}drawBorder(t,e){const s=this.canvasWidth/2/this.board.getWidth(),i=this.canvasHeight/this.board.getHeight();this.ctx.beginPath(),this.ctx.strokeStyle="#ffffff10",this.ctx.rect(t*s,e*i,s,i),this.ctx.stroke()}drawRect(t,e,s,i=0,h=0){const a=this.canvasWidth/2/this.board.getWidth(),o=this.canvasHeight/this.board.getHeight(),r=t*a+i,n=e*o+h;this.ctx.fillStyle=s,this.ctx.fillRect(r,n,a,o);const c=[{x:r,y:n},{x:r+a,y:n},{x:r+a-2,y:n+o/4},{x:r+2,y:n+o/4}],l=[{x:r,y:n+o},{x:r+a,y:n+o},{x:r+a-2,y:n+o-o/4},{x:r+2,y:n+o-o/4}],d=[{x:r,y:n},{x:r+a/4,y:n+2},{x:r+a/4,y:n+o-2},{x:r,y:n+o}],p=[{x:r+a,y:n},{x:r+a-a/4,y:n+2},{x:r+a-a/4,y:n+o-2},{x:r+a,y:n+o}];this.drawPolygon(c,"#ffffff80"),this.drawPolygon(l,"#00000080"),this.drawPolygon(d,"#00000050"),this.drawPolygon(p,"#00000050")}drawGame(){const e="#212129";this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.ctx.fillStyle=e,this.ctx.fillRect(0,0,this.canvasWidth/2,this.canvasHeight);const s=this.board.getBoard();for(let e=0;e<s.length;++e)for(let i=0;i<s[e].length;++i){if(0===s[e][i]){this.drawBorder(i,e);continue}const h=t[s[e][i]-1];this.drawRect(i,e,h)}const i=this.canvasWidth/2+10;this.ctx.fillStyle=e,this.ctx.font="18px Arial, sans-serif",this.ctx.fillText("Score: "+this.board.getScore(),i,30),this.ctx.fillText("Game status:",i,60),this.ctx.fillText("- "+this.gameStatus,i,80),this.ctx.fillText("Next Shape:",i,110);const h=this.board.getNextShape().getShape();for(let e=0;e<h.length;++e)for(let s=0;s<h[e].length;++s){if(0===h[e][s])continue;const a=t[h[e][s]-1];this.drawRect(s,e,a,i,120)}}loose(){this.gameStatus=a.LOOSE,this.drawGame(),this.reset(!1)}start(){this.clock||(this.gameStatus=a.PLAYING,this.clock=setInterval((()=>{this.board.update(),this.drawGame(),this.board.haveLoose()&&this.loose()}),o))}stop(){clearInterval(this.clock),this.gameStatus=a.NOT_PLAYING,this.clock=null}reset(t=!0){this.stop(),this.board.reset(),t&&this.drawGame()}isRunning(){return!!this.clock}getBoard(){return this.board}}(n);c.addEventListener("click",(()=>p.start())),l.addEventListener("click",(()=>p.stop())),d.addEventListener("click",(()=>p.reset()));const g=new class{constructor(t){this.gameHandler=t,this.fps=10}main(){const t=this.gameHandler.getBoard(),e=t.getActualShape(),s=t.getNextShape(),i=t.getBoard();e.getShape(),s.getShape(),e.getPosition(),t.copy();for(let t=0;t<i.length;++t){if(!i[t].every((t=>0===t)))for(let e=0;e<i[t].length;++e);}t.haveLoose()?(this.stop(),this.gameHandler.loose()):(this.gameHandler.drawGame(),this.clock=setTimeout((()=>this.main()),1e3/this.fps))}start(){this.gameHandler.stop(),this.main()}stop(){this.clock&&clearTimeout(this.clock)}setFps(t){this.fps=t}}(p),u=document.querySelector("#fps"),f=document.querySelector("#start-ai"),S=document.querySelector("#stop-ai");u.addEventListener("change",(()=>g.setFps(Number(u.value)))),f.addEventListener("click",(()=>g.start())),S.addEventListener("click",(()=>g.stop()))}));
//# sourceMappingURL=index.js.map
