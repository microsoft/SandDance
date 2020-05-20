import Vue, { PropType } from 'vue';
import { deepCompare } from './util';
import { specs, types, VegaDeckGl, Viewer } from '@msrvida/sanddance';

function addNullable(insight: specs.Insight, signalValues: specs.SignalValues) {
    const withNulls: specs.Insight = { view: null, filter: null, ...insight, signalValues };
    return withNulls;
}

export default Vue.extend({
    name: 'SandDanceVue',
    props: {
        viewerOptions: Object as PropType<Partial<types.ViewerOptions>>,
        insight: Object as PropType<specs.Insight>,
        viewerData: Object as PropType<Object[]>,
        renderOptions: Object as PropType<types.RenderOptions>,
    },
    data: {
        viever: new Viewer(this.$refs.vieverDiv, this.vieverOptions),
        lastData: [],
    },
    computed:{
        needsLayout: () => {
            return this.insight && this.data && this.areLayoutPropsSame;
        },
        areLayoutPropsSame: () => {
            const currentInsight = this.viewer.getInsight();
            const a = addNullable(currentInsight, { ...this.viewer.insight.signalValues, ...currentInsight.signalValues });
            const b = addNullable(this.insight, { ...a.signalValues, ...this.insight.signalValues });
            const compare = deepCompare(a, b);
            return compare && (this.viewerData === this.lastData);
        }
    },
    methods: {
        layout: () => {
            this.lastData = this.viewerData;
            this.viewer.render(
                this.insight,
                this.viewerData,
                this.renderOptions
            ).then(renderResult => {
                this.$emit('view', renderResult);
            }).catch(e => {
                this.$emit('error', e);
            });
        },
        view: () => {
            if (this.needsLayout) {
                this.layout();
            }
        }
    },
    mounted: function () {
        this.$emit('mounted', this.viewer.presenter.getElement(VegaDeckGl.PresenterElement.gl));
    },
    updated: function () {
        this.viewer.options = VegaDeckGl.util.deepMerge(this.viewer.options, this.viewerOptions) as types.ViewerOptions;
        this.view();
    },
    beforeDestroy: function () {
        this.viewer.finalize();
    }
});