/*
Jacob Rothman
013383526
jrothman@cpp.edu
Section 2

Selena Aungst
013276146
seaungst@cpp.edu
Section 2
*/

var tickRate = 200

<<<<<<< HEAD
var resources = {
  "bugs": 0,
  "bugs_per_second": 0,
  "normal_frog": 1,
  "tiny_frog": 0,
  "small_frog": 0,
  "medium_frog": 0,
  "large_frog": 0,
  "giant_frog": 0,
  "black_hole_frog": 0
}
=======
var resources = {"bugs":0, "bugs_per_second":0, "bugs_per_click":1, "normal_frog":1,
								"tiny_frog":0, "small_frog":0, "medium_frog":0, "large_frog":0,
								"giant_frog":0, "black_hole_frog":0}
>>>>>>> 86b1ad8582e21c5629a4bba5ddd349ccc0f9c127

var frogCosts = {
  "tiny_frog": 25,
  "small_frog": 100,
  "medium_frog": 500,
  "large_frog": 1500,
  "giant_frog": 4000,
  "black_hole_frog": 10000
}

var bugsPerSecond = {
  "tiny_frog": 0.2,
  "small_frog": 2,
  "medium_frog": 10,
  "large_frog": 30,
  "giant_frog": 70,
  "black_hole_frog": 200
}

var upgradeCosts = {"old_glasses":300, "new_glasses":750,
										"designer_glasses":2000, "old_shoes":300, "new_shoes":750,
										"designer_shoes":2000}

var upgradeMults = {"old_glasses":1.5, "new_glasses":2,
										"designer_glasses":2.5, "old_shoes":1.5, "new_shoes":2,
										"designer_shoes":2.5}

<<<<<<< HEAD
var unlocks = {
  "tiny_frog": {
    "bugs": 25
  },
  "small_frog": {
    "bugs": 100
  },
  "medium_frog": {
    "bugs": 500
  },
  "large_frog": {
    "bugs": 1500
  },
  "giant_frog": {
    "bugs": 4000
  },
  "black_hole_frog": {
    "bugs": 10000
=======
var unlocks = {"tiny_frog":{"bugs":25}, "small_frog":{"bugs":100},
							 "medium_frog":{"bugs":500}, "large_frog":{"bugs":1500},
						 	 "giant_frog":{"bugs":4000}, "black_hole_frog":{"bugs":10000},
							 "old_glasses":{"bugs":300}, "new_glasses":{"bugs":750},
 							 "designer_glasses":{"bugs":2000}, "old_shoes":{"bugs":300},
							 "new_shoes":{"bugs":750}, "designer_shoes":{"bugs":2000}}

function eatBugs(num){
	resources["bugs"] += num*resources["normal_frog"]
	updateText()
}

function frogClick() {
	if (document.getElementById('main_frog').src == "Assets/main_frog_lilypad.png")
  {
      document.getElementById('main_frog').src = "Assets/main_frog_lilypad_on_click.gif";
  }

  else
  {
      document.getElementById('main_frog').src = "Assets/main_frog_lilypad.png";
  }

	eatBugs(resources["bugs_per_click"])
}

function buyGlasses(type, num = 1){
	if(resources["bugs"] >= upgradeCosts[type + "_glasses"] * num) {

		resources[type + "_glasses"] += num
		resources["bugs"] -= num * upgradeCosts[type + "_glasses"]
		resources["bugs_per_click"] *= upgradeMults[type + "_glasses"]

		updateText()
	}
}

function buyShoes(type, num = 1){
	if(resources["bugs"] >= upgradeCosts[type + "_shoes"] * num) {

		resources[type + "_shoes"] += num
		resources["bugs"] -= num * upgradeCosts[type + "_shoes"]
		resources["bugs_per_second"] *= upgradeMults[type + "_shoes"]

		updateText()
	}
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
>>>>>>> 86b1ad8582e21c5629a4bba5ddd349ccc0f9c127
  }
}

function eatBugs(num) {
  resources["bugs"] += num * resources["normal_frog"]
  updateText()
}


function inviteFrog(type, num = 1) {
  if (resources["bugs"] >= frogCosts[type + "_frog"] * num) {

    resources[type + "_frog"] += num
    resources["bugs"] -= num * frogCosts[type + "_frog"]

    frogCosts[type + "_frog"] = Math.round(num * frogCosts[type + "_frog"] * (Math.pow(1.1, resources[type + "_frog"])))
    resources["bugs_per_second"] += bugsPerSecond[type + "_frog"]

    updateText(type)
  }
	if (type == "black_hole"){
		uneaten = document.getElementsByClassName('uneaten');
		for (index in uneaten){
			ele = uneaten[index]
			// console.log(ele)
			if(ele.parentElement)
				console.log(ele.parentElement.id)
				ele.parentElement.innerHTML = '<image id = "ribbit" src ="Assets/black_hole_frog.png"></image>'
				// ele.id = "ribbit"
				break;

		}
	}
}

window.setInterval(function() {
  eatBugs(resources["bugs_per_second"])
}, tickRate);


function frogClicked(bugAmt = 1) {
  const gifTest = new RegExp('.gif');
  const frogButton = document.getElementById('main_frog');
  if (!gifTest.test(frogButton.src)) {
    frogButton.src = 'Assets/main_frog_lilypad_on_click.gif'
    setTimeout(function() {
      frogButton.src = 'Assets/main_frog_lily.png'
    }, 500)
  }
  eatBugs(bugAmt);

}


function updateText(type = "") {
  for (var key in unlocks) {
    var unlocked = true
    for (var criterion in unlocks[key]) {
      unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
    }
    if (unlocked) {
      document.getElementById(key + '_wrapper').style.display = "block";
      document.getElementById(key + '_shop').style.display = "block";
    }
  }

  document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
  document.getElementById('num_bps').innerHTML = Math.floor(resources['bugs_per_second'] * 5);
	if (type != ""){
		document.getElementById('num_'+type).innerHTML = resources[type+"_frog"]
		document.getElementById('cost_'+type).innerHTML = frogCosts[type+"_frog"]
		console.log(type)
	}
}


<<<<<<< HEAD
function readyDocument(){
=======
	document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
	document.getElementById('num_bps').innerHTML = Math.floor(resources['bugs_per_second']*5);
	document.getElementById('num_bpc').innerHTML = Math.floor(resources['bugs_per_click']);
>>>>>>> 86b1ad8582e21c5629a4bba5ddd349ccc0f9c127
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
