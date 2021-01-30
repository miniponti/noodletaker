package game;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Controller
@Configuration																	//Spring Configuration class
@EnableWebSocketMessageBroker													//Enable web sockets message handling
public class GameWSHandler implements WebSocketMessageBrokerConfigurer {		

		@Override
		public void configureMessageBroker(MessageBrokerRegistry config) {		//Configure message broker
		    config.enableSimpleBroker("/topic");
		    config.setApplicationDestinationPrefixes("/game");					//Define all message mappings
		}
		
		@Override
		public void registerStompEndpoints(StompEndpointRegistry registry) {
		    registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
		}
}

