module Api
  class TasksController < ApiController # :nodoc:
    def index
      render json: tasks
    end

    def show
      render json: task
    end

    private

    def tasks
      ledger.tasks
    end

    def task
      ledger.tasks.find(params[:id])
    end

    def ledger
      Ledger.find(params[:ledger_id])
    end
  end
end
