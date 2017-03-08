class TextProjectContentsController < ProjectContentsController
  protected

    def project_content_type_key
      :text_project_content
    end

    def project_content_type
      TextProjectContent
    end
end
