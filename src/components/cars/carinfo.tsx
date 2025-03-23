interface CarInfoPropsType {
  name: string,
  price: number,
}
export default function CarInfo({ name, price }: CarInfoPropsType) {
  return (
    <div className="flex justify-between items-start mb-6">
      {/* Car Name and Icons */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-blue-900">{name}</h1>

        </div>

        {/* Price Section */}
        <p className="text-2xl font-bold text-blue-900 mt-2">
          ฿ {price.toLocaleString()}
        </p>

      </div>

      {/* Save and Share buttons on the right */}
      {/* <div className="flex gap-3"> */}
      {/*   <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"> */}
      {/*     <Heart size={20} className="text-gray-400" /> */}
      {/*     <span className="text-base">Save</span> */}
      {/*   </button> */}
      {/*   <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"> */}
      {/*     <Share2 size={20} className="text-gray-400" /> */}
      {/*     <span className="text-base">Share</span> */}
      {/*   </button> */}
      {/* </div> */}
    </div>
  );
}
