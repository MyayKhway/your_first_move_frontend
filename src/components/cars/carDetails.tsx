import CarGallery from "./cargallery"
import CarInfo from "./carinfo"
import DescriptionSection from "./description"
import KeyFeatures from "./keyfeature"
import ReviewsSection from "./review"
import DealershipInfo from "./dealership"
import { getRouteApi } from "@tanstack/react-router"

export default function CarDetails() {
  const routeApi = getRouteApi('/cars/$carId')
  const { dealer, CarDetails } = routeApi.useLoaderData()
  console.log(dealer)
  console.log(CarDetails)
  return (
    <div className="container mx-auto px-4 pb-16 pt-20">
      <CarGallery mainPicUrl={CarDetails.mainPicUrl} thumbnails={[...CarDetails.otherImageUrls]} />
      <CarInfo name={`${CarDetails.make} ${CarDetails.model}`} price={CarDetails.msrp} />
      <br></br>
      <div className="bg-blue-100 p-6 rounded-lg">
        <DescriptionSection />
        <KeyFeatures />
      </div>
      <br></br>

      {/* Reviews and Dealership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReviewsSection />
        <DealershipInfo
          website={dealer.website}
          email={dealer.email}
          contactNumber={dealer.contactNumber}
          address={dealer.address}
          location={dealer.location}
        />
      </div>
    </div>
  )
}
