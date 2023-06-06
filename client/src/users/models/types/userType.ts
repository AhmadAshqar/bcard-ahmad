export type AddressType = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
};

export type ImageType = { url?: string; alt?: string };

export type UserNameType = { first: string; middle?: string; last: string };

export type UserType = {
  _id?: string;
  name: UserNameType;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
  isAdmin?: boolean;
};

export type UsersType = {
  name: UserNameType;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
  isAdmin?: boolean;
  _id?: string;
};

export type UserMapToModelType = {
  _id?: string;
  name: UserNameType;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
  isAdmin: boolean;
};

export type NormalizedEditUser = {
  name: UserNameType;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
  _id?: string;
};

export type TokenType = {
  _id?: string;
  isBusiness: boolean;
  isAdmin?: boolean;
};

export type Login = Pick<UserType, "email" | "password">;

export type RegistrationForm = {
  _id?: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};

export type RegistrationFormErrors = Partial<RegistrationForm>;

export type UserRegistered = {
  name: {
    first: string;
    middle?: string;
    last: string;
    _id?: string;
  };
  email: string;
  _id: string;
};

export type SearchUsers = {
  firstName: string;
  lastName: string;
  isBusiness: boolean;
};
export default UserType;
