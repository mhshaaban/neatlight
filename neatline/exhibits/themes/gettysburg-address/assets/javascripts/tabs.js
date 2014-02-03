
/* vim: set expandtab navigationtop=2 shiftwidth=2 softnavigationtop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

$(function() {

  var narrative   = $('div.narrative');
  var navigation  = $('ul.nav');
  var sections    = $('h1.section');

  var placeholder = null;

  var navOffset = navigation.offset().top;
  var navHeight = navigation.height();

  var affixed = false

  // Listen for scroll.
  narrative.scroll(function() {

    var scroll = $(this).scrollTop();

    // (1) When scrolled below the menu.
    if (!affixed && scroll >= navOffset) {

      // Add placeholder to preserve height 
      placeholder = navigation.clone().insertAfter(navigation);
      placeholder.css('visibility', 'hidden');

      // Affix the menu.
      navigation.addClass('affix');

      affixed = true;

    }

    // (2) When scrollde above the menu.
    if (affixed && scroll < navOffset) {

      // De-affix the menu.
      navigation.removeClass('affix');
      placeholder.remove();

      affixed = false;

    }

    // (3) Update the active tab.
    var active = $(_.last(sections.map(function() {
      if ($(this).offset().top+scroll < scroll+navHeight+11) return this;
    })));

    // Get the active tab `href`.
    var href = '#'+active.attr('id');

    // Clear active tab.
    navigation.find('li').removeClass('active')

    // Apply the new active tab.
    navigation.find('li').has('a[href="'+href+'"]').addClass('active');

  });

  // Listen for tab clicks.
  navigation.find('a').click(function(e) {

    e.preventDefault();

    // Smooth animate to the section (10px padding above the headings).
    var offset = $($(this).attr('href')).offset().top + narrative.scrollTop();
    narrative.stop().animate({ scrollTop: offset-navHeight-10 });

  });

});
