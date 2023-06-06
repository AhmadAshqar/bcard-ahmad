import { UserMapToModelType } from "../../models/types/userType";

const mapUserToModel = (user: UserMapToModelType) => {
  return {
    id: user._id,
    first: user.name.first,
    middle: user.name.middle,
    last: user.name.last,
    phone: user.phone,
    email: user.email,
    password: user.password,
    url: user.image.url,
    alt: user.image.alt,
    state: user.address.state,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    houseNumber: +user.address.houseNumber,
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
  };
};

export default mapUserToModel;
