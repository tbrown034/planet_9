import { useEffect, useState } from "react"
import earth from "./assets/planetImages/earth.png"
import moon from "./assets/planetImages/moon.png"
import mars from "./assets/planetImages/mars.png"
import rocketNoBoost from "./assets/rocketImages/rocketNoBoost.png"
import rocketWithBoost from "./assets/rocketImages/rocketWithBoost.png"

function App() {
  const [game, setGame] = useState()
  const [yourPlayerId, setYourPlayerId] = useState()
  const [hoveredPlanet, setHoveredPlanet] = useState("")

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

        // Play sound when an action happens (optional, like selecting an answer).
        if (action && action.name === "answerQuestion") selectSound.play()
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div> // Loading screen
  }

  const { currentPlanet, boost, time, players, currentQuestion } = game

  const planetData = [
    { name: "Earth", image: earth },
    { name: "Moon", image: moon },
    { name: "Mars", image: mars },
    // add other planets like Jupiter, Saturn, Uranus, etc.
  ]

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 font-mono text-white">
      {/* Header */}
      <header className="w-full mb-8 text-center">
        <h1 className="mb-2 text-5xl font-bold tracking-wide text-yellow-400">
          Destination Planet Nine
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Can you identify the true space facts and reach Planet Nine? Get ready
          for takeoff!
        </p>
      </header>

      {/* Planet Progress Bar, Timer, and Scoreboard */}
      <div className="relative flex items-center justify-between w-full mb-12 space-x-4">
        {/* Planet Progress Bar */}
        <div className="flex space-x-4">
          {planetData.map((planet, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredPlanet(planet.name)}
              onMouseLeave={() => setHoveredPlanet("")}
            >
              <img
                src={planet.image}
                alt={planet.name}
                width={40}
                height={40}
                className={`transition-opacity opacity-50 hover:opacity-100 ${
                  currentPlanet === planet.name ? "glow" : ""
                }`}
              />
              {hoveredPlanet === planet.name && (
                <div className="absolute left-0 p-1 text-xs text-yellow-300 bg-black rounded shadow-lg top-10">
                  {planet.name}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timer */}
        <div className="p-4 text-yellow-300 bg-black rounded-lg shadow-lg bg-opacity-60">
          <p>Time: {time || "00:00"}</p>
        </div>

        {/* Scoreboard */}
        <div className="p-4 text-white bg-black rounded-lg shadow-lg bg-opacity-60">
          <h3 className="mb-1 text-sm font-bold">Scoreboard</h3>
          <ul className="text-xs">
            {players?.map((player, index) => (
              <li key={index}>
                {player.name}: {planetData[player.currentPlanet]?.name || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center">
        {/* Earth (or other current planet) below Rocket */}
        <img
          src={planetData[currentPlanet]?.image || earth}
          alt={planetData[currentPlanet]?.name || "Planet"}
          width={120}
          height={120}
          className="absolute bottom-16"
        />

        {/* Rocket Display */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={boost ? rocketWithBoost : rocketNoBoost}
            alt="Rocket"
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Question and Answer Section */}
      {currentQuestion && (
        <div className="mt-6">
          <h2 className="text-2xl mb-4">
            Guess the true fact about {currentQuestion.planet}
          </h2>
          <div className="flex space-x-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => Rune.actions.answerQuestion(option)}
                className="px-4 py-2 bg-yellow-300 rounded-lg shadow hover:bg-yellow-400"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
