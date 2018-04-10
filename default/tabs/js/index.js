$.fn.tabs = function (option) {
  $(this)
  .find(option.header.class)
  .each(function (index, item) {
    $(item)
    .on(option.event,function (e) {
      e.preventDefault()
      $(e.target)
      .addClass(option.header.selector)
      .siblings()
      .removeClass(option.header.selector)
      .parents('[default-tabs]')
      .find(option.page.class+index)
      .addClass(option.page.selector)
      .siblings()
      .removeClass(option.page.selector)
    })
  })
}