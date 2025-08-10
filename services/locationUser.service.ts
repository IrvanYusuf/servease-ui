import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import { LocationUser } from "@/types/location-user";

const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung."));
    }

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const fetchProvinceFromCoords = async () => {
  const position = await getCurrentLocation();
  const { latitude, longitude } = position.coords;

  const response = await axiosInstance.get(
    ENDPOINTS.userLocation.root(latitude, longitude)
  );

  if (response.status !== 200) {
    throw new Error("Gagal reverse geocoding");
  }

  const data: LocationUser = response.data.address;
  return data;
};

const LocationUserServices = {
  fetchProvinceFromCoords,
};

export default LocationUserServices;
