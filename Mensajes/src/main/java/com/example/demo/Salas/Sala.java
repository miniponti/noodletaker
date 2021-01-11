package com.example.demo.Salas;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.Mensajes.MensajeDatos;

public class Sala {
	
	private String id;
	private int capacidad;
	private List<Jugador> listaJugadores = new ArrayList<Jugador>();
	private MensajeDatos registro = new MensajeDatos();
	
	public Sala() {
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(int capacidad) {
		this.capacidad = capacidad;
	}

	public List<Jugador> getListaJugadores() {
		return listaJugadores;
	}

	public void setListaJugadores(List<Jugador> listaJugadores) {
		this.listaJugadores = listaJugadores;
	}

	public MensajeDatos getRegistro() {
		return registro;
	}

	public void setRegistro(MensajeDatos registro) {
		this.registro = registro;
	}

	public Jugador getJugador(String idP) {
		for(int i = 0; i<listaJugadores.size(); i++) {
			if(listaJugadores.get(i).getId().equals(idP)) {
				return listaJugadores.get(i);
			}
		}
		return null;
		
	}
	
	
	
}
