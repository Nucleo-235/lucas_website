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
    preventDefaultWithHash(e, self);
    var link = $(self);
    return this.openProjectWithLink(e, link, link.attr("href"));
  },
  previousProject: function(e, self) {
    preventDefaultWithHash(e, self);
    var link = $(self);
    return this.openProjectWithLink(e, link, link.attr("href"));
  },
  closeProject: function(e, self) {
    preventDefaultIfPossible(e);

    $('.open-related-portfolio').removeClass('shown');
    $('.project-container').hide();
    if (currentOpenProjectID) {
      $('#' + currentOpenProjectID).hide();
    }
  },
  openProjectWithLink: function(e, link, projectIDWithHash) {
    function doShow(projectID, element) {
      var previousItemId = previousOrLast(element, '.project-item:not(.slick-cloned)').attr('id');
      var nextItemId = nextOrFirst(element, '.project-item:not(.slick-cloned)').attr('id');

      $('.project-container .navigation.previous').attr('href', '#' + previousItemId);
      $('.project-container .navigation.next').attr('href', '#' + nextItemId);

      $('.open-related-portfolio').addClass('shown');
      $('.project-container').show();

      element.addClass('shown');

      var index = element.attr('data-slick-index');
      if (currentOpenProjectID) {
        var currentIndex = $('#' + currentOpenProjectID).attr('data-slick-index');
        if ((index == currentIndex - 1) || (currentIndex == 0 && index > 1))
          $('#portfolio .project-list .project-slick').slick('slickPrev');
        else if ((index == currentIndex + 1) || (index == 0 && currentIndex > 1))
          $('#portfolio .project-list .project-slick').slick('slickNext');
        else
          $('#portfolio .project-list .project-slick').slick('slickGoTo', index);
      } else
        $('#portfolio .project-list .project-slick').slick('slickGoTo', index);

      // if (!animation)
      //   element.show(completeShow);
      // else
      //   element.animate(animation, 400, completeShow);
      currentOpenProjectID = projectID;
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
    });
  },
  onTurningOff: function() {

  }
}