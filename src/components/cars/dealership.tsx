import { Globe, Mail, Phone, MapPin } from "lucide-react";

interface DealershipInfoPropsType {
  website: string,
  email: string,
  contactNumber: string,
  address: string,
  location: { lat: number, lng: number }
}

export default function DealershipInfo({ website, email, contactNumber, address, location }: DealershipInfoPropsType) {
  console.log(location)
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Recommend Locate Dealership
      </h2>

      <div className="space-y-3">
        {/* Website */}
        <div className="flex items-center gap-3">
          <Globe size={20} className="text-gray-600" />
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {website}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail size={20} className="text-gray-600" />
          <span className="text-gray-700">{email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={20} className="text-gray-600" />
          <span className="text-gray-700">{contactNumber}</span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-gray-600" />
          <span className="text-gray-700">{address}</span>
        </div>

        {/* Interactive Map */}
        {/* <div className="mt-4 rounded-lg overflow-hidden border border-gray-300"> */}
        {/*   <iframe */}
        {/*     src={dealerInfo.mapEmbedUrl} */}
        {/*     width="100%" */}
        {/*     height="350" */}
        {/*     style={{ border: 0, borderRadius: "8px" }} */}
        {/*     allowFullScreen */}
        {/*     loading="lazy" */}
        {/*     referrerPolicy="no-referrer-when-downgrade" */}
        {/*   /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
