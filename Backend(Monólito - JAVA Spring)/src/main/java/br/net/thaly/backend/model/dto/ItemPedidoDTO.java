package br.net.thaly.backend.model.dto;

import java.io.Serializable;

import br.net.thaly.backend.model.Pedido;
import br.net.thaly.backend.model.Roupas;

public class ItemPedidoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private long id;
	private Pedido pedido;
	private Roupas roupa;
	private int quantidade;
	
	public ItemPedidoDTO(Pedido pedido, Roupas roupa, int quantidade) {
		this.setPedido(pedido);
		this.setRoupa(roupa);
		this.setQuantidade(quantidade);
		
	}
	

	public ItemPedidoDTO() {
	
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
