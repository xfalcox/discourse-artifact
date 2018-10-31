function cleanDom() {
  $(".d-tooltip").remove();
}

function cancel() {
  cleanDom();
}

function renderTooltip(span, post) {

  let text = span.dataset.tooltip;
  let element = $(span);
  let content = `<img src="/plugins/discourse-artifact/images/cards/${text}.jpg">`;

  $(post).parents(".row").after(
    `<div class='d-tooltip'><div class='d-tooltip-pointer'></div><div class='d-tooltip-content'>${content}</div></div></div>`
  );

  let $dTooltip = $(".d-tooltip");
  let tooltipWidth = $dTooltip.outerWidth();
  let elementWidth = element.width();
  let elementHeight = element.height();
  let elementPos = element.position();
  let elementX = elementPos.left;
  let y = elementPos.top + elementHeight + 50;
  let x = elementX + elementWidth / 2 - tooltipWidth / 2;

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

