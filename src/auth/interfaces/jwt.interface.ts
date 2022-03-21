export default interface Jwt {
  id: string;
  iat: number;
  exp: number;
  iss: string;
  roles: string[];
}
