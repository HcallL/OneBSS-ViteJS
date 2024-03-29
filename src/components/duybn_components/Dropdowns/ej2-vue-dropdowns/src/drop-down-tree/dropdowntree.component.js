var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
export var properties = ['actionFailureTemplate', 'allowFiltering', 'allowMultiSelection', 'changeOnBlur', 'cssClass', 'delimiterChar', 'enablePersistence', 'enableRtl', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'mode', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'readonly', 'selectAllText', 'showCheckBox', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'treeSettings', 'unSelectAllText', 'value', 'width', 'wrapText', 'zIndex', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'keyPress', 'open', 'select'];
export var modelProps = ['value'];
/**
 * The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
 * ```html
 * <ejs-dropdowntree></ejs-dropdowntree>
 * ```
 */
var DropDownTreeComponent = /** @class */ (function (_super) {
    __extends(DropDownTreeComponent, _super);
    function DropDownTreeComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = false;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new DropDownTree({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    DropDownTreeComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    DropDownTreeComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
        if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
            var key = this.models.toString().match(/checked|value/) || [];
            var propKey = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                this.$emit('update:' + propKey, eventProp[propKey]);
                this.$emit('modelchanged', eventProp[propKey]);
            }
        }
        else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
            var key = this.models.toString().match(/currentView|selectedDate/) || [];
            var propKey = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                this.$emit('update:' + propKey, eventProp[propKey]);
                this.$emit('modelchanged', eventProp[propKey]);
            }
        }
        if (this.ej2Instances && this.ej2Instances._trigger) {
            this.ej2Instances._trigger(eventName, eventProp, successHandler);
        }
    };
    DropDownTreeComponent.prototype.render = function (createElement) {
        return createElement('input', this.$slots.default);
    };
    DropDownTreeComponent.prototype.clear = function () {
        return this.ej2Instances.clear();
    };
    DropDownTreeComponent.prototype.ensureVisible = function (item) {
        return this.ej2Instances.ensureVisible(item);
    };
    DropDownTreeComponent.prototype.getData = function (item) {
        return this.ej2Instances.getData(item);
    };
    DropDownTreeComponent.prototype.getLocaleName = function () {
        return this.ej2Instances.getLocaleName();
    };
    DropDownTreeComponent.prototype.hidePopup = function () {
        return this.ej2Instances.hidePopup();
    };
    DropDownTreeComponent.prototype.selectAll = function (state) {
        return this.ej2Instances.selectAll(state);
    };
    DropDownTreeComponent.prototype.showPopup = function () {
        return this.ej2Instances.showPopup();
    };
    DropDownTreeComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], DropDownTreeComponent);
    return DropDownTreeComponent;
}(ComponentBase));
export { DropDownTreeComponent };
export var DropDownTreePlugin = {
    name: 'ejs-dropdowntree',
    install: function (Vue) {
        Vue.component(DropDownTreePlugin.name, DropDownTreeComponent);
    }
};
