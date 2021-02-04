/*
Jacob Rothman
013383526
Section 2

Selena Aungst
013276146
Section 2
*/

var timer = 256
var tickRate = 16
var visualRate = 256

var resources = {"bugs":0, "normal_frog":1, "tiny_frog":0, "small_frog":0,
								"medium_frog":0, "large_frog":0, "giant_frog":0,
								"black_hole_frog":0}

var frogCosts = {"tiny_frog":25, "small_frog":250, "medium_frog":750,
						 "large_frog":1500, "giant_frog":3000, "black_hole_frog":10000}

var frogGrowthRate = {"tiny_frog":1.25, "small_frog":1.50, "medium_frog":1.75,
								  "large_frog":2.00, "giant_frog":2.25, "black_hole_frog":5.0}

/*
var upgradeCosts = {"old_glasses":300, "new_glasses":750,
										"designer_glasses":2000, "old_shoes":300, "new_shoes":750,
										"designer_shoes":2000}
*/

var unlocks = {"tiny_frog":{"bugs":25}, "small_frog":{"bugs":50},
							 "medium_frog":{"bugs":100}, "large_frog":{"bugs":200},
						 	 "giant_frog":{"bugs":500}, "black_hole_frog":{"bugs":2000}}

var increments = [{"input":["tiny_frog"], "output":"bugs"},
									{"input":["small_frog"], "output":"bugs"},
									{"input":["medium_frog"], "output":"bugs"},
									{"input":["large_frog"], "output":"bugs"},
									{"input":["giant_frog"], "output":"bugs"},
									{"input":["black_hole_frog"], "output":"bugs"}]

var unlocks = {}

function eatBugs(num){
	resources["bugs"] += num*resources["normal_frog"]
	updateText()
}

function buyTinyFrog(num){
  if (resources["bugs"] >= frogCosts["tiny_frog"]*num){

		if (!resources["tiny_frog"]){
		    resources["tiny_frog"] = 0
		}

		resources["tiny_frog"] += num
		resources["bugs"] -= num*frogCosts["tiny_frog"]

		frogCosts["tiny_frog"] *= frogGrowthRate["tiny_frog"]

		updateText()
  }
};

function buySmallFrog(num){
	if (resources["bugs"] >= frogCosts["small_frog"]*num){

		if (!resources["small_frog"]){
		    resources["small_frog"] = 0
		}

		resources["small_frog"] += num
		resources["bugs"] -= num*frogCosts["small_frog"]

		frogCosts["small_frog"] *= frogGrowthRate["small_frog"]

		updateText()
  }
};

function buyMediumFrog(num){
	if (resources["bugs"] >= frogCosts["medium_frog"]*num){

		if (!resources["medium_frog"]){
		    resources["medium_frog"] = 0
		}

		resources["medium_frog"] += num
		resources["bugs"] -= num*frogCosts["medium_frog"]

		frogCosts["medium_frog"] *= frogGrowthRate["medium_frog"]

		updateText()
  }
};

function buyLargeFrog(num){
	if (resources["bugs"] >= frogCosts["large_frog"]*num){

		if (!resources["large_frog"]){
		    resources["large_frog"] = 0
		}

		resources["large_frog"] += num
		resources["bugs"] -= num*frogCosts["large_frog"]

		frogCosts["large_frog"] *= frogGrowthRate["large_frog"]

		updateText()
  }
};

function buyGiantFrog(num){
	if (resources["bugs"] >= frogCosts["giant_frog"]*num){

		if (!resources["giant_frog"]){
		    resources["giant_frog"] = 0
		}

		resources["giant_frog"] += num
		resources["bugs"] -= num*frogCosts["giant_frog"]

		frogCosts["giant_frog"] *= frogGrowthRate["giant_frog"]

		updateText()
  }
};

function buyBlackHoleFrog(num){
	if (resources["bugs"] >= frogCosts["black_hole_frog"]*num){

		if (!resources["black_hole_frog"]){
		    resources["black_hole_frog"] = 0
		}

		resources["black_hole_frog"] += num
		resources["bugs"] -= num*frogCosts["black_hole_frog"]

		frogCosts["black_hole_frog"] *= frogGrowthRate["black_hole_frog"]

		updateText()
  }
};

