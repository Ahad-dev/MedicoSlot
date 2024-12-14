import { FiLoader } from "react-icons/fi";

export const LoaderComponent = () => {
    return (
        //Loader with spin animation
        <div className="flex justify-center items-center m-auto ">
            <FiLoader className="animate-spin text-2xl"/>
        </div>
    )
}