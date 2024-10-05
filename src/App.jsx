import { useEffect, useState } from "react"
import earth from "./assets/planetImages/earth.png"
import moon from "./assets/planetImages/moon.png"
import mars from "./assets/planetImages/mars.png"
import jupiter from "./assets/planetImages/jupiter.png"
import saturn from "./assets/planetImages/saturn.png"
import uranus from "./assets/planetImages/uranus.png"
import neptune from "./assets/planetImages/neptune.png"
import planetNine from "./assets/planetImages/planetNine.png"
import rocketNoBoost from "./assets/rocketImages/rocketNoBoost.png"
import rocketWithBoost from "./assets/rocketImages/rocketWithBoost.png"

function App() {
  const [game, setGame] = useState(null)
  const [hoveredPlanet, setHoveredPlanet] = useState("")

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game) // Ensure game state updates with Rune's time
      },
    })
  }, [])

  if (!game) {
    return (
      <div className="text-green-500 text-2xl font-mono text-center mt-[40vh]">
        Loading...
      </div>
    )
  }

  const { currentPlanet, boost, time } = game || {
    currentPlanet: "Earth",
    time: "00:00",
  }

  const planetData = [
    { name: "Earth", image: earth },
    { name: "Moon", image: moon },
    { name: "Mars", image: mars },
    { name: "Jupiter", image: jupiter },
    { name: "Saturn", image: saturn },
    { name: "Uranus", image: uranus },
    { name: "Neptune", image: neptune },
    { name: "Planet Nine", image: planetNine },
  ]

  return (
    <div className="flex flex-col min-h-screen px-6 py-4 bg-black text-green-500 font-mono text-center justify-between">
      {/* Header */}
      <header className="pt-8">
        <h1 className="text-yellow-400 text-4xl font-bold uppercase tracking-wide mb-4">
          Destination Planet Nine
        </h1>
        <p className="text-gray-300 text-base">
          Can you identify the true space facts and reach Planet Nine? Get ready
          for takeoff! First player to reach Planet Nine wins.
        </p>
      </header>

      {/* Planet Progress Bar (Horizontal) */}
      <div className="flex justify-center mt-6 mb-4 overflow-x-auto space-x-4">
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
              width={50}
              height={50}
              className={`transition-opacity opacity-50 hover:opacity-100 ${currentPlanet === planet.name ? "opacity-100" : ""}`}
            />
            {hoveredPlanet === planet.name && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-300 text-xs bg-black p-1 rounded shadow-lg">
                {planet.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Retro Time Display (Time from Rune) */}
      <div className="flex justify-end mb-4 pr-4">
        <div className="bg-black border-4 border-green-500 text-green-500 font-bold text-3xl py-2 px-4 rounded-md">
          {/* Display the dynamic time from Rune */}
          <p>{time ? time : "00:00"}</p>
        </div>
      </div>

      {/* Main Game Area (Rocket directly above larger Earth) */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <img
          src={boost ? rocketWithBoost : rocketNoBoost}
          alt="Rocket"
          width={260} // Rocket is bigger now
          height={260}
          className="mb-2"
        />
        <img src={earth} alt="Earth" width={300} height={300} />{" "}
        {/* Earth is now doubled */}
      </div>

      {/* Play Button */}
      <button
        className="bg-yellow-400 text-black font-bold py-3 px-8 mt-6 rounded-lg hover:bg-yellow-500 transition duration-200"
        onClick={() => Rune.actions.startGame()}
      >
        Play Game
      </button>
    </div>
  )
}

export default App
