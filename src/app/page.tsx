import Image from "next/image";
export default function Main() {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-between">
      <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
        <div className="flex gap-x-[20px]">
          <Image className="border-4 rounded-2xl cursor-pointer" src="/logo.png" width={600} height={600} alt="RiceBit Logo"></Image>
          <div className="flex flex-col justify-evenly">
            <div className="flex justify-center items-center text-[40px] w-[200px] h-[70px] font-bold bg-white rounded-2xl text-center cursor-pointer">Login</div>
            <div className="flex justify-center items-center text-[40px] w-[200px] h-[70px] font-bold bg-black text-white rounded-2xl text-center cursor-pointer">Register</div>
          </div>
        </div>
        <h2></h2>
      </div>
      <div>
        FOOTER
      </div>
    </div>
  );
}
