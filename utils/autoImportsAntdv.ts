import { addComponent } from '@nuxt/kit';
import * as AntDV from 'ant-design-vue';

export default async function resolveAntDVComponents(options: any, nuxt: any) {
  for (const key in AntDV) {
    // if (['version', 'install'].includes(key)) continue;
    if (typeof key === 'string') {
      await addComponent({
        filePath: 'ant-design-vue/es',
        name: `A${key}`,
        export: key,
        prefetch: true,
        preload: true,
      });
    } else if (Array.isArray(key)) {
      await addComponent({
        filePath: 'ant-design-vue/es',
        name: `A${key[0]}`,
        export: key[0],
        prefetch: true,
        preload: true,
      });
    }
  }
}
