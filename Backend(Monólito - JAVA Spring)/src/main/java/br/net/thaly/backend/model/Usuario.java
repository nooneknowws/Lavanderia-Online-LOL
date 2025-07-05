package br.net.thaly.backend.model;

import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_usuarios")

public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;
	@SequenceGenerator(name = "usuarios_seq", sequenceName = "tb_usuarios_id_usu_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuarios_seq")
	@Id
	@Column(name = "id_usu")
	private Long id;
	
	@Column(name = "CPF_usu", unique = true)
	private String cpf;
	
	@Column(name = "email_usu", unique = true)
	private String email;
	
	@Column(name = "nome_usu")
	private String nome;
	
	@Column(name = "datadenasc_usu")
	private Date datadeNasc;
	
	@Column(name = "senha_usu")
	private String senha;
	
	@Column(name = "salt_usu", length = 64)
    private String salt;
	
	@OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_endereco")
	@JsonIgnore
	@MapsId
    private Endereco endereco;
	
	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Pedido> pedidos;
	
	@Column(name = "telefone_usu")
	private String telefone;
	
	@Column(name = "perfil_usu")
	private String perfil;
	
	
	public Usuario() {
		super();
	}
	
	public Usuario(Long id, String cpf, String email, String nome, Date datadeNasc, String senha,String salt,List<Pedido> pedido,Endereco endereco, String telefone, String perfil) {
		this.id = id;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.datadeNasc = datadeNasc;
        this.endereco = endereco;
        this.pedidos = pedido;
        this.senha = senha;
        this.salt = salt;
        this.telefone = telefone;
        this.perfil = perfil;
	}

	

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getDatadeNasc() {
		return datadeNasc;
	}

	public void setDatadeNasc(Date datadeNasc) {
		this.datadeNasc = datadeNasc;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.salt = generateSalt();
        this.senha = hashPassword(senha, this.salt);
	}
	public String getSalt() {
		return salt;
	}

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	private String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] saltBytes = new byte[32];
        random.nextBytes(saltBytes);
        return bytesToHex(saltBytes);
    }
	private String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(hexToBytes(salt));
            byte[] hashedPassword = md.digest(password.getBytes());
            return bytesToHex(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password.", e);
        }
    }

	 private String bytesToHex(byte[] bytes) {
	        StringBuilder result = new StringBuilder();
	        for (byte b : bytes) {
	            result.append(String.format("%02x", b));
	        }
	        return result.toString();
	    }
	 private byte[] hexToBytes(String hex) {
	        int len = hex.length();
	        byte[] data = new byte[len / 2];
	        for (int i = 0; i < len; i += 2) {
	            data[i / 2] = (byte) ((Character.digit(hex.charAt(i), 16) << 4)
	                    + Character.digit(hex.charAt(i + 1), 16));
	        }
	        return data;
	    }

	
}
