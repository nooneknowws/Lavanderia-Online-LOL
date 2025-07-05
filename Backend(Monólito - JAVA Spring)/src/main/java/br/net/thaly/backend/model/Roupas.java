package br.net.thaly.backend.model;

import java.io.Serializable;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_roupas")

public class Roupas implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@SequenceGenerator(name = "roupas_seq", sequenceName = "tb_roupas_id_roupa_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roupas_seq")
	@Column(name = "id_roupa")
	private long id;
	
	@Column(name = "peca_roupa")
	private String peca;
	
	@Column(name = "preco_roupa", columnDefinition = "REAL")
	private float preco;
	
	@Column(name = "prazo_roupa")
	private int prazo;

	// construtores
	public Roupas() {
		super();
	}

	public Roupas(long id, String peca, float preco, int prazo) {
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

}