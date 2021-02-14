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

var resources = {
  "bugs": 0,
  "bugs_per_second": 0,
  "bugs_per_click": 1,
  "normal_frog": 1,
  "tiny_frog": 0,
  "small_frog": 0,
  "medium_frog": 0,
  "large_frog": 0,
  "giant_frog": 0,
  "black_hole_frog": 0
}

//These values will change and be displayed
var frogCosts = {
  "tiny_frog": 15,
  "small_frog": 100,
  "medium_frog": 500,
  "large_frog": 3000,
  "giant_frog": 10000,
  "black_hole_frog": 40000
}

//These values will stau the same and be used for calculation
var permaCosts = {
  "tiny_frog": 15,
  "small_frog": 100,
  "medium_frog": 500,
  "large_frog": 3000,
  "giant_frog": 10000,
  "black_hole_frog": 40000
}

var bugsPerSecond = {
  "tiny_frog": 0.04,
  "small_frog": 0.2,
  "medium_frog": 1.6,
  "large_frog": 4,
  "giant_frog": 16,
  "black_hole_frog": 40
}

var upgradeCosts = {
  "old_glasses": 200,
  "new_glasses": 500,
  "designer_glasses": 2500,
  "old_shoes": 200,
  "new_shoes": 500,
  "designer_shoes": 2500
}

var upgradeMults = {
  "old_glasses": 1.5,
  "new_glasses": 2,
  "designer_glasses": 2.5,
  "old_shoes": 1.5,
  "new_shoes": 2,
  "designer_shoes": 2.5
}


var unlocks = {
  "tiny_frog": {
    "bugs": 15
  },
  "small_frog": {
    "bugs": 100
  },
  "medium_frog": {
    "bugs": 500
  },
  "large_frog": {
    "bugs": 3000
  },
  "giant_frog": {
    "bugs": 10000
  },
  "black_hole_frog": {
    "bugs": 40000
  },
  "old_glasses": {
    "bugs": 200
  },
  "new_glasses": {
    "bugs": 500
  },
  "designer_glasses": {
    "bugs": 2500
  },
  "old_shoes": {
    "bugs": 200
  },
  "new_shoes": {
    "bugs": 500
  },
  "designer_shoes": {
    "bugs": 2500
  },
  "shoes": {
    "bugs": 300
  },
  "glasses": {
    "bugs": 300
  }
}



function buyglasses(type, num = 1) {
  if (resources["bugs"] >= upgradeCosts[type + "_glasses"] * num) {

    resources[type + "_glasses"] += num
    resources["bugs"] -= num * upgradeCosts[type + "_glasses"]
    resources["bugs_per_click"] *= upgradeMults[type + "_glasses"]


    updateText()
    updateShop('glasses', type)
  }
}

function buyshoes(type, num = 1) {
  if (resources["bugs"] >= upgradeCosts[type + "_shoes"] * num) {

    resources[type + "_shoes"] += num
    resources["bugs"] -= num * upgradeCosts[type + "_shoes"]
    resources["bugs_per_second"] *= upgradeMults[type + "_shoes"]


    updateText()
    updateShop('shoes', type)


  }
}

function updateShop(shopType, itemType) {
  shopElement = document.getElementById(shopType + '_shop')
  shopElement.style.display = "none";

  var nextType;
  switch (itemType) {
    case 'old':
      nextType = 'new';
      break;
    case 'new':
      nextType = 'designer';
      break;
    default:
      nextType = 'obsolete';
  }
  shopElement.innerHTML = `<div class="shop_cost" id="${shopType}_shop_cost">Cost: <span id=cost_${shopType}>${upgradeCosts[nextType+"_"+shopType]}</span> Bugs</div>
	<button class="shop_button"  id = "${shopType}_shop_button" type="button" onClick="buy${shopType}('${nextType}')" style="background-image:url('Assets/${nextType}_${shopType}.png')"> Buy ${nextType} ${shopType}</button>`
  if (unlocks[nextType + "_" + shopType])
    unlocks[shopType] = unlocks[nextType + "_" + shopType];
}

function eatBugs(num) {
  resources["bugs"] += num * resources["normal_frog"]
  updateText()
}


function inviteFrog(type, num = 1) {
  if (resources["bugs"] >= frogCosts[type + "_frog"] * num) {

    resources[type + "_frog"] += num
    resources["bugs"] -= num * frogCosts[type + "_frog"]

    frogCosts[type + "_frog"] = Math.round(num * permaCosts[type + "_frog"] * Math.pow(1.07, resources[type + "_frog"]))
    resources["bugs_per_second"] += bugsPerSecond[type + "_frog"]

    updateText(type)

    if (type == "black_hole") {
      uneaten = document.getElementsByClassName('uneaten');
      for (index in uneaten) {
        ele = uneaten[index]
        if (ele.parentElement) {
          ele.parentElement.innerHTML = '<image class = "ribbit" src ="Assets/black_hole_frog.png"></image>'
        }

        break;
      }
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
  frogsRegex = new RegExp('frog');
  for (var key in unlocks) {
    var unlocked = true
    for (var criterion in unlocks[key]) {
      unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
    }
    if (unlocked && frogsRegex.test(key)) {
      document.getElementById(key + '_wrapper').style.display = "block";
      document.getElementById(key + '_shop').style.display = "block";
    } else if (unlocked && (key == 'shoes' || key == 'glasses')) {
      element = document.getElementById(key + '_shop')
      var obsolete = new RegExp('obsolete')
      if (!obsolete.test(element.innerHTML))
        element.style.display = "block"
    }
  }

  document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
  document.getElementById('num_bps').innerHTML = (resources['bugs_per_second'] * 5).toFixed(2);
  document.getElementById('num_bpc').innerHTML = resources['bugs_per_click'].toFixed(2);
  if (type != "") {
    document.getElementById('num_' + type).innerHTML = resources[type + "_frog"]
    document.getElementById('cost_' + type).innerHTML = frogCosts[type + "_frog"]
    console.log(type)
  }
}


function readyDocument() {

  // Spaghetti; to fix later.

	/*
	document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
  document.getElementById('num_bps').innerHTML = resources['bugs_per_second'].toFixed(2) * 5;
  document.getElementById('num_bpc').innerHTML = resources['bugs_per_click'].toFixed(2);

	var titles ["tiny", "small", "medium", "large", "giant", "black_hole"]

	for (var key in titles) {
		document.getElementById('num_' + key).innerHTML = resources[key + '_frog'];
		document.getElementById('cost_' + key).innerHTML = frogCosts[key + '_frog'];
	}
	*/

  document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
  document.getElementById('num_bps').innerHTML = (resources['bugs_per_second'] * 5).toFixed(2);
  document.getElementById('num_bpc').innerHTML = resources['bugs_per_click'].toFixed(2);

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
