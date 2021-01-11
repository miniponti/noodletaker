package com.example.demo.Salas;

public class Jugador {

	private String id;
	private String salaId;
	private boolean conectado;
	private int tics;
	
	public Jugador() {}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSalaId() {
		return salaId;
	}

	public void setSalaId(String string) {
		this.salaId = string;
	}

	public boolean isConectado() {
		return conectado;
	}

	public void setConectado(boolean conectado) {
		this.conectado = conectado;
	}

	public int getTics() {
		return tics;
	}

	public void setTics(int tics) {
		this.tics = tics;
	};
	
	
}
