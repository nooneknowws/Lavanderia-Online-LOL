package br.net.thaly.backend.model.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import br.net.thaly.backend.model.ItemPedido;
import br.net.thaly.backend.model.Usuario;

public class PedidoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private long id;
	private Date datadopedido;
	private int statuspedido;
	private Usuario usuario;
	private List<ItemPedido> itens;
	
	public PedidoDTO(Date datadopedido, int statuspedido, Usuario usuario, List<ItemPedido> itens) {
		this.setDatadopedido(datadopedido);
		this.setStatuspedido(statuspedido);
		this.setUsuario(usuario);
		this.setItens(itens);
		
	}
	
	public PedidoDTO() {
		
	}
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public Date getDatadopedido() {
		return datadopedido;
	}

	public void setDatadopedido(Date datadopedido) {
		this.datadopedido = datadopedido;
	}

	public int getStatuspedido() {
		return statuspedido;
	}

	public void setStatuspedido(int statuspedido) {
		this.statuspedido = statuspedido;
	}

	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public List<ItemPedido> getItens() {
		return itens;
	}
	public void setItens(List<ItemPedido> itens) {
		this.itens = itens;
	}
	
	

}
