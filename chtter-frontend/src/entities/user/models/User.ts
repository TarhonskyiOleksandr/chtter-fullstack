import type { AbstractModel } from "@/entities/AbstractModel";

export interface User extends AbstractModel {
  email: string;
  name: string;
}
