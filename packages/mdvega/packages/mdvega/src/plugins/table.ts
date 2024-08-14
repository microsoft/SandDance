import { Plugin } from '../factory';

export const tablePlugin: Plugin = {
    name: 'table',
    initializePlugin: (md) => {
        console.log('Initializing table plugin', md);
    },
};
