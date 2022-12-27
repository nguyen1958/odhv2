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
 * OdhExperts generated by hbm2java
 */
@Entity
@Table(name = "odh_experts")
@NoArgsConstructor	@Getter	@Setter
public class OdhExperts implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odexp_id", unique = true, nullable = false)
	public Integer odexpId;	
	@Column(name = "odexp_type", nullable = false, length = 1)
	public char odexpType;
	@Column(name = "odexp_code", nullable = false, length = 4)
	public String odexpCode;
	@Column(name = "odexp_raison", length = 60)
	public String odexpRaison;
	@Column(name = "odexp_civil", length = 4)
	public String odexpCivil;
	@Column(name = "odexp_pren", nullable = false, length = 30)
	public String odexpPren;
	@Column(name = "odexp_nom", nullable = false, length = 30)
	public String odexpNom;
	@Column(name = "odexp_adr1", nullable = false, length = 80)
	public String odexpAdr1;
	@Column(name = "odexp_adr2", length = 80)
	public String odexpAdr2;
	@Column(name = "odexp_cpost")
	public Integer odexpCpost;
	@Column(name = "odexp_ville", length = 60)
	public String odexpVille;
	@Column(name = "odexp_com", length = 80)
	public String odexpCom;
	@Column(name = "odexp_telfix", length = 20)
	public String odexpTelfix;
	@Column(name = "odexp_telport", length = 20)
	public String odexpTelport;
	@Column(name = "odexp_fax", length = 20)
	public String odexpFax;
	@Column(name = "odexp_mail", length = 60)
	public String odexpMail;
}
