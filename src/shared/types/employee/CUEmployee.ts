export default interface CUEmployee {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressStreet: string;
  addressCity: string;
  addressZip: string;
  addressCountry: string;
  storageId: string | null;
}
