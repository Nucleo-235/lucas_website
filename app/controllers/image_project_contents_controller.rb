class ImageProjectContentsController < ProjectContentsController
  protected

    def project_content_type_key
      :image_project_content
    end

    def project_content_type
      ImageProjectContent
    end
end
