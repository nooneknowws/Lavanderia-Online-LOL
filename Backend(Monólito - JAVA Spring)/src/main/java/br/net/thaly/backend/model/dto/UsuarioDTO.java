package br.net.thaly.backend.model.dto;

import java.io.Serializable;
import java.util.Date;

import br.net.thaly.backend.model.Endereco;

public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String cpf;
    private String email;
    private String nome;
    private Date dataDeNasc;
    private String senha;
    private String perfil;
    private Endereco endereco;
    private String telefone;

    public UsuarioDTO() {
        super();
    }

    public UsuarioDTO(Long id, String cpf, String email, String nome, Date dataDeNasc, String senha, Endereco endereco, String telefone, String perfil) {
        this.id = id;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.dataDeNasc = dataDeNasc;
        this.senha = senha;
        this.endereco = endereco;
        this.telefone = telefone;
        this.perfil = perfil;
    }

    // Getters and setters

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

    public Date getDataDeNasc() {
        return dataDeNasc;
    }

    public void setDataDeNasc(Date dataDeNasc) {
        this.dataDeNasc = dataDeNasc;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
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

    public static long getSerialversionuid() {
        return serialVersionUID;
    }
}
