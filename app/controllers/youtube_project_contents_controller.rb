class YoutubeProjectContentsController < ProjectContentsController
  protected

    def project_content_type_key
      :youtube_project_content
    end

    def project_content_type
      YoutubeProjectContent
    end
end
