package br.net.thaly.backend.rest;

import java.util.*;
import java.util.stream.Collectors;

import br.net.thaly.backend.model.Roupas;
import br.net.thaly.backend.model.dto.RoupasDTO;
import br.net.thaly.backend.repository.RoupasRepository;

import org.modelmapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


@CrossOrigin
@RestController

public class RoupasREST {
	@Autowired
	private RoupasRepository repo;
	@Autowired
	private ModelMapper mapper;
	public static List<RoupasDTO>lista = new ArrayList<>();
	
	//métodos
	@GetMapping("/roupas")
	List<RoupasDTO>listarTodos(){
		List<Roupas> lista =repo.findAll();
		return lista.stream().map(e ->mapper.map(e,RoupasDTO.class)).collect(Collectors.toList());
	}
	
	@GetMapping("/roupas/{id}")
	public RoupasDTO obterTodasRoupas(@PathVariable("id") int id) {
		List<Roupas> lista = repo.findAll();
		RoupasDTO r = lista.stream().map(e -> mapper.map(e, RoupasDTO.class)).filter(roupa -> roupa.getId() == id).findAny().orElse(null);
		return r;
	}
	
	@PostMapping("/roupas")
	public ResponseEntity<RoupasDTO> inserirRoupa(@RequestBody RoupasDTO roupasDTO) {
		try {
			Roupas roupa = mapper.map(roupasDTO, Roupas.class); 
	        repo.save(roupa);

	        Roupas savedRoupas = repo.findById(roupa.getId()).orElse(null); 
	        
	        if (savedRoupas != null) {
	            RoupasDTO savedRoupasDTO = mapper.map(savedRoupas, RoupasDTO.class);
	            return new ResponseEntity<>(savedRoupasDTO, HttpStatus.CREATED);
	        } else {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }

	}
	
	@PutMapping("/roupas/{id}")
	public RoupasDTO alterarRoupa(@PathVariable("id") long id, @RequestBody RoupasDTO roupasDTO) {
	    Optional<Roupas> roupasOptional = repo.findById(id);

	    if (roupasOptional.isPresent()) {
			Roupas roupas = roupasOptional.get();
			roupas.setPeca(roupasDTO.getPeca());
			roupas.setPreco(roupasDTO.getPreco());
			roupas.setPrazo(roupasDTO.getPrazo());
	        
	        repo.save(roupas);

	        return mapper.map(roupas, RoupasDTO.class);
	    } else {
	        return null; 
	    }
	}
	
 }