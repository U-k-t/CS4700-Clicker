/*
Jacob Rothman
013383526
Section 2

Selena Aungst
013276146
Section 2
*/

var tickRate = 200

var resources = {"bugs":0, "bugs_per_second":0, "normal_frog":1,
								"tiny_frog":0, "small_frog":0, "medium_frog":0, "large_frog":0,
								"giant_frog":0, "black_hole_frog":0}

var frogCosts = {"tiny_frog":25, "small_frog":100, "medium_frog":500,
						 "large_frog":1500, "giant_frog":4000, "black_hole_frog":10000}

var bugsPerSecond = {"tiny_frog":0.2, "small_frog":2, "medium_frog":10,
						 "large_frog":30, "giant_frog":70, "black_hole_frog":200}

/*
var upgrades = {"old_glasses":0, "new_glasses":0,
								"designer_glasses":0, "old_shoes":0, "new_shoes":0,
								"designer_shoes":0}

var upgradeCosts = {"old_glasses":300, "new_glasses":750,
										"designer_glasses":2000, "old_shoes":300, "new_shoes":750,
										"designer_shoes":2000}
*/


var unlocks = {"tiny_frog":{"bugs":25}, "small_frog":{"bugs":100},
							 "medium_frog":{"bugs":500}, "large_frog":{"bugs":1500},
						 	 "giant_frog":{"bugs":4000}, "black_hole_frog":{"bugs":10000}}

function eatBugs(num){
	resources["bugs"] += num*resources["normal_frog"]
	updateText()
}

function buyTinyFrog(num){

		if (!resources["tiny_frog"]){
		    resources["tiny_frog"] = 0;
		}
  if (resources["bugs"] >= frogCosts["tiny_frog"]*num){

		resources["tiny_frog"] += num
		resources["bugs"] -= num*frogCosts["tiny_frog"]

		frogCosts["tiny_frog"] = Math.round(num*frogCosts["tiny_frog"]*(Math.pow(1.1, resources["tiny_frog"])))
		resources["bugs_per_second"] += bugsPerSecond["tiny_frog"]

		updateText()
  }
};

function buySmallFrog(num){
	if (resources["bugs"] >= frogCosts["small_frog"]*num){

		resources["small_frog"] += num
		resources["bugs"] -= num*frogCosts["small_frog"]

		frogCosts["small_frog"] = Math.round(num*frogCosts["small_frog"]*(Math.pow(1.1, resources["small_frog"])))
		resources["bugs_per_second"] += bugsPerSecond["small_frog"]

		updateText()
  }
};

function buyMediumFrog(num){
	if (resources["bugs"] >= frogCosts["medium_frog"]*num){

		resources["medium_frog"] += num
		resources["bugs"] -= num*frogCosts["medium_frog"]

		frogCosts["medium_frog"] = Math.round(num*frogCosts["medium_frog"]*(Math.pow(1.1, resources["medium_frog"])))
		resources["bugs_per_second"] += bugsPerSecond["medium_frog"]

		updateText()
  }
};

function buyLargeFrog(num){
	if (resources["bugs"] >= frogCosts["large_frog"]*num){

		resources["large_frog"] += num
		resources["bugs"] -= num*frogCosts["large_frog"]

		frogCosts["large_frog"] = Math.round(num*frogCosts["large_frog"]*(Math.pow(1.1, resources["large_frog"])))
		resources["bugs_per_second"] += bugsPerSecond["large_frog"]

		updateText()
  }
};

function buyGiantFrog(num){
	if (resources["bugs"] >= frogCosts["giant_frog"]*num){

		resources["giant_frog"] += num
		resources["bugs"] -= num*frogCosts["giant_frog"]

		frogCosts["giant_frog"] = Math.round(num*frogCosts["giant_frog"]*(Math.pow(1.1, resources["giant_frog"])))
		resources["bugs_per_second"] += bugsPerSecond["giant_frog"]

		updateText()
  }
};

function buyBlackHoleFrog(num){
	if (resources["bugs"] >= frogCosts["black_hole_frog"]*num){

		resources["black_hole_frog"] += num
		resources["bugs"] -= num*frogCosts["black_hole_frog"]

		frogCosts["black_hole_frog"] = Math.round(num*frogCosts["black_hole_frog"]*(Math.pow(1.1, resources["black_hole_frog"])))
		resources["bugs_per_second"] += bugsPerSecond["black_hole_frog"]

		updateText()
  }
};

window.setInterval(function(){
  eatBugs(resources["bugs_per_second"])
}, tickRate);


function frogClicked(bugAmt = 1){
	const gifTest = new RegExp('.gif');
	const frogButton = document.getElementById('main_frog');
	if (!gifTest.test(frogButton.src)){
		frogButton.src = 'Assets/main_frog_lilypad_on_click.gif'
		setTimeout(function(){
			frogButton.src = 'Assets/main_frog_lily.png'
		}, 500)
	}
	eatBugs(bugAmt);

}


function updateText(){
	for (var key in unlocks){
		var unlocked = true
		for (var criterion in unlocks[key]){
			unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
		}
		if (unlocked){
			document.getElementById(key+'_wrapper').style.display = "block";
			document.getElementById(key+'_shop').style.display = "block";
		}
	}

	document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
	document.getElementById('num_bps').innerHTML = Math.floor(resources['bugs_per_second']*5);
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
