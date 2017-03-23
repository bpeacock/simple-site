// JS to be loaded on every page

$(function() {
  // Highlight Active Link & Show Links
  $('a[href="' + window.location.pathname + '"]').addClass('active');
});
