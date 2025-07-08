const INJECT_METADATA_KEY = 'custom:inject_tokens';

export function Inject(token?: any): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        const existingTokens = getInjectTokens(target);
        existingTokens[parameterIndex] = token;
        Reflect.defineMetadata(INJECT_METADATA_KEY, existingTokens, target);
    };
}

export function getInjectTokens(target: any): any[] {
    return Reflect.getMetadata(INJECT_METADATA_KEY, target) || [];
}
