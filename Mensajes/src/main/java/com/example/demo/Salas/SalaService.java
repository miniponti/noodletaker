package com.example.demo.Salas;

import org.springframework.stereotype.Component;

import com.example.demo.Mensajes.Mensaje;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.swing.Timer;
@Component
public class SalaService {

	
	//private List<Sala> salas = new ArrayList<Sala>();
	private Sala principal = new Sala();
	Timer timer = new Timer(5000, new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e) {
        	for(int i = 0; i<principal.getListaJugadores().size(); i++) {
        		Jugador aux = principal.getListaJugadores().get(i);
        		if(aux.getTics()>0) {
                	aux.setTics(0);
                	aux.setConectado(true);
                }else{
                	aux.setConectado(false);
                }
        	}
            
        }
    });
	public SalaService() {
		Random rd = new Random();
		principal.setCapacidad(2);
		principal.setId("" + (long)(Math.floor(rd.nextDouble()*999999)));
		principal.getRegistro().setRuta("registros/" + principal.getId() + ".txt");
		timer.start();
	}
	public Sala getPrincipal() {
		return principal;
	}

	public void setPrincipal(Sala principal) {
		this.principal = principal;
	}

	public Jugador addPlayer(String id) {
		
		for(int i = 0; i<principal.getListaJugadores().size();i++) {
			if(principal.getJugador(id)!=null) {
				return null;
			}
		}
		//Random rd = new Random();
		Jugador nuevo = new Jugador();
		nuevo.setId(id);
		nuevo.setSalaId(principal.getId());
		nuevo.setConectado(true);
		nuevo.setTics(1);
		principal.getListaJugadores().add(nuevo);
		return nuevo;
	}
	
	public void checkPlayers() {
		
		for(int i = 0; i<principal.getListaJugadores().size(); i++) {
			if(!principal.getListaJugadores().get(i).isConectado()) {
				principal.getListaJugadores().remove(i);
			}
		}
	}
	public void tickPlayer(String serverId, String PlayerId) {
		Jugador aux = principal.getJugador(PlayerId);
		if(aux!=null) {
			aux.setTics(1);
		}
	}
	public List<Mensaje> returnMensajes(String serverId, String playerId){
		if(!principal.getId().equals(serverId)) {
			
			List<Mensaje> aux = new ArrayList<>();
			aux.add(new Mensaje("SERVER", "0000" , "Conexion invalida"));
			return aux;
		}
		if(principal.getJugador(playerId)!=null) {
			return principal.getRegistro().getMensajes();
		}
		List<Mensaje> aux = new ArrayList<>();
		aux.add(new Mensaje("SERVER", "0001", "Jugador invalido"));
		return aux;
		
	}
	public List<String> returnJugadores(String id, String idP) {
		List<String> aux = new ArrayList<>();
		if(!principal.getId().equals(id)) {
			aux.add("SERVER " + "0000 " + "Conexion invalida");
			return aux;
		}
		if(principal.getJugador(idP)!=null) {
			for(int i = 0; i<principal.getListaJugadores().size(); i++) {
				aux.add(principal.getListaJugadores().get(i).getId());
			}
			return aux;
		}
		aux.add("SERVER " + "0000 " + "Conexion invalida");
		return aux;
	}
	
}
