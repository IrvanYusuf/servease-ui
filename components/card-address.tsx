import { Edit, Star, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Address } from "@/types/address.type";
import { FC } from "react";

interface CardAddressProps {
  address: Address;
  showAction?: boolean;
  handleSetPrimary?: (id: string) => void;
  handleEditAddress?: (address: Address) => void;
  handleDeleteAddress?: (address: Address) => void;
}

const CardAddress: FC<CardAddressProps> = ({
  address,
  showAction = true,
  handleSetPrimary,
  handleEditAddress,
  handleDeleteAddress,
}) => {
  return (
    <Card key={address._id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex md:flex-row flex-col space-y-5 md:space-y-0 items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">
                  {address.label_alamat ?? "Rumah"}
                </h3>
                {address.isPrimary && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Utama
                  </Badge>
                )}
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                {/* <p className="font-medium text-gray-900">{address.name}</p> */}
                <p>{address.phone}</p>
                <p>{address.street_name}</p>
                <p>
                  {address.district}, {address.city}, {address.province}{" "}
                  {/* {address.postalCode} */}
                </p>

                <p>Desc: {address.description ? address.description : "-"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-auto space-y-3">
            {!address.isPrimary && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetPrimary?.(address._id)}
                className="cursor-pointer"
              >
                <Star className="w-4 h-4 mr-1" />
                Jadikan Utama
              </Button>
            )}
            {showAction && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => handleEditAddress?.(address)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAddress?.(address)}
                  className="text-red-600 cursor-pointer hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardAddress;
