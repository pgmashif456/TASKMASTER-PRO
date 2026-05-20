  import type { User } from "firebase/auth";

export interface AppUser extends User {
  role: string;
}
