package com.example.demo.configureGame;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.swing.Timer;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;



@Controller
public class GameController{
	
	final int clientTimeout = 1000;
	final int matchmakingTimeout = 1000;
	List<MatchmakingUser> ids = new ArrayList<>();
	List<MatchmakingUser> safeIds = Collections.synchronizedList(ids);	//Soporta concurrencia.
	
	int sala = 0;
	boolean primero = true;
	Timer timer = new Timer(matchmakingTimeout, new ActionListener() {
		@Override
        public void actionPerformed(ActionEvent e) {
			//System.out.println("buscando desconectados");
			Iterator<MatchmakingUser> idsIterator = safeIds.iterator();
	        while (idsIterator.hasNext()) {
	            MatchmakingUser user = idsIterator.next();
	            if(!user.isPing()) {
	            	System.out.println("Jugador desconectado");
	            	idsIterator.remove();
	            }else {
	            	user.setPing(false);
	            }
	        }
        }
	});
	
	
	@MessageMapping("/search")
	@SendTo("/topic/searching")
	public String findServer(@Payload GameMessage message) {
		if(primero) {
			primero = false;
			timer.start();
		}
		safeIds.add(new MatchmakingUser(message.getPlayer()));
		//System.out.println(message.getPlayer() + " " + ids.size());
		if(safeIds.size()>=2) {
			sala++;
			String aux = safeIds.get(0).getNick() + "%" + safeIds.get(1).getNick() + "%" + sala + "%" + Math.random()*100000;
			
			safeIds.remove(0);
			safeIds.remove(0);

			return aux;
			
		}
		return "waiting";
	}
	
	@MessageMapping("/ping/{player}")
	@SendTo("/topic/searching/{player}")
	public boolean pingFunction(@DestinationVariable String player, @Payload boolean ping) {
		//System.out.println("ping");
		findPLayer(player).setPing(true);
		return true;
	}
	
	private MatchmakingUser findPLayer(String nick) {
		for (MatchmakingUser matchmakingUser : safeIds) {
			if(matchmakingUser.getNick().equals(nick)) {
				return matchmakingUser;
			}
		}
		return null;
	}
	
	@MessageMapping("/playing.send/{serverId}")
	@SendTo("/topic/gameId/{serverId}")
	public GameMessage sendMessage2(@DestinationVariable String serverId, @Payload GameMessage message) {
		return message;
	}
	
	
	
	
	
}
