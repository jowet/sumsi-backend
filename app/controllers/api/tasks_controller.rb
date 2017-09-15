module Api
  class TasksController < ApiController # :nodoc:
    def index
      render json: tasks
    end

    def show
      render json: task
    end

    def create
      task = ledger.tasks.create!(task_params)

      render json: task, status: :created
    end

    def update
      task.update_attributes(task_params) if task.opened?

      task.complete! if params.dig(:task, :state) == 'completed'
      task.close!    if params.dig(:task, :state) == 'closed'

      render json: task
    end

    private

    def tasks
      ledger.tasks
    end

    def task
      ledger.tasks.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :value)
    end

    def ledger
      Ledger.find(params[:ledger_id])
    end
  end
end
