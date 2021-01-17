/** @OnlyCurrentDoc */
// the comment above is special: it limits access to only this doc (instead of all of a user's docs)

// references:
// https://developers.googleblog.com/2018/03/making-progress-bars-with-slides-add-ons.html
// https://developers.google.com/gsuite/add-ons/editors/slides/quickstart/progress-bar
// https://github.com/gsuitedevs/apps-script-samples/blob/master/slides/progress/progress.gs

/**
 * @OnlyCurrentDoc Adds progress bars to a presentation.
 */
var BAR_ID = "PROGRESS_BAR_ID";
var BAR_HEIGHT = 5; // px
var presentation = SlidesApp.getActivePresentation();

function onOpen() {
  SlidesApp.getUi()
    .createMenu("Progress bars")
    .addItem("Use progress bars", "createBars")
    .addItem("Remove progress bars", "deleteBars")
    .addToUi();
}

/**
 * Create a rectangle on every slide with different bar widths.
 */
function createBars() {
  deleteBars(); // Delete any existing progress bars
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; ++i) {
    var ratioComplete = i / (slides.length - 1);
    var x = 0;
    var y = presentation.getPageHeight() - BAR_HEIGHT;
    var barWidth = presentation.getPageWidth() * ratioComplete;
    if (barWidth > 0) {
      var bar = slides[i].insertShape(
        SlidesApp.ShapeType.RECTANGLE,
        x,
        y,
        barWidth,
        BAR_HEIGHT
      );
      bar.getBorder().setTransparent();
      var color = "#555555";
      var alpha = 0.5;
      bar.getFill().setSolidFill(color, alpha);
      bar.setLinkUrl(BAR_ID);
    }
  }
}

/**
 * Deletes all progress bar rectangles.
 */
function deleteBars() {
  var slides = presentation.getSlides();
  for (var i = 0; i < slides.length; ++i) {
    var elements = slides[i].getPageElements();
    for (var j = 0; j < elements.length; ++j) {
      var el = elements[j];
      if (
        el.getPageElementType() === SlidesApp.PageElementType.SHAPE &&
        el.asShape().getLink() &&
        el.asShape().getLink().getUrl() === BAR_ID
      ) {
        el.remove();
      }
    }
  }
}
