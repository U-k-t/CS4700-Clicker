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
var bhInterval, tickCounter;

var tickRate = 200

var resources = {
  "bugs": 0,
  "total_bugs": 0,
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

var frog_positions = {
  "tiny_frog": [0, 0],
  "small_frog": [0, 0],
  "medium_frog": [0, 0],
  "large_frog": [0, 0],
  "giant_frog": [0, 0],
  "black_hole_frog": [0, 0]
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

function buyUpgrade(type, item) {
  /*
    Applies Multiplier Effects for Upgrades

    Parameters
    ------------
      type: String - The descriptive identifier applied to the upgrade
      item: String - The type of upgrade (shoes, glasses)

    Returns
    ------------
      void : null

    Called by
    ------------
      #glasses_shop_button
      #shoes_shop_button
  */

  // Evaluate if resources are present to purchase upgrade
  if (resources["bugs"] >= upgradeCosts[type + "_" + item]) {

    resources[type + "_" + item] += 1
    resources["bugs"] -= upgradeCosts[type + "_" + item]
    if (item == "glasses") // Deterministically Apply Upgrade Effects
      resources["bugs_per_click"] *= upgradeMults[type + "_glasses"]
    else
      resources["bugs_per_second"] *= upgradeMults[type + "_shoes"]

    updateText()
    updateShop(item, type)
  }
}

function updateShop(shopType, itemType) {
  /*
    Replaces Shop Upgrades with Higher Tiers

    Parameters
    ------------
      itemType: String - The descriptive identifier applied to the upgrade
      shopType: String - The type of upgrade (shoes, glasses)

    Returns
    ------------
      void : null

    Called by
    ------------
      buyUpgrade()
  */

  shopElement = document.getElementById(shopType + '_shop')
  shopElement.style.display = "none"; // Hide the upgrade button

  var nextType, toolTip;
  switch (itemType) {
    case 'old':
      nextType = 'new';
      toolTip = (shopType == 'shoes') ? 'New shoes that help your frogs jump much higher. Multiplies bugs per second by 2.' : 'New glasses that help your frogs see much better. Multiplies bugs per click by 2.'
      break;
    case 'new':
      nextType = 'designer';
      toolTip = (shopType == 'shoes') ? 'Designer shoes that help your frogs jump a lot higher in style. Multiplies bugs per second by 2.5.' : 'New glasses that help your frogs see a lot better in style. Multiplies bugs per click by 2.5.'
      break;
    default:
      nextType = 'obsolete'; // Obsolete has dummy .png references but will never display based on unlocks dictionary
      toolTip = "Dummy Text"
      break;
  }

  // Replace the element with the new data
  document.getElementById('purchased_label').style.display = "block";
  shopElement.innerHTML = `<div class="shop_cost" id="${shopType}_shop_cost">Cost: <span id=cost_${shopType}>${upgradeCosts[nextType+"_"+shopType]}</span> Bugs</div>
	<button class="shop_button"  id = "${shopType}_shop_button" type="button" onClick="buyUpgrade('${nextType}','${shopType}')" style="background-image:url('Assets/${nextType}_${shopType}.png')"> Buy ${nextType.toTitleCase()} ${shopType.toTitleCase()}</button>
    <span class="tooltiptext">${toolTip}</span>`
  closet = document.getElementById('purchased_' + shopType)
  closet.innerHTML += `
	<button class=" purchased"  type="button" disabled style="background-image:url('Assets/${itemType}_${shopType}.png')"> ${itemType.toTitleCase()} ${shopType.toTitleCase()}</button>`
  if (unlocks[nextType + "_" + shopType])
    unlocks[shopType] = unlocks[nextType + "_" + shopType]; // Update unlocks target
}

function eatBugs(num) {
  /*
    Increases the bugs resource

    Parameters
    ------------
      num: Int - The number of bugs eaten

    Returns
    ------------
      void : null

    Called by
    ------------
      frogClicked()
      window.setInterval(tickRate)
  */
  //Eats number of bugs based on bugs per click value
  resources["bugs"] += num * resources["normal_frog"] * resources["bugs_per_click"]
  resources["total_bugs"] += num * resources["normal_frog"] * resources["bugs_per_click"]
  updateText()
}

function updateCanvas(type) {
  /*
  	Adds frog image to respective canvas

  	Parameters
  	------------
  		type: String - The descriptive identifier applied to the frog

  	Returns
  	------------
  		void : null

  	Called by
  	------------
  		inviteFrog()
  */
  canvas = document.getElementById(type + "_frog_home")
  context = canvas.getContext("2d")
  image = new Image(320, 320)

  //Loads image properly before displaying
  image.onload = function() {
    canvas.append(image)
    positions = frog_positions[type + "_frog"]
    context.drawImage(image, 0, 0, 320, 320, positions[0], positions[1], 80, 80)
    updatePositions(type)
  }
  image.src = `Assets/${type}_frog.png`
}

function updatePositions(type) {
  /*
  	Assigns new position for each frog added

  	Parameters
  	------------
  		type: String - The descriptive identifier applied to the frog

  	Returns
  	------------
  		void : null

  	Called by
  	------------
  		updateCanvas()
  */
  positions = frog_positions[type + "_frog"]
  //Starts new column after every 5th frog added
  if (resources[type + "_frog"] % 5 == 0) {
    positions[0] += 10
    positions[1] -= 120
  } else {
    positions[0] += 10
    positions[1] += 30
  }
}

function inviteFrog(type, num = 1) {
  /*
  	Increases frog resources

  	Parameters
  	------------
  		type: String - The descriptive identifier applied to the frog
  		num: Int - The number of frogs purchased

  	Returns
  	------------
  		void : null

  	Called by
  	------------
  		#shop_button
  */
  //Checks to see if new frog can be afforded
  if (resources["bugs"] >= frogCosts[type + "_frog"] * num) {

    resources[type + "_frog"] += num
    resources["bugs"] -= num * frogCosts[type + "_frog"]

    frogCosts[type + "_frog"] = Math.round(num * permaCosts[type + "_frog"] * Math.pow(1.07, resources[type + "_frog"]))
    resources["bugs_per_second"] += bugsPerSecond[type + "_frog"]
    updateCanvas(type)
    updateText(type)

    //Adds black hole frog takeover functionality
    if (type == "black_hole") {
      startDestruction();
    }
  }
}

function startDestruction() {
  bhInterval = window.setInterval(function() {
    yummyYummy();
  }, 10000)
}

function frogClicked(bugAmt = 1) {
  /*
  	Increases frog resources

  	Parameters
  	------------
  		bugAmt: Int - The number of bugs to be eaten

  	Returns
  	------------
  		void : null

  	Called by
  	------------
  		#main_frog
  */
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


function yummyYummy() {
  uneaten = document.getElementsByClassName('uneaten');
  if (uneaten.length == 0) {
    window.clearInterval(bhInterval);
    window.clearInterval(tickCounter);
    localStorage.setItem('total', Math.floor(resources['total_bugs']))
    localStorage.setItem('bps', (resources['bugs_per_second'] * 5).toFixed(2))
    localStorage.setItem('bpc', resources['bugs_per_click'].toFixed(2))
    localStorage.setItem('tiny', resources["tiny_frog"])
    localStorage.setItem('small', resources["small_frog"])
    localStorage.setItem('med', resources["medium_frog"])
    localStorage.setItem('large', resources["large_frog"])
    localStorage.setItem('giant', resources["giant_frog"])
    localStorage.setItem('bh', resources["black_hole_frog"])
    localStorage.setItem('uninvited', 6 - resources["black_hole_frog"])
    window.location.replace('gameOver.html')
  }
  for (index in uneaten) {
    ele = uneaten[index]
    if (ele.parentElement) {
      ele.parentElement.innerHTML = '<image class = "ribbit" src ="Assets/black_hole_frog.png"></image>'
    }

    break;
  }

}

function updateText(type = "") {
  /*
  	Updates resource values

  	Parameters
  	------------
  		type: String - The descriptive identifier applied to the frog

  	Returns
  	------------
  		void : null

  	Called by
  	------------
  		buyUpgrade()
  		eatBugs()
  		inviteFrog()
  		window.setInterval
  */
  frogsRegex = new RegExp('frog');
  if (type != "init") {
    for (var key in unlocks) {
      var unlocked = true
      for (var criterion in unlocks[key]) {
        unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
      }
      if (unlocked && frogsRegex.test(key)) {
        document.getElementById('shop_label').style.display = "block"
        if (document.getElementById(key + '_wrapper').style.display != "block") {
          document.getElementById(key + '_wrapper').style.display = "block";
          document.getElementById(key + '_home').width = document.getElementById(key + '_wrapper').offsetWidth
        }
        document.getElementById(key + '_shop').style.display = "block";
      } else if (unlocked && (key == 'shoes' || key == 'glasses')) {
        document.getElementById('accessories_label').style.display = "block"
        element = document.getElementById(key + '_shop')
        var obsolete = new RegExp('obsolete')
        if (!obsolete.test(element.innerHTML))
          element.style.display = "block"
      }
    }
    if (type != "") {
      document.getElementById('num_' + type).innerHTML = resources[type + "_frog"]
      document.getElementById('cost_' + type).innerHTML = frogCosts[type + "_frog"]
    }
  } else {
    tickCounter = window.setInterval(function() {
      eatBugs(resources["bugs_per_second"])
    }, tickRate);
    document.getElementById('cost_tiny').innerHTML = frogCosts['tiny_frog'];
    document.getElementById('cost_small').innerHTML = frogCosts['small_frog'];
    document.getElementById('cost_medium').innerHTML = frogCosts['medium_frog'];
    document.getElementById('cost_large').innerHTML = frogCosts['large_frog'];
    document.getElementById('cost_giant').innerHTML = frogCosts['giant_frog'];
    document.getElementById('cost_black_hole').innerHTML = frogCosts['black_hole_frog'];
  }
  document.getElementById('num_bugs').innerHTML = Math.floor(resources['bugs']);
  document.getElementById('num_bps').innerHTML = (resources['bugs_per_second'] * 5).toFixed(2);
  document.getElementById('num_bpc').innerHTML = resources['bugs_per_click'].toFixed(2);

}

String.prototype.toTitleCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};


function postStats() {
  document.getElementById('num_total_bugs').innerHTML = localStorage.getItem('total')
  document.getElementById('num_total_bps').innerHTML = localStorage.getItem('bps')
  document.getElementById('num_total_bpc').innerHTML = localStorage.getItem('bpc')
  document.getElementById('num_total_tiny_frog').innerHTML = localStorage.getItem('tiny')
  document.getElementById('num_total_small_frog').innerHTML = localStorage.getItem('small')
  document.getElementById('num_total_medium_frog').innerHTML = localStorage.getItem('med')
  document.getElementById('num_total_large_frog').innerHTML = localStorage.getItem('large')
  document.getElementById('num_total_giant_frog').innerHTML = localStorage.getItem('giant')
  document.getElementById('num_total_black_hole_frog').innerHTML = localStorage.getItem('bh')
  if (localStorage.getItem('uninvited') > 0)
    document.getElementById('final_bug_stats').innerHTML += `<li>
      Uninvited Black Hole Frogs:
      <span >${localStorage.getItem('uninvited')}</span><br>
      </li>`




}
