package com.example.demo.configureGame;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;



@Controller
public class GameController{
	
	
	List<String> ids = new ArrayList<>();
	int sala = 0;
	
	@MessageMapping("/search")
	@SendTo("/topic/searching")
	public String findServer(@Payload GameMessage message) {
		//System.out.println(message.getPlayer());
		ids.add(message.getPlayer());
		if(ids.size()>=2) {
			sala++;
			String aux = ids.get(0) + "%" + ids.get(1) + "%" + sala;
			ids.remove(0);
			ids.remove(0);
			return aux;
			
		}
		return "waiting";
	}
	
	@MessageMapping("/playing.send/{serverId}")
	@SendTo("/topic/gameId/{serverId}")
	public GameMessage sendMessage2(@DestinationVariable String serverId, @Payload GameMessage message) {
		return message;
	}
	
	
	
	
	
}
