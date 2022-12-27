package fr.analogon.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "odh_utilisateurs", uniqueConstraints = @UniqueConstraint(columnNames = "oduti_utilisateur"))
@NoArgsConstructor @Getter @Setter
public class OdhUtilisateurs implements java.io.Serializable{
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "oduti_id", unique = true, nullable = false)
	private Integer odutiId;
	@Column(name = "oduti_utilisateur", unique = true, nullable = false, length = 8)
	private String odutiUtilisateur;
	@Column(name = "oduti_password", nullable = false, length = 8)
	private String odutiPassword;
	@Column(name = "oduti_valide", nullable = false, length = 1)
	private char odutiValide;
	@Column(name = "oduti_type", nullable = false, length = 1)
	private char odutiType;
	@Column(name = "oduti_civil", length = 4)
	private String odutiCivil;
	@Column(name = "oduti_nom", nullable = false, length = 30)
	private String odutiNom;
	@Column(name = "oduti_prenom", nullable = false, length = 30)
	private String odutiPrenom;
	@Column(name = "oduti_adresse1", nullable = false, length = 60)
	private String odutiAdresse1;
	@Column(name = "oduti_adresse2", length = 60)
	private String odutiAdresse2;
	@Column(name = "oduti_adresse3", length = 60)
	private String odutiAdresse3;
	@Column(name = "oduti_codeposte")
	private Integer odutiCodeposte;
	@Column(name = "oduti_ville", length = 30)
	private String odutiVille;
	@Column(name = "oduti_tel", length = 20)
	private String odutiTel;
	@Column(name = "oduti_fax", length = 20)
	private String odutiFax;
	@Column(name = "oduti_mail", length = 60)
	private String odutiMail;
	@Column(name = "oduti_module", nullable = false)
	private int odutiModule;
	@Column(name = "oduti_lect", nullable = false)
	private int odutiLect;
	@Column(name = "oduti_crea", nullable = false)
	private int odutiCrea;
	@Column(name = "oduti_modif", nullable = false)
	private int odutiModif;
	@Column(name = "oduti_libelle", length = 60)
	private String odutiLibelle;

}
