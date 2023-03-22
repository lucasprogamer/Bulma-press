/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/jquery-mask-plugin/dist/jquery.mask.js":
/*!*************************************************************!*\
  !*** ./node_modules/jquery-mask-plugin/dist/jquery.mask.js ***!
  \*************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * jquery.mask.js
 * @version: v1.14.16
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
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}

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
            calculateCaretPosition: function(oldVal) {
                var newVal = p.getMasked(),
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
                        caretPos = p.getCaret(),
                        oldVal = el.data('mask-previus-value') || '';

                    // this is a compensation to devices/browsers that don't compensate
                    // caret positioning the right way
                    setTimeout(function() {
                      p.setCaret(p.calculateCaretPosition(oldVal));
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

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./assets/js/jmasks.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery_mask_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery-mask-plugin */ "./node_modules/jquery-mask-plugin/dist/jquery.mask.js");
/* harmony import */ var jquery_mask_plugin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery_mask_plugin__WEBPACK_IMPORTED_MODULE_0__);

$(document).ready(function () {
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  $('.phone_with_ddd').mask('(00) 0000-0000');
  $('.phone_us').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', {
    reverse: true
  });
  $('.cnpj').mask('00.000.000/0000-00', {
    reverse: true
  });
  $('.money').mask('000.000.000.000.000,00', {
    reverse: true
  });
  $('.money2').mask("#.##0,00", {
    reverse: true
  });
  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
      'Z': {
        pattern: /[0-9]/,
        optional: true
      }
    }
  });
  $('.ip_address').mask('099.099.099.099');
  $('.percent').mask('##0,00%', {
    reverse: true
  });
  $('.clear-if-not-match').mask("00/00/0000", {
    clearIfNotMatch: true
  });
  $('.placeholder').mask("00/00/0000", {
    placeholder: "__/__/____"
  });
  $('.fallback').mask("00r00r0000", {
    translation: {
      'r': {
        pattern: /[\/]/,
        fallback: '/'
      },
      placeholder: "__/__/____"
    }
  });
  $('.selectonfocus').mask("00/00/0000", {
    selectOnFocus: true
  });
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUMsQ0FBQ0MsTUFBTSxLQUFLLEVBQUUsR0FBRyxpQkFBaUIsR0FBRyxpQkFBaUI7RUFDckYsQ0FBQztFQUNEQyxTQUFTLEdBQUc7SUFDVkMsVUFBVSxFQUFFLFNBQUFBLFdBQVNKLEdBQUcsRUFBRUssQ0FBQyxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRTtNQUN6Q0QsS0FBSyxDQUFDaEIsSUFBSSxDQUFDUyxjQUFjLENBQUNTLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRUMsU0FBUyxDQUFDLEVBQUVGLE9BQU8sQ0FBQztJQUMxRDtFQUNKLENBQUM7QUFFRHBCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQ0csSUFBSSxDQUFDUyxjQUFjLEVBQUVJLFNBQVMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQnVsbWFQcmVzcy8uL25vZGVfbW9kdWxlcy9qcXVlcnktbWFzay1wbHVnaW4vZGlzdC9qcXVlcnkubWFzay5qcyIsIndlYnBhY2s6Ly9CdWxtYVByZXNzL2V4dGVybmFsIHZhciBcImpRdWVyeVwiIiwid2VicGFjazovL0J1bG1hUHJlc3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQnVsbWFQcmVzcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9CdWxtYVByZXNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9CdWxtYVByZXNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQnVsbWFQcmVzcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0J1bG1hUHJlc3MvLi9hc3NldHMvanMvam1hc2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICoganF1ZXJ5Lm1hc2suanNcbiAqIEB2ZXJzaW9uOiB2MS4xNC4xNlxuICogQGF1dGhvcjogSWdvciBFc2NvYmFyXG4gKlxuICogQ3JlYXRlZCBieSBJZ29yIEVzY29iYXIgb24gMjAxMi0wMy0xMC4gUGxlYXNlIHJlcG9ydCBhbnkgYnVnIGF0IGdpdGh1Yi5jb20vaWdvcmVzY29iYXIvalF1ZXJ5LU1hc2stUGx1Z2luXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIElnb3IgRXNjb2JhciBodHRwOi8vaWdvcmVzY29iYXIuY29tXG4gKlxuICogVGhlIE1JVCBMaWNlbnNlIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICogcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICogY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICogT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAqIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG4gKiBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAqIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuICogT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGpzaGludCBsYXhicmVhazogdHJ1ZSAqL1xuLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTcgKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pIHBhdHRlcm5zIGZvciBKYXZhU2NyaXB0IG1vZHVsZXMgdGhhdCB3b3JrIGV2ZXJ5d2hlcmUuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3RlbXBsYXRlcy9qcXVlcnlQbHVnaW4uanNcbihmdW5jdGlvbiAoZmFjdG9yeSwgalF1ZXJ5LCBaZXB0bykge1xuXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIE1ldGVvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSB8fCBaZXB0byk7XG4gICAgfVxuXG59KGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIE1hc2sgPSBmdW5jdGlvbiAoZWwsIG1hc2ssIG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgcCA9IHtcbiAgICAgICAgICAgIGludmFsaWQ6IFtdLFxuICAgICAgICAgICAgZ2V0Q2FyZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwgPSBlbC5nZXQoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkU2VsID0gZG9jdW1lbnQuc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgY1NlbFN0YXJ0ID0gY3RybC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJRSBTdXBwb3J0XG4gICAgICAgICAgICAgICAgICAgIGlmIChkU2VsICYmIG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ01TSUUgMTAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbCA9IGRTZWwuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbC5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1wLnZhbCgpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBzZWwudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCBzdXBwb3J0XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNTZWxTdGFydCB8fCBjU2VsU3RhcnQgPT09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gY1NlbFN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENhcmV0OiBmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuaXMoJzpmb2N1cycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2UsIGN0cmwgPSBlbC5nZXQoMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3gsIFdlYktpdCwgZXRjLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHJsLnNldFNlbGVjdGlvblJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBJRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gY3RybC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlbFxuICAgICAgICAgICAgICAgIC5vbigna2V5ZG93bi5tYXNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlbC5kYXRhKCdtYXNrLWtleWNvZGUnLCBlLmtleUNvZGUgfHwgZS53aGljaCk7XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdGEoJ21hc2stcHJldml1cy12YWx1ZScsIGVsLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuZGF0YSgnbWFzay1wcmV2aXVzLWNhcmV0LXBvcycsIHAuZ2V0Q2FyZXQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHAubWFza0RpZ2l0UG9zTWFwT2xkID0gcC5tYXNrRGlnaXRQb3NNYXA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJC5qTWFza0dsb2JhbHMudXNlSW5wdXQgPyAnaW5wdXQubWFzaycgOiAna2V5dXAubWFzaycsIHAuYmVoYXZpb3VyKVxuICAgICAgICAgICAgICAgIC5vbigncGFzdGUubWFzayBkcm9wLm1hc2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmtleWRvd24oKS5rZXl1cCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdjaGFuZ2UubWFzaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdGEoJ2NoYW5nZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignYmx1ci5tYXNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSBwLnZhbCgpICYmICFlbC5kYXRhKCdjaGFuZ2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsLmRhdGEoJ2NoYW5nZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBpdCdzIHZlcnkgaW1wb3J0YW50IHRoYXQgdGhpcyBjYWxsYmFjayByZW1haW5zIGluIHRoaXMgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAvLyBvdGhlcndoaXNlIG9sZFZhbHVlIGl0J3MgZ29pbmcgdG8gd29yayBidWdneVxuICAgICAgICAgICAgICAgIC5vbignYmx1ci5tYXNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gcC52YWwoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBhbGwgdGV4dCBvbiBmb2N1c1xuICAgICAgICAgICAgICAgIC5vbignZm9jdXMubWFzaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNlbGVjdE9uRm9jdXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZS50YXJnZXQpLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgdmFsdWUgaWYgaXQgbm90IGNvbXBsZXRlIHRoZSBtYXNrXG4gICAgICAgICAgICAgICAgLm9uKCdmb2N1c291dC5tYXNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNsZWFySWZOb3RNYXRjaCAmJiAhcmVnZXhNYXNrLnRlc3QocC52YWwoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgcC52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZWdleE1hc2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXNrQ2h1bmtzID0gW10sIHRyYW5zbGF0aW9uLCBwYXR0ZXJuLCBvcHRpb25hbCwgcmVjdXJzaXZlLCBvUmVjdXJzaXZlLCByO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uID0gak1hc2sudHJhbnNsYXRpb25bbWFzay5jaGFyQXQoaSldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gdHJhbnNsYXRpb24ucGF0dGVybi50b1N0cmluZygpLnJlcGxhY2UoLy57MX0kfF4uezF9L2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsID0gdHJhbnNsYXRpb24ub3B0aW9uYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnNpdmUgPSB0cmFuc2xhdGlvbi5yZWN1cnNpdmU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrQ2h1bmtzLnB1c2gobWFzay5jaGFyQXQoaSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9SZWN1cnNpdmUgPSB7ZGlnaXQ6IG1hc2suY2hhckF0KGkpLCBwYXR0ZXJuOiBwYXR0ZXJufTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0NodW5rcy5wdXNoKCFvcHRpb25hbCAmJiAhcmVjdXJzaXZlID8gcGF0dGVybiA6IChwYXR0ZXJuICsgJz8nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tDaHVua3MucHVzaChtYXNrLmNoYXJBdChpKS5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByID0gbWFza0NodW5rcy5qb2luKCcnKTtcblxuICAgICAgICAgICAgICAgIGlmIChvUmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHIgPSByLnJlcGxhY2UobmV3IFJlZ0V4cCgnKCcgKyBvUmVjdXJzaXZlLmRpZ2l0ICsgJyguKicgKyBvUmVjdXJzaXZlLmRpZ2l0ICsgJyk/KScpLCAnKCQxKT8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAob1JlY3Vyc2l2ZS5kaWdpdCwgJ2cnKSwgb1JlY3Vyc2l2ZS5wYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95RXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBlbC5vZmYoWydpbnB1dCcsICdrZXlkb3duJywgJ2tleXVwJywgJ3Bhc3RlJywgJ2Ryb3AnLCAnYmx1cicsICdmb2N1c291dCcsICcnXS5qb2luKCcubWFzayAnKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzSW5wdXQgPSBlbC5pcygnaW5wdXQnKSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kID0gaXNJbnB1dCA/ICd2YWwnIDogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICByO1xuXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbFttZXRob2RdKCkgIT09IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsW21ldGhvZF0odik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgciA9IGVsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHIgPSBlbFttZXRob2RdKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsY3VsYXRlQ2FyZXRQb3NpdGlvbjogZnVuY3Rpb24ob2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IHAuZ2V0TWFza2VkKCksXG4gICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zTmV3ID0gcC5nZXRDYXJldCgpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWwgIT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZXRQb3NPbGQgPSBlbC5kYXRhKCdtYXNrLXByZXZpdXMtY2FyZXQtcG9zJykgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbEwgPSBuZXdWYWwubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsTCA9IG9sZFZhbC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRzQmVmb3JlQ2FyZXQgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0c0FmdGVyQ2FyZXQgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdHNCZWZvcmVDYXJldEFsbE9sZCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBjYXJldFBvc05ldzsgaSA8IG5ld1ZhbEw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwLm1hc2tEaWdpdFBvc01hcFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0c0FmdGVyQ2FyZXQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGNhcmV0UG9zTmV3IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcC5tYXNrRGlnaXRQb3NNYXBbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdHNCZWZvcmVDYXJldCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gY2FyZXRQb3NOZXcgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAubWFza0RpZ2l0UG9zTWFwW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBjYXJldFBvc09sZCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocC5tYXNrRGlnaXRQb3NNYXBPbGRbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRzQmVmb3JlQ2FyZXRBbGxPbGQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJzb3IgaXMgYXQgdGhlIGVuZCBrZWVwIGl0IHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJldFBvc05ldyA+IG9sZFZhbEwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvc05ldyA9IG5ld1ZhbEwgKiAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYXJldFBvc09sZCA+PSBjYXJldFBvc05ldyAmJiBjYXJldFBvc09sZCAhPT0gb2xkVmFsTCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwLm1hc2tEaWdpdFBvc01hcE9sZFtjYXJldFBvc05ld10pICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0UG9zTmV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvc05ldyAtPSBtYXNrRGlnaXRzQmVmb3JlQ2FyZXRBbGxPbGQgLSBtYXNrRGlnaXRzQmVmb3JlQ2FyZXRBbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zTmV3IC09IG1hc2tEaWdpdHNCZWZvcmVDYXJldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAubWFza0RpZ2l0UG9zTWFwW2NhcmV0UG9zTmV3XSkgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldFBvc05ldyA9IGNhcmV0UG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY2FyZXRQb3NOZXcgPiBjYXJldFBvc09sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3NOZXcgKz0gbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsIC0gbWFza0RpZ2l0c0JlZm9yZUNhcmV0QWxsT2xkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXRQb3NOZXcgKz0gbWFza0RpZ2l0c0FmdGVyQ2FyZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcmV0UG9zTmV3O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlaGF2aW91cjogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgICAgICBwLmludmFsaWQgPSBbXTtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlDb2RlID0gZWwuZGF0YSgnbWFzay1rZXljb2RlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KGtleUNvZGUsIGpNYXNrLmJ5UGFzc0tleXMpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsID0gcC5nZXRNYXNrZWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0UG9zID0gcC5nZXRDYXJldCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsID0gZWwuZGF0YSgnbWFzay1wcmV2aXVzLXZhbHVlJykgfHwgJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGNvbXBlbnNhdGlvbiB0byBkZXZpY2VzL2Jyb3dzZXJzIHRoYXQgZG9uJ3QgY29tcGVuc2F0ZVxuICAgICAgICAgICAgICAgICAgICAvLyBjYXJldCBwb3NpdGlvbmluZyB0aGUgcmlnaHQgd2F5XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcC5zZXRDYXJldChwLmNhbGN1bGF0ZUNhcmV0UG9zaXRpb24ob2xkVmFsKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sICQuak1hc2tHbG9iYWxzLmtleVN0cm9rZUNvbXBlbnNhdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgcC52YWwobmV3VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcC5zZXRDYXJldChjYXJldFBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmNhbGxiYWNrcyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TWFza2VkOiBmdW5jdGlvbihza2lwTWFza0NoYXJzLCB2YWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVmID0gW10sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsID09PSB1bmRlZmluZWQgPyBwLnZhbCgpIDogdmFsICsgJycsXG4gICAgICAgICAgICAgICAgICAgIG0gPSAwLCBtYXNrTGVuID0gbWFzay5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHYgPSAwLCB2YWxMZW4gPSB2YWx1ZS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IDEsIGFkZE1ldGhvZCA9ICdwdXNoJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRQb3MgPSAtMSxcbiAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0Q291bnQgPSAwLFxuICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRQb3NBcnIgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1hc2tDaGFyLFxuICAgICAgICAgICAgICAgICAgICBjaGVjaztcblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkTWV0aG9kID0gJ3Vuc2hpZnQnO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1hc2tDaGFyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbSA9IG1hc2tMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICB2ID0gdmFsTGVuIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSA+IC0xICYmIHYgPiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXN0TWFza0NoYXIgPSBtYXNrTGVuIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSA8IG1hc2tMZW4gJiYgdiA8IHZhbExlbjtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbGFzdFVudHJhbnNsYXRlZE1hc2tDaGFyO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjaGVjaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXNrRGlnaXQgPSBtYXNrLmNoYXJBdChtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbERpZ2l0ID0gdmFsdWUuY2hhckF0KHYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb24gPSBqTWFzay50cmFuc2xhdGlvblttYXNrRGlnaXRdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbERpZ2l0Lm1hdGNoKHRyYW5zbGF0aW9uLnBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmW2FkZE1ldGhvZF0odmFsRGlnaXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRpb24ucmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNldFBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0UG9zID0gbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtID09PSBsYXN0TWFza0NoYXIgJiYgbSAhPT0gcmVzZXRQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSByZXNldFBvcyAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0TWFza0NoYXIgPT09IHJlc2V0UG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtIC09IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsRGlnaXQgPT09IGxhc3RVbnRyYW5zbGF0ZWRNYXNrQ2hhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoZWQgdGhlIGxhc3QgdW50cmFuc2xhdGVkIChyYXcpIG1hc2sgY2hhcmFjdGVyIHRoYXQgd2UgZW5jb3VudGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaWtlbHkgYW4gaW5zZXJ0IG9mZnNldCB0aGUgbWFzayBjaGFyYWN0ZXIgZnJvbSB0aGUgbGFzdCBlbnRyeTsgZmFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRocm91Z2ggYW5kIG9ubHkgaW5jcmVtZW50IHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVbnRyYW5zbGF0ZWRNYXNrQ2hhciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRpb24ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2IC09IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRpb24uZmFsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZbYWRkTWV0aG9kXSh0cmFuc2xhdGlvbi5mYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbSArPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdiAtPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwLmludmFsaWQucHVzaCh7cDogdiwgdjogdmFsRGlnaXQsIGU6IHRyYW5zbGF0aW9uLnBhdHRlcm59KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHYgKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFza2lwTWFza0NoYXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmW2FkZE1ldGhvZF0obWFza0RpZ2l0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbERpZ2l0ID09PSBtYXNrRGlnaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRGlnaXRQb3NBcnIucHVzaCh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ICs9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVudHJhbnNsYXRlZE1hc2tDaGFyID0gbWFza0RpZ2l0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tEaWdpdFBvc0Fyci5wdXNoKHYgKyBtYXNrRGlnaXRDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza0RpZ2l0Q291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbSArPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbGFzdE1hc2tDaGFyRGlnaXQgPSBtYXNrLmNoYXJBdChsYXN0TWFza0NoYXIpO1xuICAgICAgICAgICAgICAgIGlmIChtYXNrTGVuID09PSB2YWxMZW4gKyAxICYmICFqTWFzay50cmFuc2xhdGlvbltsYXN0TWFza0NoYXJEaWdpdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2gobGFzdE1hc2tDaGFyRGlnaXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBuZXdWYWwgPSBidWYuam9pbignJyk7XG4gICAgICAgICAgICAgICAgcC5tYXBNYXNrZGlnaXRQb3NpdGlvbnMobmV3VmFsLCBtYXNrRGlnaXRQb3NBcnIsIHZhbExlbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXBNYXNrZGlnaXRQb3NpdGlvbnM6IGZ1bmN0aW9uKG5ld1ZhbCwgbWFza0RpZ2l0UG9zQXJyLCB2YWxMZW4pIHtcbiAgICAgICAgICAgICAgdmFyIG1hc2tEaWZmID0gb3B0aW9ucy5yZXZlcnNlID8gbmV3VmFsLmxlbmd0aCAtIHZhbExlbiA6IDA7XG4gICAgICAgICAgICAgIHAubWFza0RpZ2l0UG9zTWFwID0ge307XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWFza0RpZ2l0UG9zQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcC5tYXNrRGlnaXRQb3NNYXBbbWFza0RpZ2l0UG9zQXJyW2ldICsgbWFza0RpZmZdID0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gcC52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHZhbCAhPT0gb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBcmdzID0gW3ZhbCwgZSwgZWwsIG9wdGlvbnNdLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5hbWUsIGNyaXRlcmlhLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnNbbmFtZV0gPT09ICdmdW5jdGlvbicgJiYgY3JpdGVyaWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soJ29uQ2hhbmdlJywgY2hhbmdlZCA9PT0gdHJ1ZSwgZGVmYXVsdEFyZ3MpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCdvbktleVByZXNzJywgY2hhbmdlZCA9PT0gdHJ1ZSwgZGVmYXVsdEFyZ3MpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCdvbkNvbXBsZXRlJywgdmFsLmxlbmd0aCA9PT0gbWFzay5sZW5ndGgsIGRlZmF1bHRBcmdzKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygnb25JbnZhbGlkJywgcC5pbnZhbGlkLmxlbmd0aCA+IDAsIFt2YWwsIGUsIGVsLCBwLmludmFsaWQsIG9wdGlvbnNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBlbCA9ICQoZWwpO1xuICAgICAgICB2YXIgak1hc2sgPSB0aGlzLCBvbGRWYWx1ZSA9IHAudmFsKCksIHJlZ2V4TWFzaztcblxuICAgICAgICBtYXNrID0gdHlwZW9mIG1hc2sgPT09ICdmdW5jdGlvbicgPyBtYXNrKHAudmFsKCksIHVuZGVmaW5lZCwgZWwsICBvcHRpb25zKSA6IG1hc2s7XG5cbiAgICAgICAgLy8gcHVibGljIG1ldGhvZHNcbiAgICAgICAgak1hc2subWFzayA9IG1hc2s7XG4gICAgICAgIGpNYXNrLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBqTWFzay5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjYXJldCA9IHAuZ2V0Q2FyZXQoKTtcbiAgICAgICAgICAgIGlmIChqTWFzay5vcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cigncGxhY2Vob2xkZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbC5kYXRhKCdtYXNrLW1heGxlbmd0aCcpKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cignbWF4bGVuZ3RoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmRlc3Ryb3lFdmVudHMoKTtcbiAgICAgICAgICAgIHAudmFsKGpNYXNrLmdldENsZWFuVmFsKCkpO1xuICAgICAgICAgICAgcC5zZXRDYXJldChjYXJldCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZ2V0IHZhbHVlIHdpdGhvdXQgbWFza1xuICAgICAgICBqTWFzay5nZXRDbGVhblZhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICByZXR1cm4gcC5nZXRNYXNrZWQodHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZ2V0IG1hc2tlZCB2YWx1ZSB3aXRob3V0IHRoZSB2YWx1ZSBiZWluZyBpbiB0aGUgaW5wdXQgb3IgZWxlbWVudFxuICAgICAgICBqTWFzay5nZXRNYXNrZWRWYWwgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgcmV0dXJuIHAuZ2V0TWFza2VkKGZhbHNlLCB2YWwpO1xuICAgICAgICB9O1xuXG4gICAgICAgak1hc2suaW5pdCA9IGZ1bmN0aW9uKG9ubHlNYXNrKSB7XG4gICAgICAgICAgICBvbmx5TWFzayA9IG9ubHlNYXNrIHx8IGZhbHNlO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgICAgIGpNYXNrLmNsZWFySWZOb3RNYXRjaCAgPSAkLmpNYXNrR2xvYmFscy5jbGVhcklmTm90TWF0Y2g7XG4gICAgICAgICAgICBqTWFzay5ieVBhc3NLZXlzICAgICAgID0gJC5qTWFza0dsb2JhbHMuYnlQYXNzS2V5cztcbiAgICAgICAgICAgIGpNYXNrLnRyYW5zbGF0aW9uICAgICAgPSAkLmV4dGVuZCh7fSwgJC5qTWFza0dsb2JhbHMudHJhbnNsYXRpb24sIG9wdGlvbnMudHJhbnNsYXRpb24pO1xuXG4gICAgICAgICAgICBqTWFzayA9ICQuZXh0ZW5kKHRydWUsIHt9LCBqTWFzaywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJlZ2V4TWFzayA9IHAuZ2V0UmVnZXhNYXNrKCk7XG5cbiAgICAgICAgICAgIGlmIChvbmx5TWFzaykge1xuICAgICAgICAgICAgICAgIHAuZXZlbnRzKCk7XG4gICAgICAgICAgICAgICAgcC52YWwocC5nZXRNYXNrZWQoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoJ3BsYWNlaG9sZGVyJyAsIG9wdGlvbnMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgbmVjZXNzYXJ5LCBvdGhlcndpc2UgaWYgdGhlIHVzZXIgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZW4gcHJlc3MgdGhlIFwiYmFja1wiIGJ1dHRvbiwgdGhlIGF1dG9jb21wbGV0ZSB3aWxsIGVyYXNlXG4gICAgICAgICAgICAgICAgLy8gdGhlIGRhdGEuIFdvcmtzIGZpbmUgb24gSUU5KywgRkYsIE9wZXJhLCBTYWZhcmkuXG4gICAgICAgICAgICAgICAgaWYgKGVsLmRhdGEoJ21hc2snKSkge1xuICAgICAgICAgICAgICAgICAgZWwuYXR0cignYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRldGVjdCBpZiBpcyBuZWNlc3NhcnkgbGV0IHRoZSB1c2VyIHR5cGUgZnJlZWx5LlxuICAgICAgICAgICAgICAgIC8vIGZvciBpcyBhIGxvdCBmYXN0ZXIgdGhhbiBmb3JFYWNoLlxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXhsZW5ndGggPSB0cnVlOyBpIDwgbWFzay5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRpb24gPSBqTWFzay50cmFuc2xhdGlvblttYXNrLmNoYXJBdChpKV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvbiAmJiB0cmFuc2xhdGlvbi5yZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoJ21heGxlbmd0aCcsIG1hc2subGVuZ3RoKS5kYXRhKCdtYXNrLW1heGxlbmd0aCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHAuZGVzdHJveUV2ZW50cygpO1xuICAgICAgICAgICAgICAgIHAuZXZlbnRzKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2FyZXQgPSBwLmdldENhcmV0KCk7XG4gICAgICAgICAgICAgICAgcC52YWwocC5nZXRNYXNrZWQoKSk7XG4gICAgICAgICAgICAgICAgcC5zZXRDYXJldChjYXJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgak1hc2suaW5pdCghZWwuaXMoJ2lucHV0JykpO1xuICAgIH07XG5cbiAgICAkLm1hc2tXYXRjaGVycyA9IHt9O1xuICAgIHZhciBIVE1MQXR0cmlidXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fSxcbiAgICAgICAgICAgIHByZWZpeCA9ICdkYXRhLW1hc2stJyxcbiAgICAgICAgICAgIG1hc2sgPSBpbnB1dC5hdHRyKCdkYXRhLW1hc2snKTtcblxuICAgICAgICBpZiAoaW5wdXQuYXR0cihwcmVmaXggKyAncmV2ZXJzZScpKSB7XG4gICAgICAgICAgICBvcHRpb25zLnJldmVyc2UgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0LmF0dHIocHJlZml4ICsgJ2NsZWFyaWZub3RtYXRjaCcpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmNsZWFySWZOb3RNYXRjaCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQuYXR0cihwcmVmaXggKyAnc2VsZWN0b25mb2N1cycpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgb3B0aW9ucy5zZWxlY3RPbkZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3RTYW1lTWFza09iamVjdChpbnB1dCwgbWFzaywgb3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5kYXRhKCdtYXNrJywgbmV3IE1hc2sodGhpcywgbWFzaywgb3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBub3RTYW1lTWFza09iamVjdCA9IGZ1bmN0aW9uKGZpZWxkLCBtYXNrLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgbWFza09iamVjdCA9ICQoZmllbGQpLmRhdGEoJ21hc2snKSxcbiAgICAgICAgICAgIHN0cmluZ2lmeSA9IEpTT04uc3RyaW5naWZ5LFxuICAgICAgICAgICAgdmFsdWUgPSAkKGZpZWxkKS52YWwoKSB8fCAkKGZpZWxkKS50ZXh0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1hc2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBtYXNrID0gbWFzayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIG1hc2tPYmplY3QgIT09ICdvYmplY3QnIHx8IHN0cmluZ2lmeShtYXNrT2JqZWN0Lm9wdGlvbnMpICE9PSBzdHJpbmdpZnkob3B0aW9ucykgfHwgbWFza09iamVjdC5tYXNrICE9PSBtYXNrO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH0sXG4gICAgZXZlbnRTdXBwb3J0ZWQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIGlzU3VwcG9ydGVkO1xuXG4gICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWU7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gKGV2ZW50TmFtZSBpbiBlbCk7XG5cbiAgICAgICAgaWYgKCAhaXNTdXBwb3J0ZWQgKSB7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoZXZlbnROYW1lLCAncmV0dXJuOycpO1xuICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZWxbZXZlbnROYW1lXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgfVxuICAgICAgICBlbCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGlzU3VwcG9ydGVkO1xuICAgIH07XG5cbiAgICAkLmZuLm1hc2sgPSBmdW5jdGlvbihtYXNrLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yLFxuICAgICAgICAgICAgZ2xvYmFscyA9ICQuak1hc2tHbG9iYWxzLFxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBnbG9iYWxzLndhdGNoSW50ZXJ2YWwsXG4gICAgICAgICAgICB3YXRjaElucHV0cyA9IG9wdGlvbnMud2F0Y2hJbnB1dHMgfHwgZ2xvYmFscy53YXRjaElucHV0cyxcbiAgICAgICAgICAgIG1hc2tGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChub3RTYW1lTWFza09iamVjdCh0aGlzLCBtYXNrLCBvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5kYXRhKCdtYXNrJywgbmV3IE1hc2sodGhpcywgbWFzaywgb3B0aW9ucykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgJCh0aGlzKS5lYWNoKG1hc2tGdW5jdGlvbik7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yICYmIHNlbGVjdG9yICE9PSAnJyAmJiB3YXRjaElucHV0cykge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCgkLm1hc2tXYXRjaGVyc1tzZWxlY3Rvcl0pO1xuICAgICAgICAgICAgJC5tYXNrV2F0Y2hlcnNbc2VsZWN0b3JdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5maW5kKHNlbGVjdG9yKS5lYWNoKG1hc2tGdW5jdGlvbik7XG4gICAgICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgICQuZm4ubWFza2VkID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEoJ21hc2snKS5nZXRNYXNrZWRWYWwodmFsKTtcbiAgICB9O1xuXG4gICAgJC5mbi51bm1hc2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCgkLm1hc2tXYXRjaGVyc1t0aGlzLnNlbGVjdG9yXSk7XG4gICAgICAgIGRlbGV0ZSAkLm1hc2tXYXRjaGVyc1t0aGlzLnNlbGVjdG9yXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhTWFzayA9ICQodGhpcykuZGF0YSgnbWFzaycpO1xuICAgICAgICAgICAgaWYgKGRhdGFNYXNrKSB7XG4gICAgICAgICAgICAgICAgZGF0YU1hc2sucmVtb3ZlKCkucmVtb3ZlRGF0YSgnbWFzaycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5jbGVhblZhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhKCdtYXNrJykuZ2V0Q2xlYW5WYWwoKTtcbiAgICB9O1xuXG4gICAgJC5hcHBseURhdGFNYXNrID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAkLmpNYXNrR2xvYmFscy5tYXNrRWxlbWVudHM7XG4gICAgICAgIHZhciAkc2VsZWN0b3IgPSAoc2VsZWN0b3IgaW5zdGFuY2VvZiAkKSA/IHNlbGVjdG9yIDogJChzZWxlY3Rvcik7XG4gICAgICAgICRzZWxlY3Rvci5maWx0ZXIoJC5qTWFza0dsb2JhbHMuZGF0YU1hc2tBdHRyKS5lYWNoKEhUTUxBdHRyaWJ1dGVzKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbHMgPSB7XG4gICAgICAgIG1hc2tFbGVtZW50czogJ2lucHV0LHRkLHNwYW4sZGl2JyxcbiAgICAgICAgZGF0YU1hc2tBdHRyOiAnKltkYXRhLW1hc2tdJyxcbiAgICAgICAgZGF0YU1hc2s6IHRydWUsXG4gICAgICAgIHdhdGNoSW50ZXJ2YWw6IDMwMCxcbiAgICAgICAgd2F0Y2hJbnB1dHM6IHRydWUsXG4gICAgICAgIGtleVN0cm9rZUNvbXBlbnNhdGlvbjogMTAsXG4gICAgICAgIC8vIG9sZCB2ZXJzaW9ucyBvZiBjaHJvbWUgZG9udCB3b3JrIGdyZWF0IHdpdGggaW5wdXQgZXZlbnRcbiAgICAgICAgdXNlSW5wdXQ6ICEvQ2hyb21lXFwvWzItNF1bMC05XXxTYW1zdW5nQnJvd3Nlci8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgZXZlbnRTdXBwb3J0ZWQoJ2lucHV0JyksXG4gICAgICAgIHdhdGNoRGF0YU1hc2s6IGZhbHNlLFxuICAgICAgICBieVBhc3NLZXlzOiBbOSwgMTYsIDE3LCAxOCwgMzYsIDM3LCAzOCwgMzksIDQwLCA5MV0sXG4gICAgICAgIHRyYW5zbGF0aW9uOiB7XG4gICAgICAgICAgICAnMCc6IHtwYXR0ZXJuOiAvXFxkL30sXG4gICAgICAgICAgICAnOSc6IHtwYXR0ZXJuOiAvXFxkLywgb3B0aW9uYWw6IHRydWV9LFxuICAgICAgICAgICAgJyMnOiB7cGF0dGVybjogL1xcZC8sIHJlY3Vyc2l2ZTogdHJ1ZX0sXG4gICAgICAgICAgICAnQSc6IHtwYXR0ZXJuOiAvW2EtekEtWjAtOV0vfSxcbiAgICAgICAgICAgICdTJzoge3BhdHRlcm46IC9bYS16QS1aXS99XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJC5qTWFza0dsb2JhbHMgPSAkLmpNYXNrR2xvYmFscyB8fCB7fTtcbiAgICBnbG9iYWxzID0gJC5qTWFza0dsb2JhbHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZ2xvYmFscywgJC5qTWFza0dsb2JhbHMpO1xuXG4gICAgLy8gbG9va2luZyBmb3IgaW5wdXRzIHdpdGggZGF0YS1tYXNrIGF0dHJpYnV0ZVxuICAgIGlmIChnbG9iYWxzLmRhdGFNYXNrKSB7XG4gICAgICAgICQuYXBwbHlEYXRhTWFzaygpO1xuICAgIH1cblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJC5qTWFza0dsb2JhbHMud2F0Y2hEYXRhTWFzaykge1xuICAgICAgICAgICAgJC5hcHBseURhdGFNYXNrKCk7XG4gICAgICAgIH1cbiAgICB9LCBnbG9iYWxzLndhdGNoSW50ZXJ2YWwpO1xufSwgd2luZG93LmpRdWVyeSwgd2luZG93LlplcHRvKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IE1hc2tzIGZyb20gJ2pxdWVyeS1tYXNrLXBsdWdpbic7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICQoJy5kYXRlJykubWFzaygnMDAvMDAvMDAwMCcpO1xuICAkKCcudGltZScpLm1hc2soJzAwOjAwOjAwJyk7XG4gICQoJy5kYXRlX3RpbWUnKS5tYXNrKCcwMC8wMC8wMDAwIDAwOjAwOjAwJyk7XG4gICQoJy5jZXAnKS5tYXNrKCcwMDAwMC0wMDAnKTtcbiAgJCgnLnBob25lJykubWFzaygnMDAwMC0wMDAwJyk7XG4gICQoJy5waG9uZV93aXRoX2RkZCcpLm1hc2soJygwMCkgMDAwMC0wMDAwJyk7XG4gICQoJy5waG9uZV91cycpLm1hc2soJygwMDApIDAwMC0wMDAwJyk7XG4gICQoJy5taXhlZCcpLm1hc2soJ0FBQSAwMDAtUzBTJyk7XG4gICQoJy5jcGYnKS5tYXNrKCcwMDAuMDAwLjAwMC0wMCcsIHtyZXZlcnNlOiB0cnVlfSk7XG4gICQoJy5jbnBqJykubWFzaygnMDAuMDAwLjAwMC8wMDAwLTAwJywge3JldmVyc2U6IHRydWV9KTtcbiAgJCgnLm1vbmV5JykubWFzaygnMDAwLjAwMC4wMDAuMDAwLjAwMCwwMCcsIHtyZXZlcnNlOiB0cnVlfSk7XG4gICQoJy5tb25leTInKS5tYXNrKFwiIy4jIzAsMDBcIiwge3JldmVyc2U6IHRydWV9KTtcbiAgJCgnLmlwX2FkZHJlc3MnKS5tYXNrKCcwWlouMFpaLjBaWi4wWlonLCB7XG4gICAgdHJhbnNsYXRpb246IHtcbiAgICAgICdaJzoge1xuICAgICAgICBwYXR0ZXJuOiAvWzAtOV0vLCBvcHRpb25hbDogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gICQoJy5pcF9hZGRyZXNzJykubWFzaygnMDk5LjA5OS4wOTkuMDk5Jyk7XG4gICQoJy5wZXJjZW50JykubWFzaygnIyMwLDAwJScsIHtyZXZlcnNlOiB0cnVlfSk7XG4gICQoJy5jbGVhci1pZi1ub3QtbWF0Y2gnKS5tYXNrKFwiMDAvMDAvMDAwMFwiLCB7Y2xlYXJJZk5vdE1hdGNoOiB0cnVlfSk7XG4gICQoJy5wbGFjZWhvbGRlcicpLm1hc2soXCIwMC8wMC8wMDAwXCIsIHtwbGFjZWhvbGRlcjogXCJfXy9fXy9fX19fXCJ9KTtcbiAgJCgnLmZhbGxiYWNrJykubWFzayhcIjAwcjAwcjAwMDBcIiwge1xuICAgICAgdHJhbnNsYXRpb246IHtcbiAgICAgICAgJ3InOiB7XG4gICAgICAgICAgcGF0dGVybjogL1tcXC9dLyxcbiAgICAgICAgICBmYWxsYmFjazogJy8nXG4gICAgICAgIH0sXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcIl9fL19fL19fX19cIlxuICAgICAgfVxuICAgIH0pO1xuICAkKCcuc2VsZWN0b25mb2N1cycpLm1hc2soXCIwMC8wMC8wMDAwXCIsIHtzZWxlY3RPbkZvY3VzOiB0cnVlfSk7XG59KTtcblxuXG52YXIgU1BNYXNrQmVoYXZpb3IgPSBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiB2YWwucmVwbGFjZSgvXFxEL2csICcnKS5sZW5ndGggPT09IDExID8gJygwMCkgMDAwMDAtMDAwMCcgOiAnKDAwKSAwMDAwLTAwMDA5Jztcbn0sXG5zcE9wdGlvbnMgPSB7XG4gIG9uS2V5UHJlc3M6IGZ1bmN0aW9uKHZhbCwgZSwgZmllbGQsIG9wdGlvbnMpIHtcbiAgICAgIGZpZWxkLm1hc2soU1BNYXNrQmVoYXZpb3IuYXBwbHkoe30sIGFyZ3VtZW50cyksIG9wdGlvbnMpO1xuICAgIH1cbn07XG5cbiQoJy50ZWxlZm9uZScpLm1hc2soU1BNYXNrQmVoYXZpb3IsIHNwT3B0aW9ucyk7XG4iXSwibmFtZXMiOlsiTWFza3MiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm1hc2siLCJyZXZlcnNlIiwidHJhbnNsYXRpb24iLCJwYXR0ZXJuIiwib3B0aW9uYWwiLCJjbGVhcklmTm90TWF0Y2giLCJwbGFjZWhvbGRlciIsImZhbGxiYWNrIiwic2VsZWN0T25Gb2N1cyIsIlNQTWFza0JlaGF2aW9yIiwidmFsIiwicmVwbGFjZSIsImxlbmd0aCIsInNwT3B0aW9ucyIsIm9uS2V5UHJlc3MiLCJlIiwiZmllbGQiLCJvcHRpb25zIiwiYXBwbHkiLCJhcmd1bWVudHMiXSwic291cmNlUm9vdCI6IiJ9