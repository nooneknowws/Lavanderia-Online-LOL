package br.net.thaly.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.modelmapper.ModelMapper;

import br.net.thaly.backend.model.Usuario;
import br.net.thaly.backend.model.dto.UsuarioDTO;
import br.net.thaly.backend.repository.ClienteRepository;
import jakarta.transaction.Transactional;

@RestController
@CrossOrigin
public class ClienteREST {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ModelMapper mapper;
    
   
    @Transactional
    @PostMapping("/clientes")
    public ResponseEntity<UsuarioDTO> inserirFuncionario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = mapper.map(usuarioDTO, Usuario.class);
            usuario.setSenha(usuarioDTO.getSenha());

            clienteRepository.save(usuario);

            Usuario savedFuncionario = clienteRepository.findById(usuario.getId()).orElse(null);

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
}



