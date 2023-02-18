import { useSelector } from "./use.selector";

export const useAuth  = () => useSelector(state => state.auth)