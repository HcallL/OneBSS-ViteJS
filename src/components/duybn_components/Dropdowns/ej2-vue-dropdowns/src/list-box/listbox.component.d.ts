import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * ListBox component allows the user to select values from the predefined list of values.
 * ```html
 * <ejs-listbox :dataSource='data'></ejs-listbox>
 * ```
 */
export declare class ListBoxComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    constructor();
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    addItems(items: Object[] | Object, itemIndex?: number): void;
    enableItems(items: string[], enable: boolean, isValue?: boolean): void;
    filter(dataSource: undefined[] | Object | string[] | number[] | boolean[], query?: Object, fields?: Object): void;
    getDataByValue(value: string | number | boolean): Object | string | number | boolean;
    getDataByValues(value: string[] | number[] | boolean[]): undefined[];
    getDataList(): undefined[] | string[] | boolean[] | number[];
    getItems(): Object[];
    getSortedList(): undefined[] | string[] | boolean[] | number[];
    moveAllTo(targetId?: string, index?: number): void;
    moveDown(value?: string[] | number[] | boolean[]): void;
    moveTo(value?: string[] | number[] | boolean[], index?: number, targetId?: string): void;
    moveUp(value?: string[] | number[] | boolean[]): void;
    removeItem(items?: undefined[] | undefined | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    removeItems(items?: Object[] | Object, itemIndex?: number): void;
    requiredModules(): Object[];
    selectAll(state: boolean): void;
    selectItems(items: string[], state: boolean, isValue?: boolean): void;
}
export declare const ListBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
