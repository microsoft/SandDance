import Vue, { PropType } from 'vue';
import { deepCompare } from './util';
import { specs, types, VegaDeckGl, Viewer } from '@msrvida/sanddance';

import '../node_modules/@msrvida/sanddance/dist/css/sanddance.css';

function addNullable(insight: specs.Insight, signalValues: specs.SignalValues) {
    const withNulls: specs.Insight = { view: null, filter: null, ...insight, signalValues };
    return withNulls;
}

export default Vue.extend({
    name: 'SandDanceVue',
    props: {
        viewerOptions: Object as PropType<Partial<types.ViewerOptions>>,
        insight: {
            type: Object as PropType<specs.Insight>,
            required: true,
        },
        data: {
            type: Array as PropType<Object[]>,
            required: true,
        },
        renderOptions: Object as PropType<types.RenderOptions>,
    },
    data: function () {
        return {
            viewer: undefined,
            lastData: [],
        };
    },
    computed:{
        needsLayout: function () {
            return this.insight && this.data && !this.areLayoutPropsSame;
        },
        areLayoutPropsSame: function () {
            const currentInsight = this.viewer.getInsight();
            const a = addNullable(currentInsight, { ...this.viewer.insight.signalValues, ...currentInsight.signalValues });
            const b = addNullable(this.insight, { ...a.signalValues, ...this.insight.signalValues });
            const compare = deepCompare(a, b);
            return compare && (this.data === this.lastData);
        }
    },
    methods: {
        layout: function () {
            this.lastData = this.data;
            this.viewer.render(
                this.insight,
                this.data,
                this.renderOptions
            ).then(renderResult => {
                this.$emit('view', renderResult);
            }).catch(e => {
                this.$emit('error', e);
            });
        },
        view: function () {
            if (this.needsLayout) {
                this.layout();
            }
        }
    },
    mounted: function () {
        this.viewer = new Viewer(this.$refs.viewerDiv as HTMLElement, this.viewerOptions);
        this.$emit('mounted', this.viewer.presenter.getElement(VegaDeckGl.PresenterElement.gl));
        this.view();
    },
    updated: function () {
        this.viewer.options = VegaDeckGl.util.deepMerge(this.viewer.options, this.viewerOptions) as types.ViewerOptions;
        this.view();
    },
    beforeDestroy: function () {
        this.viewer.finalize();
    }
});