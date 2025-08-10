import axiosInstance from "@/lib/axios";
import { ENDPOINTS } from "./endpoints";
import { ApiResponse } from "@/types/api.type";
import { Address, MutationCreateAddress } from "@/types/address.type";
import { updateAddressPayload } from "@/schema/address.schema";

const mutationCreateAddress = async (payload: MutationCreateAddress) => {
  const response = await axiosInstance.post(ENDPOINTS.addresses.root, payload);
  return response.data;
};
const getAllAddresses = async (): Promise<ApiResponse<Address[]>> => {
  const response = await axiosInstance.get(ENDPOINTS.addresses.root);
  return response.data;
};

const setPrimaryAddress = async (addressId: string) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.addresses.setPrimary(addressId)
  );
  return response.data;
};

const getPrimaryAddress = async (): Promise<ApiResponse<Address>> => {
  const response = await axiosInstance.get(ENDPOINTS.addresses.getPrimary);
  return response.data;
};

/**
 * Update an address by its ID.
 * @param {Object} params - The parameters for updating address.
 * @param {string} params.addressId - The ID of the address to update.
 * @param {updateAddressPayload} params.payload - The payload for updating the address.
 */

const updateAddress = async ({
  addressId,
  payload,
}: {
  addressId: string;
  payload: updateAddressPayload;
}) => {
  const response = await axiosInstance.patch(
    ENDPOINTS.addresses.update(addressId),
    payload
  );

  return response.data;
};

/**
 *
 * Delete an address by its ID.
 * @param {string} addressId - The ID of address to delete.
 */
const deleteAddress = async (addressId: string) => {
  const response = await axiosInstance.delete(
    `${ENDPOINTS.addresses.root}/${addressId}`
  );
  return response.data;
};

const AddressesService = {
  mutationCreateAddress,
  getAllAddresses,
  setPrimaryAddress,
  deleteAddress,
  getPrimaryAddress,
  updateAddress,
};

export default AddressesService;
