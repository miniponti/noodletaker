package game;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class PlayersHandler extends TextWebSocketHandler {
	
	@Override
	protected void handleTextMessage(
			WebSocketSession session,
				TextMessage message) throws Exception {
				System.out.println("Message received: " + message.getPayload());
				String msg = message.getPayload();
	session.sendMessage(new TextMessage(msg));
	}

}
