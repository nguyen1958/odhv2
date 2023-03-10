package fr.analogon.entities;

// Generated 6 oct. 2022 18:44:28 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import fr.analogon.utils.Utils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * OdhRelogsproc generated by hbm2java
 */
@Entity
@Table(name = "odh_relogsproc")
@NoArgsConstructor	@Getter	@Setter
public class OdhRelogsproc implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odrp_id", unique = true, nullable = false)
	public Integer odrpId;
	@Column(name = "odrp_nom", nullable = false, length = 30)
	public String odrpNom;
	@Column(name = "odrp_nbp")
	public Integer odrpNbp;
	@Temporal(TemporalType.DATE)
	@Column(name = "odrp_datedu", length = 10)
	public Date odrpDatedu;
	@Temporal(TemporalType.DATE)
	@Column(name = "odrp_dateau", length = 10)
	public Date odrpDateau;
	@Column(name = "odrp_relogement")
	public Integer odrpRelogement;
	@Column(name = "odrp_procedure")
	public Integer odrpProcedure;
	@Column(name = "odrp_rest", length = 60)
	public String odrpRest;
	@Column(name = "odrp_coutloyer", precision = 11)
	public BigDecimal odrpCoutloyer;
	@Column(name = "odrp_coutrest", precision = 11)
	public BigDecimal odrpCoutrest;
	//Convertir au type Date la date reçu au format string
	public void SetOdrpDatedu(String date){
		this.odrpDatedu=Utils.stringToDate(date);
	}
	public void SetOdrpDateau(String date){
		this.odrpDateau=Utils.stringToDate(date);
	}
}
