!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("lodash")):"function"==typeof define&&define.amd?define(["exports","lodash"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["musicxml2json-guitar"]={},t.lodash)}(this,(function(t,e){"use strict";var s={},i={};!function(t){const e=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",s="["+e+"]["+(e+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040")+"]*",i=new RegExp("^"+s+"$");t.isExist=function(t){return void 0!==t},t.isEmptyObject=function(t){return 0===Object.keys(t).length},t.merge=function(t,e,s){if(e){const i=Object.keys(e),n=i.length;for(let r=0;r<n;r++)t[i[r]]="strict"===s?[e[i[r]]]:e[i[r]]}},t.getValue=function(e){return t.isExist(e)?e:""},t.isName=function(t){const e=i.exec(t);return!(null==e)},t.getAllMatches=function(t,e){const s=[];let i=e.exec(t);for(;i;){const n=[];n.startIndex=e.lastIndex-i[0].length;const r=i.length;for(let t=0;t<r;t++)n.push(i[t]);s.push(n),i=e.exec(t)}return s},t.nameRegexp=s}(i);const n=i,r={allowBooleanAttributes:!1,unpairedTags:[]};function o(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function a(t,e){const s=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const i=t.substr(s,e-s);if(e>5&&"xml"===i)return f("InvalidXml","XML declaration allowed only at the start of the document.",A(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function u(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let s=1;for(e+=8;e<t.length;e++)if("<"===t[e])s++;else if(">"===t[e]&&(s--,0===s))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}s.validate=function(t,e){e=Object.assign({},r,e);const s=[];let i=!1,l=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let r=0;r<t.length;r++)if("<"===t[r]&&"?"===t[r+1]){if(r+=2,r=a(t,r),r.err)return r}else{if("<"!==t[r]){if(o(t[r]))continue;return f("InvalidChar","char '"+t[r]+"' is not expected.",A(t,r))}{let c=r;if(r++,"!"===t[r]){r=u(t,r);continue}{let g=!1;"/"===t[r]&&(g=!0,r++);let C="";for(;r<t.length&&">"!==t[r]&&" "!==t[r]&&"\t"!==t[r]&&"\n"!==t[r]&&"\r"!==t[r];r++)C+=t[r];if(C=C.trim(),"/"===C[C.length-1]&&(C=C.substring(0,C.length-1),r--),h=C,!n.isName(h)){let e;return e=0===C.trim().length?"Invalid space after '<'.":"Tag '"+C+"' is an invalid name.",f("InvalidTag",e,A(t,r))}const D=d(t,r);if(!1===D)return f("InvalidAttr","Attributes for '"+C+"' have open quote.",A(t,r));let b=D.value;if(r=D.index,"/"===b[b.length-1]){const s=r-b.length;b=b.substring(0,b.length-1);const n=p(b,e);if(!0!==n)return f(n.err.code,n.err.msg,A(t,s+n.err.line));i=!0}else if(g){if(!D.tagClosed)return f("InvalidTag","Closing tag '"+C+"' doesn't have proper closing.",A(t,r));if(b.trim().length>0)return f("InvalidTag","Closing tag '"+C+"' can't have attributes or invalid starting.",A(t,c));if(0===s.length)return f("InvalidTag","Closing tag '"+C+"' has not been opened.",A(t,c));{const e=s.pop();if(C!==e.tagName){let s=A(t,e.tagStartPos);return f("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+s.line+", col "+s.col+") instead of closing tag '"+C+"'.",A(t,c))}0==s.length&&(l=!0)}}else{const n=p(b,e);if(!0!==n)return f(n.err.code,n.err.msg,A(t,r-b.length+n.err.line));if(!0===l)return f("InvalidXml","Multiple possible root nodes found.",A(t,r));-1!==e.unpairedTags.indexOf(C)||s.push({tagName:C,tagStartPos:c}),i=!0}for(r++;r<t.length;r++)if("<"===t[r]){if("!"===t[r+1]){r++,r=u(t,r);continue}if("?"!==t[r+1])break;if(r=a(t,++r),r.err)return r}else if("&"===t[r]){const e=m(t,r);if(-1==e)return f("InvalidChar","char '&' is not expected.",A(t,r));r=e}else if(!0===l&&!o(t[r]))return f("InvalidXml","Extra text at the end",A(t,r));"<"===t[r]&&r--}}}var h;return i?1==s.length?f("InvalidTag","Unclosed tag '"+s[0].tagName+"'.",A(t,s[0].tagStartPos)):!(s.length>0)||f("InvalidXml","Invalid '"+JSON.stringify(s.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):f("InvalidXml","Start tag expected.",1)};const l='"',h="'";function d(t,e){let s="",i="",n=!1;for(;e<t.length;e++){if(t[e]===l||t[e]===h)""===i?i=t[e]:i!==t[e]||(i="");else if(">"===t[e]&&""===i){n=!0;break}s+=t[e]}return""===i&&{value:s,index:e,tagClosed:n}}const c=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function p(t,e){const s=n.getAllMatches(t,c),i={};for(let t=0;t<s.length;t++){if(0===s[t][1].length)return f("InvalidAttr","Attribute '"+s[t][2]+"' has no space in starting.",C(s[t]));if(void 0!==s[t][3]&&void 0===s[t][4])return f("InvalidAttr","Attribute '"+s[t][2]+"' is without value.",C(s[t]));if(void 0===s[t][3]&&!e.allowBooleanAttributes)return f("InvalidAttr","boolean attribute '"+s[t][2]+"' is not allowed.",C(s[t]));const n=s[t][2];if(!g(n))return f("InvalidAttr","Attribute '"+n+"' is an invalid name.",C(s[t]));if(i.hasOwnProperty(n))return f("InvalidAttr","Attribute '"+n+"' is repeated.",C(s[t]));i[n]=1}return!0}function m(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let s=/\d/;for("x"===t[e]&&(e++,s=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(s))break}return-1}(t,++e);let s=0;for(;e<t.length;e++,s++)if(!(t[e].match(/\w/)&&s<20)){if(";"===t[e])break;return-1}return e}function f(t,e,s){return{err:{code:t,msg:e,line:s.line||s,col:s.col}}}function g(t){return n.isName(t)}function A(t,e){const s=t.substring(0,e).split(/\r?\n/);return{line:s.length,col:s[s.length-1].length+1}}function C(t){return t.startIndex+t[1].length}var D={};const b={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,s){return t}};D.buildOptions=function(t){return Object.assign({},b,t)},D.defaultOptions=b;const F=i;function G(t,e){let s="";for(;e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)s+=t[e];if(s=s.trim(),-1!==s.indexOf(" "))throw new Error("External entites are not supported");const i=t[e++];let n="";for(;e<t.length&&t[e]!==i;e++)n+=t[e];return[s,n,e]}function E(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function x(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function N(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function y(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function T(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function B(t){if(F.isName(t))return t;throw new Error(`Invalid entity name ${t}`)}const v=/^[-+]?0x[a-fA-F0-9]+$/,j=/^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/,w={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};var O=function(t){return"function"==typeof t?t:Array.isArray(t)?e=>{for(const s of t){if("string"==typeof s&&e===s)return!0;if(s instanceof RegExp&&s.test(e))return!0}}:()=>!1};const P=i,I=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){"__proto__"===t&&(t="#__proto__"),this.child.push({[t]:e})}addChild(t){"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}},_=function(t,e){const s={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let i=1,n=!1,r=!1,o="";for(;e<t.length;e++)if("<"!==t[e]||r)if(">"===t[e]){if(r?"-"===t[e-1]&&"-"===t[e-2]&&(r=!1,i--):i--,0===i)break}else"["===t[e]?n=!0:o+=t[e];else{if(n&&x(t,e)){let i,n;e+=7,[i,n,e]=G(t,e+1),-1===n.indexOf("&")&&(s[B(i)]={regx:RegExp(`&${i};`,"g"),val:n})}else if(n&&N(t,e))e+=8;else if(n&&y(t,e))e+=8;else if(n&&T(t,e))e+=9;else{if(!E)throw new Error("Invalid DOCTYPE");r=!0}i++,o=""}if(0!==i)throw new Error("Unclosed DOCTYPE")}return{entities:s,i:e}},S=function(t,e={}){if(e=Object.assign({},w,e),!t||"string"!=typeof t)return t;let s=t.trim();if(void 0!==e.skipLike&&e.skipLike.test(s))return t;if("0"===t)return 0;if(e.hex&&v.test(s))return function(t,e){if(parseInt)return parseInt(t,e);if(Number.parseInt)return Number.parseInt(t,e);if(window&&window.parseInt)return window.parseInt(t,e);throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")}(s,16);if(-1!==s.search(/[eE]/)){const i=s.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);if(i){if(e.leadingZeros)s=(i[1]||"")+i[3];else if("0"!==i[2]||"."!==i[3][0])return t;return e.eNotation?Number(s):t}return t}{const i=j.exec(s);if(i){const n=i[1],r=i[2];let o=function(t){if(t&&-1!==t.indexOf("."))return"."===(t=t.replace(/0+$/,""))?t="0":"."===t[0]?t="0"+t:"."===t[t.length-1]&&(t=t.substr(0,t.length-1)),t;return t}(i[3]);if(!e.leadingZeros&&r.length>0&&n&&"."!==s[2])return t;if(!e.leadingZeros&&r.length>0&&!n&&"."!==s[1])return t;if(e.leadingZeros&&r===t)return 0;{const i=Number(s),a=""+i;return-1!==a.search(/[eE]/)?e.eNotation?i:t:-1!==s.indexOf(".")?"0"===a&&""===o||a===o||n&&a==="-"+o?i:t:r?o===a||n+o===a?i:t:s===a||s===n+a?i:t}}return t}},M=O;function $(t){const e=Object.keys(t);for(let s=0;s<e.length;s++){const i=e[s];this.lastEntities[i]={regex:new RegExp("&"+i+";","g"),val:t[i]}}}function V(t,e,s,i,n,r,o){if(void 0!==t&&(this.options.trimValues&&!i&&(t=t.trim()),t.length>0)){o||(t=this.replaceEntitiesValue(t));const i=this.options.tagValueProcessor(e,t,s,n,r);if(null==i)return t;if(typeof i!=typeof t||i!==t)return i;if(this.options.trimValues)return J(t,this.options.parseTagValue,this.options.numberParseOptions);return t.trim()===t?J(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function k(t){if(this.options.removeNSPrefix){const e=t.split(":"),s="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=s+e[1])}return t}const L=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function X(t,e,s){if(!0!==this.options.ignoreAttributes&&"string"==typeof t){const s=P.getAllMatches(t,L),i=s.length,n={};for(let t=0;t<i;t++){const i=this.resolveNameSpace(s[t][1]);if(this.ignoreAttributesFn(i,e))continue;let r=s[t][4],o=this.options.attributeNamePrefix+i;if(i.length)if(this.options.transformAttributeName&&(o=this.options.transformAttributeName(o)),"__proto__"===o&&(o="#__proto__"),void 0!==r){this.options.trimValues&&(r=r.trim()),r=this.replaceEntitiesValue(r);const t=this.options.attributeValueProcessor(i,r,e);n[o]=null==t?r:typeof t!=typeof r||t!==r?t:J(r,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(n[o]=!0)}if(!Object.keys(n).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=n,t}return n}}const U=function(t){t=t.replace(/\r\n?/g,"\n");const e=new I("!xml");let s=e,i="",n="";for(let r=0;r<t.length;r++){if("<"===t[r])if("/"===t[r+1]){const e=H(t,">",r,"Closing Tag is not closed.");let o=t.substring(r+2,e).trim();if(this.options.removeNSPrefix){const t=o.indexOf(":");-1!==t&&(o=o.substr(t+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),s&&(i=this.saveTextToParentTag(i,s,n));const a=n.substring(n.lastIndexOf(".")+1);if(o&&-1!==this.options.unpairedTags.indexOf(o))throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);let u=0;a&&-1!==this.options.unpairedTags.indexOf(a)?(u=n.lastIndexOf(".",n.lastIndexOf(".")-1),this.tagsNodeStack.pop()):u=n.lastIndexOf("."),n=n.substring(0,u),s=this.tagsNodeStack.pop(),i="",r=e}else if("?"===t[r+1]){let e=W(t,r,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(i=this.saveTextToParentTag(i,s,n),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new I(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,n,e.tagName)),this.addChild(s,t,n)}r=e.closeIndex+1}else if("!--"===t.substr(r+1,3)){const e=H(t,"--\x3e",r+4,"Comment is not closed.");if(this.options.commentPropName){const o=t.substring(r+4,e-2);i=this.saveTextToParentTag(i,s,n),s.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}r=e}else if("!D"===t.substr(r+1,2)){const e=_(t,r);this.docTypeEntities=e.entities,r=e.i}else if("!["===t.substr(r+1,2)){const e=H(t,"]]>",r,"CDATA is not closed.")-2,o=t.substring(r+9,e);i=this.saveTextToParentTag(i,s,n);let a=this.parseTextData(o,s.tagname,n,!0,!1,!0,!0);null==a&&(a=""),this.options.cdataPropName?s.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]):s.add(this.options.textNodeName,a),r=e+2}else{let o=W(t,r,this.options.removeNSPrefix),a=o.tagName;const u=o.rawTagName;let l=o.tagExp,h=o.attrExpPresent,d=o.closeIndex;this.options.transformTagName&&(a=this.options.transformTagName(a)),s&&i&&"!xml"!==s.tagname&&(i=this.saveTextToParentTag(i,s,n,!1));const c=s;if(c&&-1!==this.options.unpairedTags.indexOf(c.tagname)&&(s=this.tagsNodeStack.pop(),n=n.substring(0,n.lastIndexOf("."))),a!==e.tagname&&(n+=n?"."+a:a),this.isItStopNode(this.options.stopNodes,n,a)){let e="";if(l.length>0&&l.lastIndexOf("/")===l.length-1)"/"===a[a.length-1]?(a=a.substr(0,a.length-1),n=n.substr(0,n.length-1),l=a):l=l.substr(0,l.length-1),r=o.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(a))r=o.closeIndex;else{const s=this.readStopNodeData(t,u,d+1);if(!s)throw new Error(`Unexpected end of ${u}`);r=s.i,e=s.tagContent}const i=new I(a);a!==l&&h&&(i[":@"]=this.buildAttributesMap(l,n,a)),e&&(e=this.parseTextData(e,a,n,!0,h,!0,!0)),n=n.substr(0,n.lastIndexOf(".")),i.add(this.options.textNodeName,e),this.addChild(s,i,n)}else{if(l.length>0&&l.lastIndexOf("/")===l.length-1){"/"===a[a.length-1]?(a=a.substr(0,a.length-1),n=n.substr(0,n.length-1),l=a):l=l.substr(0,l.length-1),this.options.transformTagName&&(a=this.options.transformTagName(a));const t=new I(a);a!==l&&h&&(t[":@"]=this.buildAttributesMap(l,n,a)),this.addChild(s,t,n),n=n.substr(0,n.lastIndexOf("."))}else{const t=new I(a);this.tagsNodeStack.push(s),a!==l&&h&&(t[":@"]=this.buildAttributesMap(l,n,a)),this.addChild(s,t,n),s=t}i="",r=d}}else i+=t[r]}return e.child};function R(t,e,s){const i=this.options.updateTag(e.tagname,s,e[":@"]);!1===i||("string"==typeof i?(e.tagname=i,t.addChild(e)):t.addChild(e))}const q=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const s=this.docTypeEntities[e];t=t.replace(s.regx,s.val)}for(let e in this.lastEntities){const s=this.lastEntities[e];t=t.replace(s.regex,s.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const s=this.htmlEntities[e];t=t.replace(s.regex,s.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function Z(t,e,s,i){return t&&(void 0===i&&(i=0===e.child.length),void 0!==(t=this.parseTextData(t,e.tagname,s,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,i))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function Y(t,e,s){const i="*."+s;for(const s in t){const n=t[s];if(i===n||e===n)return!0}return!1}function H(t,e,s,i){const n=t.indexOf(e,s);if(-1===n)throw new Error(i);return n+e.length-1}function W(t,e,s,i=">"){const n=function(t,e,s=">"){let i,n="";for(let r=e;r<t.length;r++){let e=t[r];if(i)e===i&&(i="");else if('"'===e||"'"===e)i=e;else if(e===s[0]){if(!s[1])return{data:n,index:r};if(t[r+1]===s[1])return{data:n,index:r}}else"\t"===e&&(e=" ");n+=e}}(t,e+1,i);if(!n)return;let r=n.data;const o=n.index,a=r.search(/\s/);let u=r,l=!0;-1!==a&&(u=r.substring(0,a),r=r.substring(a+1).trimStart());const h=u;if(s){const t=u.indexOf(":");-1!==t&&(u=u.substr(t+1),l=u!==n.data.substr(t+1))}return{tagName:u,tagExp:r,closeIndex:o,attrExpPresent:l,rawTagName:h}}function z(t,e,s){const i=s;let n=1;for(;s<t.length;s++)if("<"===t[s])if("/"===t[s+1]){const r=H(t,">",s,`${e} is not closed`);if(t.substring(s+2,r).trim()===e&&(n--,0===n))return{tagContent:t.substring(i,s),i:r};s=r}else if("?"===t[s+1]){s=H(t,"?>",s+1,"StopNode is not closed.")}else if("!--"===t.substr(s+1,3)){s=H(t,"--\x3e",s+3,"StopNode is not closed.")}else if("!["===t.substr(s+1,2)){s=H(t,"]]>",s,"StopNode is not closed.")-2}else{const i=W(t,s,">");if(i){(i&&i.tagName)===e&&"/"!==i.tagExp[i.tagExp.length-1]&&n++,s=i.closeIndex}}}function J(t,e,s){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&S(t,s)}return P.isExist(t)?t:""}var K=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(t,e)=>String.fromCharCode(Number.parseInt(e,10))},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(t,e)=>String.fromCharCode(Number.parseInt(e,16))}},this.addExternalEntities=$,this.parseXml=U,this.parseTextData=V,this.resolveNameSpace=k,this.buildAttributesMap=X,this.isItStopNode=Y,this.replaceEntitiesValue=q,this.readStopNodeData=z,this.saveTextToParentTag=Z,this.addChild=R,this.ignoreAttributesFn=M(this.options.ignoreAttributes)}},Q={};function tt(t,e,s){let i;const n={};for(let r=0;r<t.length;r++){const o=t[r],a=et(o);let u="";if(u=void 0===s?a:s+"."+a,a===e.textNodeName)void 0===i?i=o[a]:i+=""+o[a];else{if(void 0===a)continue;if(o[a]){let t=tt(o[a],e,u);const s=it(t,e);o[":@"]?st(t,o[":@"],u,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==n[a]&&n.hasOwnProperty(a)?(Array.isArray(n[a])||(n[a]=[n[a]]),n[a].push(t)):e.isArray(a,u,s)?n[a]=[t]:n[a]=t}}}return"string"==typeof i?i.length>0&&(n[e.textNodeName]=i):void 0!==i&&(n[e.textNodeName]=i),n}function et(t){const e=Object.keys(t);for(let t=0;t<e.length;t++){const s=e[t];if(":@"!==s)return s}}function st(t,e,s,i){if(e){const n=Object.keys(e),r=n.length;for(let o=0;o<r;o++){const r=n[o];i.isArray(r,s+"."+r,!0,!0)?t[r]=[e[r]]:t[r]=e[r]}}}function it(t,e){const{textNodeName:s}=e,i=Object.keys(t).length;return 0===i||!(1!==i||!t[s]&&"boolean"!=typeof t[s]&&0!==t[s])}Q.prettify=function(t,e){return tt(t,e)};const{buildOptions:nt}=D,rt=K,{prettify:ot}=Q,at=s;var ut=class{constructor(t){this.externalEntities={},this.options=nt(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const s=at.validate(t,e);if(!0!==s)throw Error(`${s.err.msg}:${s.err.line}:${s.err.col}`)}const s=new rt(this.options);s.addExternalEntities(this.externalEntities);const i=s.parseXml(t);return this.options.preserveOrder||void 0===i?i:ot(i,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}};function lt(t,e,s,i){let n="",r=!1;for(let o=0;o<t.length;o++){const a=t[o],u=ht(a);if(void 0===u)continue;let l="";if(l=0===s.length?u:`${s}.${u}`,u===e.textNodeName){let t=a[u];ct(l,e)||(t=e.tagValueProcessor(u,t),t=pt(t,e)),r&&(n+=i),n+=t,r=!1;continue}if(u===e.cdataPropName){r&&(n+=i),n+=`<![CDATA[${a[u][0][e.textNodeName]}]]>`,r=!1;continue}if(u===e.commentPropName){n+=i+`\x3c!--${a[u][0][e.textNodeName]}--\x3e`,r=!0;continue}if("?"===u[0]){const t=dt(a[":@"],e),s="?xml"===u?"":i;let o=a[u][0][e.textNodeName];o=0!==o.length?" "+o:"",n+=s+`<${u}${o}${t}?>`,r=!0;continue}let h=i;""!==h&&(h+=e.indentBy);const d=i+`<${u}${dt(a[":@"],e)}`,c=lt(a[u],e,l,h);-1!==e.unpairedTags.indexOf(u)?e.suppressUnpairedNode?n+=d+">":n+=d+"/>":c&&0!==c.length||!e.suppressEmptyNode?c&&c.endsWith(">")?n+=d+`>${c}${i}</${u}>`:(n+=d+">",c&&""!==i&&(c.includes("/>")||c.includes("</"))?n+=i+e.indentBy+c+i:n+=c,n+=`</${u}>`):n+=d+"/>",r=!0}return n}function ht(t){const e=Object.keys(t);for(let s=0;s<e.length;s++){const i=e[s];if(t.hasOwnProperty(i)&&":@"!==i)return i}}function dt(t,e){let s="";if(t&&!e.ignoreAttributes)for(let i in t){if(!t.hasOwnProperty(i))continue;let n=e.attributeValueProcessor(i,t[i]);n=pt(n,e),!0===n&&e.suppressBooleanAttributes?s+=` ${i.substr(e.attributeNamePrefix.length)}`:s+=` ${i.substr(e.attributeNamePrefix.length)}="${n}"`}return s}function ct(t,e){let s=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let i in e.stopNodes)if(e.stopNodes[i]===t||e.stopNodes[i]==="*."+s)return!0;return!1}function pt(t,e){if(t&&t.length>0&&e.processEntities)for(let s=0;s<e.entities.length;s++){const i=e.entities[s];t=t.replace(i.regex,i.val)}return t}const mt=function(t,e){let s="";return e.format&&e.indentBy.length>0&&(s="\n"),lt(t,e,"",s)},ft=O,gt={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function At(t){this.options=Object.assign({},gt,t),!0===this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=ft(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=bt),this.processTextOrObjNode=Ct,this.options.format?(this.indentate=Dt,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function Ct(t,e,s,i){const n=this.j2x(t,s+1,i.concat(e));return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,n.attrStr,s):this.buildObjectNode(n.val,e,n.attrStr,s)}function Dt(t){return this.options.indentBy.repeat(t)}function bt(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}At.prototype.build=function(t){return this.options.preserveOrder?mt(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0,[]).val)},At.prototype.j2x=function(t,e,s){let i="",n="";const r=s.join(".");for(let o in t)if(Object.prototype.hasOwnProperty.call(t,o))if(void 0===t[o])this.isAttribute(o)&&(n+="");else if(null===t[o])this.isAttribute(o)||o===this.options.cdataPropName?n+="":"?"===o[0]?n+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:n+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(t[o]instanceof Date)n+=this.buildTextValNode(t[o],o,"",e);else if("object"!=typeof t[o]){const s=this.isAttribute(o);if(s&&!this.ignoreAttributesFn(s,r))i+=this.buildAttrPairStr(s,""+t[o]);else if(!s)if(o===this.options.textNodeName){let e=this.options.tagValueProcessor(o,""+t[o]);n+=this.replaceEntitiesValue(e)}else n+=this.buildTextValNode(t[o],o,"",e)}else if(Array.isArray(t[o])){const i=t[o].length;let r="",a="";for(let u=0;u<i;u++){const i=t[o][u];if(void 0===i);else if(null===i)"?"===o[0]?n+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:n+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if("object"==typeof i)if(this.options.oneListGroup){const t=this.j2x(i,e+1,s.concat(o));r+=t.val,this.options.attributesGroupName&&i.hasOwnProperty(this.options.attributesGroupName)&&(a+=t.attrStr)}else r+=this.processTextOrObjNode(i,o,e,s);else if(this.options.oneListGroup){let t=this.options.tagValueProcessor(o,i);t=this.replaceEntitiesValue(t),r+=t}else r+=this.buildTextValNode(i,o,"",e)}this.options.oneListGroup&&(r=this.buildObjectNode(r,o,a,e)),n+=r}else if(this.options.attributesGroupName&&o===this.options.attributesGroupName){const e=Object.keys(t[o]),s=e.length;for(let n=0;n<s;n++)i+=this.buildAttrPairStr(e[n],""+t[o][e[n]])}else n+=this.processTextOrObjNode(t[o],o,e,s);return{attrStr:i,val:n}},At.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},At.prototype.buildObjectNode=function(t,e,s,i){if(""===t)return"?"===e[0]?this.indentate(i)+"<"+e+s+"?"+this.tagEndChar:this.indentate(i)+"<"+e+s+this.closeTag(e)+this.tagEndChar;{let n="</"+e+this.tagEndChar,r="";return"?"===e[0]&&(r="?",n=""),!s&&""!==s||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===r.length?this.indentate(i)+`\x3c!--${t}--\x3e`+this.newLine:this.indentate(i)+"<"+e+s+r+this.tagEndChar+t+this.indentate(i)+n:this.indentate(i)+"<"+e+s+r+">"+t+n}},At.prototype.closeTag=function(t){let e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":`></${t}`,e},At.prototype.buildTextValNode=function(t,e,s,i){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(i)+`<![CDATA[${t}]]>`+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(i)+`\x3c!--${t}--\x3e`+this.newLine;if("?"===e[0])return this.indentate(i)+"<"+e+s+"?"+this.tagEndChar;{let n=this.options.tagValueProcessor(e,t);return n=this.replaceEntitiesValue(n),""===n?this.indentate(i)+"<"+e+s+this.closeTag(e)+this.tagEndChar:this.indentate(i)+"<"+e+s+">"+n+"</"+e+this.tagEndChar}},At.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const s=this.options.entities[e];t=t.replace(s.regex,s.val)}return t};var Ft={XMLParser:ut,XMLValidator:s,XMLBuilder:At};function Gt(t){const e={whole:1,half:2,quarter:4,eighth:8,"16th":16,"32nd":32,"64th":64};return e[t]||console.warn(`Note type [${t}] is invalid.`),e[t]}const Et={100:"E",101:"F",102:"F#",103:"G",104:"G#",105:"A",106:"A#",107:"B",108:"C",109:"C#",110:"D",111:"D#",112:"E",113:"F",114:"F#",115:"G",200:"B",201:"C",202:"C#",203:"D",204:"D#",205:"E",206:"F",207:"F#",208:"G",209:"G#",210:"A",211:"A#",212:"B",213:"C",214:"C#",215:"D",300:"G",301:"G#",302:"A",303:"A#",304:"B",305:"C",306:"C#",307:"D",308:"D#",309:"E",310:"F",311:"F#",312:"G",313:"G#",314:"A",315:"A#",400:"D",401:"D#",402:"E",403:"F",404:"F#",405:"G",406:"G#",407:"A",408:"A#",409:"B",410:"C",411:"C#",412:"D",413:"D#",414:"E",415:"F",500:"A",501:"A#",502:"B",503:"C",504:"C#",505:"D",506:"D#",507:"E",508:"F",509:"F#",510:"G",511:"G#",512:"A",513:"A#",514:"B",515:"C",600:"E",601:"F",602:"F#",603:"G",604:"G#",605:"A",606:"A#",607:"B",608:"C",609:"C#",610:"D",611:"D#",612:"E",613:"F",614:"F#",615:"G"},xt={"C|E|G":"C","C#|F|G#":"C#","D|F#|A":"D","D#|G|A#":"D#","E|G#|B":"E","F|A|C":"F","F#|A#|C#":"F#","G|B|D":"G","G#|C|D#":"G#","A|C#|E":"A","A#|D|F":"A#","B|D#|F#":"B","C|D#|G":"Cm","C#|E|G#":"C#m","D|F|A":"Dm","D#|F#|A#":"D#m","E|G|B":"Em","F|G#|C":"Fm","F#|A|C#":"F#m","G|A#|D":"Gm","G#|B|D#":"G#m","A|C|E":"Am","A#|C#|F":"A#m","B|D|F#":"Bm","C|D|G":"Csus2","C#|D#|G#":"C#sus2","D|E|A":"Dsus2","D#|F|A#":"D#sus2","E|F#|B":"Esus2","F|G|C":"Fsus2","F#|G#|C#":"F#sus2","G|A|D":"Gsus2","G#|A#|D#":"G#sus2","A|B|E":"Asus2","A#|C|F":"A#sus2","B|C#|F#":"Bsus2","C|F|G":"Csus4","C#|F#|G#":"C#sus4","D|G|A":"Dsus4","D#|G#|A#":"D#sus4","E|A|B":"Esus4","F|A#|C":"Fsus4","F#|B|C#":"F#sus4","G|C|D":"Gsus4","G#|C#|D#":"G#sus4","A|D|E":"Asus4","A#|D#|F":"A#sus4","B|E|F#":"Bsus4","C|D#|F#":"Cdim","C#|E|G":"C#dim","D|F|G#":"Ddim","D#|F#|A":"D#dim","E|G|A#":"Edim","F|G#|B":"Fdim","F#|A|C":"F#dim","G|A#|C#":"Gdim","G#|B|D":"G#dim","A|C|D#":"Adim","A#|C#|E":"A#dim","B|D|F":"Bdim","C|E|G#":"Caug","C#|F|A":"C#aug","D|F#|A#":"Daug","D#|G|B":"D#aug","E|G#|C":"Eaug","F|A|C#":"Faug","F#|A#|D":"F#aug","G|B|D#":"Gaug","G#|C|E":"G#aug","A|C#|F":"Aaug","A#|D|F#":"A#aug","B|D#|G":"Baug","C|E|G|B":"Cmaj7","C#|F|G#|C":"C#maj7","D|F#|A|C#":"Dmaj7","D#|G|A#|D":"D#maj7","E|G#|B|D#":"Emaj7","F|A|C|E":"Fmaj7","F#|A#|C#|F":"F#maj7","G|B|D|F#":"Gmaj7","G#|C|D#|G":"G#maj7","A|C#|E|G#":"Amaj7","A#|D|F|A":"A#maj7","B|D#|F#|A#":"Bmaj7","C|E|G|A#":"C7","C#|F|G#|B":"C#7","D|F#|A|C":"D7","D#|G|A#|C#":"D#7","E|G#|B|D":"E7","F|A|C|D#":"F7","F#|A#|C#|E":"F#7","G|B|D|F":"G7","G#|C|D#|F#":"G#7","A|C#|E|G":"A7","A#|D|F|G#":"A#7","B|D#|F#|A":"B7","C|D#|G|B":"Cm(maj7)","C#|E|G#|C":"C#m(maj7)","D|F|A|C#":"Dm(maj7)","D#|F#|A#|D":"D#m(maj7)","E|G|B|D#":"Em(maj7)","F|G#|C|E":"Fm(maj7)","F#|A|C#|F":"F#m(maj7)","G|A#|D|F#":"Gm(maj7)","G#|B|D#|G":"G#m(maj7)","A|C|E|G#":"Am(maj7)","A#|C#|F|A":"A#m(maj7)","B|D|F#|A#":"Bm(maj7)","C|D#|G|A#":"Cm7","C#|E|G#|B":"C#m7","D|F|A|C":"Dm7","D#|F#|A#|C#":"D#m7","E|G|B|D":"Em7","F|G#|C|D#":"Fm7","F#|A|C#|E":"F#m7","G|A#|D|F":"Gm7","G#|B|D#|F#":"G#m7","A|C|E|G":"Am7","A#|C#|F|G#":"A#m7","B|D|F#|A":"Bm7","C|D|G|B":"Cmaj7sus2","C#|D#|G#|C":"C#maj7sus2","D|E|A|C#":"Dmaj7sus2","D#|F|A#|D":"D#maj7sus2","E|F#|B|D#":"Emaj7sus2","F|G|C|E":"Fmaj7sus2","F#|G#|C#|F":"F#maj7sus2","G|A|D|F#":"Gmaj7sus2","G#|A#|D#|G":"G#maj7sus2","A|B|E|G#":"Amaj7sus2","A#|C|F|A":"A#maj7sus2","B|C#|F#|A#":"Bmaj7sus2","C|D|G|A#":"C7sus2","C#|D#|G#|B":"C#7sus2","D|E|A|C":"D7sus2","D#|F|A#|C#":"D#7sus2","E|F#|B|D":"E7sus2","F|G|C|D#":"F7sus2","F#|G#|C#|E":"F#7sus2","G|A|D|F":"G7sus2","G#|A#|D#|F#":"G#7sus2","A|B|E|G":"A7sus2","A#|C|F|G#":"A#7sus2","B|C#|F#|A":"B7sus2","C|F|G|B":"Cmaj7sus4","C#|F#|G#|C":"C#maj7sus4","D|G|A|C#":"Dmaj7sus4","D#|G#|A#|D":"D#maj7sus4","E|A|B|D#":"Emaj7sus4","F|A#|C|E":"Fmaj7sus4","F#|B|C#|F":"F#maj7sus4","G|C|D|F#":"Gmaj7sus4","G#|C#|D#|G":"G#maj7sus4","A|D|E|G#":"Amaj7sus4","A#|D#|F|A":"A#maj7sus4","B|E|F#|A#":"Bmaj7sus4","C|F|G|A#":"C7sus4","C#|F#|G#|B":"C#7sus4","D|G|A|C":"D7sus4","D#|G#|A#|C#":"D#7sus4","E|A|B|D":"E7sus4","F|A#|C|D#":"F7sus4","F#|B|C#|E":"F#7sus4","G|C|D|F":"G7sus4","G#|C#|D#|F#":"G#7sus4","A|D|E|G":"A7sus4","A#|D#|F|G#":"A#7sus4","B|E|F#|A":"B7sus4","C|E|G|A":"C6","C#|F|G#|A#":"C#6","D|F#|A|B":"D6","D#|G|A#|C":"D#6","E|G#|B|C#":"E6","F|A|C|D":"F6","F#|A#|C#|D#":"F#6","G|B|D|E":"G6","G#|C|D#|F":"G#6","A|C#|E|F#":"A6","A#|D|F|G":"A#6","B|D#|F#|G#":"B6","C|F|G|A":"Cm6","C#|F#|G#|A#":"C#m6","D|G|A|B":"Dm6","D#|G#|A#|C":"D#m6","E|A|B|C#":"Em6","F|A#|C|D":"Fm6","F#|B|C#|D#":"F#m6","G|C|D|E":"Gm6","G#|C#|D#|F":"G#m6","A|D|E|F#":"Am6","A#|D#|F|G":"A#m6","B|E|F#|G#":"Bm6","C|E|G#|B":"Cmaj7(#5)","C#|F|A|C":"C#maj7(#5)","D|F#|A#|C#":"Dmaj7(#5)","D#|G|B|D":"D#maj7(#5)","E|G#|C|D#":"Emaj7(#5)","F|A|C#|E":"Fmaj7(#5)","F#|A#|D|F":"F#maj7(#5)","G|B|D#|F#":"Gmaj7(#5)","G#|C|E|G":"G#maj7(#5)","A|C#|F|G#":"Amaj7(#5)","A#|D|F#|A":"A#maj7(#5)","B|D#|G|A#":"Bmaj7(#5)","C|D#|F#|A#":"C∅","C#|E|G|B":"C#∅","D|F|G#|C":"D∅","D#|F#|A|C#":"D#∅","E|G|A#|D":"E∅","F|G#|B|D#":"F∅","F#|A|C|E":"F#∅","G|A#|C#|F":"G∅","G#|B|D|F#":"G#∅","A|C|D#|G":"A∅","A#|C#|E|G#":"A#∅","B|D|F|A":"B∅","C|D#|F#|A":"Cdim7","C#|E|G|A#":"C#dim7","D|F|G#|B":"Ddim7","D#|F#|A|C":"D#dim7","E|G|A#|C#":"Edim7","F|G#|B|D":"Fdim7","F#|A|C|D#":"F#dim7","G|A#|C#|E":"Gdim7","G#|B|D|F":"G#dim7","A|C|D#|F#":"Adim7","A#|C#|E|G":"A#dim7","B|D|F|G#":"Bdim7","C|G":"C5","C#|G#|":"C#5","D|A|":"D5","D#|A#|":"D#5","E|B|":"E5","F|C|":"F5","F#|C#|":"F#5","G|D|":"G5","G#|D#|":"G#5","A|E|":"A5","A#|F|":"A#5","B|F#|":"B5","C|D|E|G":"Cadd9","C#|D#|F|G#":"C#add9","D|E|F#|A":"Dadd9","D#|F|G|A#":"D#add9","E|F#|G#|B":"Eadd9","F|G|A|C":"Fadd9","F#|G#|A#|C#":"F#add9","G|A|B|D":"Gadd9","G#|A#|C|D#":"G#add9","A|B|C#|E":"Aadd9","A#|C|D|F":"A#add9","B|C#|D#|F#":"Badd9"};function Nt(t){let s=[];return(t=e.orderBy(t,"string","desc")).map((t=>{const{string:e,fret:i}=t,n=Et[100*e+i];s.push(n)})),s=function(t,e){const s=function(t){const e=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],s=e.indexOf(t);return e.splice(s).concat(e)}(t),i=[];return e.map((t=>{const e=s.indexOf(t);i[e]=t})),i.filter((t=>t&&t.trim()))}(s[0],e.uniq(s)),xt[s.join("|")]||""}class yt{beam=null;data=null;dot=null;id;name="";notations={slur:null,tied:null,tuplet:null};stem=null;time=null;timeModification=null;type;view;constructor({id:t,xmlData:e}){this.id=t,e?(this.beam=this.getBeam(e),this.dot=this.getDot(e),this.notations=this.getNotations(e),this.stem=this.getStem(e),this.timeModification=this.getTimeModification(e),this.type=this.getType(e),this.view=this.getView(e)):(this.view="rest",this.type="whole")}getBeam(t){const s=t.beam;return s?e.isArray(s)?s.map((t=>t["#text"])):[s["#text"]]:null}getData(t){const e=t?.notations?.technical;if(!e)return null;const{fret:s,string:i}=e,{alter:n=null,octave:r=null,step:o=null}=t.pitch||{};return{fret:s,pitch:{alter:n,octave:r,step:o},string:i}}getDot(t){if(!e.has(t,"dot"))return null;const{dot:s}=t;return e.isArray(s)&&s.length>=2?"doubleDot":"dot"}getView(t){return e.has(t,"rest")?"rest":"single"}getNotations(t){return{slur:this.getSlur(t),tied:this.getTied(t),tuplet:this.getTuplet(t)}}getSlur(t){return t.notations?.slur?._type??null}getStem(t){return t.stem??null}getTied(t){const s=t.notations?.tied;return s?e.isArray(s)?s[0]._type:s._type:null}getTimeModification(t){const e=t["time-modification"];if(!e)return null;const{"actual-notes":s,"normal-notes":i}=e;return s&&i?{actualNotes:s,normalNotes:i}:null}getTuplet(t){const s=t.notations?.tuplet;return s?e.isArray(s)?s[0]._type:s._type:null}getType(t){return t.type}appendData(t){this.data||(this.data=[]),this.data?.push(t),this.name=Nt(this.data)}appendTime(t,e){this.time={start:t,duration:e,end:t+e}}}class Tt{capo;harmonies;metronome;notes;number;id;isLast;time=null;timeSignature;speed;startTime;constructor({id:t,xmlData:e,startTime:s,beatUnit:i,bpm:n,beats:r,beatType:o,isLast:a,speed:u}){this.id=t,this.isLast=a,this.startTime=s,this.speed=u||1,this.capo=this.getCapo(e),this.metronome={beatUnit:i,bpm:n},this.timeSignature={beats:r,beatType:o},this.number=this.getNumber(e),this.notes=this.getNotes(e),this.harmonies=this.getHarmonies(e)}getCapo(t){return t?.attributes?.["staff-details"]?.capo||0}getHarmonies(t){const{harmony:s}=t;if(!s)return[];return(e.isArray(s)?s:[s]).map((({frame:t})=>{const{"first-fret":e=0,"frame-note":s=[]}=t,i=s.map((({fret:t=0,string:e=0})=>({fret:t,string:e})));return{data:i,firstFret:e,name:Nt(i)}}))}getNotes(t){const s=[];let i=1;if(e.isEmpty(t?.note)){const t=new yt({id:`N_${this.number}_${i}`});return this.addNoteToList(t,s),s}return(e.isArray(t.note)?t.note:[t.note]).forEach((t=>{if(this.isChord(t)){const e=s[s.length-1];e.view="chord";const i=e.getData(t);i&&e.appendData(i)}else{const e=new yt({id:`N_${this.number}_${i}`,xmlData:t}),n=e.getData(t);n&&e.appendData(n),this.addNoteToList(e,s),i++}})),s}addNoteToList(t,e){const s=this.time?.start||this.startTime,i=this.calNoteDuration(t);this.time={start:s+i,duration:(this.time?.duration||0)+i,end:s+i},t.appendTime(s,i),e.push(t)}getNumber(t){return t._number||""}isChord(t){return e.has(t,"chord")}calNoteDuration(t){const{view:s,type:i,timeModification:n,notations:r,dot:o}=t;if(!i)return 0;const{beatUnit:a,bpm:u}=this.metronome,{beats:l,beatType:h}=this.timeSignature,d=Math.floor(60/u/(h/a)*1e3);let c="rest"===s&&"whole"===i?d*l:h/Gt(i)*d;if(!e.isEmpty(n)){const{tuplet:t}=r,{actualNotes:e,normalNotes:s}=n,i="stop"===t?(Math.floor(100/e)+100%e)/100:Math.floor(100/e)/100;c=Math.floor(c*s*i)}return"dot"===o?c=Math.floor(1.5*c):"doubleDot"===o&&(c=Math.floor(1.75*c)),Math.round(c/this.speed)}}class Bt{duration=0;measures=[];beats=4;beatType=4;beatUnit=4;bpm=60;constructor({measures:t,speed:e}){t.forEach(((s,i)=>{const n=this.getMetronome(s);n&&this.setGlobalMetronome(n);const r=this.getTimeSignature(s);r&&this.setGlobalTimeSignature(r);const o=new Tt({id:`M_${i+1}`,beatUnit:this.beatUnit,bpm:this.bpm,beats:this.beats,beatType:this.beatType,isLast:i===t.length-1,speed:e||1,startTime:this.duration,xmlData:s});this.duration+=o.time?.duration||0,this.measures.push(o)}))}getMetronome(t){const s=e.isArray(t?.direction)?t.direction:[t?.direction];for(const t of s){const e=t?.["direction-type"]?.metronome;if(e)return{beatUnit:Gt(e["beat-unit"]),bpm:e["per-minute"]}}return null}getTimeSignature(t){const s=t?.attributes?.time;return e.isEmpty(s)?null:{beats:s?.beats||0,beatType:s?.["beat-type"]||0}}setGlobalMetronome({beatUnit:t,bpm:e}){this.beatUnit=t,this.bpm=e}setGlobalTimeSignature({beats:t,beatType:e}){this.beats=t,this.beatType=e}}t.Parser=class{parts=[];title="";_debug=!1;_oriXml={};_speed=1;constructor(t){const{debug:e,speed:s,xmlStr:i}=t;Ft.XMLValidator.validate(i)?(this._debug=e??this._debug,this._oriXml=function(t){const e=function(t){const e=/<\?xml[^?]*\?>/g;for(;e.test(t);)t=t.replace(e,"");return t.replace(/<\?GP|\?>/g,"")}(t);return new Ft.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"_",preserveOrder:!1}).parse(e)}(i)||{},this._speed=s??this._speed,this.parts=this.getParts(this._oriXml).map((t=>{const e=this.getMeasures(t);return new Bt({measures:e,speed:s})})),this.title=this.getTitle(this._oriXml),this._debug&&console.log(this)):console.error("Not valid file type.")}getTitle(t){return t["score-partwise"]?.work?.["work-title"]||""}filterTabParts(t){return t.filter((t=>{const s=t.measure,i=e.isArray(s)?s[0]:e.isObject(s)?s:null;return"TAB"===i?.attributes?.clef?.sign}))}getParts(t){const s=t?.["score-partwise"]?.part;if(e.isEmpty(s))return[];const i=e.isArray(s)?s:e.isObject(s)?[s]:[];return this.filterTabParts(i)}getMeasureById(t){for(const s of this.parts){const i=e.find(s.measures,{id:t});if(i)return i}return null}getMeasures(t){const s=t.measure;return e.isArray(s)?s:e.isObject(s)?[s]:[]}getNoteById(t){const s=this.parts.flatMap((t=>t.measures.flatMap((t=>t.notes))));return e.find(s,{id:t})||null}},t.getChordName=Nt,t.noteTypeToNumber=Gt,t.numberToNoteType=function(t){const e={1:"whole",2:"half",4:"quarter",8:"eighth",16:"16th",32:"32nd",64:"64th"};return e[t]||console.warn(`Note type [${t}] is invalid.`),e[t]},Object.defineProperty(t,"__esModule",{value:!0})}));
