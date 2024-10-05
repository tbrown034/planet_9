// logic.js
import facts from "./assets/facts.json"

// Helper to get a planet name based on index
function getPlanetName(planetIndex) {
  const planetNames = [
    "Earth",
    "Moon",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Planet Nine",
  ]
  return planetNames[planetIndex] || "Unknown Planet"
}

// Get a random true fact from the planet's true facts
function getRandomTrueFact(planetFacts) {
  const trueFacts = planetFacts.true
  const randomIndex = Math.floor(Rune.deterministicRandom() * trueFacts.length)
  return trueFacts[randomIndex]
}

// Generate a random false fact
function getRandomFalseFact() {
  const falseFacts = [
    "This planet has two suns!",
    "Aliens live here.",
    "It rains diamonds here.",
    "The planet spins backward!",
  ]
  const randomIndex = Math.floor(Rune.deterministicRandom() * falseFacts.length)
  return falseFacts[randomIndex]
}

// Generate a random question for a given planet index
function generateQuestion(planetIndex) {
  const planetName = getPlanetName(planetIndex)
  const planetFacts = facts[planetName]

  if (!planetFacts) {
    return {
      planet: planetName,
      options: ["No facts available."],
      correctFact: "",
    }
  }

  const randomTrueFact = getRandomTrueFact(planetFacts)
  const falseFact = getRandomFalseFact()

  // Shuffle options
  const options = [randomTrueFact, falseFact].sort(
    () => Rune.deterministicRandom() - 0.5
  )

  return {
    planet: planetName,
    options,
    correctFact: randomTrueFact,
  }
}

// Utility to check if the answer is correct
function checkAnswer(correctFact, answer) {
  return correctFact === answer
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const initialPlayerState = allPlayerIds.reduce((state, playerId) => {
      state[playerId] = {
        currentPlanet: 0, // Start at Earth (index 0)
        correctAnswers: 0,
        incorrectAnswers: 0,
        boost: false,
      }
      return state
    }, {})

    return {
      players: initialPlayerState,
      currentQuestion: generateQuestion(0), // Start with Earth
      gameStarted: false,
    }
  },
  actions: {
    startGame: (payload, { game }) => {
      game.gameStarted = true
    },
    answerQuestion: ({ answer }, { game, playerId }) => {
      const player = game.players[playerId]

      if (!player) {
        throw Rune.invalidAction()
      }

      const planetIndex = player.currentPlanet
      const isCorrect = checkAnswer(game.currentQuestion.correctFact, answer)

      if (isCorrect) {
        player.correctAnswers += 1
        player.currentPlanet += 1 // Move to next planet
        player.boost = true // Activate boost

        // Check if the player has reached Planet Nine
        if (player.currentPlanet >= 8) {
          // 8th index is Planet Nine
          Rune.gameOver({
            players: {
              [playerId]: "WON",
            },
          })
        } else {
          // Set a new question for the next planet
          game.currentQuestion = generateQuestion(player.currentPlanet)
        }
      } else {
        player.incorrectAnswers += 1
        player.boost = false // Deactivate boost
        // Generate a new question for the current planet
        game.currentQuestion = generateQuestion(player.currentPlanet)
      }
    },
  },
})
