import * as DataInference from '../src/index';

declare const vega: any;
declare const hljs: any;

const test = {
    display: (pandasHead: string, pandasInfo?: string, columnsJson?: string, highlight?: boolean) => {
        document.getElementById('pandasHead')!.innerHTML = pandasHead;
        document.getElementById('pandasInfo')!.innerHTML = pandasInfo || '';
        document.getElementById('columnsJson')!.innerHTML = columnsJson || '';
        if (highlight) {
            hljs.highlightAll();
        }
    },
    loadObjectArray: (data: object[]) => {
        const columns = DataInference.getColumnsFromData(vega.inferTypes, data);
        const columnsJson = JSON.stringify(columns, null, 2);
        const pandasHead = DataInference.pandasSimulation.head(columns, data);
        const pandasInfo = DataInference.pandasSimulation.info(columns, data);
        test.display(pandasHead, pandasInfo, columnsJson, true);
    },
    loadText: ({ url, format }) => {
        test.display('Loading...');
        vega.loader().load(url).then(function (text) {
            const data = vega.read(text, format);
            test.loadObjectArray(data);
        });
    },
};

document.getElementById('selectData')!.addEventListener('change', function (event) {
    test.loadText(JSON.parse((event.target as HTMLSelectElement).value));
});

test.loadText({ url: 'https://microsoft.github.io/SandDance/sample-data/titanicmaster.tsv', format: { type: 'tsv' } });
