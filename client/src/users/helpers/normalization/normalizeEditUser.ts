import { UserMapToModelType } from "../../models/types/userType";

const normalizeEditUser = (user: UserMapToModelType) => {
  return {
    name: {
      first: user.name.first,
      middle: user.name.middle,
      last: user.name.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.image.url,
      alt: user.image.alt,
    },
    address: {
      state: user.address.state,
      country: user.address.country,
      city: user.address.city,
      street: user.address.street,
      houseNumber: +user.address.houseNumber,
    },
    isBusiness: user.isBusiness,
  };
};

export default normalizeEditUser;
