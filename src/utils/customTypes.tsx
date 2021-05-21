
export interface ICharacter {
  name: string;
  thumbnail: Ithumbnail;
  id: number;
  description: string;
}
interface Ithumbnail {
  path: string;
  extension: string;
}

export interface ISearchParams{
  
    ts: number;
    apikey: string;
    hash: string;
    limit: number;
    offset: number;
    orderBy: IOrderBy;
    nameStartsWith?:string;
}

export type IOrderBy = "name" | "-name" | "modified" |"-modified";

export interface IApiResponse{
  data:IApiSemiDataResponse;
}

type IApiSemiDataResponse = {
  data:IApiDataResponse;
}
type IApiDataResponse = {
  count:number;
  limit:number;
  offset:number;
  results:ICharacterData[];
  total:number;

}
export type ICharacterData = {
  description:string;
  id:number;
  modified:string;
  name:string;
  thumbnail:Ithumbnail;
  comics:IAdditionalInfoResponse;
  events:IAdditionalInfoResponse;
  stories:IAdditionalInfoResponse;
}
export type IAdditionalInfoResponse={
  available:number;
  collectionURI:string;
  items:IAdditionalData[];
}
export type IAdditionalData = {

  name:string;
  resourceURI:string;

}

export interface ICommentProps{
  description:string;
  displayName:string;
  userImage:string;
  id:string;
  uid:string;
}

export type IUser = {

  uid:UID;
  displayName?:string;
  email?:string;
  photoURL?:string;

}
export type UID = string;