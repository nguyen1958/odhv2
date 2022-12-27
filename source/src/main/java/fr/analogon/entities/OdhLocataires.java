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
 * OdhLocataires generated by hbm2java
 */
@Entity
@Table(name = "odh_locataires")
@NoArgsConstructor @Getter @Setter
public class OdhLocataires implements java.io.Serializable {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odloc_id", unique = true, nullable = false)
	private Integer odlocId;
	@Column(name = "odloc_civil", length = 4)
	private String odlocCivil;
	@Column(name = "odloc_pren", nullable = false, length = 30)
	private String odlocPren;
	@Column(name = "odloc_nom", nullable = false, length = 30)
	private String odlocNom;
	@Column(name = "odloc_num", length = 8)
	private String odlocNum;
	@Column(name = "odloc_adr1", nullable = false, length = 80)
	private String odlocAdr1;
	@Column(name = "odloc_adr2", length = 80)
	private String odlocAdr2;
	@Column(name = "odloc_cpost")
	private Integer odlocCpost;
	@Column(name = "odloc_ville", length = 60)
	private String odlocVille;
	@Column(name = "odloc_com", length = 80)
	private String odlocCom;
	@Column(name = "odloc_telfix", length = 20)
	private String odlocTelfix;
	@Column(name = "odloc_telport", length = 20)
	private String odlocTelport;
	@Column(name = "odloc_mail", length = 20)
	private String odlocMail;
	@Column(name = "odloc_bienloue")
	private Integer odlocBienloue;
	
	@Override
	public String toString() {
		return "OdhLocataires [odlocId=" + odlocId + ", odlocCivil=" + odlocCivil + ", odlocPren=" + odlocPren
				+ ", odlocNom=" + odlocNom + ", odlocNum=" + odlocNum + ", odlocAdr1=" + odlocAdr1 + ", odlocAdr2="
				+ odlocAdr2 + ", odlocCpost=" + odlocCpost + ", odlocVille=" + odlocVille + ", odlocCom=" + odlocCom
				+ ", odlocTelfix=" + odlocTelfix + ", odlocTelport=" + odlocTelport + ", odlocMail=" + odlocMail
				+ ", odlocBienloue=" + odlocBienloue + "]";
	}

}
