type EmbedDependencyType = 'script' | 'stylesheet';

interface EmbedDependency {
    url: string;
    type: EmbedDependencyType;
    loaded?: boolean;
    existed?: boolean;
}
