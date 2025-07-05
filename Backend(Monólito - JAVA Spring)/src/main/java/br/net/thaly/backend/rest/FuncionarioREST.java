package br.net.thaly.backend.rest;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.modelmapper.*;

import br.net.thaly.backend.model.Usuario;
import br.net.thaly.backend.model.dto.UsuarioDTO;
import br.net.thaly.backend.repository.FuncionarioRepository;

@CrossOrigin
@RestController
public class FuncionarioREST {
	@Autowired
	private FuncionarioRepository repo;
	@Autowired
	private ModelMapper mapper;
	public static List<UsuarioDTO> lista = new ArrayList<>();

	@GetMapping("/funcionarios")
	public List<UsuarioDTO> obterTodosFuncionarios() {
	    List<Usuario> lista = repo.findAll();
	    return lista.stream()
	        .filter(Objects::nonNull)
	        .peek(e -> System.out.println("Before Map: " + e.toString()))
	        .map(e -> {
	            try {
	                return mapper.map(e, UsuarioDTO.class);
	            } catch (Exception ex) {
	                ex.printStackTrace();
	                return null;
	            }
	        })
	        .filter(Objects::nonNull) 
	        .collect(Collectors.toList());
	}



	@GetMapping("/funcionarios/{id}")
	public UsuarioDTO obterTodosFuncionarios(@PathVariable("id") int id) {
		List<Usuario> lista = repo.findAll();
		UsuarioDTO u = lista.stream().filter(Objects::nonNull).map(e -> mapper.map(e, UsuarioDTO.class)).filter(func -> func.getId() == id).findAny().orElse(null);
		return u;
	}

	@PostMapping("/funcionarios")
	public ResponseEntity<UsuarioDTO> inserirFuncionario(@RequestBody UsuarioDTO usuarioDTO) {
	    try {

	        Usuario usuario = mapper.map(usuarioDTO, Usuario.class);
	        usuario.setSenha(usuarioDTO.getSenha());
	        repo.save(usuario);

	        
	        Usuario savedFuncionario = repo.findById(usuario.getId()).orElse(null);

	        if (savedFuncionario != null) {
	            UsuarioDTO savedFuncionarioDTO = mapper.map(savedFuncionario, UsuarioDTO.class);
	            return new ResponseEntity<>(savedFuncionarioDTO, HttpStatus.CREATED);
	        } else {
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	@PutMapping("/funcionarios/{id}")
	public UsuarioDTO alterarFuncionario(@PathVariable("id") long id, @RequestBody UsuarioDTO usuarioDTO) {
	    Optional<Usuario> funcionarioOptional = repo.findById(id);

	    if (funcionarioOptional.isPresent()) {
	        Usuario usuario = funcionarioOptional.get();
	        usuario.setNome(usuarioDTO.getNome());
	        usuario.setEmail(usuarioDTO.getEmail());
	        usuario.setDatadeNasc(usuarioDTO.getDataDeNasc());
	        usuario.setSenha(usuarioDTO.getSenha());
	        usuario.setPerfil(usuarioDTO.getPerfil());

	        
	        repo.save(usuario);

	        return mapper.map(usuario, UsuarioDTO.class);
	    } else {
	        return null; 
	    }
	}

	@DeleteMapping("/funcionarios/{id}")
	public UsuarioDTO removerFuncionario(@PathVariable("id") long id) {
	    Optional<Usuario> funcionarioOptional = repo.findById(id);

	    if (funcionarioOptional.isPresent()) {
	        Usuario usuario = funcionarioOptional.get();
	        repo.delete(usuario);
	        return mapper.map(usuario, UsuarioDTO.class);
	    } else {
	        return null;
	    }
	}


}
