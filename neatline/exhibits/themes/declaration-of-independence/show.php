<?php

/* vim: set linebreak wrap nolist tabstop=2 shiftwidth=2 softtabstop=2: */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<?php echo head(array(
  'title' => nl_getExhibitField('title'),
  'bodyclass' => 'neatline show'
)); ?>

<!-- Transcription. -->
<div id="neatline-narrative" class="narrative">

  <header>

    <!-- Title. -->
    <div class="title">
      <span>The</span>
      <code><?php echo htmlspecialchars('<Digital />'); ?></code>
      <span>Declaration of Independence</span>
    </div>

    <!-- Credits. -->
    <div class="credits">
      <span>By <a
        href="https://twitter.com/clured"
        target="_blank">@clured</a></span>,
      <span>with <a
        href="http://omeka.org"
        target="_blank">Omeka</a></span>
      <span>and <a
        href="http://neatline.org"
        target="_blank">Neatline</a></span> &bull;
      <span><a
        href="http://dclure.org"
        target="_blank">dclure.org</a></span>
    </div>

  </header>

  <hr />

  <?php include('declaration.php'); ?>

</div>

<!-- Exhibit. -->
<div class="exhibit">
  <?php echo nl_getExhibitMarkup(); ?>
</div>

<!-- React. -->
<div id="toggle"></div>
<div id="zoom"></div>

<?php echo foot(); ?>
