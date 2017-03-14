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
    return this.openProjectWithLink(e, link, link.attr("href"), { 'margin-right': '0px', 'margin-left': '' }, { 'margin-left': '-100%', 'margin-right': '' });
  },
  previousProject: function(e, self) {
    preventDefaultWithHash(e, self);
    var link = $(self);
    return this.openProjectWithLink(e, link, link.attr("href"), { 'margin-right': '', 'margin-left': '0px' }, { 'margin-right': '-100%', 'margin-left': '' });
  },
  closeProject: function(e, self) {
    preventDefaultIfPossible(e);

    $('.open-related-portfolio').removeClass('shown');
    $('.project-container').hide();
    if (currentOpenProjectID) {
      $('#' + currentOpenProjectID).hide();
    }
  },
  openProjectWithLink: function(e, link, projectIDWithHash, animation, animationBack) {
    function doShow(projectID, element) {
      if (currentOpenProjectID) {
        if (!animationBack)
          $('#' + currentOpenProjectID).hide();
        else
          $('#' + currentOpenProjectID).animate(animationBack);
        // element.removeClass('shown');
      }

      function completeShow() {
        var previousItemId = previousOrLast(element, '.project-item').attr('id');
        var nextItemId = nextOrFirst(element, '.project-item').attr('id');
        $('#' + previousItemId).insertBefore(element);
        $('#' + nextItemId).insertAfter(element);
        $('#' + previousItemId).removeClass('shown');
        $('#' + nextItemId).removeClass('shown');

        $('.project-container .navigation.previous').attr('href', '#' + previousItemId);
        $('.project-container .navigation.next').attr('href', '#' + nextItemId);

        $('.project-container .project-item.previous').removeClass('previous');
        $('.project-container .project-item.next').removeClass('next');
        $('#' + previousItemId).addClass('previous');
        $('#' + nextItemId).addClass('next');
        $('#' + previousItemId).removeAttr('style');
        $('#' + nextItemId).removeAttr('style');
      };

      $('.open-related-portfolio').addClass('shown');
      $('.project-container').show();

      element.addClass('shown');
      if (!animation)
        element.show(completeShow);
      else
        element.animate(animation, 400, completeShow);
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
    projectListContainer = $('#portfolio .project-list');
    projectIDs = getProjectIDs();
    currentOpenProjectID = projectIDs.length > 0 ? projectIDs[0] : null;
    projectTemplate = currentOpenProjectID != null ? getClonedTemplate(currentOpenProjectID, projectListContainer) : null;
  },
  onTurningOff: function() {

  }
}