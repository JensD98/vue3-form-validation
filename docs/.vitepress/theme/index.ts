import {
  App,
  defineComponent,
  ComponentPublicInstance,
  DefineComponent
} from 'vue';
import { storeKey, createStore } from './composables/useStore';
import Layout from './Layout.vue';

// import '../styles/vars.css';
import '../styles/my-code.css';
// import '../styles/custom-blocks.css';
// import '../styles/layout.css';
// import '../styles/side-bar-links.css';

const theme = {
  Layout,
  enhanceApp({ app }: { app: App; router: any; siteData: any }) {
    app.provide(storeKey, createStore());
  }
};

export default theme;
