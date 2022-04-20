import {IAntispamData, IUseAntispam} from "@/models/antispam";
import {computed, shallowRef} from "vue";

const useAntispam = (): IUseAntispam => {
  const antispamRef = shallowRef<IAntispamData | undefined>();
  const isAntispamValid = computed(() => !!antispamRef.value?.isValid);

  const updateAntispam = (): void => {
    antispamRef.value?.update();
  }

  return {
    antispamRef,
    isAntispamValid,
    updateAntispam
  }
}

export default useAntispam;
