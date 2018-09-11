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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),

/***/ 16:
/***/ (function(module, exports) {


/**
 * when cf7 ajax-loader
 * @param  {[type]} form [description]
 * @return {[type]}      [description]
 */
wpcf7.submit = function (form) {
  if (typeof window.FormData !== 'function') {
    return;
  }

  var $form = $(form);

  $('.button.wpcf7-submit', $form).addClass('is-loading');

  $('[placeholder].placeheld', $form).each(function (i, n) {
    $(n).val('');
  });

  wpcf7.clearResponse($form);

  var formData = new FormData($form.get(0));

  var detail = {
    id: $form.closest('div.wpcf7').attr('id'),
    status: 'init',
    inputs: [],
    formData: formData
  };

  $.each($form.serializeArray(), function (i, field) {
    if ('_wpcf7' == field.name) {
      detail.contactFormId = field.value;
    } else if ('_wpcf7_version' == field.name) {
      detail.pluginVersion = field.value;
    } else if ('_wpcf7_locale' == field.name) {
      detail.contactFormLocale = field.value;
    } else if ('_wpcf7_unit_tag' == field.name) {
      detail.unitTag = field.value;
    } else if ('_wpcf7_container_post' == field.name) {
      detail.containerPostId = field.value;
    } else if (field.name.match(/^_wpcf7_\w+_free_text_/)) {
      var owner = field.name.replace(/^_wpcf7_\w+_free_text_/, '');
      detail.inputs.push({
        name: owner + '-free-text',
        value: field.value
      });
    } else if (field.name.match(/^_/)) {
      // do nothing
    } else {
      detail.inputs.push(field);
    }
  });

  wpcf7.triggerEvent($form.closest('div.wpcf7'), 'beforesubmit', detail);

  var ajaxSuccess = function ajaxSuccess(data, status, xhr, $form) {
    detail.id = $(data.into).attr('id');
    detail.status = data.status;
    detail.apiResponse = data;

    var $message = $('.wpcf7-response-output', $form);

    switch (data.status) {
      case 'validation_failed':
        $.each(data.invalidFields, function (i, n) {
          $(n.into, $form).each(function () {
            wpcf7.notValidTip(this, n.message);
            $('.wpcf7-form-control', this).addClass('wpcf7-not-valid');
            $('[aria-invalid]', this).attr('aria-invalid', 'true');
          });
        });

        $message.addClass('wpcf7-validation-errors');
        $form.addClass('invalid');

        wpcf7.triggerEvent(data.into, 'invalid', detail);
        break;
      case 'acceptance_missing':
        $message.addClass('wpcf7-acceptance-missing');
        $form.addClass('unaccepted');

        wpcf7.triggerEvent(data.into, 'unaccepted', detail);
        break;
      case 'spam':
        $message.addClass('wpcf7-spam-blocked');
        $form.addClass('spam');

        $('[name="g-recaptcha-response"]', $form).each(function () {
          if ('' === $(this).val()) {
            var $recaptcha = $(this).closest('.wpcf7-form-control-wrap');
            wpcf7.notValidTip($recaptcha, wpcf7.recaptcha.messages.empty);
          }
        });

        wpcf7.triggerEvent(data.into, 'spam', detail);
        break;
      case 'aborted':
        $message.addClass('wpcf7-aborted');
        $form.addClass('aborted');

        wpcf7.triggerEvent(data.into, 'aborted', detail);
        break;
      case 'mail_sent':
        $message.addClass('wpcf7-mail-sent-ok');
        $form.addClass('sent');

        wpcf7.triggerEvent(data.into, 'mailsent', detail);
        break;
      case 'mail_failed':
        $message.addClass('wpcf7-mail-sent-ng');
        $form.addClass('failed');

        wpcf7.triggerEvent(data.into, 'mailfailed', detail);
        break;
      default:
        var customStatusClass = 'custom-' + data.status.replace(/[^0-9a-z]+/i, '-');
        $message.addClass('wpcf7-' + customStatusClass);
        $form.addClass(customStatusClass);
    }

    wpcf7.refill($form, data);

    wpcf7.triggerEvent(data.into, 'submit', detail);

    if ('mail_sent' == data.status) {
      $form.each(function () {
        this.reset();
      });
    }

    $form.find('[placeholder].placeheld').each(function (i, n) {
      $(n).val($(n).attr('placeholder'));
    });

    $message.html('').append(data.message).slideDown('fast');
    $message.attr('role', 'alert');

    $('.screen-reader-response', $form.closest('.wpcf7')).each(function () {
      var $response = $(this);
      $response.html('').attr('role', '').append(data.message);

      if (data.invalidFields) {
        var $invalids = $('<ul></ul>');

        $.each(data.invalidFields, function (i, n) {
          if (n.idref) {
            var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
          } else {
            var $li = $('<li></li>').append(n.message);
          }

          $invalids.append($li);
        });

        $response.append($invalids);
      }

      $response.attr('role', 'alert').focus();
    });
  };

  $.ajax({
    type: 'POST',
    url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/feedback'),
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  }).done(function (data, status, xhr) {
    ajaxSuccess(data, status, xhr, $form);
    $('.button.wpcf7-submit', $form).removeClass('is-loading');
  }).fail(function (xhr, status, error) {
    var $e = $('<div class="ajax-error"></div>').text(error.message);
    $form.after($e);
  });
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzU5M2Q1MDg5NDZmODc4ODAzMTIiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NmN2J1bG1hLmpzIl0sIm5hbWVzIjpbIndwY2Y3Iiwic3VibWl0IiwiZm9ybSIsIndpbmRvdyIsIkZvcm1EYXRhIiwiJGZvcm0iLCIkIiwiYWRkQ2xhc3MiLCJlYWNoIiwiaSIsIm4iLCJ2YWwiLCJjbGVhclJlc3BvbnNlIiwiZm9ybURhdGEiLCJnZXQiLCJkZXRhaWwiLCJpZCIsImNsb3Nlc3QiLCJhdHRyIiwic3RhdHVzIiwiaW5wdXRzIiwic2VyaWFsaXplQXJyYXkiLCJmaWVsZCIsIm5hbWUiLCJjb250YWN0Rm9ybUlkIiwidmFsdWUiLCJwbHVnaW5WZXJzaW9uIiwiY29udGFjdEZvcm1Mb2NhbGUiLCJ1bml0VGFnIiwiY29udGFpbmVyUG9zdElkIiwibWF0Y2giLCJvd25lciIsInJlcGxhY2UiLCJwdXNoIiwidHJpZ2dlckV2ZW50IiwiYWpheFN1Y2Nlc3MiLCJkYXRhIiwieGhyIiwiaW50byIsImFwaVJlc3BvbnNlIiwiJG1lc3NhZ2UiLCJpbnZhbGlkRmllbGRzIiwibm90VmFsaWRUaXAiLCJtZXNzYWdlIiwiJHJlY2FwdGNoYSIsInJlY2FwdGNoYSIsIm1lc3NhZ2VzIiwiZW1wdHkiLCJjdXN0b21TdGF0dXNDbGFzcyIsInJlZmlsbCIsInJlc2V0IiwiZmluZCIsImh0bWwiLCJhcHBlbmQiLCJzbGlkZURvd24iLCIkcmVzcG9uc2UiLCIkaW52YWxpZHMiLCJpZHJlZiIsIiRsaSIsImZvY3VzIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJhcGlTZXR0aW5ncyIsImdldFJvdXRlIiwiZ2V0SWQiLCJkYXRhVHlwZSIsInByb2Nlc3NEYXRhIiwiY29udGVudFR5cGUiLCJkb25lIiwicmVtb3ZlQ2xhc3MiLCJmYWlsIiwiZXJyb3IiLCIkZSIsInRleHQiLCJhZnRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7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R0FYRCxFQVdJQyxJQVhKLENBV1UsVUFBVWxDLEdBQVYsRUFBZWxCLE1BQWYsRUFBdUJxRCxLQUF2QixFQUErQjtBQUN2QyxRQUFJQyxLQUFLbkUsRUFBRyxnQ0FBSCxFQUFzQ29FLElBQXRDLENBQTRDRixNQUFNN0IsT0FBbEQsQ0FBVDtBQUNBdEMsVUFBTXNFLEtBQU4sQ0FBYUYsRUFBYjtBQUNELEdBZEQ7QUFlRCxDQTVLSCxDIiwiZmlsZSI6Ii9kaXN0L2pzL2NmN2J1bG1hLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNTkzZDUwODk0NmY4Nzg4MDMxMiIsIlxuLyoqXG4gKiB3aGVuIGNmNyBhamF4LWxvYWRlclxuICogQHBhcmFtICB7W3R5cGVdfSBmb3JtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbndwY2Y3LnN1Ym1pdCA9IGZ1bmN0aW9uKCBmb3JtICkge1xuICAgIGlmICggdHlwZW9mIHdpbmRvdy5Gb3JtRGF0YSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgJGZvcm0gPSAkKCBmb3JtICk7XG5cbiAgICAkKCAnLmJ1dHRvbi53cGNmNy1zdWJtaXQnLCAkZm9ybSApLmFkZENsYXNzKCAnaXMtbG9hZGluZycgKTtcblxuICAgICQoICdbcGxhY2Vob2xkZXJdLnBsYWNlaGVsZCcsICRmb3JtICkuZWFjaCggZnVuY3Rpb24oIGksIG4gKSB7XG4gICAgICAkKCBuICkudmFsKCAnJyApO1xuICAgIH0gKTtcblxuICAgIHdwY2Y3LmNsZWFyUmVzcG9uc2UoICRmb3JtICk7XG5cbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoICRmb3JtLmdldCggMCApICk7XG5cbiAgICB2YXIgZGV0YWlsID0ge1xuICAgICAgaWQ6ICRmb3JtLmNsb3Nlc3QoICdkaXYud3BjZjcnICkuYXR0ciggJ2lkJyApLFxuICAgICAgc3RhdHVzOiAnaW5pdCcsXG4gICAgICBpbnB1dHM6IFtdLFxuICAgICAgZm9ybURhdGE6IGZvcm1EYXRhXG4gICAgfTtcblxuICAgICQuZWFjaCggJGZvcm0uc2VyaWFsaXplQXJyYXkoKSwgZnVuY3Rpb24oIGksIGZpZWxkICkge1xuICAgICAgaWYgKCAnX3dwY2Y3JyA9PSBmaWVsZC5uYW1lICkge1xuICAgICAgICBkZXRhaWwuY29udGFjdEZvcm1JZCA9IGZpZWxkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmICggJ193cGNmN192ZXJzaW9uJyA9PSBmaWVsZC5uYW1lICkge1xuICAgICAgICBkZXRhaWwucGx1Z2luVmVyc2lvbiA9IGZpZWxkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmICggJ193cGNmN19sb2NhbGUnID09IGZpZWxkLm5hbWUgKSB7XG4gICAgICAgIGRldGFpbC5jb250YWN0Rm9ybUxvY2FsZSA9IGZpZWxkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmICggJ193cGNmN191bml0X3RhZycgPT0gZmllbGQubmFtZSApIHtcbiAgICAgICAgZGV0YWlsLnVuaXRUYWcgPSBmaWVsZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoICdfd3BjZjdfY29udGFpbmVyX3Bvc3QnID09IGZpZWxkLm5hbWUgKSB7XG4gICAgICAgIGRldGFpbC5jb250YWluZXJQb3N0SWQgPSBmaWVsZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIGZpZWxkLm5hbWUubWF0Y2goIC9eX3dwY2Y3X1xcdytfZnJlZV90ZXh0Xy8gKSApIHtcbiAgICAgICAgdmFyIG93bmVyID0gZmllbGQubmFtZS5yZXBsYWNlKCAvXl93cGNmN19cXHcrX2ZyZWVfdGV4dF8vLCAnJyApO1xuICAgICAgICBkZXRhaWwuaW5wdXRzLnB1c2goIHtcbiAgICAgICAgICBuYW1lOiBvd25lciArICctZnJlZS10ZXh0JyxcbiAgICAgICAgICB2YWx1ZTogZmllbGQudmFsdWVcbiAgICAgICAgfSApO1xuICAgICAgfSBlbHNlIGlmICggZmllbGQubmFtZS5tYXRjaCggL15fLyApICkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXRhaWwuaW5wdXRzLnB1c2goIGZpZWxkICk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gICAgd3BjZjcudHJpZ2dlckV2ZW50KCAkZm9ybS5jbG9zZXN0KCAnZGl2LndwY2Y3JyApLCAnYmVmb3Jlc3VibWl0JywgZGV0YWlsICk7XG5cbiAgICB2YXIgYWpheFN1Y2Nlc3MgPSBmdW5jdGlvbiggZGF0YSwgc3RhdHVzLCB4aHIsICRmb3JtICkge1xuICAgICAgZGV0YWlsLmlkID0gJCggZGF0YS5pbnRvICkuYXR0ciggJ2lkJyApO1xuICAgICAgZGV0YWlsLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgZGV0YWlsLmFwaVJlc3BvbnNlID0gZGF0YTtcblxuICAgICAgdmFyICRtZXNzYWdlID0gJCggJy53cGNmNy1yZXNwb25zZS1vdXRwdXQnLCAkZm9ybSApO1xuXG4gICAgICBzd2l0Y2ggKCBkYXRhLnN0YXR1cyApIHtcbiAgICAgICAgY2FzZSAndmFsaWRhdGlvbl9mYWlsZWQnOlxuICAgICAgICAgICQuZWFjaCggZGF0YS5pbnZhbGlkRmllbGRzLCBmdW5jdGlvbiggaSwgbiApIHtcbiAgICAgICAgICAgICQoIG4uaW50bywgJGZvcm0gKS5lYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgd3BjZjcubm90VmFsaWRUaXAoIHRoaXMsIG4ubWVzc2FnZSApO1xuICAgICAgICAgICAgICAkKCAnLndwY2Y3LWZvcm0tY29udHJvbCcsIHRoaXMgKS5hZGRDbGFzcyggJ3dwY2Y3LW5vdC12YWxpZCcgKTtcbiAgICAgICAgICAgICAgJCggJ1thcmlhLWludmFsaWRdJywgdGhpcyApLmF0dHIoICdhcmlhLWludmFsaWQnLCAndHJ1ZScgKTtcbiAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICAkbWVzc2FnZS5hZGRDbGFzcyggJ3dwY2Y3LXZhbGlkYXRpb24tZXJyb3JzJyApO1xuICAgICAgICAgICRmb3JtLmFkZENsYXNzKCAnaW52YWxpZCcgKTtcblxuICAgICAgICAgIHdwY2Y3LnRyaWdnZXJFdmVudCggZGF0YS5pbnRvLCAnaW52YWxpZCcsIGRldGFpbCApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhY2NlcHRhbmNlX21pc3NpbmcnOlxuICAgICAgICAgICRtZXNzYWdlLmFkZENsYXNzKCAnd3BjZjctYWNjZXB0YW5jZS1taXNzaW5nJyApO1xuICAgICAgICAgICRmb3JtLmFkZENsYXNzKCAndW5hY2NlcHRlZCcgKTtcblxuICAgICAgICAgIHdwY2Y3LnRyaWdnZXJFdmVudCggZGF0YS5pbnRvLCAndW5hY2NlcHRlZCcsIGRldGFpbCApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzcGFtJzpcbiAgICAgICAgICAkbWVzc2FnZS5hZGRDbGFzcyggJ3dwY2Y3LXNwYW0tYmxvY2tlZCcgKTtcbiAgICAgICAgICAkZm9ybS5hZGRDbGFzcyggJ3NwYW0nICk7XG5cbiAgICAgICAgICAkKCAnW25hbWU9XCJnLXJlY2FwdGNoYS1yZXNwb25zZVwiXScsICRmb3JtICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoICcnID09PSAkKCB0aGlzICkudmFsKCkgKSB7XG4gICAgICAgICAgICAgIHZhciAkcmVjYXB0Y2hhID0gJCggdGhpcyApLmNsb3Nlc3QoICcud3BjZjctZm9ybS1jb250cm9sLXdyYXAnICk7XG4gICAgICAgICAgICAgIHdwY2Y3Lm5vdFZhbGlkVGlwKCAkcmVjYXB0Y2hhLCB3cGNmNy5yZWNhcHRjaGEubWVzc2FnZXMuZW1wdHkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICB3cGNmNy50cmlnZ2VyRXZlbnQoIGRhdGEuaW50bywgJ3NwYW0nLCBkZXRhaWwgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWJvcnRlZCc6XG4gICAgICAgICAgJG1lc3NhZ2UuYWRkQ2xhc3MoICd3cGNmNy1hYm9ydGVkJyApO1xuICAgICAgICAgICRmb3JtLmFkZENsYXNzKCAnYWJvcnRlZCcgKTtcblxuICAgICAgICAgIHdwY2Y3LnRyaWdnZXJFdmVudCggZGF0YS5pbnRvLCAnYWJvcnRlZCcsIGRldGFpbCApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtYWlsX3NlbnQnOlxuICAgICAgICAgICRtZXNzYWdlLmFkZENsYXNzKCAnd3BjZjctbWFpbC1zZW50LW9rJyApO1xuICAgICAgICAgICRmb3JtLmFkZENsYXNzKCAnc2VudCcgKTtcblxuICAgICAgICAgIHdwY2Y3LnRyaWdnZXJFdmVudCggZGF0YS5pbnRvLCAnbWFpbHNlbnQnLCBkZXRhaWwgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFpbF9mYWlsZWQnOlxuICAgICAgICAgICRtZXNzYWdlLmFkZENsYXNzKCAnd3BjZjctbWFpbC1zZW50LW5nJyApO1xuICAgICAgICAgICRmb3JtLmFkZENsYXNzKCAnZmFpbGVkJyApO1xuXG4gICAgICAgICAgd3BjZjcudHJpZ2dlckV2ZW50KCBkYXRhLmludG8sICdtYWlsZmFpbGVkJywgZGV0YWlsICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdmFyIGN1c3RvbVN0YXR1c0NsYXNzID0gJ2N1c3RvbS0nXG4gICAgICAgICAgICArIGRhdGEuc3RhdHVzLnJlcGxhY2UoIC9bXjAtOWEtel0rL2ksICctJyApO1xuICAgICAgICAgICRtZXNzYWdlLmFkZENsYXNzKCAnd3BjZjctJyArIGN1c3RvbVN0YXR1c0NsYXNzICk7XG4gICAgICAgICAgJGZvcm0uYWRkQ2xhc3MoIGN1c3RvbVN0YXR1c0NsYXNzICk7XG4gICAgICB9XG5cbiAgICAgIHdwY2Y3LnJlZmlsbCggJGZvcm0sIGRhdGEgKTtcblxuICAgICAgd3BjZjcudHJpZ2dlckV2ZW50KCBkYXRhLmludG8sICdzdWJtaXQnLCBkZXRhaWwgKTtcblxuICAgICAgaWYgKCAnbWFpbF9zZW50JyA9PSBkYXRhLnN0YXR1cyApIHtcbiAgICAgICAgJGZvcm0uZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9ICk7XG4gICAgICB9XG5cbiAgICAgICRmb3JtLmZpbmQoICdbcGxhY2Vob2xkZXJdLnBsYWNlaGVsZCcgKS5lYWNoKCBmdW5jdGlvbiggaSwgbiApIHtcbiAgICAgICAgJCggbiApLnZhbCggJCggbiApLmF0dHIoICdwbGFjZWhvbGRlcicgKSApO1xuICAgICAgfSApO1xuXG4gICAgICAkbWVzc2FnZS5odG1sKCAnJyApLmFwcGVuZCggZGF0YS5tZXNzYWdlICkuc2xpZGVEb3duKCAnZmFzdCcgKTtcbiAgICAgICRtZXNzYWdlLmF0dHIoICdyb2xlJywgJ2FsZXJ0JyApO1xuXG4gICAgICAkKCAnLnNjcmVlbi1yZWFkZXItcmVzcG9uc2UnLCAkZm9ybS5jbG9zZXN0KCAnLndwY2Y3JyApICkuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkcmVzcG9uc2UgPSAkKCB0aGlzICk7XG4gICAgICAgICRyZXNwb25zZS5odG1sKCAnJyApLmF0dHIoICdyb2xlJywgJycgKS5hcHBlbmQoIGRhdGEubWVzc2FnZSApO1xuXG4gICAgICAgIGlmICggZGF0YS5pbnZhbGlkRmllbGRzICkge1xuICAgICAgICAgIHZhciAkaW52YWxpZHMgPSAkKCAnPHVsPjwvdWw+JyApO1xuXG4gICAgICAgICAgJC5lYWNoKCBkYXRhLmludmFsaWRGaWVsZHMsIGZ1bmN0aW9uKCBpLCBuICkge1xuICAgICAgICAgICAgaWYgKCBuLmlkcmVmICkge1xuICAgICAgICAgICAgICB2YXIgJGxpID0gJCggJzxsaT48L2xpPicgKS5hcHBlbmQoICQoICc8YT48L2E+JyApLmF0dHIoICdocmVmJywgJyMnICsgbi5pZHJlZiApLmFwcGVuZCggbi5tZXNzYWdlICkgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciAkbGkgPSAkKCAnPGxpPjwvbGk+JyApLmFwcGVuZCggbi5tZXNzYWdlICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRpbnZhbGlkcy5hcHBlbmQoICRsaSApO1xuICAgICAgICAgIH0gKTtcblxuICAgICAgICAgICRyZXNwb25zZS5hcHBlbmQoICRpbnZhbGlkcyApO1xuICAgICAgICB9XG5cbiAgICAgICAgJHJlc3BvbnNlLmF0dHIoICdyb2xlJywgJ2FsZXJ0JyApLmZvY3VzKCk7XG4gICAgICB9ICk7XG4gICAgfTtcblxuICAgICQuYWpheCgge1xuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgdXJsOiB3cGNmNy5hcGlTZXR0aW5ncy5nZXRSb3V0ZShcbiAgICAgICAgJy9jb250YWN0LWZvcm1zLycgKyB3cGNmNy5nZXRJZCggJGZvcm0gKSArICcvZmVlZGJhY2snICksXG4gICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICB9ICkuZG9uZSggZnVuY3Rpb24oIGRhdGEsIHN0YXR1cywgeGhyICkge1xuICAgICAgYWpheFN1Y2Nlc3MoIGRhdGEsIHN0YXR1cywgeGhyLCAkZm9ybSApO1xuICAgICAgJCggJy5idXR0b24ud3BjZjctc3VibWl0JywgJGZvcm0gKS5yZW1vdmVDbGFzcyggJ2lzLWxvYWRpbmcnICk7XG4gICAgfSApLmZhaWwoIGZ1bmN0aW9uKCB4aHIsIHN0YXR1cywgZXJyb3IgKSB7XG4gICAgICB2YXIgJGUgPSAkKCAnPGRpdiBjbGFzcz1cImFqYXgtZXJyb3JcIj48L2Rpdj4nICkudGV4dCggZXJyb3IubWVzc2FnZSApO1xuICAgICAgJGZvcm0uYWZ0ZXIoICRlICk7XG4gICAgfSApO1xuICB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2NmN2J1bG1hLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==