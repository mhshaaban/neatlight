<?php

/* vim: set tabstop=2 shiftwidth=2 softtabstop=2: */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<!-- Header. -->
<?php echo head(array(
  'title' => nl_getExhibitField('title'),
  'bodyclass' => 'neatline show'
)); ?>

<!-- Exhibit. -->
<div class="exhibit">
  <?php echo nl_getExhibitMarkup(); ?>
</div>

<!-- Transcription. -->
<div id="neatline-narrative" class="narrative">
  <?php include('poem.php'); ?>
</div>

<!-- Slider. -->
<div id="slider"></div>

<?php echo foot(); ?>
