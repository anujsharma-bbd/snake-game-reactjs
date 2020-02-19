import React from 'react';


class SnakeBoardComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = this.getDefaults();

   }
   componentDidMount() {
      document.addEventListener('keydown', this.onNavigationKey);
   }
   onNavigationKey = (e) => {
      let { snakeDirection } = this.state;
      switch (e.keyCode) {
         case 37: { // array left
            if (snakeDirection === 2 || snakeDirection === 3) {
               snakeDirection = 1;
            }
            break;
         }
         case 38: { // array up
            if (snakeDirection === 0 || snakeDirection === 1) {
               snakeDirection = 2;
            }
            break;
         }
         case 39: { // array right
            if (snakeDirection === 2 || snakeDirection === 3) {
               snakeDirection = 0;
            }
            break;
         }
         case 40: { // array down
            if (snakeDirection === 0 || snakeDirection === 1) {
               snakeDirection = 3;
            }
            break;
         }
         default: {
            break;
         }
      }
      this.setState({ snakeDirection: snakeDirection });
   }
   startGame = () => {
      this.generateSnakeDefaultCoordinates();
      this.setState({ startBtnDisable: true, pauseBtnDisable: false, cancelBtnDisable: false });
   }

   pauseGame = () => {
      let { paused, crawlerTimer, foodTimer } = this.state;
      paused = !paused;
      if (!paused) {
         this.resumeGame();
      } else {
         if (crawlerTimer) {
            clearInterval(crawlerTimer);
         }
         if (foodTimer) {
            clearTimeout(foodTimer);
         }
      }
      this.setState({ paused: paused, startBtnDisable: true, pauseBtnDisable: false, cancelBtnDisable: false });
   }
   resumeGame = () => {
      this.startCrawling();
   }
   startCrawling = () => {
      let { snakeLength, crawlSpeed, foodTimer } = this.state;
      if (foodTimer) {
         clearTimeout(foodTimer);
      }
      let foodTimerNew = setTimeout(() => {
         this.showFoods();
      }, 1000 * snakeLength);

      let crawlerTimerNew = setInterval(() => {
         let { snakeCoordinates, tailHistory, foodCoords } = this.state;
         let head = snakeCoordinates[0], tail = null; // last item removed and will be added to top head
         let nextCoords = this.nextPosiblePoint(head);
         if (nextCoords) {
            let insideSnake = !!snakeCoordinates.find((m) => m.x === nextCoords.x && m.y === nextCoords.y);
            if (insideSnake) {
               this.clearTimers();
               alert('GAME OVER!!!');
               this.resetSettings();
               return;
            }
            tail = snakeCoordinates.pop();
            if (foodCoords) {
               this.consumeFood({ ...nextCoords });
            }
            snakeCoordinates.splice(0, 0, nextCoords); // added tail to head
            tailHistory.push(tail);

            if (snakeCoordinates.length < snakeLength) { // if snake is not fully rendered it will add up remaining tails
               snakeCoordinates.push(tail);
            }
            this.setState({ snakeCoordinates: [...snakeCoordinates], tailHistory: [...tailHistory] });
         } else {
            this.cancelGame();
         }
      }, crawlSpeed);
      this.setState({ crawlerTimer: crawlerTimerNew, foodTimer: foodTimerNew });
   }
   cancelGame = () => {
      this.clearTimers();
      this.resetSettings();
   }
   showFoods = () => {
      let { snakeDirection, foodTimer, foodType } = this.state;
      if (snakeDirection !== 4 && foodTimer) {
         let type = this.randomInt(0, 2);
         if (type === 2) {
            type = 1;
         }
         foodType = type;
         if (type === 0) {
            this.addFood();
         } else {
            this.addSpacialFood();
         }
         this.setState({ foodType }, () => {
            this.timeoutFoodMarker();
         });
      }
   }
   timeoutFoodMarker = () => {
      let { foodType, foodTimeout, spacialFoodTimeout, hideFoodTimer } = this.state;

      let _timer = foodType === 0 ? this.randomInt(foodTimeout[0], foodTimeout[1] + 1)
         : this.randomInt(spacialFoodTimeout[0], spacialFoodTimeout[1] + 1);
      if (hideFoodTimer) {
         clearTimeout(hideFoodTimer);
      }
      hideFoodTimer = setTimeout(() => {
         this.hideFood();
      }, _timer * 1000);
      this.setState({ hideFoodTimer });
   }
   consumeFood = (head) => {
      let { foodCoords, foodType, totalScore, simpleFoodPoint, snakeCoordinates, simpleScore, spacialScore, tailHistory, snakeLength, spacialFoodPoint, maxScore } = this.state;
      let foodRect = document.getElementById(`${foodCoords.x}-${foodCoords.y}`).getBoundingClientRect();
      let headRect = document.getElementById(`${head.x}-${head.y}`).getBoundingClientRect();
      var overlap = !(foodRect.right < headRect.left || foodRect.left > headRect.right || foodRect.bottom < headRect.top || foodRect.top > headRect.bottom);
      if (overlap) {
         this.hideFood();
         let snakeIncreament = 0;
         if (foodType === 0) {
            totalScore += simpleFoodPoint;
            simpleScore++;
            snakeIncreament = 1;
         } else {
            totalScore += spacialFoodPoint;
            spacialScore++;
            snakeIncreament = 2;
         }
         if (totalScore > maxScore) {
            maxScore = totalScore;
         }
         while (snakeIncreament--) {
            snakeLength++;
            let lastInHistory = tailHistory.pop();
            if (lastInHistory) {
               snakeCoordinates.push(lastInHistory);
            }
         }
         this.setState({ snakeIncreament, snakeLength, tailHistory: [...tailHistory], snakeCoordinates: [...snakeCoordinates], maxScore, spacialScore, totalScore, simpleScore });
         this.showScore(maxScore, totalScore, simpleScore, spacialScore);
      }
   }
   clearTimers = () => {
      let { crawlerTimer, foodTimer } = this.state;
      if (crawlerTimer) {
         clearInterval(crawlerTimer);
      }
      if (foodTimer) {
         clearTimeout(foodTimer);
      }
   }
   nextPosiblePoint = (head) => {
      let { cols, rows, snakeDirection } = this.state;
      switch (snakeDirection) {
         case 0: { // right side
            let x = head.x, y = -1;
            if ((head.y + 1) <= (cols.length - 1)) {
               y = head.y + 1;
            }
            else {
               y = 0
            }
            return { x, y };
         }
         case 1: { // left side
            let x = head.x, y;
            if ((head.y - 1) >= 0) {
               y = head.y - 1;
            }
            else {
               y = (cols.length - 1);
            }
            return { x, y };
         }
         case 2: { // up side
            let x, y = head.y;
            if ((head.x - 1) >= 0) {
               x = head.x - 1;
            }
            else {
               x = (rows.length - 1);
            }
            return { x, y };
         }
         case 3: { // down side
            let x, y = head.y;
            if ((head.x + 1) <= (rows.length - 1)) {
               x = head.x + 1;
            } else {
               x = 0;
            }
            return { x, y };
         }
         case 4: {
            return null;
         }
         default: {
            return null;
         }
      }
   }
   randomInt = (min, max) => {
      return min + Math.floor((max - min) * Math.random());
   }
   getSquareCountsinCol = (h, w, sh, sw) => {
      return Math.floor(w / sw);
   }
   getSquareCountsinRow = (h, w, sh, sw) => {
      return Math.floor(h / sh);
   }
   getSnakeStartPoint = () => {
      return this.randomInt(0, this.state.rows.length - 1);
   }
   generateSnakeDefaultCoordinates = () => {
      let y = 0, x = this.getSnakeStartPoint();
      let arr = [...this.state.snakeCoordinates, { x, y }];
      this.setState({ snakeCoordinates: arr }, () => {
         this.startCrawling();
      });
   }
   resetSettings = () => {
      let _defaults = this.getDefaults();
      this.setState((state, prop) => {
         return {
            ...state, ..._defaults, removeFoodIcon: true, removeSnakes: true,
            startBtnDisable: false, pauseBtnDisable: true, cancelBtnDisable: true
         };
      }, (state) => {
         const { maxScore, totalScore, simpleScore, spacialScore } = this.state;
         this.showScore(maxScore, totalScore, simpleScore, spacialScore);
      });
   }
   showScore = (maxScore, totalScore, simpleScore, spacialScore) => {
      this.setState({ maxScore, totalScore, simpleScore, spacialScore });
   }
   hideFood = () => {
      this.setState((prevState, props) => ({ foodCoords: null }), () => {
         this.showFoods();
      });
   }
   getFoodRandomCoords = () => {
      let { snakeCoordinates, rows, cols } = this.state, point = null;
      while (true) {
         let pointX = this.randomInt(0, rows.length - 1);
         let pointY = this.randomInt(0, cols.length - 1);
         let insideSnake = !!snakeCoordinates.find((m) => m.x === pointX && m.y === pointY);
         if (!insideSnake) {
            point = { x: pointX, y: pointY };
            break;
         }
      }
      return point;
   }
   addFood = () => {
      let point = this.getFoodRandomCoords();
      this.setState((prevState, props) => ({ foodCoords: point, spacialFood: false }), () => {
      });
   }
   addSpacialFood = () => {
      let point = this.getFoodRandomCoords();
      this.setState((prevState, props) => ({ foodCoords: point, spacialFood: true }), () => {
      });
   }
   getDefaults = () => {
      const h = 800, w = 800, sh = 16, sw = 16;
      return {
         squareH: sh, squareW: sw, totalAreaH: h, totalAreaW: w, snakeLength: 10, snakeDirection: 0, //0=right,1=left,2=top,3=bottom,4=blocked
         snakeCoordinates: [], // object of {x:int,y:int}
         crawlSpeed: 100, crawlerTimer: null, foodType: null, // 0= simple food, 1=spacial food
         foodCoords: null, tailHistory: [], foodTimer: null, paused: false,
         foodTimeout: [4, 10], spacialFoodTimeout: [1, 5], hideFoodTimer: null,
         startBtnDisable: false, pauseBtnDisable: false, cancelBtnDisable: false, spacialFood: false,
         removeSnakes: false, removeFoodIcon: false, rows: new Array(this.getSquareCountsinRow(h, w, sh, sw)).fill(''), cols: new Array(this.getSquareCountsinCol(h, w, sh, sw)).fill(''),
         totalScore: 0, maxScore: 0, simpleFoodPoint: 1, spacialFoodPoint: 9, simpleScore: 0, spacialScore: 0// of type {x,y}
      };
   }
   render() {
      const { totalScore, maxScore, simpleScore, spacialScore, rows, cols,
         startBtnDisable, pauseBtnDisable, cancelBtnDisable, paused, crawlerTimer, foodCoords, snakeCoordinates, spacialFood } = this.state;

      return (
         <div className="container pt-3">
            <div className='row'>
               <div className='col-sm-3'>
                  <div className="row">
                     <div className="col-sm-12">
                        <div className="row">
                           <div className="col-sm-12">
                              <header className="App-header">
                                 Snake Game
                                        </header>
                              <hr />
                           </div>
                        </div>
                        <div className="row mb-1">
                           <div className="col-sm-12">
                              <button className='btn btn-block btn-primary mr-2' disabled={startBtnDisable} onClick={this.startGame}>{crawlerTimer ? 'Start Again' : 'Start'}</button> <br />
                           </div>
                        </div>
                        <div className="row mb-1">
                           <div className="col-sm-12">
                              <button className='btn btn-block btn-secondary mr-2' disabled={pauseBtnDisable} onClick={this.pauseGame}>{paused ? 'Resume' : 'Pause'}</button> <br />
                           </div>
                        </div>
                        <div className="row mb-1">
                           <div className="col-sm-12">
                              <button className='btn btn-block btn-danger' disabled={cancelBtnDisable} onClick={this.cancelGame}>Cancel</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row"><div className="col-sm-12">&nbsp;</div></div>
                  <div className='row'>
                     <div className="col-sm-12">
                        <div className="row mb-2">
                           <div className='col-sm-12'>
                              Current Score # <span >{totalScore}</span>
                           </div>
                        </div>
                        <div className="row mb-2">
                           <div className='col-sm-12'>
                              Max Score # <span >{maxScore}</span>
                           </div>
                        </div>
                        <div className="row mb-2">
                           <div className='col-sm-12'>
                              Simple Food # <span >{simpleScore}</span>
                           </div>
                        </div>
                        <div className="row mb-2">
                           <div className='col-sm-12'>
                              Spacial Food # <span >{spacialScore}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-sm-9">
                  <div className='main-area' id='main-area'>
                     {
                        rows.map((r, i) => cols.map((c, j) => {
                           const matchedSnake = !!(snakeCoordinates && snakeCoordinates.find(m => m.x === i && m.y === j));
                           const matchedfood = !!(foodCoords && foodCoords.x === i && foodCoords.y === j);
                           return (<div id={i + "-" + j} key={i + "-" + j} className={'square ' + (matchedSnake ? ' snake ' : '') + (matchedfood ? ' food ' : '')}>
                              {
                                 matchedfood ?
                                    <i id="food-icon" className={"fas " + (spacialFood ? "fa-apple-alt fa-2x" : "fa-cookie-bite")}></i>
                                    : null
                              }
                           </div>)
                        }))
                     }
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default SnakeBoardComponent;