package br.net.thaly.backend.repository;

import br.net.thaly.backend.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;

public interface FuncionarioRepository extends JpaRepository<Usuario, Long>{
	
	public Usuario findByEmail(String email);
	public Optional<Usuario> findById(Long id);
}
