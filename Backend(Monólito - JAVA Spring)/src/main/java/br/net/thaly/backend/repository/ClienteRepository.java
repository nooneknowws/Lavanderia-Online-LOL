package br.net.thaly.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.net.thaly.backend.model.Usuario;
import jakarta.transaction.Transactional;

public interface ClienteRepository extends JpaRepository<Usuario, Long> {

}

