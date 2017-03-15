var projectListContainer = null;
var projectIDs = null;
var currentOpenProjectID = null;
var projectTemplate = null;

var desktopStrategy = {
  openNewProject: function(e, self) {
    preventDefaultWithHash(e, self);

    $('#new-project').show();
    $('#new-project').addClass('shown');

    return false;
  },
  openRelatedPortfolio: function(e, self) {
    this.openPortfolio(e, self);
  },
  openProject: function(e, self) {
    preventDefaultWithHash(e, self);
    var link = $(self);
    return this.openProjectWithLink(e, link, link.attr("href"));
  },
  nextProject: function(e, self) {
    preventDefaultIfPossible(e, self);
    var link = $(self);
    var idWithHash = link.attr("href");
    this.openProjectWithLink(e, link, link.attr("href"), 'slickNext');
    // setTimeout(function() {
    //   window.location.hash = idWithHash;
    // }, 800);
    return false;
  },
  previousProject: function(e, self) {
    preventDefaultIfPossible(e, self);
    var link = $(self);
    var idWithHash = link.attr("href");
    this.openProjectWithLink(e, link, idWithHash, 'slickPrev');
    // setTimeout(function() {
    //   window.location.hash = idWithHash;
    // }, 800);
    return false;
  },
  closeProject: function(e, self) {
    preventDefaultIfPossible(e);

    $('.open-related-portfolio').removeClass('shown');
    $('.project-container').hide();
    if (currentOpenProjectID) {
      $('#' + currentOpenProjectID).hide();
    }
  },
  openProjectWithLink: function(e, link, projectIDWithHash, slideAnimation) {
    function doShow(projectID, element) {
      var indexOfProject = projectIDs.indexOf(projectID);
      var previousItemId = (indexOfProject < 1) ? projectIDs[projectIDs.length - 1] : projectIDs[indexOfProject - 1];
      var nextItemId = (indexOfProject == (projectIDs.length - 1)) ? projectIDs[0] : projectIDs[indexOfProject + 1];

      $('.project-container .move-to-previous').attr('href', '#' + previousItemId);
      $('.project-container .move-to-next').attr('href', '#' + nextItemId);

      $('.open-related-portfolio').addClass('shown');
      $('.project-container').show();

      if (currentOpenProjectID) {
        stopVideos('#'+ currentOpenProjectID + ' .vimeo_project_content iframe');
        stopVideos('#'+ currentOpenProjectID + ' .youtube_project_content iframe');
        $('#' + currentOpenProjectID).removeClass('shown');
      }
      element.addClass('shown');
      currentOpenProjectID = projectID;

      var index = element.attr('data-slick-index');
      if (slideAnimation) {
        $('#portfolio .project-list .project-slick').slick(slideAnimation);
      } else
        $('#portfolio .project-list .project-slick').slick('slickGoTo', index);
    }

    var projectID = projectIDWithHash.substring(1);
    var existentElement = $(projectIDWithHash);
    if (existentElement && existentElement.length > 0) {
      doShow(projectID, existentElement)
    } else {
      if (link)
        link.addClass('loading');
      $.get({ url: '/projects/' + projectID + '.json', contentType: "application/json;", dataType: "json" })
        .done(function(data) {
          var project = data;
          var clonedElement = cloneItem(projectTemplate, project, project.slug);
          setNewProjectValues(clonedElement, project);

          if (link) {
            link.removeClass('loading');
            link.removeClass('error');
          }

          clonedElement.appendTo(projectListContainer);
          InplaceEditingManager.bindAll('#' + project.slug);
          doShow(projectID, clonedElement);
        })
        .fail(function(error) {
          link.removeClass('loading');
          link.addClass('error');
          console.log(error);
        })
        .always(function() {
        });
    }
    return false;
  },
  openProjectContentForm: function(e, self) {
    preventDefaultIfPossible(e);
    var dataType = $(self).attr('data-type');

    $('.project-content-forms .content-form').hide();
    $('.project-content-forms .content-form.' + dataType).show();

    return false;
  },
  onTurningOn: function() {
    projectListContainer = $('#portfolio .project-list .project-slick');
    projectIDs = getProjectIDs();
    currentOpenProjectID = projectIDs.length > 0 ? projectIDs[0] : null;
    projectTemplate = currentOpenProjectID != null ? getClonedTemplate(currentOpenProjectID, projectListContainer) : null;

    $('#portfolio .project-list .project-slick').slick({
      autoplay: false,
      arrows: false,
      infinite: true,
      adaptiveHeight: true
    });

    $('#portfolio .project-list .project-slick').on('afterChange', function(event, slick, currentSlide){
      if (currentOpenProjectID) {
        window.location.hash = '#' + currentOpenProjectID;
      }
    });

  },
  onTurningOff: function() {

  }
}