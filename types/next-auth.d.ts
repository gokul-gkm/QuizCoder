import "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: "instructor" | "student";
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id?: string;
    role?: "instructor" | "student";
  }
}
