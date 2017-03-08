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
    // preventDefaultWithHash(e, link);

    function doShow(projectID, element) {
      if (currentOpenProjectID) {
      // substituir por "slide out" ou só comentar, já que o novo vai ser colocado no lugar
        $('#' + currentOpenProjectID).hide();
      }

      $('.open-related-portfolio').addClass('shown');
      $('.project-container').show();
      element.show();
      currentOpenProjectID = projectID;
    }

    var projectID = projectIDWithHash.substring(1);
    var existentElement = $(projectIDWithHash);
    if (existentElement && existentElement.length > 0) {
      doShow(projectID, existentElement)
    } else {
      link.addClass('loading');
      $.get({ url: '/projects/' + projectID + '.json', contentType: "application/json;", dataType: "json" })
        .done(function(data) {
          var project = data;
          var clonedElement = cloneItem(projectTemplate, project, project.slug);
          setNewProjectValues(clonedElement, project);

          link.removeClass('loading');
          link.removeClass('error');

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