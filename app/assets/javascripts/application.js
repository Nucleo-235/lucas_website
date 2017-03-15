// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require best_in_place
//= require inplace_editing
//= require utils
//= require cloning
//= require desktop

$(document).ready(function() {
  /* Activating Inplace Editor */
  InplaceEditingManager.bindAll();

  var currentStrategy = desktopStrategy;
  currentStrategy.onTurningOn();

  $('.open-menu').click(function(e) {
    e.preventDefault();

    $('nav#menu').height($('section#main').innerHeight());

    $('nav#menu').show()
    $('nav#menu').addClass('shown');
    return false;
  });

  $('.close-menu').click(function(e) {
    e.preventDefault();

    $('nav#menu').hide();
    $('nav#menu').removeClass('shown');
    return false;
  });

  $('.open-project').click(function(e) {
    return currentStrategy.openProject(e, this);
  });
  $('.close-project').click(function(e) {
    return currentStrategy.closeProject(e, this);
  });

  $('.open-new-project').click(function(e) {
    return currentStrategy.openNewProject(e, this);
  });
  $('.open-related-portfolio').click(function(e) {
    return currentStrategy.openRelatedPortfolio(e, this);
  });

  $('nav#menu .internal a').click(function(e) {
    $('nav#menu').hide();
    $('nav#menu').removeClass('shown');

    // $('nav#menu .internal a').removeClass('active');
    // $(this).addClass('active');
  });

  $('.show-project-content-form').click(function(e) {
    return currentStrategy.openProjectContentForm(e, this);
  });

  $('#portfolio .navigation.next').click(function(e) {
    return currentStrategy.nextProject(e, this);
  });

  $('#portfolio .navigation.previous').click(function(e) {
    return currentStrategy.previousProject(e, this);
  });

  if (window.location.hash.length > 1) {
    var found = $(window.location.hash);
    if (found && found.length > 0 && found.hasClass('project-item')) {
      currentStrategy.openProjectWithLink(this, null, window.location.hash);
    }
  }

  var vid = document.getElementById("bgvid");

  if (window.matchMedia('(prefers-reduced-motion)').matches) {
      vid.removeAttribute("autoplay");
      vid.pause();
  }

  function vidFade() {
    vid.classList.add("stopfade");
  }

  vid.addEventListener('ended', function()
  {
    // only functional if "loop" is removed 
    vid.pause();
    // to capture IE10
    vidFade();
  });
});

function preventDefaultIfPossible(e) {
  try {
    e.preventDefault();
  } catch(ex) { }
}

function preventDefaultWithHash(e, self) {
  preventDefaultIfPossible(e);
  var link = $(self);
  if (link && link.length > 0)
    window.location.hash = link.attr('href');
}

function getProjectIDs() {
  var links = $('#portfolio nav .projects .project a');
  var IDs = [];
  for (var i = 0; i < links.length; i++) {
    var link = $(links[i]);
    IDs.push(link.attr('href').substring(1));
  }
  return IDs;
}

function setNewProjectValues(clonedElement, newData) {
  var element = $(clonedElement);
  if (element.hasClass('admin')) {
    element.find('.name-value span.best_in_place').text(newData.name);
    element.find('.name-value span.best_in_place').attr('data-bip-value');
    element.find('.summary-value span.best_in_place').html(newData.summary_html);
    element.find('.summary-value span.best_in_place').attr('data-bip-value');
    element.find('.image-value img').attr('src', newData.image);
    element.find('.thumb_image-value img').attr('src', newData.thumb_image);
  } else {
    element.find('.name-value').text(newData.name);
    element.find('.summary-value').html(newData.summary_html);
    element.find('.image-value img').attr('src', newData.image);
    element.find('.thumb_image-value img').attr('src', newData.thumb_image);
  }
}