
<!-- vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; -->


<?php queue_css_file('payloads/style'); ?>
<?php queue_js_file('show'); ?>

<?php echo head(array(
  'title' => nl_getExhibitField('title'),
  'bodyclass' => 'neatline show'
)); ?>

<!-- Exhibit -->
<div class="exhibit">
  <?php echo nl_getExhibitMarkup(); ?>
</div>

<!-- Narrative -->
<div id="neatline-narrative" class="narrative">
  <?php echo nl_getExhibitField('narrative'); ?>
</div>

<?php echo foot(); ?>
