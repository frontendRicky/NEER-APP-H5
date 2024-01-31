/*
 * @LastEditors: John
 * @Date: 2024-01-19 11:31:12
 * @LastEditTime: 2024-01-25 15:42:25
 * @Author: John
 */
import { create } from "zustand";
import { CountryItem } from "../type/SelectCountry";
// 状态管理器
export interface UserState {
  SelectCountry: CountryItem | null;
  UpdateSelectCountry: (item: CountryItem) => void
  Token: string;
  UpdateToken: (token: string) => void;
  CurrentPhoneNumber:string;
  UpdateCurrentPhoneNumber: (number: string) => void;
  previousPathName:string;
  UpdatePreviousPathName:(number: string) => void;
}

const useUserStore = create<UserState>()((set) => ({
  SelectCountry: null,
  UpdateSelectCountry: (item) =>
    set((state) => {
      return { ...state, SelectCountry: item };
    }),

  Token: "",
  UpdateToken: (token) =>
    set((state) => {
      return { ...state, Token: token };
    }),
  CurrentPhoneNumber:'',
  UpdateCurrentPhoneNumber: (val) =>
    set((state) => {
        return { ...state, CurrentPhoneNumber: val };
      }),
   previousPathName:'/',
   UpdatePreviousPathName:(url) =>
      set((state)=>{
        return {...state,previousPathName:url}
      })
}));

export default useUserStore;
