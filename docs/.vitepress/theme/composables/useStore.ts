import { inject, InjectionKey, reactive, readonly } from 'vue';

type State = {
  sideBarHidden: boolean;
};

export const createStore = () => {
  const state = reactive<State>({
    sideBarHidden: false
  });

  return {
    actions: {
      toggleSideBarHidden() {
        state.sideBarHidden = !state.sideBarHidden;
      },
      setSideBarHidden(value: boolean) {
        state.sideBarHidden = value;
      }
    },
    state: readonly(state)
  };
};

export const storeKey: InjectionKey<ReturnType<typeof createStore>> = Symbol();

export const useStore = () => inject(storeKey, createStore());
