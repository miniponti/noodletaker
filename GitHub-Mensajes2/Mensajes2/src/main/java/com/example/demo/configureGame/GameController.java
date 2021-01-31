package com.example.demo.configureGame;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameController{
	
	
	List<String> ids;
	int sala = 0;
	
	@MessageMapping("/search")
	@SendTo("topic/searching")
	public String findServer(@Payload GameMessage message) {
		System.out.println(message.getPlayer());
		/*ids.add(message.getPlayer());
		if(ids.size()>=2) {
			sala++;
			return ids.get(0) + "%" + ids.get(1) + "%" + sala;
			
		}*/
		return "waiting";
	}
	
	@MessageMapping("/playing")
	@SendTo("topic/gameId")
	public GameMessage upload(@Payload GameMessage message) {
		return message;
	}
	
	
	
	
	
}
