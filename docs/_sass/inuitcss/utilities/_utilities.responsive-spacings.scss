/* ==========================================================================
   #RESPONSIVE-SPACINGS
   ========================================================================== */

/**
 * Utility classes enhancing the normal spacing classes by adding responsiveness
 * to them. By default, there are not responsive spacings defined. You can
 * generate responsive spacings by adding entries to the following three Sass
 * maps, e.g.:
 *
 *   $inuit-responsive-spacing-directions: (
 *     null: null,
 *     bottom: bottom,
 *   );
 *
 *   $inuit-responsive-spacing-properties: (
 *     "margin": "margin",
 *   );
 *
 *   $inuit-responsive-spacing-sizes: (
 *     "-small": $inuit-global-spacing-unit-small,
 *   );
 *
 * This would bring us the following classes:
 *
 *   .u-margin-small@mobile {}
 *   .u-margin-small@tablet {}
 *   .u-margin-small@desktop {}
 *   .u-margin-small@wide {}
 *   .u-margin-bottom-small@mobile {}
 *   .u-margin-bottom-small@tablet {}
 *   .u-margin-bottom-small@desktop {}
 *   .u-margin-bottom-small@wide {}
 *
 * You can change the generated CSS classes by further extending the Sass maps.
 * If you want every ‘normal’ spacing (those from `utilities.spacings`) also as
 * a responsive version, you can just mirror the ‘normal’ spacings:
 *
 *   $inuit-responsive-spacing-directions: $inuit-spacing-directions !default;
 *
 *   $inuit-responsive-spacing-properties: $inuit-spacing-properties !default;
 *
 *   $inuit-responsive-spacing-sizes: $inuit-spacing-sizes !default;
 *
 * BUT BE AWARE: This can generate a huge chunk of extra CSS, depending on the
 * amount of breakpoints you defined. So please check your CSS’ output and
 * filesize!
 */



// The responsive spacings just make sense and work properly when the ‘normal’
// spacings are included, too. In case they're not, we set `_utilities.spacings`
// to `null`.
$inuit-spacing-directions: null !default;

// If the ‘normal’ spacings partial is not included, we provide an error message
// to indicate this.
@if $inuit-spacing-directions == null {
  @error "In order to use responsive spacings, you also need to include `_utilities.spacings.scss`!";
}
@else {



// When using Sass-MQ, this defines the separator for the breakpoints suffix
// in the class name. By default, we are generating the responsive suffixes
// for the classes with a `@` symbol so you get classes like:
//
//   <div class="u-margin-bottom@mobile">
//
// Be aware that since the `@` symbol is a reserved symbol in CSS, it has to be
// escaped with a `\`. In the markup though, you write your classes without the
// backslash (e.g. `u-margin-bottom@mobile`).
$inuit-widths-breakpoint-separator: \@ !default;



$inuit-responsive-spacing-directions: null !default;

$inuit-responsive-spacing-properties: null !default;

$inuit-responsive-spacing-sizes: null !default;



/* stylelint-disable max-nesting-depth */

// Don't output anything if no responsive spacings are defined.
@if ($inuit-responsive-spacing-properties != null) {

  @each $property-namespace, $property in $inuit-responsive-spacing-properties {

    @each $direction-namespace, $direction-rules in $inuit-responsive-spacing-directions {

      @each $size-namespace, $size in $inuit-responsive-spacing-sizes {

        @each $inuit-bp-name, $inuit-bp-value in $mq-breakpoints {

          @include mq($from: $inuit-bp-name) {

            .u-#{$property-namespace}#{$direction-namespace}#{$size-namespace}#{$inuit-widths-breakpoint-separator}#{$inuit-bp-name} {

              @each $direction in $direction-rules {
                #{$property}#{$direction}: $size !important;
              }

            }

          }

        }

      }

    }

  }

}

/* stylelint-enable max-nesting-depth */

}
