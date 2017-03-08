class VimeoProjectContentsController < ProjectContentsController
  protected

    def project_content_type_key
      :vimeo_project_content
    end

    def project_content_type
      VimeoProjectContent
    end
end
