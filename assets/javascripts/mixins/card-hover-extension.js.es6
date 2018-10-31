let _cached = {};
let _promise;
let _inside = false;

function cleanDom() {
  $(".d-tooltip").remove();
  _inside = false;
}

function cancel() {
  if (_promise) {
    _promise.abort();
    _promise = null;
  }
  cleanDom();
}

function renderTooltip(span, post) {

  let text = span.dataset.tooltip;
  let element = $(span);

  post.after(
    `<div class='d-tooltip'><div class='d-tooltip-pointer'></div><div class='d-tooltip-content'>${text}</div></div></div>`
  );

  let $dTooltip = $(".d-tooltip");
  let tooltipWidth = $dTooltip.outerWidth();
  let elementWidth = element.width();
  let elementHeight = element.height();
  let elementPos = element.position();
  let elementX = elementPos.left;
  let y = elementPos.top + elementHeight;
  let x = elementX + elementWidth / 2 - tooltipWidth / 2;

  // make sure left side of the tooltip is not out of the screen
  let $mainLink = element.hasClass("cooked")
    ? element
    : element.parents(".cooked");
  let mainLinkLeftOffset = $mainLink.offset().left;
  if (mainLinkLeftOffset + x < 0) {
    x = elementX;
  }

  $dTooltip.css({ left: `${x}px`, top: `${y}px` });
  $dTooltip.fadeIn(200);
}

export function hoverExtension(post) {

  const selector = ".artifact-card";

  cancel();

  $(post).on("mouseenter.artifact-card", selector, function(e) {
    renderTooltip(e.currentTarget, post);
  });
  $(post).on("mouseleave.discourse-tooltips", selector, () => cleanDom());
}

