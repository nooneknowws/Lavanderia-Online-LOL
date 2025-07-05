package br.net.thaly.backend.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name="tb_itempedido")
public class ItemPedido implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name = "itempedido_seq", sequenceName = "tb_itempedido_id_itempedido_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "itempedido_seq")
	@Column(name="id_itempedido")
	private long id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="id_pedido")
	@JsonIgnore
	private Pedido pedido;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name= "id_roupa")
	private Roupas roupa;
	
	@Column(name="qtde_itempedido")
	private int quantidade;
	
	public ItemPedido(Pedido pedido, Roupas roupa, int quantidade) {
		this.setPedido(pedido);
		this.setRoupa(roupa);
		this.setQuantidade(quantidade);
	}
	public ItemPedido() {
		
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	public Roupas getRoupa() {
		return roupa;
	}

	public void setRoupa(Roupas roupa) {
		this.roupa = roupa;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}
	
	
}
