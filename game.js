const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}


function startGame() {
  state = {}
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    } else if (option.errorMessage) {
      // Display error message as a disabled button
      const errorMessage = document.createElement('button')
      errorMessage.innerText = option.errorMessage
      errorMessage.classList.add('btn-no')
      optionButtonsElement.appendChild(errorMessage)
    }
  })
  
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getShuffledNextTextOptions() {
  const nextTextOptions = [36.1, 36.2, 36.3, 36.7];
  return shuffleArray(nextTextOptions);
}
function getShuffledNextTextOptionsThree() {
  const nextTextOptions = [36.5, 36.6, 36.7];
  return shuffleArray(nextTextOptions);
}

const textNodes = [
  {
    id: 0,
    text: 'The Journey',
    options: [
      {
        text: 'Start Game',
        nextText: 1
      }
    ]
  },
  {
    id: 1,
    text: 'The air is thick with mystery, and the dim moonlight casts eerie shadows around you. You can sense an unknown adventure awaiting you in the darkness. Your journey begins here.',
    options: [
      {
        text: 'Continue',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Will you dare to step into the unknown and uncover the secrets that lie ahead? Or will you retreat into the safety of the shadows, leaving the mysteries of the night untouched?',
    options: [
      {
        text: 'Continue',
        nextText: 2.1
      }
    ]
  },
  {
    id: 2.1,
    text: ' The choices you make will shape your destiny as you embark on a journey filled with danger, discovery, and unexpected twists.',
    options: [
      {
        text: 'Continue',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Prepare yourself for an unforgettable adventure as you venture forth into the unknown. Are you ready to begin your journey?',
    options: [
      {
        text: 'Yes!',
        nextText: 5
      },
      {
        text: 'No.',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'You died. the game hasn\'t even started yet..',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You wake up in the middle of the night at a strange place and you see a bag of coins near you.',
    options: [
      {
        text: 'Take the bag of coins',
        setState: { coins: true },
        nextText: 6
      },
      {
        text: 'Leave the bag of coins',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the coins for a sword',
        requiredState: (currentState) => currentState.coins,
        setState: { coins: false, sword: true },
        nextText: 7,
        errorMessage: "Trade the coins for a sword (You don't have coins)"
      },
      {
        text: 'Trade the coins for a shield',
        requiredState: (currentState) => currentState.coins,
        setState: { coins: false, shield: true },
        nextText: 7,
        errorMessage: "Trade the coins for a shield (You don't have coins)"
      },
      {
        text: 'Ignore the merchant',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'After leaving the merchant you start to feel tired as it is getting late. There, you stumble upon a small town next to a small, dangerous looking castle.',
    options: [
      {
        text: 'Explore the small castle',
        nextText: 8
      },
      {
        text: 'Find a room to sleep in at the town',
        nextText: 11,
        requiredState: (currentState) => currentState.coins,
        setState: { coins: false},
      },
      {
        text: 'Find a room to sleep in at the town',
        requiredState: (currentState) => !currentState.coins,
        nextText: 10
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You are so tired that you fall asleep while exploring the small castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Continue',
        nextText: 9
      }
    ]
  },
  {
  id: 9,
  text: 'You died.',
  options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Continue',
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Continue',
        nextText: 12.1
      }
    ]
  },
  {
    id: 12.1,
    text: 'What will you do?',
    options: [
      {
        text: 'Try to run',
        nextText: 13
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 14,
        errorMessage: "Attack it with your sword (You don't have a sword)"
        
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 15,
        errorMessage: "Hide behind your shield (You don't have a shield)"
      },
      {
        text: 'Throw the coins at it',
        requiredState: (currentState) => currentState.coins,
        nextText: 17,
        errorMessage: "Throw the coins at it (You spent your coins)"
      }
    ]
  },
  {
    id: 13,
    text: 'Your attempts to run are in vain and the monster easily catches you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'You ran straight to the monster and killed it with your sword.',
    options: [
      {
        text: 'Continue',
        nextText: 18
      }
    ]
  },
  {
    id: 15,
    text: 'The monster ran straight towards you with an attack and you blocked it.',
    options: [
      {
        text: 'Continue',
        nextText: 16
      }
    ]
  },
  {
    id: 16,
    text: 'After blocking, you tried to slice the monster. the monster is dead.',
    options: [
      {
        text: 'Continue',
        nextText: 18
      }
    ]
  },
  {
    id: 17,
    text: 'You threw your bag of coins at the monster and it exploded. After the dust settled you saw the monster was destroyed.',
    options: [
      {
        text: 'Continue',
        nextText: 18
      }
    ]
  },
  {
    id: 18,
    text: 'Ahead, you spot a glowing doorway. Without hesitation, you charge towards it, feeling the rush of relief as you pass through.',
    options: [
      {
        text: 'Continue',
        nextText: 19 
      }
    ]
  },
  {
    id: 19,
    text: 'As you stroll along, you notice ominous clouds gathering in the sky, hinting at an impending downpour. What will you do?',
    options: [
      {
        text: 'Ignore it',
        setState: { die: true },
        nextText: 21,
      },
      {
        text: 'Seek shelter now',
        setState: { die: false },
        nextText: 20,
      },
    ]
  },
  {
    id: 20,
    text: 'You wait for the rain, and it doesn\'t take long. As it pours down, you\'re relieved you sought shelter. The rain turns out to be acidic, a deadly threat if you hadn\'t taken cover.',
    options: [
      {
        text: 'Continue',
        nextText: 21
      }
    ]
  },
  {
    id: 21,
    text: 'Continuing on your journey, you encounter a fork in the road, offering two distinct paths forward.',
    options: [
      {
        text: 'Continue',
        nextText: 22
      }
    ]
  },
  {
    id: 22,
    text: 'One appears clear and inviting, while the other is shrouded in mystery, hinting at danger lurking within.',
    options: [
      {
        text: 'Continue',
        nextText: 23
      }
    ]
  },
  {
    id: 23,
    text: 'Your choice will determine the course of your journey. Which path will you take?',
    options: [
      {
        text: 'Clear-looking Path',
        nextText: 30
      },
      {
        text: 'Ominous-looking Path',
        nextText: 24
      },

    ]
  },
  {
    id: 24,
    text: 'Pressing forward along the treacherous path, the surroundings grow increasingly perilous with each step.',
    options: [
      {
        text: 'Continue',
        nextText: 25
      }
    ]
  },
  {
    id: 25,
    text: 'As the path ahead becomes more dangerous, uncertainty begins to cloud your thoughts.',
    options: [
      {
        text: 'Continue',
        nextText: 26
      }
    ]
  },
  {
    id: 26,
    text: 'Do you dare to continue, facing the risks ahead? Or would it be safer to retreat and return to familiar ground?',
    options: [
      {
        text: 'Continue on the road',
        nextText: 27
      },
      {
        text: 'Go back and proceed to the clearer path',
        nextText: 29
      }
    ]
  },
  {
    id: 27,
    text: 'As you press onward along the treacherous road, unaware of the lurking danger, a shadowy figure emerges from the darkness behind you. With swift and silent movements, the creature strikes, its deadly claws ending your journey in an instant.',
    options: [
      {
        text: 'Continue',
        nextText: 28
      }
    ]
  },
  {
    id: 28,
    text: 'You died.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 29,
    text: 'Deciding against the danger, you go back and choose the clear path instead. It feels safer, more familiar, as you continue on your journey.',
    options: [
      {
        text: 'Continue',
        nextText: 30
      }
    ]
  },
  {
    id: 30,
    text: 'You\'ve decided to take the safe route, following the path that seems clear and straightforward.',
    options: [
      {
        text: 'Continue',
        requiredState: (currentState) => currentState.die,
        nextText: 31
      },
      {
        text: 'Continue',
        requiredState: (currentState) => !currentState.die,
        nextText: 33
      }
    ]
  },
  {
    id: 31,
    text: 'It begins to rain. Acidic rain pours down from the sky.',
    options: [
      {
        text: 'Continue',
        nextText: 32
      }
    ]
  },
  {
    id: 32,
    text: 'You tried seeking shelter but it was too late. You died.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 33,
    text: 'Your decision to seek shelter before continuing your journey proves invaluable. Had you not, the acidic rain, which dried quickly, would have been deadly.',
    options: [
      {
        text: 'Continue',
        nextText: 34
      }
    ]
  },
  
  {
    id: 34,
    text: 'As I walked, feeling a bit bored, I decided to play a game. I found four leaves that looked exactly the same.',
    options: [
      {
        text: 'Continue',
        nextText: 35
      }
    ]
  },
  {
    id: 35,
    text: 'Which one of the four leaves would you choose to lift up? (The probability of winning = 1/4 = 0.25 or 25%)',
    options: (() => {
      const shuffledOptions = getShuffledNextTextOptions();
      return [
        { text: 'Leaf 1', nextText: shuffledOptions[0] },
        { text: 'Leaf 2', nextText: shuffledOptions[1] },
        { text: 'Leaf 3', nextText: shuffledOptions[2] },
        { text: 'Leaf 4', nextText: shuffledOptions[3] },
      ];
    })()
  },
  {
    id: 36.1,
    text: 'You lift the leaf and found nothing. It seems you didn\'t find anything. Would you like to try again?',
    options: [
      {
        text: 'Yes',
        nextText: 36.4
      },
      {
        text: 'No',
        nextText: 37
      }
    ]
  },
  {
    id: 36.2,
    text: 'You lift the leaf and found nothing. It seems you didn\'t find anything. Would you like to try again?',
    options: [
      {
        text: 'Yes',
        nextText: 36.4
      },
      {
        text: 'No',
        nextText: 37
      }
    ]
  },
  {
    id: 36.3,
    text: 'You lift the leaf and found nothing. It seems you didn\'t find anything. Would you like to try again?',
    options: [
      {
        text: 'Yes',
        nextText: 36.4
      },
      {
        text: 'No',
        nextText: 37
      }
    ]
  },
  {
    id: 36.4,
    text: 'Which one of the three leaves would you choose to lift up? (The probability of winning = 1/3 = 33.33%)',
    options: (() => {
      const shuffledOptions = getShuffledNextTextOptionsThree();
      return [
        { text: 'Leaf 1', nextText: shuffledOptions[0] },
        { text: 'Leaf 2', nextText: shuffledOptions[1] },
        { text: 'Leaf 3', nextText: shuffledOptions[2] },
      ];
    })()
  },
  {
    id: 36.5,
    text: 'You lift the leaf and found nothing. It seems you didn\'t find anything special this time.',
    options: [
      {
        text: 'Continue',
        nextText: 37
      }
    ]
  },
  {
    id: 36.6,
    text: 'You lift the leaf and found nothing. It seems you didn\'t find anything special this time.',
    options: [
      {
        text: 'Continue',
        nextText: 37
      }
    ]
  },
  {
    id: 36.7,
    text: 'As you lift the leaf, you find a small rock underneath it. But wait, something is different. The rock begins to glow and a portal opens up beneath it.',
    options: [
      {
        text: 'Step into the portal',
        nextText: 39
      }
    ]
  },
  {
    id: 37,
    text: 'As you venture along the winding road, anticipation thickens the air. Each step brings you closer to the rumored portal, holding untold treasures and unimaginable power.',
    options: [
      {
        text: 'Continue',
        nextText: 37.1
      }
    ]
  },
  {
    id: 37.1,
    text: 'The path gets narrower, and the trees whisper secrets of old times. Your heart beats fast with excitement as you move forward, pulled by the portal\'s attraction.',
    options: [
      {
        text: 'Continue',
        nextText: 38
      }
    ]
  },
  {
    id: 38,
    text: 'Finally, you reach the end of the road. A towering archway, draped in ivy and mystery, stands before you. The portal pulses with an otherworldly energy, casting a mesmerizing glow.',
    options: [
      {
        text: 'Step into the portal',
        nextText: 39
      }
    ]
  },
  {
    id: 39,
    text: 'You step into the portal and feel yourself being transported through time and space. Bright lights and swirling colors surround you until finally, everything goes black.',
    options: [
      {
        text: 'Continue',
        nextText: 40
      }
    ]
  },
  {
    id: 40,
    text: 'You woke up.',
    options: [
      {
        text: 'Continue',
        nextText: 41
      }
    ]
  },
  {
    id: 41,
    text: 'And as you awaken in your own bed, the memories of your incredible journey begin to fade like the remnants of a dream. But deep within your heart, you know that the adventure will stay with you always, a reminder of the power of imagination and the magic that lies within us all.',
    options: [
      {
        text: 'Continue',
        nextText: 42
      }
    ]
  },
  {
    id: 42,
    text: 'The End',
    options: [
      {
        text: 'Start Over',
        nextText: -1
      }
    ]
  }
]

startGame()