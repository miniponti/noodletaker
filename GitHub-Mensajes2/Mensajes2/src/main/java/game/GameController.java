package game;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Controller
public class GameController{
	
	
	List<String> ids;
	int sala = 0;
	
	@MessageMapping("/playing")
	@SendTo("topic/{gameId}")
	public GameMessage upload(GameMessage message) {
		return message;
	}
	
	@MessageMapping("/search")
	@SendTo("topic/searching")
	public String findServer(String playerId) {
		ids.add(playerId);
		if(ids.size()>=2) {
			sala++;
			return ids.get(0) + "%" + ids.get(1) + "%" + sala;
			
		}
		return "waiting";
	}
	
	
	
}
