package com.example.demo.configureGame;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;



@Controller
public class GameController{
	
	final int clientTimeout = 1000;
	
	List<String> ids = new ArrayList<>();
	List<String> safeIds = Collections.synchronizedList(ids);	//Soporta concurrencia.
	int sala = 0;
	
	@MessageMapping("/search")
	@SendTo("/topic/searching")
	public String findServer(@Payload GameMessage message) {
		safeIds.add(message.getPlayer());
		//System.out.println(message.getPlayer() + " " + ids.size());
		if(safeIds.size()>=2) {
			sala++;
			String aux = safeIds.get(0) + "%" + safeIds.get(1) + "%" + sala + "%" + Math.random()*100000;
			
			safeIds.remove(0);
			safeIds.remove(0);

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
