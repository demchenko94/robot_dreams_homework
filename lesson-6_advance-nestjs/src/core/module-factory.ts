import {Container} from "./container";
import {METADATA_KEYS} from "./metadata.keys";

export function createModuleContainer(moduleClass: any, parentContainer?: Container): Container {
    const metadata = Reflect.getMetadata(METADATA_KEYS.MODULE, moduleClass) || {};

    const container = new Container(parentContainer);

    (metadata.providers || []).forEach((provider: any) => {
        container.register(provider, provider);
    });

    (metadata.imports || []).forEach((importedModule: any) => {
        const child = createModuleContainer(importedModule, container);

        const importedMetadata = Reflect.getMetadata(METADATA_KEYS.MODULE, importedModule);
        const exported = importedMetadata?.exports || [];

        exported.forEach((prov: any) => {
            const instance = child.resolve(prov) as any;
            container.register(prov, instance);
        });
    });

    return container;
}
