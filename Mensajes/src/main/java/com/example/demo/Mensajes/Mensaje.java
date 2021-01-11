package com.example.demo.Mensajes;


/**
 * @author DakeXd
 *
 *Los mensajes seran representados con una clase que contendra un autor, fecha y texto
 *
 */
public class Mensaje {
	
	private String autor;
	private String fecha;
	private String texto;
	
	public Mensaje() {}

	public Mensaje(String autor, String fecha, String texto) {
		this.autor = autor;
		this.fecha = fecha;
		this.texto = texto;
	}
	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	
}
