import { Button } from "./ui/button";

export function NavBar() {
  return (
    <div className="h-auto flex justify-between items-center m-4 bg-transparent px-[10%]">
      <div>
        <span className="font-[Kanit]-300 font-bold italic text-sm">YOUR FIRST MOVE</span>
      </div>
      <div>
        <Button variant={"link"} className="font-[Poppins] text-gray-700">Home</Button>
        <Button variant={"link"} className="font-[Poppins] text-gray-700">Car Dealer Locations</Button>
        <Button className="font-[Poppins]">Login</Button>
      </div>
    </div>
  )
}
