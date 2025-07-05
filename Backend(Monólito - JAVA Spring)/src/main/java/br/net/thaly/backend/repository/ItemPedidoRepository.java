package br.net.thaly.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.thaly.backend.model.ItemPedido;
import br.net.thaly.backend.model.Pedido;
import br.net.thaly.backend.model.Roupas;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long>{
	
	public ItemPedido findByRoupa(Roupas r);
	public ItemPedido findByPedido(Pedido p);
}
