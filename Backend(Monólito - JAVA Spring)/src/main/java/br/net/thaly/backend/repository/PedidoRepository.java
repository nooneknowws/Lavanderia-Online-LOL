package br.net.thaly.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.net.thaly.backend.model.Pedido;
import br.net.thaly.backend.model.Usuario;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long>{
	Pedido findByUsuario(Usuario c);
	
	List<Pedido> findByUsuarioId(long usuarioId);

}
