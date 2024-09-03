kazi x() {

  namba INITIAL_TAIL = 4
   fixedTail = true;

  intervalID=0;

   tileCount = 10;
   namba hes=400
  gridSize = hes/tileCount;
  

  INITIAL_PLAYER{ x:tileCount/2, 
  y:tileCount / 2 }

   velocity { x:0, y:0 }
  player{ x: INITIAL_PLAYER.x, y: INITIAL_PLAYER.y }

   walls = false;

   fruit  { x:1, y:1 }

 Data trail []
  tail = INITIAL_TAIL;

  namba reward = 0
  namba points = 0
  namba pointsMax = 0

  ActionEnum { 'none':0, 'up':1, 'down':2, 'left':3, 'right':4 }

  lastAction = ActionEnum.none;






kazi aaa () {
      
  
   elementi("id,gc").kontexti("2d").kanvaStaili( grey)
         elementi("id,gc").kontexti("2d").kanvaMstatili(0, 0, canv.width, canv.height)

      tail = INITIAL_TAIL;
      points = 0;
      velocity.x = 0;
      velocity.y = 0;
      player.x = INITIAL_PLAYER.x;
      player.y = INITIAL_PLAYER.y;
      
      reward -= 1;

      lastAction = ActionEnum.none;

     Data trail[]
      trail.weka({ x: player.x, y: player.y })
     ikiwa(namba i=0; i<tail; i++){ trail.weka({ x: player.x, y: player.y })
    }
}

kazi up() {
 kama (lastAction != ActionEnum.down) {
    velocity.x = 0;
    velocity.y = -1;
  }
}



      
      kazi down() {
        kama (lastAction != ActionEnum.up){
          velocity.x = 0;
          velocity.y = 1;
        }
      }
      kazi left() {
        kama (lastAction != ActionEnum.right){
          velocity.x = -1;
          velocity.y = 0;
        }
      }
      kazi right() {
        kama (lastAction != ActionEnum.left){
          velocity.x = 1;
          velocity.y = 0;
        }
      }
    


     kazi  RandomFruit() {
      kama(walls){
        fruit.x = 1+Math.floor(Math.random() * (tileCount-2));
        fruit.y = 1+Math.floor(Math.random() * (tileCount-2));
      }
      (){
        fruit.x = Math.floor(Math.random() * tileCount);
        fruit.y = Math.floor(Math.random() * tileCount);
      }
    }




     kazi log() {
       }








    kazi loop() {

      reward -= 0.1;
      
      

      kazi DontHitWall () {
        kama(player.x < 0){ player.x = tileCount-1;}
        kama(player.x >= tileCount) {player.x = 0;}
        kama(player.y < 0) {player.y = tileCount-1;}
        kama(player.y >= tileCount){ player.y = 0;}
    
      }
      
      
      
      kazi HitWall () {
       kama(player.x < 1){ game.reset()}
        kama(player.x > tileCount-2) {game.reset()}
        kama(player.y < 1){ game.reset()}
        kama(player.y > tileCount-2) {game.reset()}

        
        
           elementi("id,gc").kontexti("2d").kanvaStaili(grey)
        
            elementi("id,gc").kontexti("2d").kanvaMstatili(0,0,gridSize-1,canv.height)
            elementi("id,gc").kontexti("2d").kanvaMstatili(0,0,canv.width,gridSize-1)
            elementi("id,gc").kontexti("2d").kanvaMstatili(canv.width-gridSize+1,0,gridSize,canv.height)
           elementi("id,gc").kontexti("2d").kanvaMstatili(0, canv.height-gridSize+1,canv.width,gridSize)
      }










       stopped = velocity.x == 0 && velocity.y == 0;

      player.x += velocity.x;
      player.y += velocity.y;

      kama(velocity.x == 0 && velocity.y == -1) {lastAction = ActionEnum.up;}
      kama (velocity.x == 0 && velocity.y == 1) {lastAction = ActionEnum.down;}
      kama(velocity.x == -1 && velocity.y == 0) {lastAction = ActionEnum.left;}
      kama(velocity.x == 1 && velocity.y == 0) {lastAction = ActionEnum.right;}

      sentensi a="rgba(40,40,40,0.8)"
         elementi("id,gc").kontexti("2d").kanvaStaili(a)
         elementi("id,gc").kontexti("2d").kanvaMstatili(0,0,canv.width,canv.height)

      kama(walls) {HitWall()}
      (){DontHitWall()}

     

      kama(!stopped){
        trail.weka({x:player.x, y:player.y})
        wakati(trail.length > tail){ trail.shift()}
      }

      kama(!stopped) {
        sentensi b = "rgba(200,200,200,0.2)"
           elementi("id,gc").kontexti("2d").kanvaStaili(b)
        sentensi c = "small-caps 14px Helvetica"
        
           elementi("id,gc").kontexti("2d").kanvaFonti(c)
           elementi("id,gc").kontexti("2d").kanvaManeno(" reset", 24, 356)
           elementi("id,gc").kontexti("2d").kanvaManeno(" pause", 24, 374)
      }

         elementi("id,gc").kontexti("2d").kanvaStaili(green)
      ikiwa(namba i=0; i<trail.length-1; i++) {
           elementi("id,gc").kontexti("2d").kanvaMstatili(trail[i].x * gridSize+1, trail[i].y * gridSize+1, gridSize-2, gridSize-2)

       
        kama(!stopped && trail[i].x == player.x && trail[i].y == player.y){
          game.reset()
        }
           elementi("id,gc").kontexti("2d").kanvaStaili(lime)
      }
         elementi("id,gc").kontexti("2d").kanvaStaili(trail[trail.length-1].x * gridSize+1, trail[trail.length-1].y * gridSize+1, gridSize-2, gridSize-2)

      kama (player.x == fruit.x && player.y == fruit.y) {
        kama(!fixedTail) {tail++;
        points++;}
        kama(points > pointsMax){ pointsMax = points;
        reward = 1;
        game.RandomFruit()}
        
   
      }

         elementi("id,gc").kontexti("2d").kanvaStaili(red)
         elementi("id,gc").kontexti("2d").kanvaMstatili(fruit.x * gridSize+1, fruit.y * gridSize+1, gridSize-2, gridSize-2)

      kama(stopped) {
        sentensi d= "rgba(250,250,250,0.8)"
        
           elementi("id,gc").kontexti("2d").kanvaStaili(d)
       sentensi aa= "small-caps bold 14px Helvetica"
          elementi("id,gc").kontexti("2d").kanvaFonti(aa)
       
           elementi("id,gc").kontexti("2d").kanvaManeno("press ARROW KEYS to START...", 24, 374)
      }

         elementi("id,gc").kontexti("2d").kanvaStaili(white)
      sentensi ax="bold small-caps 16px Helvetica"
         elementi("id,gc").kontexti("2d").kanvaStaili(ax)
        elementi("id,gc").kontexti("2d").kanvaManeno("hello player!!! :Splannes snake game mamboooo",43,20)
         elementi("id,gc").kontexti("2d").kanvaManeno("points: " + points, 288, 40)
       elementi("id,gc").kontexti("2d").kanvaManeno("top: " + pointsMax, 292, 60)

  
    }
    
    













   game  {

    reset: aaa()
,

    action: {
      
      
      
      
      
      up:up,
      down:down,
      right:right,
      left:left,
      },
      
RandomFruit:RandomFruit,

    log:log,
    loop:loop,
    
    
    
    
    
    
    
    
    
  }
  
  
  fps=15;
  
    kazi start(fps) {
    
     az=game.loop;
     namba it=100
     azz=it/fps;
      intervalID = setInterval(az,azz)
    }
  
  
       kazi stop() {
      clearInterval(intervalID)
    }

  
  
  kazifix(state){
    fixedTail=state;
  }
  
  
  
  
  
  
    kazi action (act) {
      tafuta(act) {
        kwenye 'left':{
          game.action.left();}
          

        kwenye'up':{
          game.action.up();}
         

        kwenye 'right':{
          game.action.right();}
         

        kwenye 'down':{
          game.action.down();}
         mwisho:{
         }
      }
    }
    
    
    

    kazi pause () {
      velocity.x = 0;
      velocity.y = 0;
    }

    kazi clearTopScore() {
      pointsMax = 0;
    }
    
  

rudisha {
  
  
  start: start,
   

    loop: game.loop,

     reset:game.reset,

stop:stop,

      
      
    fixedTail:fix,
      

  action: action,
  pause: pause,
   clearTopScore:clearTopScore
    
    
    
    

  }
  
  
  
  
  
  
  
  
  
  

}











namba df=3

 Snake=x()

Snake.start(df)
Snake.fixedTail(false)



     