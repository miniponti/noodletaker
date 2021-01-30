package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import game.GameController;
import game.PlayersHandler;


@SpringBootApplication
public class Mensajes2Application{

	
	public static void main(String[] args) {
		SpringApplication.run(Mensajes2Application.class, args);	
	}
	
}
