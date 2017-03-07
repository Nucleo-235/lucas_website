class ProjectContentsController < ApplicationController
  respond_to :html, :json
  skip_before_action :authenticate_user!, only: [:show, :index]
  before_action :set_project_content, only: [:show, :edit, :update, :destroy]

  # POST /project_contents
  def show
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { respond_with(@project_content) }
    end
  end

  # POST /project_contents
  def create
    @project_content = ProjectContent.new(project_content_params)

    if @project_content.save
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { respond_with(@project_content) }
      end
    else
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: @project_content.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /project_contents/1
  def update
    if @project_content.update(project_content_params)
      respond_with @project_content
    else
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: @project_content.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /project_contents/1
  def destroy
    if @project_content.destroy
      head :no_content
    else
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: @project_content.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_content
      @project_content = ProjectContent.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def project_content_params
      params.require(:project_content).permit(:project_id, :type, :title, :value, :value_cache, :link)
    end
end
