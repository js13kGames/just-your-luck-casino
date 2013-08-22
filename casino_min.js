function Game(){this.stoppedRunning=false;this.mX=0;this.mY=0;this.cursorMode="move";this.movingObject=0;this.pause=false;this.selectedGame=0;this.bgC=document.getElementById("bgC");this.bgCxt=this.bgC.getContext("2d");this.mgC=document.getElementById("mgC");this.mgCxt=this.mgC.getContext("2d");this.fgC=document.getElementById("fgC");this.fgCxt=this.fgC.getContext("2d");this.personInfo=document.getElementById("personInfo");this.casinoGameInfo=document.getElementById("gameInfo");this.casinoInfo=document.getElementById("casinoInfo");var e=new Array;e["slots"]=100;e["blackjack"]=250;e["craps"]=500;e["roulette"]=150;SLOTSCOST=100;var t=0;this.attendance=0;this.amountOfDoodads=0;this.ppl=new Array(MaxAttendance);this.cash=1e3;this.popularity=50;this.cG=new Array(100);this.dds=new Array(500);this.init=function(){for(var e=0;e<MaxAttendance;e++){if(this.attendance<StartingAttendance){this.ppl[e]=new Person;this.ppl[e].init(doorX,doorY,this.fgC,this.fgCxt);this.attendance++}else{this.ppl[e]=0}}for(var e=0;e<MaxGames;e++){this.cG[e]=0}for(var e=0;e<500;e++){this.dds[e]=0}};this.update=function(){t++;if(this.popularity>100){this.popularity=100}else if(this.popularity<0){this.popularity=0}if(this.pause==false){for(var e=0;e<MaxAttendance;e++){if(this.ppl[e]!=0){this.ppl[e].update()}if(this.ppl[e].gone==true){delete this.ppl[e];this.ppl[e]=0;this.attendance--}}for(var e=0;e<MaxGames;e++){if(this.cG[e]!=0){this.cG[e].update()}}if(t%180==0){var n=Math.random()*100;if(this.popularity>n){for(var e=0;e<MaxAttendance;e++){if(this.ppl[e]==0){this.ppl[e]=new Person;this.ppl[e].init(doorX,doorY,this.fgC,this.fgCxt);this.attendance++;break}}}}if(Math.random()<1e-4){var r=Math.ceil(Math.random()*200);if(Math.random()>.5){alert(goodEvents[Math.floor(Math.random()*2)]);this.cash+=r;alert("You gained $"+r+"!")}else{alert(badEvents[Math.floor(Math.random()*3)]);this.cash-=r;alert("You lost $"+r+"!")}}}document.getElementById("casinoCash").innerHTML="$"+this.cash;document.getElementById("casinoAttendance").innerHTML=this.attendance;document.getElementById("casinoPopularity").innerHTML=this.popularity+"%"};this.draw=function(){this.fgCxt.clearRect(0,0,640,480);for(var e=0;e<MaxAttendance;e++){if(this.ppl[e]!=0){this.ppl[e].draw()}}this.fgCxt.drawImage(doorImage,doorX,doorY);if(this.cursorMode=="move"){this.fgCxt.drawImage(crossImage,this.mX-16,this.mY-16)}else if(this.cursorMode=="select"){this.fgCxt.drawImage(magnifyingImage,this.mX-16,this.mY-16)}else{}if(this.cursorMode=="move"||this.cursorMode=="sell"){this.mgCxt.clearRect(0,0,640,480)}for(var e=0;e<MaxGames;e++){if(this.cG[e]!=0){this.cG[e].draw()}}this.bgCxt.fillRect(0,0,640,480);this.bgCxt.fillStyle=floorPattern;for(var e=0;e<500;e++){if(this.dds[e]!=0){this.dds[e].draw()}}if(this.cash<=0){this.fgCxt.font="30px Arial";this.fgCxt.fillStyle="#0026FF";this.fgCxt.fillText("You have gone bankrupt!  Refresh to play again!",0,240);this.pause=true}};this.run=function(){this.update();this.draw()};this.mouseClicked=function(t){if(this.cursorMode=="select"){var n=true;for(var r=0;r<MaxGames;r++){if(this.cG[r]!=0){if(this.mouseWithinBounds(this.cG[r].x,this.cG[r].y,this.cG[r].width,this.cG[r].height)){this.selectedGame=this.cG[r];this.cG[r].selected=true;n=false;document.getElementById("gameWinRate").value=this.cG[r].winRate;document.getElementById("gameCashOut").value=this.cG[r].cashOut;document.getElementById("gameCostToPlay").value=this.cG[r].costToPlay;document.getElementById("gameUpKeep").innerHTML="$"+this.cG[r].upKeep;document.getElementById("gameMaxPlayers").innerHTML=this.cG[r].maxPlayers;this.casinoInfo.style.display="none";this.casinoGameInfo.style.display="block";this.personInfo.style.display="none"}else{this.mgCxt.clearRect(0,0,640,480);this.cG[r].selected=false}}}if(n==true){for(var r=0;r<MaxAttendance;r++){if(this.ppl[r]!=0){if(this.mouseWithinBounds(this.ppl[r].x,this.ppl[r].y,16,16)){this.ppl[r].selected=true;n=false;document.getElementById("personMood").innerHTML=this.ppl[r].mood+"%";document.getElementById("personCash").innerHTML="$"+this.ppl[r].cash;document.getElementById("personThought").innerHTML=this.ppl[r].thought;document.getElementById("personTemp").innerHTML=this.ppl[r].temperament;this.casinoInfo.style.display="none";this.casinoGameInfo.style.display="none";this.personInfo.style.display="block"}else{this.ppl[r].selected=false}}}}if(n==true){this.casinoInfo.style.display="block";this.personInfo.style.display="none";this.casinoGameInfo.style.display="none"}}else if(this.cursorMode=="move"){if(this.movingObject==0){for(var r=0;r<500;r++){if(this.dds[r]!=0){if(this.mouseWithinBounds(this.dds[r].x,this.dds[r].y,16,16)){this.dds[r].selected=true;this.movingObject=this.dds[r]}else{this.dds[r].selected=false}}}for(var r=0;r<MaxGames;r++){if(this.cG[r]!=0){if(this.mouseWithinBounds(this.cG[r].x,this.cG[r].y,this.cG[r].width,this.cG[r].height)){if(this.movingObject!=0){this.movingObject.selected=false}this.cG[r].selected=true;this.movingObject=this.cG[r];break}else{this.cG[r].selected=false}}}}else{this.movingObject.selected=false;this.movingObject=0}}else if(this.cursorMode=="sell"){for(var r=0;r<500;r++){if(this.dds[r]!=0){if(this.mouseWithinBounds(this.dds[r].x,this.dds[r].y,16,16)){if(confirm("Do you want to sell this decoration?")){this.cash+=5;delete this.dds[r];this.dds[r]=0;break}}}}for(var r=0;r<MaxGames;r++){if(this.cG[r]!=0){if(this.mouseWithinBounds(this.cG[r].x,this.cG[r].y,this.cG[r].width,this.cG[r].height)){if(confirm("Do you want to sell this game?")){this.cash+=e[this.cG[r].type];this.cG[r].sold=true;delete this.cG[r];this.cG[r]=0;break}}}}}};this.mouseMoved=function(e){this.mX=e.pageX-this.fgC.offsetLeft;this.mY=e.pageY-this.fgC.offsetTop;if(this.cursorMode=="move"){if(this.movingObject!=0){this.movingObject.x=Math.round(this.mX/16)*16;this.movingObject.y=Math.round(this.mY/16)*16}}};this.mouseWithinBounds=function(e,t,n,r){return e<this.mX&&e+n>this.mX&&t<this.mY&&t+r>this.mY};this.pauseGame=function(){if(this.pause==true){this.pause=false}else{this.pause=true}};this.saveCasinoGame=function(){this.selectedGame.winRate=parseFloat(document.getElementById("gameWinRate").value);this.selectedGame.cashOut=parseFloat(document.getElementById("gameCashOut").value);this.selectedGame.costToPlay=parseFloat(document.getElementById("gameCostToPlay").value)};this.addGame=function(t){if(game.cash>e[t]){var n=true;for(var r=0;r<MaxGames;r++){if(this.cG[r]==0){this.cG[r]=new CasinoGame;this.cG[r].setType(t);this.changeCursorMode("move");this.movingObject=this.cG[r];this.cG[r].init(0,0,this.mgC,this.mgCxt);game.cash-=e[t];n=false;break}}if(n==true){alert("You have maxed out the number of games you can own.")}}else{alert("If you buy anymore games you will go bankrupt.")}};this.addDoodad=function(e){if(game.cash>10){var t=true;for(var n=0;n<500;n++){if(this.dds[n]==0){this.dds[n]=new Doodad;this.dds[n].frame=e;this.cursorMode="move";this.movingObject=this.dds[n];this.dds[n].init(0,0,this.mgC,this.mgCxt);game.cash-=10;t=false;this.amountOfDoodads++;this.popularity+=.5;break}}if(t==true){alert("You have maxed out the number of decorations you can own.")}}else{alert("If you buy anymore decorations you will go bankrupt.")}};this.changeCursorMode=function(e){this.cursorMode=e;this.movingObject.x=0;this.movingObject.y=0;this.movingObject=0;if(this.cursorMode=="move"){document.getElementById("move").className="buttonSelected";document.getElementById("select").className="button";document.getElementById("sell").className="button"}else if(this.cursorMode=="select"){document.getElementById("select").className="buttonSelected";document.getElementById("move").className="button";document.getElementById("sell").className="button"}else{document.getElementById("sell").className="buttonSelected";document.getElementById("move").className="button";document.getElementById("select").className="button"}};fgC.addEventListener("mousedown",function(e){game.mouseClicked(e)},false);fgC.addEventListener("mousemove",function(e){game.mouseMoved(e)},false)}function Entity(){this.x=0;this.y=0;this.canvas=0;this.context=0;this.init=function(e,t,n,r){this.x=e;this.y=t;this.canvas=n;this.context=r};this.update=function(){};this.draw=function(){}}function Person(){this.goalX=Math.floor(Math.random()*640);this.goalY=Math.floor(Math.random()*480);this.thought="wandering";this.cash=Math.ceil(Math.random()*500);if(Math.random()<game.popularity/100){this.cash+=2e3}this.mood=100;this.gIP=0;this.imPlayerNumber=0;this.selected=false;this.gone=false;this.temperament=Math.ceil(Math.random()*3);this.frame=0;this.ticks=Math.floor(Math.random()*1e3);this.image=0;if(this.cash>500){this.image=personHighRollerImage;this.temperament=5}else{this.image=personImage}this.update=function(){this.ticks++;if(this.mood>100){this.mood=100}switch(this.thought){case"wandering":if(this.closeToGoal()){this.goalX=Math.floor(Math.random()*640);this.goalY=Math.floor(Math.random()*480)}if(this.cash<=0||this.mood<=0){this.thought="leave"}if(this.ticks%30==0){this.mood-=Math.ceil(this.temperament/2)}if(this.ticks%120==0){this.thought="findGameToPlay"}this.move();break;case"findGameToPlay":for(var e=0;e<MaxGames;e++){if(game.cG[e]!=0){if(game.cG[e].currentPlayers<game.cG[e].maxPlayers&&game.cG[e].costToPlay<this.cash&&game.cG[e]!=game.movingObject){this.gIP=game.cG[e];this.thought="moveToGame";break}}}if(this.gIP==0){this.thought="wandering";this.mood-=this.temperament;game.popularity--}break;case"moveToGame":this.goalX=this.gIP.x;this.goalY=this.gIP.y;this.move();if(this.closeToGoal()){if(this.gIP.currentPlayers>=this.gIP.maxPlayers){this.gIP=0;this.thought="findGameToPlay";this.mood-=Math.ceil(this.temperament/2)}else{this.thought="playGame";this.imPlayerNumber=this.gIP.currentPlayers;this.gIP.currentPlayers++}}break;case"playGame":this.frame=1;if(this.gIP.sold==true){delete this.gIP;this.gIP=0;this.thought="wandering"}if(this.goalX!=this.gIP.x||this.goalY!=this.gIP.y){this.gIP.currentPlayers--;this.gIP=0;this.thought="findGameToPlay";break}if(this.gIP.height>16){this.y=this.gIP.y+16;this.x=this.gIP.x+16*this.imPlayerNumber}if(this.cash<this.gIP.costToPlay){this.thought="wandering";this.gIP.currentPlayers-=1;this.gIP=0}if(this.ticks%60==0){this.cash-=this.gIP.costToPlay;game.cash+=this.gIP.costToPlay;if(this.gIP.didIWin()==true){this.cash+=this.gIP.cashOut;this.mood+=10;game.popularity++}else{this.mood-=Math.ceil(this.temperament/2)}}if(this.mood<=0){this.thought="leave";this.gIP.currentPlayers-=1;this.gIP=0}break;case"leave":this.goalX=doorX+16;this.goalY=doorY+16;if(this.closeToGoal()){if(this.mood<=30){game.popularity-=5;if(this.temperament>4){game.popularity-=5}}this.gone=true}this.move();break}};this.draw=function(){if(this.selected==true){this.context.fillStyle="#54FF29";this.context.fillRect(this.x-1,this.y-1,18,18)}this.context.drawImage(this.image,16*this.frame,0,16,16,this.x,this.y,16,16)};this.move=function(){if(this.x>this.goalX){this.x-=1;this.frame=2}else if(this.x<this.goalX){this.x+=1;this.frame=3}if(this.y>this.goalY){this.y-=1;this.frame=1}else if(this.y<this.goalY){this.y+=1;this.frame=0}};this.closeToGoal=function(){return Math.abs(this.x-this.goalX)<1&&Math.abs(this.y-this.goalY)<1}}function CasinoGame(){this.winRate=.5;this.cashOut=100;this.costToPlay=0;this.upKeep=0;this.maxPlayers=0;this.type="";this.sold=false;this.width=16;this.height=16;this.frame=0;this.ticks=0;this.frameCount=0;this.selected=false;this.currentPlayers=0;this.currentLoses=0;this.currentWins=0;this.setType=function(e){this.type=e;switch(e){case"slots":this.frameCount=1;this.maxPlayers=1;this.upKeep=1;this.costToPlay=1;this.cashOut=10;this.winRate=.1;break;case"roulette":this.frameCount=2;this.maxPlayers=5;this.width=32;this.height=32;this.upKeep=4.5;this.costToPlay=15;this.cashOut=20;this.winRate=.3;break;case"blackjack":this.frameCount=2;this.maxPlayers=3;this.width=32;this.height=32;this.upKeep=2;this.costToPlay=15;this.cashOut=20;this.winRate=.3;break;case"craps":this.frameCount=2;this.maxPlayers=6;this.width=32;this.height=32;this.upKeep=3;this.costToPlay=15;this.cashOut=20;this.winRate=.3;break}};this.update=function(){this.ticks++;if(this.ticks>60){if(this.currentPlayers>0){this.frame++}else{this.frame=0}game.cash+=this.currentLoses*this.costToPlay-this.currentWins*this.cashOut-this.upKeep;this.currentLoses=0;this.currentWins=0;this.ticks=0}if(this.frame>=this.frameCount){this.frame=0}};this.draw=function(){if(this.selected==true){this.context.fillStyle="#54FF29";this.context.fillRect(this.x-1,this.y-1,this.width+2,this.height+2)}var e=0;switch(this.type){case"slots":e=slotsImage;break;case"roulette":e=rouletteImage;break;case"blackjack":e=blackjackImage;break;case"craps":e=crapsImage;break}this.context.drawImage(e,this.width*this.frame,0,this.width,this.height,this.x,this.y,this.width,this.height)};this.didIWin=function(){var e=Math.random();if(this.winRate<e){this.currentLoses++;return false}else{this.currentWins++;return true}}}function Doodad(){this.frame=0;this.selected=false;this.draw=function(){if(this.selected==true){this.context.fillStyle="#54FF29";this.context.fillRect(this.x-1,this.y-1,18,18)}this.context.drawImage(doodadImage,16*this.frame,0,16,16,this.x,this.y,16,16)}}function StartGame(){game.init();run()}function run(){thisFrame=Date.now();elapsed=thisFrame-lastFrame;lastFrame=thisFrame;var e=document.getElementById("fps-text").innerHTML=a;game.run();if(game.stoppedRunning==false){requestAnimFrame(run)}frameCount++;elapsedCounter+=elapsed;if(elapsedCounter>1e3){elapsedCounter-=1e3;a=frameCount;frameCount=0}}var a=0;var frameCount=0;var elapsedCounter=0;var lastFrame=Date.now();var thisFrame;var elapsed;var personImage=new Image;personImage.src="Person.png";var personHighRollerImage=new Image;personHighRollerImage.src="PersonHighRoller.png";var crossImage=new Image;crossImage.src="cross.png";var magnifyingImage=new Image;magnifyingImage.src="magnifyingglass.png";var doorImage=new Image;doorImage.src="door.png";var floorImage=new Image;floorImage.src="floor.png";var floorPattern=0;floorImage.onload=function(){var e=document.getElementById("bgC");var t=e.getContext("2d");floorPattern=t.createPattern(floorImage,"repeat")};var slotsImage=new Image;slotsImage.src="SlotMachine.png";var rouletteImage=new Image;rouletteImage.src="roulettewheel.png";var blackjackImage=new Image;blackjackImage.src="blackjack.png";var crapsImage=new Image;crapsImage.src="craps.png";var doodadImage=new Image;doodadImage.src="dds.png";var StartingAttendance=10;var MaxAttendance=500;var MaxGames=100;var doorX=320;var doorY=448;var goodEvents=new Array(2);goodEvents[0]="You have won an award!  Here's your prize!";goodEvents[1]="You are the most fun casino around!  Here's a bonus!";var badEvents=new Array(3);badEvents[0]="Someone broke in and stole money!";badEvents[1]="A slot machine malfunctioned and emptied its contents.";badEvents[2]="A fee is being charged by the state.";Person.prototype=new Entity;CasinoGame.prototype=new Entity;Doodad.prototype=new Entity;var game=new Game;window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,t){window.setTimeout(e,1e3/60)}}()