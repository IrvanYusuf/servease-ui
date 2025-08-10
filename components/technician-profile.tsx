import { Star, Award, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/service.type";
import { truncateText } from "@/lib/utils";
import Image from "next/image";

interface TechnicianProfileProps {
  service: Service;
}

export default function TechnicianProfile({ service }: TechnicianProfileProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 aspect-square relative shrink-0 rounded-full overflow-hidden">
            <Image
              src={service.thumbnail ?? "/mechanic.avif"}
              alt={service?.name || "service image"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{service?.name || ""}</h3>
              <Badge className="bg-green-600">Verified</Badge>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium ml-1">{service?.rating || 0}</span>
                <span className="text-gray-500 ml-1">
                  ({service?.total_reviews || 0})
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />8 pengalaman
              </div>
            </div>

            <p
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{
                __html: truncateText({
                  text: service?.description || "",
                  length: 200,
                }),
              }}
            ></p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm">300+ pekerjaan selesai</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm">Teknisi Bersertifikat</span>
              </div>
            </div>

            {/* <div>
              <h4 className="font-medium mb-2">Sertifikasi:</h4>
              <ul className="space-y-1">
                {technician.certifications.map((cert) => (
                  <li
                    key={cert}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
