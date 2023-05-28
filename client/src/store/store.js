// import create from 'zustand';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  auth : {
    username : '',
    active : false
  }, serUsername : (name) => set((state) => ({ auth : { ...state.auth, username : name }}))
}))