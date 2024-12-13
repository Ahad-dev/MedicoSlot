import { DotLoader } from "react-spinners"


const LoaderPage = () => {
  return (
    <div className="h-screen bg-white gap-5 flex justify-center items-center p-1">
        <div className=" flex justify-center flex-col items-center gap-5     rounded-full">
            <div className="flex flex-col items-center gap-4">
                <img src="/logo.png" alt="" width={130} />
                <h1 className="text-3xl font-semibold text-center">Medico-Slot</h1>
            </div>
            <DotLoader
            color={"#3B82F6"}
            speedMultiplier={2}
            size={40}
            />
        </div>
    </div>
  )
}

export default LoaderPage