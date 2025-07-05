package br.net.thaly.backend.model.dto;

import java.io.Serializable;

public class RoupasDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private long id;
	private String peca;
	private float preco;
	private int prazo;

	// construtores
	public RoupasDTO() {
		super();
	}

	public RoupasDTO(long id, String peca, float preco, int prazo) {
		super();
		this.id = id;
		this.peca = peca;
		this.preco = preco;
		this.prazo = prazo;
	}

//getters e setters	
	public long getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPeca() {
		return peca;
	}

	public void setPeca(String peca) {
		this.peca = peca;
	}

	public float getPreco() {
		return preco;
	}

	public void setPreco(float preco) {
		this.preco = preco;
	}

	public int getPrazo() {
		return prazo;
	}

	public void setPrazo(int prazo) {
		this.prazo = prazo;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}

