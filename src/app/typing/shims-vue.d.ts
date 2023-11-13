export {}

declare module '*.vue' {
    // import type { DefineComponent } from 'vue';
    // const component: ReturnType<typeof DefineComponent>;
    // export default component;

    import type { DefineComponent } from 'vue'
    const component: DefineComponent
    export default component
}