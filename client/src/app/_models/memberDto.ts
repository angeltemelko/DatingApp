import { PhotoDto } from "./PhotoDto";

export interface MembersDto {
  id: string;
  userName: string;
  photoUrl: string;
  age: number;
  knowAs: string;
  gender: string;
  createdOn: string;
  lastActive: string;
  city: string;
  country: string;
  introduction: string;
  interests: string;
  lookingFor: string;
  photos: PhotoDto[];
}
