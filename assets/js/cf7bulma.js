
/**
 * when cf7 ajax-loader
 * @param  {[type]} form [description]
 * @return {[type]}      [description]
 */
wpcf7.submit = function( form ) {
    if ( typeof window.FormData !== 'function' ) {
      return;
    }

    var $form = $( form );

    $( '.button.wpcf7-submit', $form ).addClass( 'is-loading' );

    $( '[placeholder].placeheld', $form ).each( function( i, n ) {
      $( n ).val( '' );
    } );

    wpcf7.clearResponse( $form );

    var formData = new FormData( $form.get( 0 ) );

    var detail = {
      id: $form.closest( 'div.wpcf7' ).attr( 'id' ),
      status: 'init',
      inputs: [],
      formData: formData
    };

    $.each( $form.serializeArray(), function( i, field ) {
      if ( '_wpcf7' == field.name ) {
        detail.contactFormId = field.value;
      } else if ( '_wpcf7_version' == field.name ) {
        detail.pluginVersion = field.value;
      } else if ( '_wpcf7_locale' == field.name ) {
        detail.contactFormLocale = field.value;
      } else if ( '_wpcf7_unit_tag' == field.name ) {
        detail.unitTag = field.value;
      } else if ( '_wpcf7_container_post' == field.name ) {
        detail.containerPostId = field.value;
      } else if ( field.name.match( /^_wpcf7_\w+_free_text_/ ) ) {
        var owner = field.name.replace( /^_wpcf7_\w+_free_text_/, '' );
        detail.inputs.push( {
          name: owner + '-free-text',
          value: field.value
        } );
      } else if ( field.name.match( /^_/ ) ) {
        // do nothing
      } else {
        detail.inputs.push( field );
      }
    } );

    wpcf7.triggerEvent( $form.closest( 'div.wpcf7' ), 'beforesubmit', detail );

    var ajaxSuccess = function( data, status, xhr, $form ) {
      detail.id = $( data.into ).attr( 'id' );
      detail.status = data.status;
      detail.apiResponse = data;

      var $message = $( '.wpcf7-response-output', $form );

      switch ( data.status ) {
        case 'validation_failed':
          $.each( data.invalidFields, function( i, n ) {
            $( n.into, $form ).each( function() {
              wpcf7.notValidTip( this, n.message );
              $( '.wpcf7-form-control', this ).addClass( 'wpcf7-not-valid' );
              $( '[aria-invalid]', this ).attr( 'aria-invalid', 'true' );
            } );
          } );

          $message.addClass( 'wpcf7-validation-errors' );
          $form.addClass( 'invalid' );

          wpcf7.triggerEvent( data.into, 'invalid', detail );
          break;
        case 'acceptance_missing':
          $message.addClass( 'wpcf7-acceptance-missing' );
          $form.addClass( 'unaccepted' );

          wpcf7.triggerEvent( data.into, 'unaccepted', detail );
          break;
        case 'spam':
          $message.addClass( 'wpcf7-spam-blocked' );
          $form.addClass( 'spam' );

          $( '[name="g-recaptcha-response"]', $form ).each( function() {
            if ( '' === $( this ).val() ) {
              var $recaptcha = $( this ).closest( '.wpcf7-form-control-wrap' );
              wpcf7.notValidTip( $recaptcha, wpcf7.recaptcha.messages.empty );
            }
          } );

          wpcf7.triggerEvent( data.into, 'spam', detail );
          break;
        case 'aborted':
          $message.addClass( 'wpcf7-aborted' );
          $form.addClass( 'aborted' );

          wpcf7.triggerEvent( data.into, 'aborted', detail );
          break;
        case 'mail_sent':
          $message.addClass( 'wpcf7-mail-sent-ok' );
          $form.addClass( 'sent' );

          wpcf7.triggerEvent( data.into, 'mailsent', detail );
          break;
        case 'mail_failed':
          $message.addClass( 'wpcf7-mail-sent-ng' );
          $form.addClass( 'failed' );

          wpcf7.triggerEvent( data.into, 'mailfailed', detail );
          break;
        default:
          var customStatusClass = 'custom-'
            + data.status.replace( /[^0-9a-z]+/i, '-' );
          $message.addClass( 'wpcf7-' + customStatusClass );
          $form.addClass( customStatusClass );
      }

      wpcf7.refill( $form, data );

      wpcf7.triggerEvent( data.into, 'submit', detail );

      if ( 'mail_sent' == data.status ) {
        $form.each( function() {
          this.reset();
        } );
      }

      $form.find( '[placeholder].placeheld' ).each( function( i, n ) {
        $( n ).val( $( n ).attr( 'placeholder' ) );
      } );

      $message.html( '' ).append( data.message ).slideDown( 'fast' );
      $message.attr( 'role', 'alert' );

      $( '.screen-reader-response', $form.closest( '.wpcf7' ) ).each( function() {
        var $response = $( this );
        $response.html( '' ).attr( 'role', '' ).append( data.message );

        if ( data.invalidFields ) {
          var $invalids = $( '<ul></ul>' );

          $.each( data.invalidFields, function( i, n ) {
            if ( n.idref ) {
              var $li = $( '<li></li>' ).append( $( '<a></a>' ).attr( 'href', '#' + n.idref ).append( n.message ) );
            } else {
              var $li = $( '<li></li>' ).append( n.message );
            }

            $invalids.append( $li );
          } );

          $response.append( $invalids );
        }

        $response.attr( 'role', 'alert' ).focus();
      } );
    };

    $.ajax( {
      type: 'POST',
      url: wpcf7.apiSettings.getRoute(
        '/contact-forms/' + wpcf7.getId( $form ) + '/feedback' ),
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    } ).done( function( data, status, xhr ) {
      ajaxSuccess( data, status, xhr, $form );
      $( '.button.wpcf7-submit', $form ).removeClass( 'is-loading' );
    } ).fail( function( xhr, status, error ) {
      var $e = $( '<div class="ajax-error"></div>' ).text( error.message );
      $form.after( $e );
    } );
  };
