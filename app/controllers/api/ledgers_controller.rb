module Api
  class LedgersController < ApiController # :nodoc:
    def index
      render json: Ledger.all
    end

    def show
      render json: ledger
    end

    private

    def ledger
      Ledger.find(params[:id])
    end
  end
end
