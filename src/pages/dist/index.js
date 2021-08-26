"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var componentType_1 = require("@/constants/componentType");
var ViewRender_1 = require("@/core/Render/ViewRender/ViewRender");
var react_1 = require("react");
function IndexPage() {
    var button = {
        name: "Button",
        type: componentType_1.componentType.Base,
        val: "test",
        children: [],
        dragID: "12"
    };
    var _a = react_1.useState({
        name: "flex",
        val: "",
        type: componentType_1.componentType.Layout,
        children: [button],
        total: 5,
        dragID: "newFlex",
        setChildren: function () {
            setNewFlex(function (prev) {
                var children = prev.children, others = __rest(prev, ["children"]);
                return __assign(__assign({}, others), { children: __spreadArrays(children, children) });
            });
        },
        style: { margin: "10px" }
    }), newFlex = _a[0], setNewFlex = _a[1];
    var _b = react_1.useState([button, newFlex]), children = _b[0], setChildren = _b[1];
    var root = react_1.useState({
        name: "flex",
        val: "",
        type: componentType_1.componentType.Layout,
        children: children,
        total: 5,
        dragID: "drag",
        setChildren: function () {
            setChildren(function (prev) { return __spreadArrays(prev, prev); });
        }
    });
    return React.createElement(ViewRender_1.ViewRender, { root: root, style: { width: "80vw" } });
}
exports["default"] = IndexPage;
