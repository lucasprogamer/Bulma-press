/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery_mask_plugin__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery_mask_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery_mask_plugin__);


$(document).ready(function () {
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  $('.phone_with_ddd').mask('(00) 0000-0000');
  $('.phone_us').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', { reverse: true });
  $('.cnpj').mask('00.000.000/0000-00', { reverse: true });
  $('.money').mask('000.000.000.000.000,00', { reverse: true });
  $('.money2').mask("#.##0,00", { reverse: true });
  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
      'Z': {
        pattern: /[0-9]/, optional: true
      }
    }
  });
  $('.ip_address').mask('099.099.099.099');
  $('.percent').mask('##0,00%', { reverse: true });
  $('.clear-if-not-match').mask("00/00/0000", { clearIfNotMatch: true });
  $('.placeholder').mask("00/00/0000", { placeholder: "__/__/____" });
  $('.fallback').mask("00r00r0000", {
    translation: {
      'r': {
        pattern: /[\/]/,
        fallback: '/'
      },
      placeholder: "__/__/____"
    }
  });
  $('.selectonfocus').mask("00/00/0000", { selectOnFocus: true });
});

var SPMaskBehavior = function SPMaskBehavior(val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    spOptions = {
  onKeyPress: function onKeyPress(val, e, field, options) {
    field.mask(SPMaskBehavior.apply({}, arguments), options);
  }
};

$('.telefone').mask(SPMaskBehavior, spOptions);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * jquery.mask.js
 * @version: v1.14.15
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at github.com/igorescobar/jQuery-Mask-Plugin
 *
 * Copyright (c) 2012 Igor Escobar http://igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* jshint maxcomplexity:17 */
/* global define */

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
(function (factory, jQuery, Zepto) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {
    'use strict';

    var Mask = function (el, mask, options) {

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', -p.val().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) {}
            },
            setCaret: function(pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        // Firefox, WebKit, etc..
                        if (ctrl.setSelectionRange) {
                            ctrl.setSelectionRange(pos, pos);
                        } else { // IE
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) {}
            },
            events: function() {
                el
                .on('keydown.mask', function(e) {
                    el.data('mask-keycode', e.keyCode || e.which);
                    el.data('mask-previus-value', el.val());
                    el.data('mask-previus-caret-pos', p.getCaret());
                    p.maskDigitPosMapOld = p.maskDigitPosMap;
                })
                .on($.jMaskGlobals.useInput ? 'input.mask' : 'keyup.mask', p.behaviour)
                .on('paste.mask drop.mask', function() {
                    setTimeout(function() {
                        el.keydown().keyup();
                    }, 100);
                })
                .on('change.mask', function(){
                    el.data('changed', true);
                })
                .on('blur.mask', function(){
                    if (oldValue !== p.val() && !el.data('changed')) {
                        el.trigger('change');
                    }
                    el.data('changed', false);
                })
                // it's very important that this callback remains in this position
                // otherwhise oldValue it's going to work buggy
                .on('blur.mask', function() {
                    oldValue = p.val();
                })
                // select all text on focus
                .on('focus.mask', function (e) {
                    if (options.selectOnFocus === true) {
                        $(e.target).select();
                    }
                })
                // clear the value if it not complete the mask
                .on('focusout.mask', function() {
                    if (options.clearIfNotMatch && !regexMask.test(p.val())) {
                       p.val('');
                   }
                });
            },
            getRegexMask: function() {
                var maskChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < mask.length; i++) {
                    translation = jMask.translation[mask.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskChunks.push(mask.charAt(i));
                            oRecursive = {digit: mask.charAt(i), pattern: pattern};
                        } else {
                            maskChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                         .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function() {
                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.mask '));
            },
            val: function(v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            calculateCaretPosition: function() {
                var oldVal = el.data('mask-previus-value') || '',
                    newVal = p.getMasked(),
                    caretPosNew = p.getCaret();
                if (oldVal !== newVal) {
                    var caretPosOld = el.data('mask-previus-caret-pos') || 0,
                        newValL = newVal.length,
                        oldValL = oldVal.length,
                        maskDigitsBeforeCaret = 0,
                        maskDigitsAfterCaret = 0,
                        maskDigitsBeforeCaretAll = 0,
                        maskDigitsBeforeCaretAllOld = 0,
                        i = 0;

                    for (i = caretPosNew; i < newValL; i++) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsAfterCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (!p.maskDigitPosMap[i]) {
                            break;
                        }
                        maskDigitsBeforeCaret++;
                    }

                    for (i = caretPosNew - 1; i >= 0; i--) {
                        if (p.maskDigitPosMap[i]) {
                            maskDigitsBeforeCaretAll++;
                        }
                    }

                    for (i = caretPosOld - 1; i >= 0; i--) {
                        if (p.maskDigitPosMapOld[i]) {
                            maskDigitsBeforeCaretAllOld++;
                        }
                    }

                    // if the cursor is at the end keep it there
                    if (caretPosNew > oldValL) {
                      caretPosNew = newValL * 10;
                    } else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
                        if (!p.maskDigitPosMapOld[caretPosNew])  {
                          var caretPos = caretPosNew;
                          caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
                          caretPosNew -= maskDigitsBeforeCaret;
                          if (p.maskDigitPosMap[caretPosNew])  {
                            caretPosNew = caretPos;
                          }
                        }
                    }
                    else if (caretPosNew > caretPosOld) {
                        caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
                        caretPosNew += maskDigitsAfterCaret;
                    }
                }
                return caretPosNew;
            },
            behaviour: function(e) {
                e = e || window.event;
                p.invalid = [];

                var keyCode = el.data('mask-keycode');

                if ($.inArray(keyCode, jMask.byPassKeys) === -1) {
                    var newVal = p.getMasked(),
                        caretPos = p.getCaret();

                    // this is a compensation to devices/browsers that don't compensate
                    // caret positioning the right way
                    setTimeout(function() {
                      p.setCaret(p.calculateCaretPosition());
                    }, $.jMaskGlobals.keyStrokeCompensation);

                    p.val(newVal);
                    p.setCaret(caretPos);
                    return p.callbacks(e);
                }
            },
            getMasked: function(skipMaskChars, val) {
                var buf = [],
                    value = val === undefined ? p.val() : val + '',
                    m = 0, maskLen = mask.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    maskDigitCount = 0,
                    maskDigitPosArr = [],
                    lastMaskChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskChar = 0;
                    m = maskLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskChar = maskLen - 1;
                    check = function () {
                        return m < maskLen && v < valLen;
                    };
                }

                var lastUntranslatedMaskChar;
                while (check()) {
                    var maskDigit = mask.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMask.translation[maskDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                             if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskChar && m !== resetPos) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (valDigit === lastUntranslatedMaskChar) {
                            // matched the last untranslated (raw) mask character that we encountered
                            // likely an insert offset the mask character from the last entry; fall
                            // through and only increment v
                            maskDigitCount--;
                            lastUntranslatedMaskChar = undefined;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                          p.invalid.push({p: v, v: valDigit, e: translation.pattern});
                        }
                        v += offset;
                    } else {
                        if (!skipMaskChars) {
                            buf[addMethod](maskDigit);
                        }

                        if (valDigit === maskDigit) {
                            maskDigitPosArr.push(v);
                            v += offset;
                        } else {
                            lastUntranslatedMaskChar = maskDigit;
                            maskDigitPosArr.push(v + maskDigitCount);
                            maskDigitCount++;
                        }

                        m += offset;
                    }
                }

                var lastMaskCharDigit = mask.charAt(lastMaskChar);
                if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) {
                    buf.push(lastMaskCharDigit);
                }

                var newVal = buf.join('');
                p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
                return newVal;
            },
            mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
              var maskDiff = options.reverse ? newVal.length - valLen : 0;
              p.maskDigitPosMap = {};
              for (var i = 0; i < maskDigitPosArr.length; i++) {
                p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
              }
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function(name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === mask.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };

        el = $(el);
        var jMask = this, oldValue = p.val(), regexMask;

        mask = typeof mask === 'function' ? mask(p.val(), undefined, el,  options) : mask;

        // public methods
        jMask.mask = mask;
        jMask.options = options;
        jMask.remove = function() {
            var caret = p.getCaret();
            if (jMask.options.placeholder) {
                el.removeAttr('placeholder');
            }
            if (el.data('mask-maxlength')) {
                el.removeAttr('maxlength');
            }
            p.destroyEvents();
            p.val(jMask.getCleanVal());
            p.setCaret(caret);
            return el;
        };

        // get value without mask
        jMask.getCleanVal = function() {
           return p.getMasked(true);
        };

        // get masked value without the value being in the input or element
        jMask.getMaskedVal = function(val) {
           return p.getMasked(false, val);
        };

       jMask.init = function(onlyMask) {
            onlyMask = onlyMask || false;
            options = options || {};

            jMask.clearIfNotMatch  = $.jMaskGlobals.clearIfNotMatch;
            jMask.byPassKeys       = $.jMaskGlobals.byPassKeys;
            jMask.translation      = $.extend({}, $.jMaskGlobals.translation, options.translation);

            jMask = $.extend(true, {}, jMask, options);

            regexMask = p.getRegexMask();

            if (onlyMask) {
                p.events();
                p.val(p.getMasked());
            } else {
                if (options.placeholder) {
                    el.attr('placeholder' , options.placeholder);
                }

                // this is necessary, otherwise if the user submit the form
                // and then press the "back" button, the autocomplete will erase
                // the data. Works fine on IE9+, FF, Opera, Safari.
                if (el.data('mask')) {
                  el.attr('autocomplete', 'off');
                }

                // detect if is necessary let the user type freely.
                // for is a lot faster than forEach.
                for (var i = 0, maxlength = true; i < mask.length; i++) {
                    var translation = jMask.translation[mask.charAt(i)];
                    if (translation && translation.recursive) {
                        maxlength = false;
                        break;
                    }
                }

                if (maxlength) {
                    el.attr('maxlength', mask.length).data('mask-maxlength', true);
                }

                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMasked());
                p.setCaret(caret);
            }
        };

        jMask.init(!el.is('input'));
    };

    $.maskWatchers = {};
    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            prefix = 'data-mask-',
            mask = input.attr('data-mask');

        if (input.attr(prefix + 'reverse')) {
            options.reverse = true;
        }

        if (input.attr(prefix + 'clearifnotmatch')) {
            options.clearIfNotMatch = true;
        }

        if (input.attr(prefix + 'selectonfocus') === 'true') {
           options.selectOnFocus = true;
        }

        if (notSameMaskObject(input, mask, options)) {
            return input.data('mask', new Mask(this, mask, options));
        }
    },
    notSameMaskObject = function(field, mask, options) {
        options = options || {};
        var maskObject = $(field).data('mask'),
            stringify = JSON.stringify,
            value = $(field).val() || $(field).text();
        try {
            if (typeof mask === 'function') {
                mask = mask(value);
            }
            return typeof maskObject !== 'object' || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
        } catch (e) {}
    },
    eventSupported = function(eventName) {
        var el = document.createElement('div'), isSupported;

        eventName = 'on' + eventName;
        isSupported = (eventName in el);

        if ( !isSupported ) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] === 'function';
        }
        el = null;

        return isSupported;
    };

    $.fn.mask = function(mask, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskGlobals,
            interval = globals.watchInterval,
            watchInputs = options.watchInputs || globals.watchInputs,
            maskFunction = function() {
                if (notSameMaskObject(this, mask, options)) {
                    return $(this).data('mask', new Mask(this, mask, options));
                }
            };

        $(this).each(maskFunction);

        if (selector && selector !== '' && watchInputs) {
            clearInterval($.maskWatchers[selector]);
            $.maskWatchers[selector] = setInterval(function(){
                $(document).find(selector).each(maskFunction);
            }, interval);
        }
        return this;
    };

    $.fn.masked = function(val) {
        return this.data('mask').getMaskedVal(val);
    };

    $.fn.unmask = function() {
        clearInterval($.maskWatchers[this.selector]);
        delete $.maskWatchers[this.selector];
        return this.each(function() {
            var dataMask = $(this).data('mask');
            if (dataMask) {
                dataMask.remove().removeData('mask');
            }
        });
    };

    $.fn.cleanVal = function() {
        return this.data('mask').getCleanVal();
    };

    $.applyDataMask = function(selector) {
        selector = selector || $.jMaskGlobals.maskElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
    };

    var globals = {
        maskElements: 'input,td,span,div',
        dataMaskAttr: '*[data-mask]',
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        keyStrokeCompensation: 10,
        // old versions of chrome dont work great with input event
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported('input'),
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    };

    $.jMaskGlobals = $.jMaskGlobals || {};
    globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);

    // looking for inputs with data-mask attribute
    if (globals.dataMask) {
        $.applyDataMask();
    }

    setInterval(function() {
        if ($.jMaskGlobals.watchDataMask) {
            $.applyDataMask();
        }
    }, globals.watchInterval);
}, window.jQuery, window.Zepto));


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzU5M2Q1MDg5NDZmODc4ODAzMTIiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2ptYXNrcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanF1ZXJ5LW1hc2stcGx1Z2luL2Rpc3QvanF1ZXJ5Lm1hc2suanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJtYXNrIiwicmV2ZXJzZSIsInRyYW5zbGF0aW9uIiwicGF0dGVybiIsIm9wdGlvbmFsIiwiY2xlYXJJZk5vdE1hdGNoIiwicGxhY2Vob2xkZXIiLCJmYWxsYmFjayIsInNlbGVjdE9uRm9jdXMiLCJTUE1hc2tCZWhhdmlvciIsInZhbCIsInJlcGxhY2UiLCJsZW5ndGgiLCJzcE9wdGlvbnMiLCJvbktleVByZXNzIiwiZSIsImZpZWxkIiwib3B0aW9ucyIsImFwcGx5IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUMxQkYsSUFBRSxPQUFGLEVBQVdHLElBQVgsQ0FBZ0IsWUFB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQyxrQkFBa0IsOEJBQThCO0FBQ2hELGtCQUFrQiwrQkFBK0I7QUFDakQsa0JBQWtCLHVCQUF1QjtBQUN6QyxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7OztBQzNsQkQsd0IiLCJmaWxlIjoiL2Rpc3QvanMvam1hc2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNTkzZDUwODk0NmY4Nzg4MDMxMiIsImltcG9ydCBNYXNrcyBmcm9tICdqcXVlcnktbWFzay1wbHVnaW4nO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAkKCcuZGF0ZScpLm1hc2soJzAwLzAwLzAwMDAnKTtcbiAgJCgnLnRpbWUnKS5tYXNrKCcwMDowMDowMCcpO1xuICAkKCcuZGF0ZV90aW1lJykubWFzaygnMDAvMDAvMDAwMCAwMDowMDowMCcpO1xuICAkKCcuY2VwJykubWFzaygnMDAwMDAtMDAwJyk7XG4gICQoJy5waG9uZScpLm1hc2soJzAwMDAtMDAwMCcpO1xuICAkKCcucGhvbmVfd2l0aF9kZGQnKS5tYXNrKCcoMDApIDAwMDAtMDAwMCcpO1xuICAkKCcucGhvbmVfdXMnKS5tYXNrKCcoMDAwKSAwMDAtMDAwMCcpO1xuICAkKCcubWl4ZWQnKS5tYXNrKCdBQUEgMDAwLVMwUycpO1xuICAkKCcuY3BmJykubWFzaygnMDAwLjAwMC4wMDAtMDAnLCB7cmV2ZXJzZTogdHJ1ZX0pO1xuICAkKCcuY25waicpLm1hc2soJzAwLjAwMC4wMDAvMDAwMC0wMCcsIHtyZXZlcnNlOiB0cnVlfSk7XG4gICQoJy5tb25leScpLm1hc2soJzAwMC4wMDAuMDAwLjAwMC4wMDAsMDAnLCB7cmV2ZXJzZTogdHJ1ZX0pO1xuICAkKCcubW9uZXkyJykubWFzayhcIiMuIyMwLDAwXCIsIHtyZXZlcnNlOiB0cnVlfSk7XG4gICQoJy5pcF9hZGRyZXNzJykubWFzaygnMFpaLjBaWi4wWlouMFpaJywge1xuICAgIHRyYW5zbGF0aW9uOiB7XG4gICAgICAnWic6IHtcbiAgICAgICAgcGF0dGVybjogL1swLTldLywgb3B0aW9uYWw6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAkKCcuaXBfYWRkcmVzcycpLm1hc2soJzA5OS4wOTkuMDk5LjA5OScpO1xuICAkKCcucGVyY2VudCcpLm1hc2soJyMjMCwwMCUnLCB7cmV2ZXJzZTogdHJ1ZX0pO1xuICAkKCcuY2xlYXItaWYtbm90LW1hdGNoJykubWFzayhcIjAwLzAwLzAwMDBcIiwge2NsZWFySWZOb3RNYXRjaDogdHJ1ZX0pO1xuICAkKCcucGxhY2Vob2xkZXInKS5tYXNrKFwiMDAvMDAvMDAwMFwiLCB7cGxhY2Vob2xkZXI6IFwiX18vX18vX19fX1wifSk7XG4gICQoJy5mYWxsYmFjaycpLm1hc2soXCIwMHIwMHIwMDAwXCIsIHtcbiAgICAgIHRyYW5zbGF0aW9uOiB7XG4gICAgICAgICdyJzoge1xuICAgICAgICAgIHBhdHRlcm46IC9bXFwvXS8sXG4gICAgICAgICAgZmFsbGJhY2s6ICcvJ1xuICAgICAgICB9LFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJfXy9fXy9fX19fXCJcbiAgICAgIH1cbiAgICB9KTtcbiAgJCgnLnNlbGVjdG9uZm9jdXMnKS5tYXNrKFwiMDAvMDAvMDAwMFwiLCB7c2VsZWN0T25Gb2N1czogdHJ1ZX0pO1xufSk7XG5cblxudmFyIFNQTWFza0JlaGF2aW9yID0gZnVuY3Rpb24gKHZhbCkge1xuICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcRC9nLCAnJykubGVuZ3RoID09PSAxMSA/ICcoMDApIDAwMDAwLTAwMDAnIDogJygwMCkgMDAwMC0wMDAwOSc7XG59LFxuc3BPcHRpb25zID0ge1xuICBvbktleVByZXNzOiBmdW5jdGlvbih2YWwsIGUsIGZpZWxkLCBvcHRpb25zKSB7XG4gICAgICBmaWVsZC5tYXNrKFNQTWFza0JlaGF2aW9yLmFwcGx5KHt9LCBhcmd1bWVudHMpLCBvcHRpb25zKTtcbiAgICB9XG59O1xuXG4kKCcudGVsZWZvbmUnKS5tYXNrKFNQTWFza0JlaGF2aW9yLCBzcE9wdGlvbnMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2ptYXNrcy5qcyIsIi8qKlxuICoganF1ZXJ5Lm1hc2suanNcbiAqIEB2ZXJzaW9uOiB2MS4xNC4xNVxuICogQGF1dGhvcjogSWdvciBFc2NvYmFyXG4gKlxuICogQ3JlYXRlZCBieSBJZ29yIEVzY29iYXIgb24gMjAxMi0wMy0xMC4gUGxlYXNlIHJlcG9ydCBhbnkgYnVnIGF0IGdpdGh1Yi5jb20vaWdvcmVzY29iYXIvalF1ZXJ5LU1hc2stUGx1Z2luXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIElnb3IgRXNjb2JhciBodHRwOi8vaWdvcmVzY29iYXIuY29tXG4gKlxuICogVGhlIE1JVCBMaWNlbnNlIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICogcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICogY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICogT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAqIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG4gKiBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAqIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuICogT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGpzaGludCBsYXhicmVhazogdHJ1ZSAqL1xuLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTcgKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pIHBhdHRlcm5zIGZvciBKYXZhU2NyaXB0IG1vZHVsZXMgdGhhdCB3b3JrIGV2ZXJ5d2hlcmUuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3RlbXBsYXRlcy9qcXVlcnlQbHVnaW4uanNcbihmdW5jdGlvbiAoZmFjdG9yeSwgalF1ZXJ5LCBaZXB0bykge1xuXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSB8fCBaZXB0byk7XG4gICAgfVxuXG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIE1hc2sgPSBmdW5jdGlvbiAoZWwsIG1hc2ssIG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgcCA9IHtcbiAgICAgICAgICAgIGludmFsaWQ6IFtdLFxuICAgICAgICAgICAgZ2V0Q2FyZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwgPSBlbC5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkU2VsID0gZG9jdW1lbnQuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgY1NlbFN0YXJ0ID0gY3RybC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJRSBTdXBwb3J0XG4gICAgICAgICAgICAgICAgICAgIGlmIChkU2VsICYmIG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ01TSUUgMTAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbCA9IGRTZWwuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbC5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1wLnZhbCgpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBzZWwudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCBzdXBwb3J0XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNTZWxTdGFydCB8fCBjU2VsU3RhcnQgPT09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gY1NlbFN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENhcmV0OiBmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuaXMoJzpmb2N1cycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UsIGN0cmwgPSBlbC5nZXQoMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3gsIFdlYktpdCwgZXRjLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNldFNlbGVjdGlvblJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBJRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gY3RybC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlbFxuICAgICAgICAgICAgICAgIC5vbigna2V5ZG93bi5tYXNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5kYXRhKCdtYXNrLWtleWNvZGUnLCBlLmtleUNvZGUgfHwgZS53aGljaCk7XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdGEoJ21hc2stcHJldml1cy12YWx1ZScsIGVsLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuZGF0YSgnbWFzay1wcmV2aXVzLWNhcmV0LXBvcycsIHAuZ2V0Q2FyZXQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHAubWFza0RpZ2l0UG9zTWFwT2xkID0gcC5tYXNrRGlnaXRQb3NNYXA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJC5qTWFza0dsb2JhbHMudXNlSW5wdXQgPyAnaW5wdXQubWFzaycgOiAna2V5dXAubWFzaycsIHAuYmVoYXZpb3VyKVxuICAgICAgICAgICAgICAgIC5vbigncGFzdGUubWFzayBkcm9wLm1hc2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmtleWRvd24oKS5rZXl1cCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjaGFuZ2UubWFzaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdGEoJ2NoYW5nZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignYmx1ci5tYXNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSBwLnZhbCgpICYmICFlbC5kYXRhKCdjaGFuZ2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdGEoJ2NoYW5nZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBpdCdzIHZlcnkgaW1wb3J0YW50IHRoYXQgdGhpcyBjYWxsYmFjayByZW1haW5zIGluIHRoaXMgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAvLyBvdGhlcndoaXNlIG9sZFZhbHVlIGl0J3MgZ29pbmcgdG8gd29yayBidWdneVxuICAgICAgICAgICAgICAgIC5vbignYmx1ci5tYXNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gcC52YWwoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBhbGwgdGV4dCBvbiBmb2N1c1xuICAgICAgICAgICAgICAgIC5vbignZm9jdXMubWFzaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNlbGVjdE9uRm9jdXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgdmFsdWUgaWYgaXQgbm90IGNvbXBsZXRlIHRoZSBtYXNrXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1c291dC5tYXNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNsZWFySWZOb3RNYXRjaCAmJiAhcmVnZXhNYXNrLnRlc3QocC52YWwoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgcC52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZWdleE1hc2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXNrQ2h1bmtzID0gW10sIHRyYW5zbGF0aW9uLCBwYXR0ZXJuLCBvcHRpb25hbCwgcmVjdXJzaXZlLCBvUmVjdXJzaXZlLCByO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uID0gak1hc2sudHJhbnNsYXRpb25bbWFzay5jaGFyQXQoaSldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gdHJhbnNsYXRpb24ucGF0dGVybi50b1N0cmluZygpLnJlcGxhY2UoLy57MX0kfF4uezF9L2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsID0gdHJhbnNsYXRpb24ub3B0aW9uYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnNpdmUgPSB0cmFuc2xhdGlvbi5yZWN1cnNpdmU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrQ2h1bmtzLnB1c2gobWFzay5jaGFyQXQoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9SZWN1cnNpdmUgPSB7ZGlnaXQ6IG1hc2suY2hhckF0KGkpLCBwYXR0ZXJuOiBwYXR0ZXJufTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0NodW5rcy5wdXNoKCFvcHRpb25hbCAmJiAhcmVjdXJzaXZlID8gcGF0dGVybiA6IChwYXR0ZXJuICsgJz8nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tDaHVua3MucHVzaChtYXNrLmNoYXJBdChpKS5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByID0gbWFza0NodW5rcy5qb2luKCcnKTtcblxuICAgICAgICAgICAgICAgIGlmIChvUmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHIgPSByLnJlcGxhY2UobmV3IFJlZ0V4cCgnKCcgKyBvUmVjdXJzaXZlLmRpZ2l0ICsgJyguKicgKyBvUmVjdXJzaXZlLmRpZ2l0ICsgJyk/KScpLCAnKCQxKT8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAob1JlY3Vyc2l2ZS5kaWdpdCwgJ2cnKSwgb1JlY3Vyc2l2ZS5wYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95RXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlbC5vZmYoWydpbnB1dCcsICdrZXlkb3duJywgJ2tleXVwJywgJ3Bhc3RlJywgJ2Ryb3AnLCAnYmx1cicsICdmb2N1c291dCcsICcnXS5qb2luKCcubWFzayAnKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzSW5wdXQgPSBlbC5pcygnaW5wdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gaXNJbnB1dCA/ICd2YWwnIDogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICByO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbFttZXRob2RdKCkgIT09IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsW21ldGhvZF0odik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgciA9IGVsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHIgPSBlbFttZXRob2RdKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsY3VsYXRlQ2FyZXRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZFZhbCA9IGVsLmRhdGEoJ21hc2stcHJldml1cy12YWx1ZScpIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSBwLmdldE1hc2tlZCgpLFxuICAgICAgICAgICAgICAgICAgICBjYXJldFBvc05ldyA9IHAuZ2V0Q2FyZXQoKTtcbiAgICAgICAgICAgICAgICBpZiAob2xkVmFsICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zT2xkID0gZWwuZGF0YSgnbWFzay1wcmV2aXVzLWNhcmV0LXBvcycpIHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWxMID0gbmV3VmFsLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbEwgPSBvbGRWYWwubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0c0JlZm9yZUNhcmV0ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdHNBZnRlckNhcmV0ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdHNCZWZvcmVDYXJldEFsbCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRzQmVmb3JlQ2FyZXRBbGxPbGQgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gY2FyZXRQb3NOZXc7IGkgPCBuZXdWYWxMOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcC5tYXNrRGlnaXRQb3NNYXBbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdHNBZnRlckNhcmV0Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBjYXJldFBvc05ldyAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXAubWFza0RpZ2l0UG9zTWFwW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRzQmVmb3JlQ2FyZXQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGNhcmV0UG9zTmV3IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLm1hc2tEaWdpdFBvc01hcFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdHNCZWZvcmVDYXJldEFsbCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gY2FyZXRQb3NPbGQgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAubWFza0RpZ2l0UG9zTWFwT2xkW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsT2xkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgY3Vyc29yIGlzIGF0IHRoZSBlbmQga2VlcCBpdCB0aGVyZVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZXRQb3NOZXcgPiBvbGRWYWxMKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3NOZXcgPSBuZXdWYWxMICogMTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FyZXRQb3NPbGQgPj0gY2FyZXRQb3NOZXcgJiYgY2FyZXRQb3NPbGQgIT09IG9sZFZhbEwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcC5tYXNrRGlnaXRQb3NNYXBPbGRbY2FyZXRQb3NOZXddKSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3MgPSBjYXJldFBvc05ldztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3NOZXcgLT0gbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsT2xkIC0gbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvc05ldyAtPSBtYXNrRGlnaXRzQmVmb3JlQ2FyZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLm1hc2tEaWdpdFBvc01hcFtjYXJldFBvc05ld10pICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3NOZXcgPSBjYXJldFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNhcmV0UG9zTmV3ID4gY2FyZXRQb3NPbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zTmV3ICs9IG1hc2tEaWdpdHNCZWZvcmVDYXJldEFsbCAtIG1hc2tEaWdpdHNCZWZvcmVDYXJldEFsbE9sZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zTmV3ICs9IG1hc2tEaWdpdHNBZnRlckNhcmV0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjYXJldFBvc05ldztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWhhdmlvdXI6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICAgICAgcC5pbnZhbGlkID0gW107XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5Q29kZSA9IGVsLmRhdGEoJ21hc2sta2V5Y29kZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShrZXlDb2RlLCBqTWFzay5ieVBhc3NLZXlzKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IHAuZ2V0TWFza2VkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvcyA9IHAuZ2V0Q2FyZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGEgY29tcGVuc2F0aW9uIHRvIGRldmljZXMvYnJvd3NlcnMgdGhhdCBkb24ndCBjb21wZW5zYXRlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhcmV0IHBvc2l0aW9uaW5nIHRoZSByaWdodCB3YXlcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICBwLnNldENhcmV0KHAuY2FsY3VsYXRlQ2FyZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgJC5qTWFza0dsb2JhbHMua2V5U3Ryb2tlQ29tcGVuc2F0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBwLnZhbChuZXdWYWwpO1xuICAgICAgICAgICAgICAgICAgICBwLnNldENhcmV0KGNhcmV0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY2FsbGJhY2tzKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRNYXNrZWQ6IGZ1bmN0aW9uKHNraXBNYXNrQ2hhcnMsIHZhbCkge1xuICAgICAgICAgICAgICAgIHZhciBidWYgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWwgPT09IHVuZGVmaW5lZCA/IHAudmFsKCkgOiB2YWwgKyAnJyxcbiAgICAgICAgICAgICAgICAgICAgbSA9IDAsIG1hc2tMZW4gPSBtYXNrLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgdiA9IDAsIHZhbExlbiA9IHZhbHVlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMSwgYWRkTWV0aG9kID0gJ3B1c2gnLFxuICAgICAgICAgICAgICAgICAgICByZXNldFBvcyA9IC0xLFxuICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRDb3VudCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdFBvc0FyciA9IFtdLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TWFza0NoYXIsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRNZXRob2QgPSAndW5zaGlmdCc7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBsYXN0TWFza0NoYXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICBtID0gbWFza0xlbiAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHYgPSB2YWxMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtID4gLTEgJiYgdiA+IC0xO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RNYXNrQ2hhciA9IG1hc2tMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtIDwgbWFza0xlbiAmJiB2IDwgdmFsTGVuO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBsYXN0VW50cmFuc2xhdGVkTWFza0NoYXI7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGNoZWNrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tEaWdpdCA9IG1hc2suY2hhckF0KG0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsRGlnaXQgPSB2YWx1ZS5jaGFyQXQodiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbiA9IGpNYXNrLnRyYW5zbGF0aW9uW21hc2tEaWdpdF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsRGlnaXQubWF0Y2godHJhbnNsYXRpb24ucGF0dGVybikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZbYWRkTWV0aG9kXSh2YWxEaWdpdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvbi5yZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2V0UG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRQb3MgPSBtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG0gPT09IGxhc3RNYXNrQ2hhciAmJiBtICE9PSByZXNldFBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IHJlc2V0UG9zIC0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RNYXNrQ2hhciA9PT0gcmVzZXRQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gLT0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWxEaWdpdCA9PT0gbGFzdFVudHJhbnNsYXRlZE1hc2tDaGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hlZCB0aGUgbGFzdCB1bnRyYW5zbGF0ZWQgKHJhdykgbWFzayBjaGFyYWN0ZXIgdGhhdCB3ZSBlbmNvdW50ZXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpa2VseSBhbiBpbnNlcnQgb2Zmc2V0IHRoZSBtYXNrIGNoYXJhY3RlciBmcm9tIHRoZSBsYXN0IGVudHJ5OyBmYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhyb3VnaCBhbmQgb25seSBpbmNyZW1lbnQgdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdENvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVudHJhbnNsYXRlZE1hc2tDaGFyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGlvbi5vcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgLT0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGlvbi5mYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZlthZGRNZXRob2RdKHRyYW5zbGF0aW9uLmZhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2IC09IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAuaW52YWxpZC5wdXNoKHtwOiB2LCB2OiB2YWxEaWdpdCwgZTogdHJhbnNsYXRpb24ucGF0dGVybn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdiArPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNraXBNYXNrQ2hhcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZbYWRkTWV0aG9kXShtYXNrRGlnaXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsRGlnaXQgPT09IG1hc2tEaWdpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdFBvc0Fyci5wdXNoKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VW50cmFuc2xhdGVkTWFza0NoYXIgPSBtYXNrRGlnaXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0UG9zQXJyLnB1c2godiArIG1hc2tEaWdpdENvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBtICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBsYXN0TWFza0NoYXJEaWdpdCA9IG1hc2suY2hhckF0KGxhc3RNYXNrQ2hhcik7XG4gICAgICAgICAgICAgICAgaWYgKG1hc2tMZW4gPT09IHZhbExlbiArIDEgJiYgIWpNYXNrLnRyYW5zbGF0aW9uW2xhc3RNYXNrQ2hhckRpZ2l0XSkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChsYXN0TWFza0NoYXJEaWdpdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IGJ1Zi5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICBwLm1hcE1hc2tkaWdpdFBvc2l0aW9ucyhuZXdWYWwsIG1hc2tEaWdpdFBvc0FyciwgdmFsTGVuKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcE1hc2tkaWdpdFBvc2l0aW9uczogZnVuY3Rpb24obmV3VmFsLCBtYXNrRGlnaXRQb3NBcnIsIHZhbExlbikge1xuICAgICAgICAgICAgICB2YXIgbWFza0RpZmYgPSBvcHRpb25zLnJldmVyc2UgPyBuZXdWYWwubGVuZ3RoIC0gdmFsTGVuIDogMDtcbiAgICAgICAgICAgICAgcC5tYXNrRGlnaXRQb3NNYXAgPSB7fTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXNrRGlnaXRQb3NBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwLm1hc2tEaWdpdFBvc01hcFttYXNrRGlnaXRQb3NBcnJbaV0gKyBtYXNrRGlmZl0gPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBwLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdmFsICE9PSBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFyZ3MgPSBbdmFsLCBlLCBlbCwgb3B0aW9uc10sXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obmFtZSwgY3JpdGVyaWEsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiBjcml0ZXJpYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjaygnb25DaGFuZ2UnLCBjaGFuZ2VkID09PSB0cnVlLCBkZWZhdWx0QXJncyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJ29uS2V5UHJlc3MnLCBjaGFuZ2VkID09PSB0cnVlLCBkZWZhdWx0QXJncyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJ29uQ29tcGxldGUnLCB2YWwubGVuZ3RoID09PSBtYXNrLmxlbmd0aCwgZGVmYXVsdEFyZ3MpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCdvbkludmFsaWQnLCBwLmludmFsaWQubGVuZ3RoID4gMCwgW3ZhbCwgZSwgZWwsIHAuaW52YWxpZCwgb3B0aW9uc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGVsID0gJChlbCk7XG4gICAgICAgIHZhciBqTWFzayA9IHRoaXMsIG9sZFZhbHVlID0gcC52YWwoKSwgcmVnZXhNYXNrO1xuXG4gICAgICAgIG1hc2sgPSB0eXBlb2YgbWFzayA9PT0gJ2Z1bmN0aW9uJyA/IG1hc2socC52YWwoKSwgdW5kZWZpbmVkLCBlbCwgIG9wdGlvbnMpIDogbWFzaztcblxuICAgICAgICAvLyBwdWJsaWMgbWV0aG9kc1xuICAgICAgICBqTWFzay5tYXNrID0gbWFzaztcbiAgICAgICAgak1hc2sub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIGpNYXNrLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNhcmV0ID0gcC5nZXRDYXJldCgpO1xuICAgICAgICAgICAgaWYgKGpNYXNrLm9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyKCdwbGFjZWhvbGRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsLmRhdGEoJ21hc2stbWF4bGVuZ3RoJykpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyKCdtYXhsZW5ndGgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuZGVzdHJveUV2ZW50cygpO1xuICAgICAgICAgICAgcC52YWwoak1hc2suZ2V0Q2xlYW5WYWwoKSk7XG4gICAgICAgICAgICBwLnNldENhcmV0KGNhcmV0KTtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBnZXQgdmFsdWUgd2l0aG91dCBtYXNrXG4gICAgICAgIGpNYXNrLmdldENsZWFuVmFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgIHJldHVybiBwLmdldE1hc2tlZCh0cnVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBnZXQgbWFza2VkIHZhbHVlIHdpdGhvdXQgdGhlIHZhbHVlIGJlaW5nIGluIHRoZSBpbnB1dCBvciBlbGVtZW50XG4gICAgICAgIGpNYXNrLmdldE1hc2tlZFZhbCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICByZXR1cm4gcC5nZXRNYXNrZWQoZmFsc2UsIHZhbCk7XG4gICAgICAgIH07XG5cbiAgICAgICBqTWFzay5pbml0ID0gZnVuY3Rpb24ob25seU1hc2spIHtcbiAgICAgICAgICAgIG9ubHlNYXNrID0gb25seU1hc2sgfHwgZmFsc2U7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICAgICAgak1hc2suY2xlYXJJZk5vdE1hdGNoICA9ICQuak1hc2tHbG9iYWxzLmNsZWFySWZOb3RNYXRjaDtcbiAgICAgICAgICAgIGpNYXNrLmJ5UGFzc0tleXMgICAgICAgPSAkLmpNYXNrR2xvYmFscy5ieVBhc3NLZXlzO1xuICAgICAgICAgICAgak1hc2sudHJhbnNsYXRpb24gICAgICA9ICQuZXh0ZW5kKHt9LCAkLmpNYXNrR2xvYmFscy50cmFuc2xhdGlvbiwgb3B0aW9ucy50cmFuc2xhdGlvbik7XG5cbiAgICAgICAgICAgIGpNYXNrID0gJC5leHRlbmQodHJ1ZSwge30sIGpNYXNrLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgcmVnZXhNYXNrID0gcC5nZXRSZWdleE1hc2soKTtcblxuICAgICAgICAgICAgaWYgKG9ubHlNYXNrKSB7XG4gICAgICAgICAgICAgICAgcC5ldmVudHMoKTtcbiAgICAgICAgICAgICAgICBwLnZhbChwLmdldE1hc2tlZCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXR0cigncGxhY2Vob2xkZXInICwgb3B0aW9ucy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBuZWNlc3NhcnksIG90aGVyd2lzZSBpZiB0aGUgdXNlciBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBwcmVzcyB0aGUgXCJiYWNrXCIgYnV0dG9uLCB0aGUgYXV0b2NvbXBsZXRlIHdpbGwgZXJhc2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgZGF0YS4gV29ya3MgZmluZSBvbiBJRTkrLCBGRiwgT3BlcmEsIFNhZmFyaS5cbiAgICAgICAgICAgICAgICBpZiAoZWwuZGF0YSgnbWFzaycpKSB7XG4gICAgICAgICAgICAgICAgICBlbC5hdHRyKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZGV0ZWN0IGlmIGlzIG5lY2Vzc2FyeSBsZXQgdGhlIHVzZXIgdHlwZSBmcmVlbHkuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGlzIGEgbG90IGZhc3RlciB0aGFuIGZvckVhY2guXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG1heGxlbmd0aCA9IHRydWU7IGkgPCBtYXNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGlvbiA9IGpNYXNrLnRyYW5zbGF0aW9uW21hc2suY2hhckF0KGkpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0aW9uICYmIHRyYW5zbGF0aW9uLnJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtYXhsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXR0cignbWF4bGVuZ3RoJywgbWFzay5sZW5ndGgpLmRhdGEoJ21hc2stbWF4bGVuZ3RoJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcC5kZXN0cm95RXZlbnRzKCk7XG4gICAgICAgICAgICAgICAgcC5ldmVudHMoKTtcblxuICAgICAgICAgICAgICAgIHZhciBjYXJldCA9IHAuZ2V0Q2FyZXQoKTtcbiAgICAgICAgICAgICAgICBwLnZhbChwLmdldE1hc2tlZCgpKTtcbiAgICAgICAgICAgICAgICBwLnNldENhcmV0KGNhcmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBqTWFzay5pbml0KCFlbC5pcygnaW5wdXQnKSk7XG4gICAgfTtcblxuICAgICQubWFza1dhdGNoZXJzID0ge307XG4gICAgdmFyIEhUTUxBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9LFxuICAgICAgICAgICAgcHJlZml4ID0gJ2RhdGEtbWFzay0nLFxuICAgICAgICAgICAgbWFzayA9IGlucHV0LmF0dHIoJ2RhdGEtbWFzaycpO1xuXG4gICAgICAgIGlmIChpbnB1dC5hdHRyKHByZWZpeCArICdyZXZlcnNlJykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucmV2ZXJzZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQuYXR0cihwcmVmaXggKyAnY2xlYXJpZm5vdG1hdGNoJykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuY2xlYXJJZk5vdE1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC5hdHRyKHByZWZpeCArICdzZWxlY3RvbmZvY3VzJykgPT09ICd0cnVlJykge1xuICAgICAgICAgICBvcHRpb25zLnNlbGVjdE9uRm9jdXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vdFNhbWVNYXNrT2JqZWN0KGlucHV0LCBtYXNrLCBvcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LmRhdGEoJ21hc2snLCBuZXcgTWFzayh0aGlzLCBtYXNrLCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5vdFNhbWVNYXNrT2JqZWN0ID0gZnVuY3Rpb24oZmllbGQsIG1hc2ssIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBtYXNrT2JqZWN0ID0gJChmaWVsZCkuZGF0YSgnbWFzaycpLFxuICAgICAgICAgICAgc3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnksXG4gICAgICAgICAgICB2YWx1ZSA9ICQoZmllbGQpLnZhbCgpIHx8ICQoZmllbGQpLnRleHQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWFzayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIG1hc2sgPSBtYXNrKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgbWFza09iamVjdCAhPT0gJ29iamVjdCcgfHwgc3RyaW5naWZ5KG1hc2tPYmplY3Qub3B0aW9ucykgIT09IHN0cmluZ2lmeShvcHRpb25zKSB8fCBtYXNrT2JqZWN0Lm1hc2sgIT09IG1hc2s7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfSxcbiAgICBldmVudFN1cHBvcnRlZCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgaXNTdXBwb3J0ZWQ7XG5cbiAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZTtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSAoZXZlbnROYW1lIGluIGVsKTtcblxuICAgICAgICBpZiAoICFpc1N1cHBvcnRlZCApIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShldmVudE5hbWUsICdyZXR1cm47Jyk7XG4gICAgICAgICAgICBpc1N1cHBvcnRlZCA9IHR5cGVvZiBlbFtldmVudE5hbWVdID09PSAnZnVuY3Rpb24nO1xuICAgICAgICB9XG4gICAgICAgIGVsID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG4gICAgfTtcblxuICAgICQuZm4ubWFzayA9IGZ1bmN0aW9uKG1hc2ssIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IsXG4gICAgICAgICAgICBnbG9iYWxzID0gJC5qTWFza0dsb2JhbHMsXG4gICAgICAgICAgICBpbnRlcnZhbCA9IGdsb2JhbHMud2F0Y2hJbnRlcnZhbCxcbiAgICAgICAgICAgIHdhdGNoSW5wdXRzID0gb3B0aW9ucy53YXRjaElucHV0cyB8fCBnbG9iYWxzLndhdGNoSW5wdXRzLFxuICAgICAgICAgICAgbWFza0Z1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdFNhbWVNYXNrT2JqZWN0KHRoaXMsIG1hc2ssIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLmRhdGEoJ21hc2snLCBuZXcgTWFzayh0aGlzLCBtYXNrLCBvcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAkKHRoaXMpLmVhY2gobWFza0Z1bmN0aW9uKTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IgJiYgc2VsZWN0b3IgIT09ICcnICYmIHdhdGNoSW5wdXRzKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKCQubWFza1dhdGNoZXJzW3NlbGVjdG9yXSk7XG4gICAgICAgICAgICAkLm1hc2tXYXRjaGVyc1tzZWxlY3Rvcl0gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLmZpbmQoc2VsZWN0b3IpLmVhY2gobWFza0Z1bmN0aW9uKTtcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgJC5mbi5tYXNrZWQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSgnbWFzaycpLmdldE1hc2tlZFZhbCh2YWwpO1xuICAgIH07XG5cbiAgICAkLmZuLnVubWFzayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhckludGVydmFsKCQubWFza1dhdGNoZXJzW3RoaXMuc2VsZWN0b3JdKTtcbiAgICAgICAgZGVsZXRlICQubWFza1dhdGNoZXJzW3RoaXMuc2VsZWN0b3JdO1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGFNYXNrID0gJCh0aGlzKS5kYXRhKCdtYXNrJyk7XG4gICAgICAgICAgICBpZiAoZGF0YU1hc2spIHtcbiAgICAgICAgICAgICAgICBkYXRhTWFzay5yZW1vdmUoKS5yZW1vdmVEYXRhKCdtYXNrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmNsZWFuVmFsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEoJ21hc2snKS5nZXRDbGVhblZhbCgpO1xuICAgIH07XG5cbiAgICAkLmFwcGx5RGF0YU1hc2sgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8ICQuak1hc2tHbG9iYWxzLm1hc2tFbGVtZW50cztcbiAgICAgICAgdmFyICRzZWxlY3RvciA9IChzZWxlY3RvciBpbnN0YW5jZW9mICQpID8gc2VsZWN0b3IgOiAkKHNlbGVjdG9yKTtcbiAgICAgICAgJHNlbGVjdG9yLmZpbHRlcigkLmpNYXNrR2xvYmFscy5kYXRhTWFza0F0dHIpLmVhY2goSFRNTEF0dHJpYnV0ZXMpO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFscyA9IHtcbiAgICAgICAgbWFza0VsZW1lbnRzOiAnaW5wdXQsdGQsc3BhbixkaXYnLFxuICAgICAgICBkYXRhTWFza0F0dHI6ICcqW2RhdGEtbWFza10nLFxuICAgICAgICBkYXRhTWFzazogdHJ1ZSxcbiAgICAgICAgd2F0Y2hJbnRlcnZhbDogMzAwLFxuICAgICAgICB3YXRjaElucHV0czogdHJ1ZSxcbiAgICAgICAga2V5U3Ryb2tlQ29tcGVuc2F0aW9uOiAxMCxcbiAgICAgICAgLy8gb2xkIHZlcnNpb25zIG9mIGNocm9tZSBkb250IHdvcmsgZ3JlYXQgd2l0aCBpbnB1dCBldmVudFxuICAgICAgICB1c2VJbnB1dDogIS9DaHJvbWVcXC9bMi00XVswLTldfFNhbXN1bmdCcm93c2VyLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSAmJiBldmVudFN1cHBvcnRlZCgnaW5wdXQnKSxcbiAgICAgICAgd2F0Y2hEYXRhTWFzazogZmFsc2UsXG4gICAgICAgIGJ5UGFzc0tleXM6IFs5LCAxNiwgMTcsIDE4LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDkxXSxcbiAgICAgICAgdHJhbnNsYXRpb246IHtcbiAgICAgICAgICAgICcwJzoge3BhdHRlcm46IC9cXGQvfSxcbiAgICAgICAgICAgICc5Jzoge3BhdHRlcm46IC9cXGQvLCBvcHRpb25hbDogdHJ1ZX0sXG4gICAgICAgICAgICAnIyc6IHtwYXR0ZXJuOiAvXFxkLywgcmVjdXJzaXZlOiB0cnVlfSxcbiAgICAgICAgICAgICdBJzoge3BhdHRlcm46IC9bYS16QS1aMC05XS99LFxuICAgICAgICAgICAgJ1MnOiB7cGF0dGVybjogL1thLXpBLVpdL31cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkLmpNYXNrR2xvYmFscyA9ICQuak1hc2tHbG9iYWxzIHx8IHt9O1xuICAgIGdsb2JhbHMgPSAkLmpNYXNrR2xvYmFscyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBnbG9iYWxzLCAkLmpNYXNrR2xvYmFscyk7XG5cbiAgICAvLyBsb29raW5nIGZvciBpbnB1dHMgd2l0aCBkYXRhLW1hc2sgYXR0cmlidXRlXG4gICAgaWYgKGdsb2JhbHMuZGF0YU1hc2spIHtcbiAgICAgICAgJC5hcHBseURhdGFNYXNrKCk7XG4gICAgfVxuXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkLmpNYXNrR2xvYmFscy53YXRjaERhdGFNYXNrKSB7XG4gICAgICAgICAgICAkLmFwcGx5RGF0YU1hc2soKTtcbiAgICAgICAgfVxuICAgIH0sIGdsb2JhbHMud2F0Y2hJbnRlcnZhbCk7XG59LCB3aW5kb3cualF1ZXJ5LCB3aW5kb3cuWmVwdG8pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2pxdWVyeS1tYXNrLXBsdWdpbi9kaXN0L2pxdWVyeS5tYXNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpRdWVyeVwiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9