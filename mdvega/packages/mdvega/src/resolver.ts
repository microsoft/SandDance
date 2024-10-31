import { Spec } from 'vega';
import { compile } from 'vega-lite';

export interface Resolver {
    spec?: Spec;
    error?: Error;
}

export async function resolveSpec(textContent: string): Promise<Resolver> {
    try {
        const either = JSON.parse(textContent);
        if (typeof either === 'object') {
            return resolveToVega(either);
        } else {
            return { error: new Error(`Spec must be either a JSON object or a string url, found type ${typeof either}`) };
        }
    } catch (error) {
        //see if it is a url, then await to load the json for a spec
        if (textContent.startsWith('http://') || textContent.startsWith('https://') || textContent.startsWith('//')) {
            try {
                const response = await fetch(textContent);
                const either = await response.json();
                if (typeof either === 'object') {
                    return resolveToVega(either);
                } else {
                    return { error: new Error(`Expected a JSON object, found type ${typeof either}`) };
                }
            } catch (error) {
                return { error };
            }
        } else {
            return { error: new Error('Spec string must be a url') };
        }
    }
}

function resolveToVega(either: any): Resolver {
    if ('$schema' in either && typeof either.$schema === 'string') {
        if (either.$schema.includes('vega-lite')) {
            //compile to vega
            try {
                const spec = compile(either).spec;
                return { spec };
            } catch (error) {
                //did not compile
                return { error };
            }
        } else if (either.$schema.includes('vega')) {
            return { spec: either as Spec };
        } else {
            return { error: new Error('$schema property must be a string with vega or vega-lite version.') };
        }
    } else {
        return { error: new Error('Missing $schema property, must be a string with vega or vega-lite version.') };
    }
}
