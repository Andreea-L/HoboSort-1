
game = {};

function Customer(level, employees)
{
	this.randT = Math.floor(Math.random() * 4); //Any type from 0-3
    this.randM = Math.floor(Math.random() * 3); //Any mood from 0-2
	this.randVal = Math.floor(Math.random() + 5) * level * employees; //Any cash value from 5-level
}

function addCustomers(levels, employees)
{
    var level = 1; //REMOVE 
    //console.log("Adding customer");
    var customer = new Customer(level,1);
    //var types = ["email","facebook","twitter","phone"];
    customer.sprite  = game.scene.Sprite(customerImage(customer.randT, customer.randM), game.layer);
    var imageWidth = 64;
    var bufferOffset = 15;
    var gap = game.size.width/8;
    console.log(gap);
    var positions = [gap-(imageWidth/2) - bufferOffset, gap*3-(imageWidth/2) - bufferOffset, gap*5-(imageWidth/2) - bufferOffset, gap*7-(imageWidth/2) - bufferOffset]; //gap,(imageWidth + 3 * gap),(imageWidth * 2 + 5 * gap),(imageWidth * 3 + 7 * gap)
    customer.sprite.move(positions[customer.randT], -60); //Math.random() * game.size.width - 32
    customer.sprite.size(64, 64);
    customer.sprite.scale(1);
    var speedBonus = [1,1.5,1.5]
    customer.sprite.yv = 3 * level * speedBonus[customer.randM];
    customer.sprite.update();

    game.customers.add(customer.sprite);
}

function customerImage(cType, cMood)
{
    var customerType = ["phone","mail","facebook","twit"];
    var customerMood = ["n","m","a"];
    return "img/"+customerType[cType]+"-"+customerMood[cMood]+".png";
}


$(document).ready(function () 
{
    $container = $("#canvas-container")
    game.size = {width: $container.innerWidth(), height: $container.innerWidth()*3/4};
    game.scene = sjs.Scene({w: game.size.width, h: game.size.height, parent: $container[0]});
    game.layer = game.scene.Layer("front");
    game.bucketLayer = game.scene.Layer("buckets")
    game.input = game.scene.Input();
    game.customers = sjs.List();
    game.tickCounter = 0;
    game.ticker = game.scene.Ticker(draw);
    game.satisfaction = 50;

    game.ticker.run();
   
    /*player = game.scene.Sprite("img/twitter.png");
    player.setX(200);
    player.setY(200);
    player.canvasUpdate(game.layer);
    player.applyYVelocity();*/
    /*
    var enemy = game.scene.Sprite('img/employee1.png', game.layer);
    enemy.move(game.size.width / 2 - 150, game.size.height / 2 - 150);
    enemy.size(300, 300);
    enemy.scale(0.25);
    enemy.update();
    */
});


function draw()
{
    /*
	if(game.input.keyboard.right)
        console.log("YoMomma");
    */

    if(game.input.keyPressed("a"))
        console.log("A");
    if(game.input.keyPressed("s"))
        console.log("S");
    if(game.input.keyPressed("d"))
        console.log("D");
    if(game.input.keyPressed("f"))
        console.log("F");

    var  customer;
    while(customer = game.customers.iterate()) 
    {
        //console.log(game.customers.list.length);
        customer.applyVelocity();
        customer.update();
        
        if(customer.y > (game.size.height))
        {
            game.customers.remove(customer);
            customer.remove();
            game.satisfaction -= 1;
        }
        
            
    }

    game.tickCounter++;
    if (game.tickCounter % 50 == 0) 
        {
            addCustomers();
        }
}

/*
function paintCustomer(targetY, Customer)
{
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("keydown",doKeyDown,true);
    input.keyPressed("A");

}
*/


/*
var ctx = document.getElementById("canvas").getContext("2d"),
    x = 10,
    y = 0,
    targetY = 300,
    velX = 0,
    velY = 10,
    thrust = 5;


function draw(){   
    var 
        ty = targetY - y,

    velY = (ty/dist)*thrust;

    // stop the box if its too close so it doesn't just rotate and bounce

    ctx.fillStyle = "#fff";
    ctx.clearRect(0,0,400,400);
    ctx.beginPath();
    ctx.rect(x, y, 10, 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ff0";
    ctx.beginPath();
    ctx.rect(targetX, targetY, 10, 10);
    ctx.closePath();
    ctx.fill();

    setTimeout(function(){draw()}, 30);   
}

draw();

*/