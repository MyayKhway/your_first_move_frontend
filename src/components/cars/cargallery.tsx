interface CarGalleryPropsType {
  mainPicUrl: string,
  thumbnails: string[]
}

export default function CarGallery({ mainPicUrl, thumbnails }: CarGalleryPropsType) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Thumbnail Images */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className="w-[100px] md:w-[250px] h-[80px] md:h-[150px] overflow-hidden rounded"
          >
            <img
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Main Large Image */}
      <div className="flex-1 rounded overflow-hidden">
        <img
          src={mainPicUrl}
          alt="Main Image"
          className="w-full h-[250px] md:h-[620px] object-cover rounded-md"
        />
      </div>
    </div>
  );
}

// export default function CarGallery() {
//   return (
//     <div className="p-4 bg-gray-200">
//       <h2 className="text-xl font-bold">Car Gallery Component is Working</h2>
//     </div>
//   );
// }
