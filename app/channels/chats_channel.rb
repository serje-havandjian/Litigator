class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "chat_#{params[:user_id]}#{params[:recipient_id]}"
    # stream_from "some_channel"
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
