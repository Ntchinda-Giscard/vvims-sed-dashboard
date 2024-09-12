import Image from "next/image";
import pic from "@/public/assets/PHOTO-2024-09-12-12-52-51.jpg"

function Login() {
    return ( <>
        <div className=" flex flex-row min-w-sreen min-h-screen">
            <div className="flex w-1/3 min-h-full">
                <Image src={pic} alt="Car Rental" 
                    layout="fill" objectFit="cover" 
                />
            </div>
            <div className="flex w-2/3 min-h-full justify-center">

            </div>
        </div>
    </> );
}

export default Login;