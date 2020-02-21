(this["webpackJsonpsnake-game-reactjs"]=this["webpackJsonpsnake-game-reactjs"]||[]).push([[0],{11:function(e,a,t){e.exports=t(18)},16:function(e,a,t){},18:function(e,a,t){"use strict";t.r(a);var o=t(0),n=t.n(o),r=t(4),s=t.n(r),c=(t(16),t(1)),l=t(2),i=t(5),m=t(6),d=t(9),u=t(7),f=t(10),p=t(8),v=t.n(p),b=function(e){function a(e){var t;return Object(i.a)(this,a),(t=Object(d.a)(this,Object(u.a)(a).call(this,e))).onNavigationKey=function(e){var a=t.state.snakeDirection;switch(e.keyCode){case 37:2!==a&&3!==a||(a=1);break;case 38:0!==a&&1!==a||(a=2);break;case 39:2!==a&&3!==a||(a=0);break;case 40:0!==a&&1!==a||(a=3)}t.setState({snakeDirection:a})},t.startGame=function(){t.generateSnakeDefaultCoordinates(),t.setState({startBtnDisable:!0,pauseBtnDisable:!1,cancelBtnDisable:!1})},t.pauseGame=function(){var e=t.state,a=e.paused,o=e.crawlerTimer,n=e.foodTimer;(a=!a)?(o&&clearInterval(o),n&&clearTimeout(n)):t.resumeGame(),t.setState({paused:a,startBtnDisable:!0,pauseBtnDisable:!1,cancelBtnDisable:!1})},t.resumeGame=function(){t.startCrawling()},t.startCrawling=function(){var e=t.state,a=e.snakeLength,o=e.crawlSpeed,n=e.foodTimer;n&&clearTimeout(n);var r=setTimeout((function(){t.showFoods()}),1e3*a),s=setInterval((function(){var e=t.state,o=e.snakeCoordinates,n=e.tailHistory,r=e.foodCoords,s=o[0],i=null,m=t.nextPosiblePoint(s);if(m){if(!!o.find((function(e){return e.x===m.x&&e.y===m.y})))return t.clearTimers(),alert("GAME OVER!!!"),void t.resetSettings();i=o.pop(),r&&t.consumeFood(Object(l.a)({},m)),o.splice(0,0,m),n.push(i),o.length<a&&o.push(i),t.setState({snakeCoordinates:Object(c.a)(o),tailHistory:Object(c.a)(n)})}else t.cancelGame()}),o);t.setState({crawlerTimer:s,foodTimer:r})},t.cancelGame=function(){t.clearTimers(),t.resetSettings()},t.showFoods=function(){var e=t.state,a=e.snakeDirection,o=e.foodTimer,n=e.foodType;if(4!==a&&o){var r=t.randomInt(0,2);2===r&&(r=1),n=r,0===r?t.addFood():t.addSpacialFood(),t.setState({foodType:n},(function(){t.timeoutFoodMarker()}))}},t.timeoutFoodMarker=function(){var e=t.state,a=e.foodType,o=e.foodTimeout,n=e.spacialFoodTimeout,r=e.hideFoodTimer,s=0===a?t.randomInt(o[0],o[1]+1):t.randomInt(n[0],n[1]+1);r&&clearTimeout(r),r=setTimeout((function(){t.hideFood()}),1e3*s),t.setState({hideFoodTimer:r})},t.consumeFood=function(e){var a=t.state,o=a.foodCoords,n=a.foodType,r=a.totalScore,s=a.simpleFoodPoint,l=a.snakeCoordinates,i=a.simpleScore,m=a.spacialScore,d=a.tailHistory,u=a.snakeLength,f=a.spacialFoodPoint,p=a.maxScore,v=document.getElementById("".concat(o.x,"-").concat(o.y)).getBoundingClientRect(),b=document.getElementById("".concat(e.x,"-").concat(e.y)).getBoundingClientRect();if(!(v.right<b.left||v.left>b.right||v.bottom<b.top||v.top>b.bottom)){t.hideFood();var S=0;for(0===n?(r+=s,i++,S=1):(r+=f,m++,S=2),r>p&&(p=r);S--;){u++;var g=d.pop();g&&l.push(g)}t.setState({snakeIncreament:S,snakeLength:u,tailHistory:Object(c.a)(d),snakeCoordinates:Object(c.a)(l),maxScore:p,spacialScore:m,totalScore:r,simpleScore:i}),t.showScore(p,r,i,m)}},t.clearTimers=function(){var e=t.state,a=e.crawlerTimer,o=e.foodTimer;a&&clearInterval(a),o&&clearTimeout(o)},t.nextPosiblePoint=function(e){var a=t.state,o=a.cols,n=a.rows;switch(a.snakeDirection){case 0:return{x:e.x,y:e.y+1<=o.length-1?e.y+1:0};case 1:return{x:e.x,y:e.y-1>=0?e.y-1:o.length-1};case 2:var r=e.y;return{x:e.x-1>=0?e.x-1:n.length-1,y:r};case 3:var s=e.y;return{x:e.x+1<=n.length-1?e.x+1:0,y:s};case 4:default:return null}},t.randomInt=function(e,a){return e+Math.floor((a-e)*Math.random())},t.getSquareCountsinCol=function(e,a,t,o){return Math.floor(a/o)},t.getSquareCountsinRow=function(e,a,t,o){return Math.floor(e/t)},t.getSnakeStartPoint=function(){return t.randomInt(0,t.state.rows.length-1)},t.generateSnakeDefaultCoordinates=function(){var e=t.getSnakeStartPoint(),a=[].concat(Object(c.a)(t.state.snakeCoordinates),[{x:e,y:0}]);t.setState({snakeCoordinates:a},(function(){t.startCrawling()}))},t.resetSettings=function(){var e=t.getDefaults();t.setState((function(a,t){return Object(l.a)({},a,{},e,{removeFoodIcon:!0,removeSnakes:!0,startBtnDisable:!1,pauseBtnDisable:!0,cancelBtnDisable:!0})}),(function(e){var a=t.state,o=a.maxScore,n=a.totalScore,r=a.simpleScore,s=a.spacialScore;t.showScore(o,n,r,s)}))},t.showScore=function(e,a,o,n){t.setState({maxScore:e,totalScore:a,simpleScore:o,spacialScore:n})},t.hideFood=function(){t.setState((function(e,a){return{foodCoords:null}}),(function(){t.showFoods()}))},t.getFoodRandomCoords=function(){for(var e=t.state,a=e.snakeCoordinates,o=e.rows,n=e.cols,r=null,s=function(){var e=t.randomInt(0,o.length-1),s=t.randomInt(0,n.length-1);if(!!!a.find((function(a){return a.x===e&&a.y===s})))return r={x:e,y:s},"break"};;){if("break"===s())break}return r},t.addFood=function(){var e=t.getFoodRandomCoords();t.setState((function(a,t){return{foodCoords:e,spacialFood:!1}}),(function(){}))},t.addSpacialFood=function(){var e=t.getFoodRandomCoords();t.setState((function(a,t){return{foodCoords:e,spacialFood:!0}}),(function(){}))},t.getDefaults=function(){return{squareH:16,squareW:16,totalAreaH:800,totalAreaW:800,snakeLength:10,snakeDirection:0,snakeCoordinates:[],crawlSpeed:100,crawlerTimer:null,foodType:null,foodCoords:null,tailHistory:[],foodTimer:null,paused:!1,foodTimeout:[4,10],spacialFoodTimeout:[1,5],hideFoodTimer:null,startBtnDisable:!1,pauseBtnDisable:!1,cancelBtnDisable:!1,spacialFood:!1,removeSnakes:!1,removeFoodIcon:!1,rows:new Array(t.getSquareCountsinRow(800,800,16,16)).fill(""),cols:new Array(t.getSquareCountsinCol(800,800,16,16)).fill(""),totalScore:0,maxScore:0,simpleFoodPoint:1,spacialFoodPoint:9,simpleScore:0,spacialScore:0}},t.state=t.getDefaults(),t}return Object(f.a)(a,e),Object(m.a)(a,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onNavigationKey)}},{key:"render",value:function(){var e=this.state,a=e.totalScore,t=e.maxScore,o=e.simpleScore,r=e.spacialScore,s=e.rows,c=e.cols,l=e.startBtnDisable,i=e.pauseBtnDisable,m=e.cancelBtnDisable,d=e.paused,u=e.crawlerTimer,f=e.foodCoords,p=e.snakeDirection,b=e.snakeCoordinates,S=e.spacialFood,g="dir-";switch(p){case 0:g+="right";break;case 1:g+="left";break;case 2:g+="up";break;case 3:g+="down"}return n.a.createElement("div",{className:"container pt-3"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-3"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("header",{className:"App-header"},"Snake Game"),n.a.createElement("hr",null))),n.a.createElement("div",{className:"row mb-1"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("button",{className:"btn btn-block btn-primary mr-2",disabled:l,onClick:this.startGame},u?"Start Again":"Start")," ",n.a.createElement("br",null))),n.a.createElement("div",{className:"row mb-1"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("button",{className:"btn btn-block btn-secondary mr-2",disabled:i,onClick:this.pauseGame},d?"Resume":"Pause")," ",n.a.createElement("br",null))),n.a.createElement("div",{className:"row mb-1"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("button",{className:"btn btn-block btn-danger",disabled:m,onClick:this.cancelGame},"Cancel"))))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},"\xa0")),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-12"},n.a.createElement("div",{className:"row mb-2"},n.a.createElement("div",{className:"col-sm-12"},"Current Score # ",n.a.createElement("span",null,a))),n.a.createElement("div",{className:"row mb-2"},n.a.createElement("div",{className:"col-sm-12"},"Max Score # ",n.a.createElement("span",null,t))),n.a.createElement("div",{className:"row mb-2"},n.a.createElement("div",{className:"col-sm-12"},"Simple Food # ",n.a.createElement("span",null,o))),n.a.createElement("div",{className:"row mb-2"},n.a.createElement("div",{className:"col-sm-12"},"Spacial Food # ",n.a.createElement("span",null,r)))))),n.a.createElement("div",{className:"col-sm-9"},n.a.createElement("div",{className:"main-area",id:"main-area"},s.map((function(e,a){return c.map((function(e,t){var o=!(!b||!b.find((function(e){return e.x===a&&e.y===t}))),r=b&&b[0],s=r&&r.x===a&&r.y===t,c=!(!f||f.x!==a||f.y!==t);return n.a.createElement("div",{id:a+"-"+t,key:a+"-"+t,className:"square "+(o?" snake ":"")+(c?" food ":"")},s?n.a.createElement("img",{className:"snake-head "+g,src:v.a,alt:"head"}):null,c?n.a.createElement("i",{id:"food-icon",className:"fas "+(S?"fa-apple-alt fa-2x":"fa-cookie-bite")}):null)}))}))))))}}]),a}(n.a.Component);var S=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(17);s.a.render(n.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACX0lEQVRYR+2XTYtxYRjHr2MWpyZN2PEFWPAN+AI2spwyWVEikdeQTlNT3k4hLzU1NtjYzNj4AmPlU0ihRpKaTk3ierpP84jHoZshz2JOKcX1v37Xdf/P38HAlS/myv3hF+D/3cDDwwPW6/Uti+j1enC73eByuc4GviPkcrmwWq2C0+mE5+fnrc+bzSYWCgXo9XqgVCohFApBLBb7EcxWsVarxdlsBh8fH1SiZrMZO50OyGQyESadTlPVba51XeBwOPDt7Q0mk8nRIkTQaDRit9slb4+q3/wyHirO5/Po8/loxA/q/Js7oqDNZkOVSgXFYlGywXdzqunu7+9xuVxCq9WigV2v6yhqqfRMJpP48vICw+GQNKbW+0tJXXAougnE4+MjFQDHcchxHHNWgA24vQNls1kkdwzLsvD19XVRAMllaTQaGI1Gaz9dbAO1Wg1IpqxWKzEnFosF3N3dgdfrBeIVu90u9r4YAElTQRBEAIZh4ObmRnz5/X4gcBcH2GdWtVoN4/H48kewL9QymQyGw2GQy+Xw+fl5XhMGg0HM5XJUt2E8Hsenp6fzASQSCWw0GtDv95nb21sUBIE+CUkUKxQKKJVKkkU8z2MgEKCKYpZlked58Hg89ADfhjmYht8QB0UNBgPO53MYDAZUzbcmcrvd2Gq1Tvo5tlgs2G63wWq1wuvrK3XznZXqdDqcTqdUENFoFFOplLi8SCRy0sOI5JmSTZTLZXKGO56oVCoYj8fFhDObzdDpdI6aViob9goQYxJXb14mkwne399/3FTykexa/5DOOs0pQ/wCXH0DfwDJDPYhueetPAAAAABJRU5ErkJggg=="}},[[11,1,2]]]);
//# sourceMappingURL=main.26c68a56.chunk.js.map