package br.net.thaly.backend.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import br.net.thaly.backend.model.Roupas;

import java.util.Optional;

@Repository
public interface RoupasRepository extends JpaRepository<Roupas,Long>{

	public Roupas findByPeca(String email);
	public Optional<Roupas> findById(Long id);
	public Roupas findByPreco(double preco);
}
