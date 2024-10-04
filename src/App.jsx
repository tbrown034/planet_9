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
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
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
    <div className="flex flex-col min-h-screen p-6 font-mono text-white bg-black">
      {/* Header */}
      <header className="w-full text-center pt-4">
        <h1 className="mb-2 text-4xl font-bold tracking-wide text-yellow-400">
          Destination Planet Nine
        </h1>
        <p className="text-md text-gray-300">
          Can you identify the true space facts and reach Planet Nine? Get ready
          for takeoff!
        </p>
      </header>

      {/* Planet Progress Bar (Horizontal) */}
      <div className="flex justify-center w-full mt-8 mb-6 space-x-4 overflow-x-auto">
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
              className={`transition-opacity opacity-50 hover:opacity-100 ${
                currentPlanet === planet.name ? "glow" : ""
              }`}
            />
            {hoveredPlanet === planet.name && (
              <div className="absolute p-1 text-xs text-yellow-300 bg-black rounded shadow-lg -top-8 left-1/2 -translate-x-1/2">
                {planet.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Time Display (Retro Style) */}
      <div className="absolute top-10 right-10 p-2 text-green-500 bg-black rounded-lg shadow-lg bg-opacity-60 retro-font">
        <p>Time: {time}</p>
      </div>

      {/* Main Game Area (Rocket directly above Earth) */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <img
          src={boost ? rocketWithBoost : rocketNoBoost}
          alt="Rocket"
          width={120}
          height={120}
          className="mb-4"
        />
        <img src={earth} alt="Earth" width={150} height={150} />
      </div>
      <button className=" b">Play Again</button>

      {/* Retro Font Styling */}
      <style jsx>{`
        .retro-font {
          font-family: "Courier New", Courier, monospace;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  )
}

export default App
