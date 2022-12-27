package fr.analogon.entities;

// Generated 6 oct. 2022 18:44:28 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * OdhProprietaires generated by hbm2java
 */
@Entity
@Table(name = "odh_proprietaires")
@NoArgsConstructor @Getter @Setter
public class OdhProprietaires implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odpro_id", unique = true, nullable = false)
	private Integer odproId;	
	@Column(name = "odpro_raison", length = 60)
	private String odproRaison;	
	@Column(name = "odpro_civil", length = 4)
	private String odproCivil;	
	@Column(name = "odpro_pren", nullable = false, length = 30)
	private String odproPren;	
	@Column(name = "odpro_nom", nullable = false, length = 30)
	private String odproNom;	
	@Column(name = "odpro_num", length = 8)
	private String odproNum;	
	@Column(name = "odpro_adr1", nullable = false, length = 80)
	private String odproAdr1;	
	@Column(name = "odpro_adr2", length = 80)
	private String odproAdr2;	
	@Column(name = "odpro_cpost")
	private Integer odproCpost;	
	@Column(name = "odpro_ville", length = 60)
	private String odproVille;	
	@Column(name = "odpro_fisc", length = 15)
	private String odproFisc;	
	@Column(name = "odpro_com", length = 80)
	private String odproCom;	
	@Column(name = "odpro_telfix", length = 20)
	private String odproTelfix;	
	@Column(name = "odpro_telport", length = 20)
	private String odproTelport;	
	@Column(name = "odpro_fax", length = 20)
	private String odproFax;	
	@Column(name = "odpro_mail", length = 60)
	private String odproMail;
	
}