window.setInterval(function(){
  timer += tickRate

  for (var increment of increments){
		total = 1
			for (var input of increment["input"]){
	    	total *= resources[input]
			}
			if (total){
	    	console.log(total)
	    	resources[increment["output"]] += total/tickRate
			}
    }

    if (timer > visualRate){
			timer -= visualRate
			updateText()
    }
}, tickRate);

function updateText(){
	document.getElementById('num_bugs').innerHTML = resources['bugs'];
	//document.getElementById('num_bps').innerHTML = ;
	document.getElementById('num_tiny').innerHTML = resources['tiny_frog'];
	document.getElementById('num_small').innerHTML = resources['small_frog'];
	document.getElementById('num_medium').innerHTML = resources['medium_frog'];
	document.getElementById('num_large').innerHTML = resources['large_frog'];
	document.getElementById('num_giant').innerHTML = resources['giant_frog'];
	document.getElementById('num_black_hole').innerHTML = resources['black_hole_frog'];

	document.getElementById('cost_tiny').innerHTML = frogCosts['tiny_frog'];
	document.getElementById('cost_small').innerHTML = frogCosts['small_frog'];
	document.getElementById('cost_medium').innerHTML = frogCosts['medium_frog'];
	document.getElementById('cost_large').innerHTML = frogCosts['large_frog'];
	document.getElementById('cost_giant').innerHTML = frogCosts['giant_frog'];
	document.getElementById('cost_black_hole').innerHTML = frogCosts['black_hole_frog'];
}

/*
var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"gold":0,"pickaxe":1}
var costs = {"pickaxe":15,
	     "miner":200,
	     "miner_pickaxe":15}
var growthRate = {"pickaxe":1.25,
		  "miner":1.25,
	     "miner_pickaxe":1.75}

var increments = [{"input":["miner","miner_pickaxe"],
		   "output":"gold"}]

var unlocks = {"pickaxe":{"gold":10},
	       "miner":{"gold":100},
	       "miner_pickaxe":{"miner":1}}

function mineGold(num){
    resources["gold"] += num*resources["pickaxe"]
    updateText()
};

function upgradeMinerPickaxe(num){
    if (resources["gold"] >= frogCosts["miner_pickaxe"]*num){
	resources["miner_pickaxe"] += num
	resources["gold"] -= num*frogCosts["miner_pickaxe"]

	frogCosts["miner_pickaxe"] *= frogGrowthRate["miner_pickaxe"]

	updateText()
    }
};

function upgradePickaxe(num){
    if (resources["gold"] >= frogCosts["pickaxe"]*num){
	resources["pickaxe"] += num
	resources["gold"] -= num*frogCosts["pickaxe"]

	frogCosts["pickaxe"] *= frogGrowthRate["pickaxe"]

	updateText()
    }
};
function hireMiner(num){
    if (resources["gold"] >= frogCosts["miner"]*num){
	if (!resources["miner"]){
	    resources["miner"] = 0
	}
	if (!resources["miner_pickaxe"]){
	    resources["miner_pickaxe"] = 1
	}
	resources["miner"] += num
	resources["gold"] -= num*frogCosts["miner"]

	frogCosts["miner"] *= frogGrowthRate["miner"]

	updateText()


    }
};



function updateText(){
    for (var key in unlocks){
	var unlocked = true
	for (var criterion in unlocks[key]){
	    unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
	}
	if (unlocked){
	    for (var element of document.getElementsByClassName("show_"+key)){
		element.style.display = "block"
	    }
	}
    }

    for (var key in resources){
	 for (var element of document.getElementsByClassName(key)){
	    element.innerHTML = resources[key].toFixed(2)
	}
    }
    for (var key in costs){
	for (var element of document.getElementsByClassName(key+"_cost")){
	    element.innerHTML = frogCosts[key].toFixed(2)
	}
    }
};


window.setInterval(function(){
    timer += tickRate


    for (var increment of increments){
	total = 1
	for (var input of increment["input"]){
	    total *= resources[input]

	}
	if (total){
	    console.log(total)
	    resources[increment["output"]] += total/tickRate
	}
    }

    if (timer > visualRate){
	timer -= visualRate
	updateText()
    }


}, tickRate);
*/
