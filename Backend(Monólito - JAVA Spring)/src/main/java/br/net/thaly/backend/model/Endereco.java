package br.net.thaly.backend.model;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_enderecos")
public class Endereco implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Long id;

    @Column(name = "endereco_cep")
    private String cep;

    @Column(name = "endereco_rua")
    public String rua;

    @Column(name = "endereco_bairro")
    public String bairro;

    @Column(name = "endereco_cidade")
    public String cidade;

    @Column(name = "endereco_estado")
    public String estado;

    public Endereco() {
        super();
    }

    public Endereco(Long id, String cep, String rua, String bairro, String cidade, String estado) {
        this.setId(id);
        this.setCep(cep);
        this.setRua(rua);
        this.setBairro(bairro);
        this.setCidade(cidade);
        this.setEstado(estado);
    }

   // xd

    // Getter and setter methods for other fields
    // ...

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }
}
