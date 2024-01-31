export interface sendCodeTypes {
    [x: string]: any;
    account: string;
    areaCode: string;
    status: number;
  }
  
export interface signUpTypes {
    [x: string]: any;
    account: string;
    area:string;
    areaCode: string;
    authCode:string
    shareCode: string;
  }
  export interface ErrorType {
    msg: any;
  }