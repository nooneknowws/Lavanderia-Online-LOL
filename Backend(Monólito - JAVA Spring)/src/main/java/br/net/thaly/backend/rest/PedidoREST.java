package br.net.thaly.backend.rest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.net.thaly.backend.model.ItemPedido;
import br.net.thaly.backend.model.Pedido;
import br.net.thaly.backend.model.Usuario;
import br.net.thaly.backend.repository.ClienteRepository;
import br.net.thaly.backend.repository.PedidoRepository;
import br.net.thaly.backend.model.dto.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class PedidoREST {
	
	@Autowired
	private PedidoRepository repo;
	@Autowired
	private ClienteRepository clienteRepo;
	@Autowired
	private ModelMapper mapper;

    public static List<Pedido> listaPedidos = new ArrayList<>();

    @GetMapping("/pedidos")
    public List<PedidoDTO> obterTodosPedidos() {
    	List<Pedido> lista = repo.findAll();
    	return lista.stream().map(e -> mapper.map(e,  PedidoDTO.class)).collect(Collectors.toList());
    }
    
    @GetMapping("/pedidosCliente/{id}")
    public List<Pedido> obterPedidosPorUsuarioId(@PathVariable int id) {
        List<Pedido> pedidos = repo.findByUsuarioId(id);
        return pedidos;
    }
    
    @GetMapping("/pedidos/{id}")
    public Optional<Pedido> obterPedidosPorId(@PathVariable Long id) {
    	
    	Optional<Pedido> pedido = repo.findById(id);
    	return pedido;
    }



    @PostMapping("/pedidos")
    public PedidoDTO inserirPedido(@RequestBody Pedido pedido) {
        Optional<Usuario> usuarioOptional = clienteRepo.findById(pedido.getUsuario().getId());

        if (usuarioOptional.isPresent()) {
            pedido.setUsuario(usuarioOptional.get());
            
            
            for (ItemPedido itemPedido : pedido.getItens()) {
                itemPedido.setPedido(pedido);
            }

            System.out.println("Pedido antes de salvar: " + pedido);

            repo.save(pedido);

            pedido = repo.findById(pedido.getId()).orElse(null);

            System.out.println("Pedido depois de salvar: " + pedido);

            return (pedido != null) ? mapper.map(pedido, PedidoDTO.class) : null;
        } else {
            return null;
        }
    }



    @PutMapping("/pedidos/{id}")
    public PedidoDTO alterarPedido(@PathVariable("id") long id, @RequestBody PedidoDTO pedidoDTO) {
        Optional<Pedido> pedidoOptional = repo.findById(id);

        if (pedidoOptional.isPresent()) {
           Pedido pedido = pedidoOptional.get();
           pedido.setStatuspedido(pedidoDTO.getStatuspedido());
           
           repo.save(pedido);
           return mapper.map(pedido, PedidoDTO.class);
        } else {
        	return null;
        }

 
    }

    @DeleteMapping("/pedidos/{id}")
    public PedidoDTO removerPedido(@PathVariable("id") long id) {
    	Optional<Pedido> pedidoOptional = repo.findById(id);
    	
    	if(pedidoOptional.isPresent()) {
    		Pedido pedido = pedidoOptional.get();
    		repo.delete(pedido);
    		return mapper.map(pedido, PedidoDTO.class);
    	} else {
    		System.out.println("Pedido depois de salvar: " + pedidoOptional);;
    		return null;
    	}
        

    }

}
