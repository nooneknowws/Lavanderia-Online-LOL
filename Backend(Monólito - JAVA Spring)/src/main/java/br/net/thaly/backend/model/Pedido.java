package br.net.thaly.backend.model;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;


@Entity
@Table(name="tb_pedidos")
public class Pedido implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name="pedido_seq", sequenceName="tb_pedidos_id_pedido_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="pedido_seq")
	@Column(name="id_pedido")
	private long id;
	
	@Column(name="data_pedido")
	private Date datadopedido;
	
	@Column(name="status_pedido")
	private int statuspedido;
	
	@ManyToOne
    @JoinColumn(name = "id_usu", nullable = false)
	private Usuario usuario;
	
	@OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ItemPedido> itens = new ArrayList<>(); ;
	
	public Pedido(Date datadopedido, int statuspedido, Usuario usuario, List<ItemPedido> itens) {
		this.setDatadopedido(datadopedido);
		this.setStatuspedido(statuspedido);
		this.setUsuario(usuario);
		this.setItens(itens);
	}
	
	public Pedido() {
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
