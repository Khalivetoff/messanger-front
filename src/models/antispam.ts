import {ShallowRef} from "vue";

export interface IAntispamData {
  isValid: ShallowRef<boolean>;
  update(): void;
}

export interface IUseAntispam {
  antispamRef: ShallowRef<IAntispamData | undefined>;
  isAntispamValid: ShallowRef<boolean>;
  updateAntispam(): void;
}
