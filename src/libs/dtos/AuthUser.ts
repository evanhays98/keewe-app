import { BaseEntity } from './Common';

export interface User extends BaseEntity {
  username: string;
  mail: string;
}

export interface UserAccessToken extends BaseEntity {
  accessToken: string;
  userInfo: User;
}

export interface CreateUser {
  username: string;
  mail: string;
  password: string;
}

export interface LoginUser {
  identifier: string;
  password: string;
}
