package fr.analogon.entities;

// Generated 6 oct. 2022 18:44:28 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import fr.analogon.utils.Utils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * OdhLots generated by hbm2java
 */
@Entity
@Table(name = "odh_lots", uniqueConstraints = @UniqueConstraint(columnNames = {
		"odlot_codebat", "odlot_codeesc", "odlot_codeniv", "odlot_codeimm" }))
@NoArgsConstructor @Getter @Setter
public class OdhLots implements java.io.Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "odlot_id", unique = true, nullable = false)
	private Integer odlotId;
	@Column(name = "odlot_type")
	private Integer odlotType;	
	@Column(name = "odlot_situ", precision = 10)
	private Double odlotSitu=0.00;	
	@Column(name = "odlot_activ")
	private Integer odlotActiv;
	@Column(name = "odlot_avgarage")
	private Boolean odlotAvgarage;	
	@Column(name = "odlot_garage", length = 20)
	private String odlotGarage="";	
	@Column(name = "odlot_avcave")
	private Boolean odlotAvcave;	
	@Column(name = "odlot_cave", length = 20)
	private String odlotCave="";	
	@Column(name = "odlot_com", length = 80)
	private String odlotCom;	
	@Column(name = "odlot_info1", length = 20)
	private String odlotInfo1;	
	@Column(name = "odlot_info2", length = 20)
	private String odlotInfo2;	
	@Column(name = "odlot_info3", length = 20)
	private String odlotInfo3;	
	@Column(name = "odlot_immeuble", nullable = false)
	private int odlotImmeuble;	
	@Column(name = "odlot_locataire")
	private Integer odlotLocataire;	
	@Column(name = "odlot_proprietaire")
	private Integer odlotProprietaire;	
	@Column(name = "odlot_codebat", length = 2)
	private String odlotCodebat;	
	@Column(name = "odlot_codeesc", length = 2)
	private String odlotCodeesc;	
	@Column(name = "odlot_codeniv")
	private Integer odlotCodeniv;	
	@Column(name = "odlot_codeimm")
	private Integer odlotCodeimm;	
	@Column(name = "odlot_code", nullable = false)
	private String odlotCode="";

	//Ces getteurs permettent de convertir de boolean en string 
	//car les options de la balise select n'accepte que le string ou int
	public String getOdlotAvgarage(){
		return Utils.boolToString(this.odlotAvgarage);
	}
	public String getOdlotAvcave(){
		return Utils.boolToString(this.odlotAvcave);
	}
	
}

