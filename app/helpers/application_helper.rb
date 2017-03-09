module ApplicationHelper
  def mobile_device?
    if session[:mobile_param]
      session[:mobile_param] == "1"
    else
      request.user_agent =~ /Mobile|webOS/
    end
  end

  def ids_to_select_options(prefix, list)
    list.map do |id|
      [I18n.t('select_options.' + prefix + '.' + id),  id] 
    end
  end

  def valid_content_title(project_content)
    project_content.title.present? ? project_content.title : project_content.project.name
  end

  def content_style(project_content)
    styles = []
    styles.push("width: #{project_content.width}%;")
    styles.push("max-width: #{project_content.width}%;")
    styles.push("margin-left: #{project_content.left_margin}%;") if project_content.left_margin != 0
    styles.push("margin-right: #{project_content.right_margin}%;") if project_content.right_margin != 0
    styles.join('')
  end

  def vimeo_id(video_url)
    begin
      video_url.sub('https://player.vimeo.com/video/', '').
        sub('http://player.vimeo.com/video/', '').
        sub('http://vimeo.com/', '').
        sub('https://vimeo.com/', '')
    rescue
      ""
    end
  end

  def youtube_id(video_url)
    begin
      video_url.sub('https://www.youtube.com/watch?v=', '').
        sub('http://www.youtube.com/watch?v=', '').
        sub('https://youtu.be/', '').
        sub('http://youtu.be/', '')
    rescue
      ""
    end
  end
end
